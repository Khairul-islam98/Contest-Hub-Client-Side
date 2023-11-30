import { useState } from "react"
import toast from "react-hot-toast"
import EditModal from "./EditModal/EditModal"
import { deleteContest } from "../../../../../api/creator"
import DeleteModal from "./DeleteModal/DeleteModal"
import { Link } from "react-router-dom"

const ContestDataRow = ({ contest, refetch }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const modalHandler = id => {
        console.log(id)
        deleteContest(id)
            .then(data => {
                console.log(data)
                refetch()
                toast.success('contest deleted')
            })
            .catch(err => console.log(err))
        closeModal()
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
                {
                    contest?.status === 'Accepted' ? <h2 className="font-bold text-rose-400">accepted</h2> :
                    <p className='whitespace-no-wrap text-gray-900'>{contest?.status}</p>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    <p className='text-gray-900 whitespace-no-wrap'>${contest?.price}</p>
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {contest.status === 'Accepted' ? (
                    <span className='relative inline-block px-3 py-1 font-semibold text-gray-400 cursor-not-allowed leading-tight'>
                        <span aria-hidden='true' className='absolute inset-0 bg-gray-200 opacity-50 rounded-full'></span>
                        <span className='relative'>Edit</span>
                    </span>
                ) : (
                    <span
                        onClick={() => setIsEditModalOpen(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
                        <span className='relative'>Edit</span>
                    </span>
                )}
                <EditModal
                    isOpen={isEditModalOpen}
                    closeModal={() => setIsEditModalOpen(false)}
                    contest={contest}
                    id={contest._id}
                    refetch={refetch}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {contest.status === 'Accepted' ? (
                    <span className='relative inline-block px-3 py-1 font-semibold text-gray-400 cursor-not-allowed leading-tight'>
                        <span aria-hidden='true' className='absolute inset-0 bg-gray-200 opacity-50 rounded-full'></span>
                        <span className='relative'>Delete</span>
                    </span>
                ) : (
                    <span
                        onClick={openModal}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span aria-hidden='true' className='absolute inset-0 bg-red-200 opacity-50 rounded-full'></span>
                        <span className='relative'>Delete</span>
                    </span>
                )}
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    modalHandler={modalHandler}
                    id={contest._id}
                />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    <Link to='/dashboard/contestSubmittedPage'>
                    <button className='focus:outline-none text-white bg-rose-500 hover:bg-rose-700 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Submission</button>
                    </Link>
                </p>
            </td>
        </tr>
    )
}

export default ContestDataRow
