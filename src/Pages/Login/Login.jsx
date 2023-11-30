import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { getToken, saveUser } from '../../api/auth';
import loginBg from '../../assets/images/others/authentication.png'

const Login = () => {
    const { signUser, signInWithGoogle } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()


    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {

        signUser(data.email, data.password)
            .then(result => {
                const user = result.user
                getToken(result?.user?.email)
                toast.success('Login Successful')
                navigate(from, { replace: true });
            })
    }

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithGoogle()
            const dbResponse = await saveUser(result?.user)
            await getToken(result?.user?.email)
            navigate(from, { replace: true })
            toast.success('Login Successful')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }


    return (
        <section className='p-10'>
            <div className="min-h-screen  bg-base-200" style={{ backgroundImage: `url(${loginBg})` }}>
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10  text-gray-900'>
                        <div className='mb-8 text-center'>
                            <h1 className='my-3 text-4xl font-bold'>Login</h1>
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
                                        {...register("password", { required: true })}
                                        id='password'
                                        required
                                        placeholder='*******'
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                    />
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
                                Login with social accounts
                            </p>
                            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                        </div>
                        <div

                            onClick={handleSignInWithGoogle}

                            className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                        >
                            <FcGoogle size={32} />

                            <p>Continue with Google</p>
                        </div>
                        <p className='px-6 text-sm text-center text-gray-400'>
                            Don't have an account?
                            <Link
                                to='/registration'
                                className='hover:underline hover:text-rose-500 text-gray-600'
                            >
                                Registration
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;