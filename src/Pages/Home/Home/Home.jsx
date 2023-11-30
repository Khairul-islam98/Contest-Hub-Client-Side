import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import PopularContest from '../PopularContext/PopularContext';
import { getPopularContest } from '../../../api/creator';
import axios from 'axios';
import Advertises from '../Advertises/Advertises';
import TopCreator from '../TopCreator/TopCreator';
import TimelineVisualization from '../TimelineVisualization/TimelineVisualization';
import ParticipationProgress from '../ParticipationProgress/ParticipationProgress';

const Home = () => {

    const [contestData, setContestData] = useState([])
    useEffect(() => {
        getPopularContest()
        .then(data => {
            setContestData(data)
        })
    },[])
    

    return (
        <div>
           <Banner contestData={contestData} setContestData={setContestData}  />
           <PopularContest contestData={contestData} setContestData={setContestData} />
           <Advertises />
           <TopCreator />
           <TimelineVisualization contestData={contestData} />
           <ParticipationProgress contestData={contestData} />
        </div>
    );
};

export default Home;