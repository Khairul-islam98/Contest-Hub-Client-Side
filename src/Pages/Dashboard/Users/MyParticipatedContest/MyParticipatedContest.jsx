import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { getUserContest } from '../../../../api/user';
import Loader from '../../../../components/Loader/Loader';
import { getAllApprovedContest } from '../../../../api/creator';
import { Link } from 'react-router-dom';

const MyParticipatedContest = () => {
    const { user } = useAuth()
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(false)
    const [sortedContests, setSortedContests] = useState([])
    const [ascending, setAscending] = useState(true);

    useEffect(() => {
        setLoading(true)
        getUserContest(user?.email)
            .then(data => {
            
                setContests(data);
                setSortedContests(data);
                setLoading(false)
            }).catch(error => {
            });

        getAllApprovedContest()
            .then(data => {
                
            })

    }, [])

    const sortContestsByDeadline = () => {
        const sortedContestsCopy = [...contests];
        if (ascending) {
            sortedContestsCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            sortedContestsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        setSortedContests(sortedContestsCopy);
        setAscending(!ascending); // Toggle the sorting order
    };

    if (loading) return <Loader />

    return (

        <div className="container mx-auto px-4 py-8">
            <button
                onClick={sortContestsByDeadline}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Sort by Deadline
            </button>
            <h2 className="text-2xl font-bold mb-4">My Contests</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedContests.map(contest => (
                    <div
                        key={contest._id}
                        className="bg-white border rounded p-4 shadow-md"
                    >
                        <h3 className="font-semibold mb-2">{contest.contestname}</h3>
                        <p><strong>Deadline:</strong> {contest.date.slice(0, 10)}</p>
                        <p><strong>TransactionId:</strong> {contest.transactionId}</p>
                        {/* Display other contest details */}
                        {/* <Link to={`contest-details/${contest.contestId}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
                                Participate
                            </button>
                        </Link> */}
                    </div>
                ))}
            </div>
        </div>


    )
};
export default MyParticipatedContest;