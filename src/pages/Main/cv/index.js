import React, {useEffect} from 'react';
import cvFile from '../../../assets/cv/el1.pdf';
import './cv.css'
import AOS from 'aos'

// CV pdf页面
const CV = () => {

    useEffect(()=>{
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    },[])

    return (
        <div
            id="cv"
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ padding: '1rem' }} // 给整个容器添加内边距，避免内容贴边
            data-aos="fade-in"
        >
            <h1 style={{ fontWeight: '800', fontSize: '4rem', textAlign: 'center' }} data-aos="fade-up">Curriculum Vitae</h1>
            <div
                className="pdf-container"
                style={{
                    width: '80vw',
                    height: '100vh', // 高度限制为视口的80%
                    margin: "0 auto"
                }}
                data-aos="fade-in"
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