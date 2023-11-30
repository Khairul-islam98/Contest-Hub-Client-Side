import axiosSecure from "../hooks"



export const getUserContest = async email => {
    const { data } = await axiosSecure(`/bookings/user/${email}`)
    return data
  }

export const getUserWinContest = async email => {
    const { data } = await axiosSecure(`/bookings/user/won/${email}`)
    return data
  }
export const getUserWinContestPercentage = async email => {
    const { data } = await axiosSecure(`/user-stat/${email}`)
    return data
  }