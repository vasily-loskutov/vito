


import { RightOutlined } from "@ant-design/icons"
import { FC, MouseEventHandler,HTMLAttributes } from "react";

type PropTypes = {
    style?:HTMLAttributes<HTMLDivElement>,
    className?:string
    onClick?:MouseEventHandler<HTMLSpanElement>
}
const NextArrow:FC<PropTypes> = ({ style, className, onClick }) => {
    return (<RightOutlined shape="circle" style={style} className={className + "z-50 text-2xl absolute right-[-20px] bottom-[150px]"} onClick={onClick} />);
}

export default NextArrow;
