import { FC } from 'react'
import { Typography } from 'antd'
const UserCommentsEmpty:FC = ()=>{
    const {Title,Text} = Typography
    return (
        <div className='flex flex-col items-center justify-center '>
           <Title>Здесь пока что ни чего нет!</Title>
           <Text className="text-xl">Тут будут отображаться отзывы на купленные вами товары</Text>
        </div>
    )
}
export default UserCommentsEmpty
