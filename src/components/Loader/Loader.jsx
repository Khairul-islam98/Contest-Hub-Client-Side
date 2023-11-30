import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex justify-center items-center mt-24 py-24'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#FB7185"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    );
};

export default Loader;