import React from "react";
import PaperBlock from "../../widget/paperBlock";


const Publication = () => {


    return (
        <div style={{
            marginTop: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <p style={{
                fontFamily: "inherit", // 继承父级字体
                fontStyle: "inherit",   // 正常字体样式（或 italic/oblique）
                fontWeight: "800",
                fontSize: "5rem",   // 字体大小设为 20rem
            }}>
                Publication List
            </p>
            <PaperBlock/>
        </div>
    )
}

export default Publication;