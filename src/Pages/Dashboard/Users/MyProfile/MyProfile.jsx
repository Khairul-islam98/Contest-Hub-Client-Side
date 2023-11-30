import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import useAuth from '../../../../hooks/useAuth';
import { getUserWinContestPercentage } from '../../../../api/user';
import useRole from '../../../../hooks/useRole';

const MyProfilePieChart = () => {
    const { user } = useAuth();
    const [role] = useRole()
    const [winCount, setWinCount] = useState({ wins: 0 }); // Default winCount as an object with wins property

    useEffect(() => {
        getUserWinContestPercentage(user?.email)
            .then(data => {
                const { wins } = data || { wins: 0 }; // Extract wins from data or default to 0
                setWinCount({ wins }); // Set winCount as an object with wins property
            })
            .catch(error => {
                console.error('Error fetching user win count:', error);
            });
    }, [user?.email]);

    const { wins } = winCount; // Destructure wins property from winCount object
    const loss = 100 - wins; // Calculate the loss based on total (assuming total contests are 100)

    const data = [
        { name: 'Wins', value: wins },
        { name: 'Losses', value: loss },
    ];


    const COLORS = ['#0088FE', '#FF8042']; // Colors for different sections of the pie chart

    return (
        <div>
            <div className='flex flex-col text-center items-center w-1/2 mx-auto'>
                <h2 className='text-center font-bold text-rose-400'>User Win Percentage</h2>
                <div className='flex'>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                    <img
                        alt='profile'
                        src='https://wallpapercave.com/wp/wp10784415.jpg'
                        className='w-full mb-4 rounded-t-lg h-36'
                    />
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user.photoURL}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                            />
                        </a>

                        <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
                            {role && role.toUpperCase()}
                        </p>
                        
                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold text-black '>
                                        {user.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold text-black '>{user.email}</span>
                                </p>

                                <div>
                                    <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                        Update Profile
                                    </button>
                                    <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                        Change Name
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePieChart;
