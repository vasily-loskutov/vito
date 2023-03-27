
import { FC, MouseEventHandler,HTMLAttributes } from "react";
import { LeftOutlined } from "@ant-design/icons"
type PropTypes = {
    style?:HTMLAttributes<HTMLDivElement>,
    className?:string
    onClick?:MouseEventHandler<HTMLSpanElement>
}
const PrevArrow:FC<PropTypes> = ({ style, className, onClick }) => {
    return (<LeftOutlined shape="circle" style={style} onClick={onClick} className={className + "z-50 text-2xl absolute left-[-10px] top-[150px]"} />);
}

export default PrevArrow;
