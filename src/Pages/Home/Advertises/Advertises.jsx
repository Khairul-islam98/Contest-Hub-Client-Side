import { useEffect, useState } from "react";
import { getPopularContest } from "../../../api/creator";
import { Link } from "react-router-dom";


const Advertises = () => {

    const [contestData, setContestData] = useState(0)
    useEffect(()=> {
        getPopularContest()
        .then(data => {
           setContestData(data[0])
        })
    },[])
  

    return (
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Join Our Contest!</h2>
          <p className="text-lg mb-8">
            Showcase your talent and win amazing prizes. Be part of our creative community!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6 bg-white text-gray-800">
              <h3 className="text-xl font-semibold mb-4">Contest Winner</h3>
              <p className="text-lg mb-2">Congratulations to: <span className="font-bold text-rose-400">{contestData?.winner?.name}</span></p>
              <p className="text-2xl font-bold"></p>
              <p className="mt-4">Total Participants: {contestData.participantsCount}</p>
            </div>
            <div className="border rounded-lg p-6 bg-white text-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-rose-400">Join Now!</h3>
              <p className="text-lg mb-4">
                Participate and stand a chance to win exciting prizes!
              </p>
              <Link to='allcontestpage'>
              <button className="bg-rose-400 text-white px-6 py-2 rounded-lg">
                Join Contest
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Advertises;