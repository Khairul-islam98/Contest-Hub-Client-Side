import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth';
import { useForm } from "react-hook-form"
import { getToken, saveUser } from '../../api/auth';
import { imageUpload } from '../../api/utils';
import loginBg from '../../assets/images/others/authentication.png'

const image_hosting_key = import.meta.env.VITE_img_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {

    const { createUser, updateUserProfile } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()



    const form = location.state?.form?.pathname || '/'


    const onSubmit = async (data) => {
        try {
            //   const imageFile = { image: data.image[data] };
            const imageData = await imageUpload(data.image[0])
            console.log(imageData);

            const result = await createUser(data.email, data.password);

            const updatedProfileRes = await updateUserProfile(data.name, imageData?.data?.display_url);

            const dbResponse = await saveUser(result?.user)
            await getToken(result?.user?.email)
            toast.success('Registration Successfully')
            navigate(form, { replace: true });
            console.log(dbResponse)
        } catch (err) {
            toast.error(err?.message || "An error occurred");
        }
    };


    return (
        <section className='p-10'>
            <div className="min-h-screen  bg-base-200" style={{ backgroundImage: `url(${loginBg})` }}>
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900'>
                        <div className='mb-8 text-center'>
                            <h1 className='my-3 text-4xl font-bold'>Registration</h1>
                            <p className='text-xl font-semibold text-gray-400'>Welcome to Contest <span className='text-rose-500'>Hub</span> </p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate=''
                            action=''
                            className='space-y-6 ng-untouched ng-pristine ng-valid'
                        >
                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor='email' className='block mb-2 text-sm'>
                                        Name
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        {...register("name", { required: true })}
                                        id='name'
                                        placeholder='Enter Your Name Here'
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                        data-temp-mail-org='0'

                                    />
                                    {errors.name && <span className=' text-red-500'>This field is required</span>}
                                </div>
                                <div>
                                    <label htmlFor='image' className='block mb-2 text-sm'>
                                        Select Image:
                                    </label>
                                    <input
                                        required
                                        type='file'
                                        id='image'
                                        name='image'
                                        {...register('image', { required: true })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='email' className='block mb-2 text-sm'>
                                        Email address
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        {...register("email", { required: true })}
                                        id='email'
                                        required
                                        placeholder='Enter Your Email Here'
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                        data-temp-mail-org='0'
                                    />
                                </div>
                                <div>
                                    <div className='flex justify-between'>
                                        <label htmlFor='password' className='text-sm mb-2'>
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type='password'
                                        name='password'
                                        {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/ })}
                                        id='password'
                                        required
                                        placeholder='*******'
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                    />
                                    {errors.password?.type === "required" && (
                                        <p className=' text-red-500'>Password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className=' text-red-500'>Password must be 6 char</p>
                                    )}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must contain at least one capital letter,One special character</p>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='bg-rose-500 w-full rounded-md py-3 text-white'
                                >


                                    Continue

                                </button>
                            </div>
                        </form>
                        <div className='flex items-center pt-4 space-x-1'>
                            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                            <p className='px-3 text-sm dark:text-gray-400'>
                                Registration with social accounts
                            </p>
                            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                        </div>

                        <p className='px-6 text-sm text-center text-gray-400'>
                            Already have an account?{' '}
                            <Link
                                to='/login'
                                className='hover:underline hover:text-rose-500 text-gray-600'
                            >
                                Login
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration;