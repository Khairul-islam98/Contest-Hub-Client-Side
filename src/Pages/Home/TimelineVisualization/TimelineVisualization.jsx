import React, { useRef, useEffect, useState } from 'react';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';
import 'react-vis/dist/style.css';

const TimelineVisualization = ({ contestData }) => {
    const plotRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (plotRef.current) {
                setContainerWidth(plotRef.current.clientWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    const data = contestData.map((contest, index) => ({
        x: index + 1,
        y: [
            { x: new Date(contest.startDate).getTime(), y: index },
            { x: new Date(contest.endDate).getTime(), y: index },
            { x: new Date(contest.contestDeadline).getTime(), y: index + 0.5 }
        ]
    }));

    return (
        <div className="container mx-auto mt-8 md:flex justify-center items-center" ref={plotRef}>
            <h1 className="text-3xl font-bold mb-4 text-center text-rose-400">Contests Timeline</h1>
            <div style={{ width: '100%', height: '400px' }}>
                <XYPlot xType="time" width={containerWidth || 300} height={400}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    {data.map((contestData, index) => (
                        <VerticalBarSeries key={index} data={contestData.y} />
                    ))}
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </div>
        </div>
    );
};

export default TimelineVisualization;
