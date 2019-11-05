import React from 'react';
import Loader from 'react-loader-spinner'

export default function LoadingSpinner ({ type }) {


    return (
        <>
            <div style={{height: '225px'}} />
            <Loader
                type={type}
                color="rgb(255, 1, 0)"
                height={100}
                width={100}
                timeout={5000} //3 secs
            />
            <div style={{height: '50vh'}}/>
        </>
    )
}