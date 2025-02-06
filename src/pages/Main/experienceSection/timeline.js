import React from "react";
import { motion } from "framer-motion";

const timelineData = [
    { year: "2018", event: "Started Research" },
    { year: "2019", event: "Published First Paper" },
    { year: "2020", event: "Received Grant" },
    { year: "2021", event: "Started Clinical Trials" },
    { year: "2023", event: "Completed Major Study" },
];

const Timeline = () => {
    return (
        <div className="flex overflow-x-auto p-4" style={{ whiteSpace: "nowrap" }}>
            {timelineData.map((item, index) => (
                <motion.div
                    key={index}
                    className="inline-block flex flex-col items-center mx-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
                        {item.year}
                    </div>
                    <div className="w-1 h-16 bg-gray-400 my-2"></div>
                    <div className="text-center text-sm text-gray-700 max-w-xs">
                        {item.event}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;
