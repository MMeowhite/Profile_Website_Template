import React from 'react';
import cvFile from '../../../assets/cv/el1.pdf';
import './cv.css'

// CV pdf页面
const CV = () => {
    return (
        <div
            id="#cv"
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ padding: '1rem' }} // 给整个容器添加内边距，避免内容贴边
        >
            <h1 style={{ fontWeight: '800', fontSize: '4rem', textAlign: 'center' }}>Curriculum Vitae</h1>
            <div
                className="pdf-container"
                style={{
                    width: '80vw',
                    height: '100vh', // 高度限制为视口的80%
                    margin: "0 auto"
                }}
            >
                <embed
                    src={cvFile}
                    className="pdf-iframe"
                    title="Curriculum Vitae"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '5px solid #797979',
                    }}
                />
            </div>
        </div>
    );
};

export default CV;