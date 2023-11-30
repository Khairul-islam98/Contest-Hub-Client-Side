import React, { useState, useEffect } from 'react';
import './ParticipationProgress.css'; // Import your CSS file for styling

const ParticipationProgress = ({ contestData }) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        setParticipants(contestData);
    }, [contestData]);

    const totalParticipants = participants.reduce((total, participant) => total + participant.participantsCount, 0);

    return (
        <div className="container">
            <h2 className="title text-rose-400 font-bold">Participation Progress</h2>
            <div className="progress-bar-container">
                {participants.map(participant => (
                    <div key={participant._id} className="progress-bar">
                        <span className="contest-name">{participant.contestname}</span>
                        <div className="bar">
                            <div
                                className="fill"
                                style={{ width: `${(participant.participantsCount / totalParticipants) * 100}%` }}
                            ></div>
                        </div>
                        <span className="participant-count">{participant.participantsCount} Participants</span>
                    </div>
                ))}
            </div>
            <p className="total-count text-rose-400">Total Participants: {totalParticipants}</p>
        </div>
    );
};

export default ParticipationProgress;
