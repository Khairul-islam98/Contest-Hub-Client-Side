import {  useState } from 'react';
import { contestWinner, winnerDeclare } from '../../../../../api/creator';
import useAuth from '../../../../../hooks/useAuth';
import toast from 'react-hot-toast';


const ContestDataRow = ({ contest, refetch }) => {
    const { user } = useAuth()
    const [contestData, setContestData] = useState()




    const handleWinner = async (contestId, id) => {
        console.log(id);
        try {
            const winner = {
                name: contest?.user.name,
                image: contest?.user.image,
                email: contest?.user.email
            };

            await contestWinner(contestId, winner);

            const winnerAnnouncement = {
                name: contest?.user.name,
                image: contest?.user.image,
                email: contest?.user.email
            }
            console.log(winnerAnnouncement);

            const result = await winnerDeclare(id, winnerAnnouncement);
            console.log(result);
            refetch()
            toast.success(`${contest?.user.name} won`)

            return result;
        } catch (error) {
            console.error('Error in handleWinner:', error);
            throw error;
        }
    }

    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{contest?.contestname}</p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

                <p className='whitespace-no-wrap text-gray-900'>{contest?.user?.name}</p>

            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    <p className='text-gray-900 whitespace-no-wrap'>{contest?.user?.email}</p>
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    <p className='text-gray-900 whitespace-no-wrap'>{contest?.task}</p>
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

                {
                    contest?.won === contest.contestId ? <span className='font-bold text-rose-400'>Already Declare</span> :
                    <button onClick={() => handleWinner(contest.contestId, contest._id)} type="button" class="focus:outline-none text-white bg-rose-500 hover:bg-rose-700 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Declare</button>
                }

                </td>
            </td>
        </tr>
    );
};

export default ContestDataRow;