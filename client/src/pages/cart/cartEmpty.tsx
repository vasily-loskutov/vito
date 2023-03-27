import Link from 'next/link';

import { Button,Typography } from 'antd';
const CartEmpty = ()=>{
    const {Title,Text}= Typography     

                
    return (
        <div className="flex flex-col items-center">
           <Title className="mb-6 text-5xl" level={1}>Корзина пуста</Title>
            <Text className="w-[300px] text-center mb-5" >Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</Text>
            <Link href="/"><Button >Перейти на главную</Button></Link>
        </div>
    )
}

export default CartEmpty
