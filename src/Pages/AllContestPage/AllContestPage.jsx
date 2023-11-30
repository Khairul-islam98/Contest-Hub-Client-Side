import React, { useEffect, useState } from 'react';
import { getAllApprovedContest } from '../../api/creator';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const AllContestPage = () => {

    const [contestData, setContestData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [count, setCount] = useState(0);



    useEffect(() => {
        fetch('https://contest-hub-server-kappa.vercel.app/contestsCount')
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
            })
    }, [])


    useEffect(() => {
        setLoading(true)
        getAllApprovedContest()
            .then(data => {
                setContestData(data)
                setLoading(false)
            })

    }, [])

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const filteredContests = selectedCategory === 'all'
        ? contestData
        : contestData.filter(contest => contest.category === selectedCategory);

    const indexOfLastContest = currentPage * itemsPerPage;
    const indexOfFirstContest = indexOfLastContest - itemsPerPage;
    const currentContests = filteredContests.slice(indexOfFirstContest, indexOfLastContest);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);


    if (loading) return <Loader />





    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-10 text-center text-rose-400">All Contests</h1>
            <div className="flex flex-wrap gap-2 mb-5 justify-center">
                <button
                    className={`px-4 py-2 mr-4 border rounded-lg focus:outline-none text-rose-400 ${selectedCategory === 'all' ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 mr-4 border rounded-lg focus:outline-none text-rose-400 ${selectedCategory === 'Business Contest' ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedCategory('Business Contest')}
                >
                    Business Contest
                </button>
                <button
                    className={`px-4 py-2 mr-4 border rounded-lg focus:outline-none text-rose-400 ${selectedCategory === 'Medical Contest' ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedCategory('Medical Contest')}
                >
                    Medical Contest
                </button>
                <button
                    className={`px-4 py-2 mr-4 border rounded-lg focus:outline-none text-rose-400 ${selectedCategory === 'Article Writing' ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedCategory('Article Writing')}
                >
                    Article Writing
                    
                </button>
                <button
                    className={`px-4 py-2 mr-4 border rounded-lg focus:outline-none text-rose-400 ${selectedCategory === 'Gaming' ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedCategory('Gaming')}
                >
                    Gaming
                </button>
            </div>

            <div className="grid mx-auto gap-3 py-10 mb-5 md:grid-cols-2 lg:grid-cols-3  w-5/6" data-aos="fade-up"
                data-aos-duration="3000">
                {currentContests.map((contest) => (
                    <div key={contest._id} className="relative max-h-96 flex mt-10 flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div className="relative mx-auto bottom-10   overflow-hidden">
                            <img className='rounded-full w-36 h-32'
                                src={contest?.image}
                                alt="img-blur-shadow"
                                layout="fill"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans antialiased font-semibold leading-snug tracking-normal text-rose-900">
                                {contest?.contestname}
                            </h5>
                            <p>Attempted Count: {contest.participantsCount}</p>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                {contest?.description.slice(0, 90)}<span className='text-rose-400'>......</span>
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <Link to={`/contest-details/${contest._id}`}>
                                <button
                                    className="w-full rounded-lg bg-pink-500 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-ripple-light="true"
                                >
                                    Details
                                </button>
                            </Link>
                        </div>

                    </div>

                ))}

            </div>
            {currentContests.length > 0 && (
                <div className="flex flex-col items-center py-3 border mb-2">
                    <div className="flex flex-wrap gap-2">
                        <button onClick={handlePrevPage} className='px-4 py-2 border'><span><FaArrowLeftLong /></span></button>
                        {pages.map(page => (
                            <button
                                key={page}
                                className={currentPage === page ? 'btn bg-red-400 text-white' : 'btn'}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button onClick={handleNextPage} className='px-4 py-2 border'><span><FaArrowRightLong /></span></button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AllContestPage;