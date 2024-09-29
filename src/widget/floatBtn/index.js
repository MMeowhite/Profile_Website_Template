import React from 'react';
import './floatBtn.css'
import {FloatButton} from "antd";

const FloatBtn = () => {
    return (
        <div className="floatBtn">
            <FloatButton
                tooltip={
                    <div>
                        <div>Documents</div>
                        <div>Documents</div>
                        <div>Documents</div>
                    </div>
                }
            />
        </div>
    )
}

export default FloatBtn