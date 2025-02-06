import React, { useEffect, useState } from "react";
import "./timelineClock.css";
import {useTheme} from "../../../components/themeProvider"; // 这里的 CSS 可以复用你原来的样式

const TimelineClock = () => {
    const { isDarkMode } = useTheme();
    const [offset, setOffset] = useState(0);
    const maxOffset = 0;
    const minOffset = -3;
    const startYear = 2021;

    const slides = [
        { year: 2021, title: "《你的孤独，虽败犹荣》", passage: "如果你停止，就是谷底。如果你还在继续，就是上坡。" },
        { year: 2022, title: "《萤火之森》", passage: "如果时光可以倒流，我还是会选择认识你，虽然会伤痕累累。" },
        { year: 2023, title: "《平凡的世界》", passage: "人生啊，是这样不可预测，没有永恒的痛苦，也没有永恒的幸福。" },
        { year: 2024, title: "《道林・格雷的画像》", passage: "不要虚掷你的黄金时代，不要去倾听枯燥乏味的东西。" }
    ];

    useEffect(() => {
        createClockScale();
    }, []);

    const createClockScale = () => {
        const clock = document.getElementById("clock-table");
        if (!clock) return;

        for (let i = -60, year = startYear - 1; i < 300; i += 6) {
            addClockScale(i, clock);
            if (i % 60 === 0) addThickClockScale(i, year++, clock);
        }
    };

    const addClockScale = (degree, clock) => {
        const div = document.createElement("div");
        div.className = "invisible-table";
        div.style.transform = `rotate(${degree}deg)`;
        const scale = document.createElement("div");
        scale.className = "clock-scale";
        div.appendChild(scale);
        clock.appendChild(div);
    };

    const addThickClockScale = (degree, year, clock) => {
        const div = document.createElement("div");
        div.className = "invisible-table";
        div.style.transform = `rotate(${degree}deg)`;
        const thickScale = document.createElement("div");
        thickScale.className = "clock-thick";
        const span = document.createElement("span");
        span.textContent = `${year}`;
        thickScale.appendChild(span);
        div.appendChild(thickScale);
        clock.appendChild(div);
    };

    const slideToPrev = () => {
        setOffset(prev => Math.min(maxOffset, prev + 1));
    };

    const slideToNext = () => {
        setOffset(prev => Math.max(minOffset, prev - 1));
    };

    return (
        <div className="main">
            <i className="iconfont icon-arrow-up-bold" id="up-btn" onClick={slideToPrev}></i>
            <i className="iconfont icon-arrow-down-bold" id="down-btn" onClick={slideToNext}></i>
            <div id="content">
                {slides.map((slide, index) => (
                    <div key={index} className="card" style={{ transform: `translateY(${offset * 100}%)` }}>
                        <div className="card-time">{slide.year}</div>
                        <div className="card-title">{slide.title}</div>
                        <div className="card-passage">{slide.passage}</div>
                    </div>
                ))}
            </div>
            <div id="clock">
                <div id="clock-center"></div>
                <div id="clock-pointer"></div>
                <div id="clock-table"></div>
            </div>
        </div>
    );
};

export default TimelineClock;
