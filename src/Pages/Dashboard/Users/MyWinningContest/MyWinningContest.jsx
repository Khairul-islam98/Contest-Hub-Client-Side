import React, { useEffect, useState } from 'react';
import { getUserWinContest } from '../../../../api/user';
import useAuth from '../../../../hooks/useAuth';
import trophy from '../../../../assets/images/others/trophy.gif'

const MyWinningContest = () => {
    const { user } = useAuth()
    const [winningContests, setWinningContests] = useState([]);

    useEffect(() => {
        getUserWinContest(user?.email)
            .then((data) => {
                console.log(data);
                setWinningContests(data);
            })
            .catch((error) => {
                console.error('Error fetching winning contests:', error);
            });
    }, []);

    console.log(winningContests);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6 text-center text-rose-400">My Winning Contests</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {winningContests.map((contest) => (
                    <div key={contest.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={contest.image} alt={contest.name} className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <div className='flex justify-center items-center'>
                                <h3 className="text-sm font-semibold mb-2">{contest.contestname}</h3>
                                <img className='w-10 h-10' src={trophy} alt="" />
                            </div>
                            <p className="font-bold text-center">Prize <span className='text-rose-400'>Money</span>: {contest.prizeMoney}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyWinningContest;