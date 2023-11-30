import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import './CheckoutForm.css'
import { ImSpinner9 } from 'react-icons/im'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { attemptCount, bookingInfo, createPaymentIntent } from '../../../api/creator'

const CheckoutForm = ({ contestInfo, closeModal, ids }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const [cardError, setCardError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()
  useEffect(() => {

    createPaymentIntent({ price: contestInfo.price }).then(data => {
      console.log(data.clientSecret)
      setClientSecret(data.clientSecret)
    })
  }, [contestInfo])


  const handleSubmit = async event => {
    event.preventDefault()
    const taskValue = event.target.task.value;

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }


    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('error', error)
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('payment method', paymentMethod)
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      })

    if (confirmError) {
      console.log(confirmError)
      setCardError(confirmError.message)
    }


    console.log('payment intent', paymentIntent)

    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        ...contestInfo,
        transactionId: paymentIntent.id,
        date: new Date(),
        task: taskValue,
      }
      try {


        await bookingInfo(paymentInfo)




        const text = `Contest add you Successful! ${paymentIntent.id}`
        toast.success(text)
        navigate('/dashboard/myParticipatedContest')
      } catch (err) {
        console.log(err)
        toast.error(err.message)
      } finally {
        setProcessing(false)
      }
      await attemptCount(ids._id)


      setProcessing(false)
    }
  }

  return (
    <>
      <form className='my-2' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='mt-2'>
          <label htmlFor='task' className='block text-gray-600'>
            Task
          </label>
          <textarea
            id='task'
            className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
            name='task'
          ></textarea>
        </div>
        <div className='flex mt-2 justify-around'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={!stripe || !clientSecret || processing}
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {processing ? (
              <ImSpinner9 className='m-auto animate-spin' size={24} />
            ) : (
              `Pay ${contestInfo.price}$`
            )}
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  )
}

export default CheckoutForm
