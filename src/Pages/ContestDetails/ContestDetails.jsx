import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ContestModal from './ContestModal/ContestModal';

const ContestDetails = () => {
    const contest = useLoaderData()
    const { user } = useAuth()
    let [isOpen, setIsOpen] = useState(false)
    const [contestInfo, setContestInfo] = useState({
        user: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
        },
        creator: contest?.creator?.email,
        price: contest?.price,
        contestDeadline: contest?.contestDeadline,
        prizeMoney: contest?.prizeMoney,
        contestname: contest?.contestname,
        contestId: contest?._id,
        image: contest?.image,
        task: contest?.task
        
    })
    const [ids, setIds] = useState({
        _id: contest?._id
    })
    const closeModal = () => {
        setIsOpen(false)
      }
    const [timeRemaining, setTimeRemaining] = useState('');
    useEffect(() => {
        const calculateTimeRemaining = () => {
            const deadline = contest?.contestDeadline;

            if (!deadline || deadline === '0000-00-00') {
                setTimeRemaining('Invalid Deadline');
                return;
            }

            const deadlineTime = new Date(deadline).getTime();
            const currentTime = new Date().getTime();

            const difference = deadlineTime - currentTime;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeRemaining('Contest ended');
            }
        };

        const timer = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(timer);
    }, [contest]);



    return (
        <section className='max-w-[1536px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6 mt-10'>
                    <div className='text-2xl font-bold text-rose-400'>{contest?.contestname}</div>
                    <div className='w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-xl'>
                        <img
                            className='object-cover w-full'
                            src={contest?.image}
                            alt='header image'
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                    <div className='col-span-4 flex flex-col gap-8'>
                        <p className='font-bold text-sm text-gray-500'>Attempted Count: {contest?.participantsCount}</p>
                        <hr />
                        <div className='text-lg font-light text-neutral-500'>
                            {contest?.description}
                            <hr />
                            {contest?.taskSubmissionInstruction}
                        </div>
                        <p className='font-bold text-sm text-gray-500'>Entry <span className='text-rose-400'>Prize</span>: ${contest?.price}</p>
                        <p className='font-bold text-sm text-gray-500'>Prize <span className='text-rose-400'>Money</span>: ${contest?.prizeMoney}</p>
                        {
                            contest?.winner && <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                                <div> Winner: <span className='text-rose-500'>{contest?.winner?.name}</span></div>
                                <img className='h-10 w-10 rounded-full border border-rose-400' src={contest?.winner?.image} alt="" />
                            </div>
                        }

                        <div>
                            <button
                            
                                onClick={() => setIsOpen(true)}
                                type='submit'
                                className='bg-rose-500 w-full rounded-md py-3 text-white mb-2'
                                hidden={timeRemaining === 'Contest ended' || contest?.winner}
                            >


                                Registration

                            </button>
                            <ContestModal
                                closeModal={closeModal}
                                isOpen={isOpen}
                                contestInfo={contestInfo}
                                ids={ids}
                            />
                        </div>

                    </div>


                    <div className='md:col-span-3 order-first md:order-last mb-10'>

                        <div className='timer'>
                            <p className='text-lg mb-2 font-semibold text-gray-600 text-center'>Time Remaining:</p>
                            <p className='bg-gray-800 rounded-md p-4 text-red-500 text-xl font-bold shadow-lg text-center'>{timeRemaining}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContestDetails;