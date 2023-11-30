import React from 'react';
import { Dialog, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const ContestModal = ({ closeModal, isOpen, contestInfo, ids }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Review Info
                                </Dialog.Title>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Contest: {contestInfo.contestname}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Location: {contestInfo.contestDeadline}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        user: {contestInfo.user.name}
                                    </p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Price: $ {contestInfo.price}
                                    </p>
                                </div>
                                
                                <hr className='mt-8 ' />
                                {/* Card data form */}
                                {/* checkout form */}

                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        closeModal={closeModal}
                                        contestInfo={contestInfo}
                                        ids={ids}
                                    />
                                </Elements>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ContestModal;