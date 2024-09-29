import React from 'react';
import './commonLeft.css'

const CommonLeft = (props) => {
    return (
        <div className="left-container">
            {props.children}
        </div>
    )
}

export default CommonLeft;