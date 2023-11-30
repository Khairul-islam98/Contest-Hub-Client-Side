import axiosSecure from "../hooks"


export const createdPost = async (contestData) => {

  const { data } = await axiosSecure.post('/contests', contestData)
  return data
}

export const editContest = async (contestData, id) => {
  const { data } = await axiosSecure.put(`/contests/${id}`, contestData)
  return data
}

export const getAllContest = async () => {
  const { data } = await axiosSecure('/contests')
  return data
}
export const getAllApprovedContest = async (currentPage, itemsPerPage) => {
  const { data } = await axiosSecure(`/contests/approved?page=${currentPage}&size=${itemsPerPage}`)
  return data
}
export const getPopularContest = async () => {
  const { data } = await axiosSecure('/contests/popular/data')
  return data
}

export const getSingleContest = async id => {
  const { data } = await axiosSecure(`/contests/${id}`)
  return data
}
export const attemptCount = async (contestId ) => {
  const { data } = await axiosSecure.put(`/contests/attempt/${contestId}`)
  return data
}


export const getMyContest = async email => {
  const { data } = await axiosSecure(`/contests/creator/${email}`)
  return data
}

export const contestsAccepted = async (id) => {
  const currentUser = {
    status: 'Accepted',
  }
  const { data } = await axiosSecure.put(`/contests/accept/${id}`, currentUser)
  return data
}

export const deleteContest = async id => {
  const { data } = await axiosSecure.delete(`/contests/${id}`)
  return data
}
export const createPaymentIntent = async price => {
  const { data } = await axiosSecure.post('/create-payment-intent', price)
  return data
}

export const bookingInfo = async paymentInfo => {
  const { data } = await axiosSecure.post('/bookings', paymentInfo)
  return data
}

export const submitedContest = async email => {
  const { data } = await axiosSecure(`/bookings/creator/${email}`)
  return data
}
export const contestWinner = async (contestId, winner) => {
  try {
    const { data } = await axiosSecure.put(`/contests/winner/${contestId}`, winner);
    return data;
  } catch (error) {
    console.error('Error in contestWinner:', error);
    throw error;
  }
}

export const winnerDeclare = async (id, winnerAnnouncement) => {
  try {
    const response = await axiosSecure.put(`/bookings/submissions/${id}`, winnerAnnouncement);
    return response.data;
  } catch (error) {
    console.error('Error in winnerDeclare:', error);
    throw error;
  }
};
