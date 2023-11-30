import React from 'react';

const EditModalForm = ({
    handleSubmit,
    handleImageUpdate,
    contestData,
    setContestData
}) => {
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-10'>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='contestname' className='block text-gray-600'>
                            Contest Name
                        </label>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='contestname'
                            value={contestData?.contestname}
                            onChange={event =>
                                setContestData({ ...contestData, contestname: event.target.value })
                            }
                            id='contestname'
                            type='text'
                            placeholder='Contest Name'
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='category' className='block text-gray-600'>
                            Category
                        </label>
                        <select
                        onChange={event =>
                            setContestData({ ...contestData, category: event.target.value })
                          }
                          defaultValue={contestData.category}
                            required
                            className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                            name='category'
                        >
                            <option value="Business Contest">Business Contest</option>
                            <option value="Medical Contest">Medical Contest</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Gaming">Gaming</option>
                        </select>
                    </div>
                    <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                        <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                            <div className='flex flex-col w-max mx-auto text-center'>
                                <label>
                                    <input
                                        onChange={event => {
                                            handleImageUpdate(event.target.files[0])
                                        }}
                                        className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        name='image'
                                        id='image'
                                        accept='image/*'
                                        hidden
                                    />
                                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                        Upload Image
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>
                                Price
                            </label>
                            <input
                                value={contestData?.price}
                                onChange={event =>
                                    setContestData({ ...contestData, price: event.target.value })
                                }
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='price'
                                id='price'
                                type='number'
                                placeholder='Price'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='prize Money' className='block text-gray-600'>
                                Prize Money
                            </label>
                            <input
                                value={contestData?.prizeMoney}
                                onChange={event =>
                                    setContestData({ ...contestData, prizeMoney: event.target.value })
                                }
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='prizeMoney'
                                id='prizeMoney'
                                type='number'
                                placeholder='Prize Money'
                                required
                            />
                        </div>
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='description' className='block text-gray-600'>
                            Description
                        </label>

                        <textarea
                            value={contestData?.description}
                            onChange={event =>
                                setContestData({ ...contestData, description: event.target.value })
                            }
                            id='description'
                            className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                            name='description'
                        ></textarea>
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='Task Submission Instruction' className='block text-gray-600'>
                            Task Submission Instruction
                        </label>

                        <textarea
                            value={contestData?.taskSubmissionInstruction}
                            onChange={event =>
                                setContestData({ ...contestData, taskSubmissionInstruction: event.target.value })
                            }
                            id='taskSubmissionInstruction'
                            className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                            name='taskSubmissionInstruction'
                        ></textarea>
                    </div>
                    <div>
                            <label htmlFor="contestDeadline">Contest Deadline:</label>
                            <input
                                type="date"
                                id="contestDeadline"
                                name="contestDeadline"
                                value={contestData?.contestDeadline}
                                onChange={event =>
                                    setContestData({ ...contestData, contestDeadline: event.target.value })
                                }
                                className="mt-1 border border-rose-400 block w-full pl-3 pr-10 py-2 text-base   sm:text-sm rounded-md"
                            />
                        </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >

                    Confirm

                </button>
            </form>
        </div>
    );
};

export default EditModalForm;