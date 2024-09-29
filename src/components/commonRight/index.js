import React from 'react';
import './commonRight.css'

const CommonRight= (props) => {
    return (
        <div className="right-container">
            {props.children}
        </div>
    )
}

export default CommonRight