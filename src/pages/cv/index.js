import React from 'react';
import cvFile from '../../assets/pdf/el1.pdf';
import './cv.css'; // 确保创建并导入样式文件

// CV pdf页面
const CV = () => {
    return (
        <div className="cv">
            <iframe
                src={cvFile}
                className="pdf-iframe"
                title="CV"
            />
        </div>
    );
};

export default CV;
