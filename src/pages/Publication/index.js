import React from "react";
import PaperBlock from "../../widget/paperBlock";
import {useLanguage} from "../../utils/Provider/languageProvider";


const Publication = () => {
    const { isEnglish } = useLanguage();

    return (
        <div style={{
            marginTop: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <h1 style={{
                fontFamily: "inherit", // 继承父级字体
                fontStyle: "inherit",   // 正常字体样式（或 italic/oblique）
                fontWeight: "800",
                fontSize: "40px",
            }}>
                {isEnglish ? "Publications" : "论文发表"}
            </h1>
            <PaperBlock/>
        </div>
    )
}

export default Publication;