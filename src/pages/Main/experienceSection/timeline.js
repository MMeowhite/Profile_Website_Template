import React, { useEffect, useRef } from "react";
import "./timeline.css";
import { useConfig } from "../../../utils/Provider/ConfigProvider";
import {useTheme} from "../../../utils/Provider/themeProvider";

const Timeline = () => {
    const { configValue: timelineData } = useConfig("pages.home.experienceSection.timeline");
    const timelineRef = useRef(null);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (!timelineData?.length) return; // 确保数据已加载

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
            items.forEach((item) => {
                if (isElementInViewport(item)) {
                    item.classList.add("in-view");
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

            <ul style={{width: "100vw"}}>
                {timelineData?.map((item, index) => (
                    <li key={index} style={{backgroundColor: isDarkMode ? "#fff" : "#000"}}>
                        <div style={{
                            borderWidth: "2px",
                            borderStyle: "solid", // 指定边框样式
                            borderColor: isDarkMode ? "#fff" : "#000",
                            borderRadius: '10px', // 可选圆角
                            boxShadow: isDarkMode
                                ? '0 8px 12px rgba(255, 255, 255, 0.5)' // 深色模式下的阴影
                                : '0 8px 12px rgba(0, 0, 0, 0.5)', // 浅色模式下的阴影
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