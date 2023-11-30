import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ManageDataRow from './ManageDataRow/ManageDataRow';
import { getAllContest } from '../../../../api/creator';

const ManageContest = () => {

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => await getAllContest(),
      })


    return (
        <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                    <table className='min-w-full leading-normal'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    Contest Name
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    image
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    Status
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    Prize Money
                                </th>

                                <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    Confirm
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests &&
                                contests.map(contest => (
                                    <ManageDataRow
                                        key={contest?._id}
                                        contest={contest}
                                        refetch={refetch}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ManageContest;