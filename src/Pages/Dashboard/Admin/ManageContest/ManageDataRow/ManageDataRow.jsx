import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { contestsAccepted, deleteContest } from '../../../../../api/creator';
import DeleteModal from './Modal/DeleteModal';

const ManageDataRow = ({ contest, refetch }) => {

    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const modalHandler = id => {
        deleteContest(id)
            .then(data => {
                refetch()
                toast.success('contest deleted')
            })
            .catch(err => console.log(err))
        closeModal()
    }

   

    const handleAccept = id => {
        contestsAccepted(id)
            .then(data => {
                refetch()
                toast.success(`${contest?.contestname} Accepted`)
            })
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
                <div className='flex-shrink-0'>
                    <div className='block relative'>
                        <img
                            alt='profile'
                            src={contest?.image}
                            className='mx-auto object-cover rounded h-10 w-20 '
                        />
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{contest?.status}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    <p className='text-gray-900 whitespace-no-wrap'>${contest?.prizeMoney}</p>
                </p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
               {
                 contest?.status === 'Accepted' ? <p className='font-bold text-rose-400'>confirmed</p> : 
                 <button onClick={() => handleAccept(contest._id)} type="button" class="focus:outline-none text-white bg-rose-500 hover:bg-rose-700 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Accept</button>
               }
            </td>
            
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    onClick={openModal}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                </span>
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    modalHandler={modalHandler}
                    id={contest._id}
                />
            </td>


        </tr>
    );
};

export default ManageDataRow;