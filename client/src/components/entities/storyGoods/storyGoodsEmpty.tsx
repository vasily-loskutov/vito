import { FC } from 'react'
import { Typography } from 'antd'
const StoryGoodsEmpty:FC = ()=>{
    const {Title,Text} = Typography
    return (
        <div className='flex flex-col items-center justify-center '>
           <Title>Здесь пока что ни чего нет!</Title>
           <Text className="text-xl">Тут будут отображаться купленные вами товары</Text>
        </div>
    )
}
export default StoryGoodsEmpty
