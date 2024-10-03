import React from 'react';
import PropTypes from 'prop-types';
import './progressBar.css'; // 你可以根据需要添加样式

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar-container">
            <h1>Loading....</h1>
            <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
};

export default ProgressBar;
