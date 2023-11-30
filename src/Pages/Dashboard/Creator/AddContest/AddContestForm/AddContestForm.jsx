import React from 'react';
import MyListbox from '../../../../../components/Categories/MyListbox';

const AddContestForm = ({
    handleSubmit,
    loading = false,
    handleImageChange,
    uploadButtonText,
    selectedCategory,
    handleCategoryChange,
}) => {
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='ContestName' className='block text-gray-600'>
                                Contest Name
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='contestname'
                                id='ContestName'
                                type='text'
                                placeholder='Contest Name'
                                required
                            />
                        </div>
                        <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
            
                                        <input
                                            onChange={e => handleImageChange(e.target.files[0])}
                                            className='text-sm cursor-pointer w-15 hidden'
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 w-40 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                            {uploadButtonText}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                id='description'
                                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                                name='description'
                            ></textarea>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>
                                Price
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='price'
                                id='price'
                                type='number'
                                placeholder='Contest Price'
                                required
                            />
                        </div>

                    </div>
                    <div className='space-y-6'>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='taskSubmissionInstruction' className='block text-gray-600'>
                                Task Submission Instruction
                            </label>
                            <textarea
                                id='taskSubmissionInstruction'
                                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                                name='taskSubmissionInstruction'
                            ></textarea>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category'  className='block text-gray-600 w-full'>
                                Category
                            </label>

                            <div ><MyListbox 
                            value={selectedCategory}
                            handleCategoryChange={handleCategoryChange}
                             /> </div>
                            
                            {/* <div
                                required
                                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                                name='category'
                            >
                                
                                
                                <option value="Business Contest">Business Contest</option>
                                <option value="Medical Contest">Medical Contest</option>
                                <option value="Article Writing">Article Writing</option>
                                <option value="Gaming">Gaming</option>
                            </div> */}
                        </div> 

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='guest' className='block text-gray-600'>
                                Prize Money
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='prize_money'
                                id='prize_money'
                                type='number'
                                placeholder='Prize Money'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="contestDeadline">Contest Deadline:</label>
                            <input
                                type="date"
                                id="contestDeadline"
                                name="contestDeadline"
    
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            />
                        </div>
                    
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
        
                 Save & Continue
                    
                </button>
            </form>
        </div>
    )
}

export default AddContestForm;




