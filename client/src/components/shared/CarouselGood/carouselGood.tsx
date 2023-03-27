import  React from 'react';
import {Carousel,Image} from "antd"

interface PropsTypes{
    data:string[],
    size:{
        width:number,
        height:number
    },
  
}
const CarouselGood:React.FC<PropsTypes> = ({data,size}) => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };
    return <Carousel afterChange={onChange} style={size}>
    {data.map((photo=><Image src={photo} width={size.width} height={size.height} className="bg-cover bg-center"/>))}
  </Carousel>;
}
 
export default CarouselGood;
