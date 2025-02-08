import React, { useEffect, useRef } from "react";
import "./timeline.css";
import useConfig from "../../../utils/useConfig";
import {useTheme} from "../../../components/themeProvider";

const Timeline = () => {
    const { configValue: timelineData } = useConfig("pages.home.experienceSection.timeline");
    const timelineRef = useRef(null);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (!timelineData?.length) return; // 确保数据已加载
        console.log("Timeline Data Loaded:", timelineData);

        const items = timelineRef.current.querySelectorAll(".timeline li");

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        const callbackFunc = () => {
            console.log("Scroll detected");
            items.forEach((item) => {
                if (isElementInViewport(item)) {
                    item.classList.add("in-view");
                    console.log("Element in view:", item);
                }
            });
        };

        // 立即执行一次，确保初始状态正确
        callbackFunc();

        window.addEventListener("scroll", callbackFunc);
        window.addEventListener("resize", callbackFunc);

        return () => {
            window.removeEventListener("scroll", callbackFunc);
            window.removeEventListener("resize", callbackFunc);
        };
    }, [timelineData]); // 依赖 `timelineData`，确保数据更新后执行

    return (
        <section className={`timeline ${isDarkMode ? "dark" : "light"}`} ref={timelineRef}>

            <ul>
                {timelineData?.map((item, index) => (
                    <li key={index} style={{backgroundColor: isDarkMode ? "#fff" : "#000"}}>
                        <div style={{
                            borderWidth: "2px",
                            borderStyle: "solid", // 指定边框样式
                            borderColor: isDarkMode ? "#fff" : "#000",  // 确保边框颜色可见, color:
                        }}
                        >
                            <time>{item.year}</time>
                            {item.content}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Timeline;