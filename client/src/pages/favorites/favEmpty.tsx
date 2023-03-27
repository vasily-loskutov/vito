import { FC } from 'react'
import Link from 'next/link';

import { Button, Typography } from 'antd';
const FavEmpty: FC = () => {
    const { Title, Text } = Typography
    return (<div className="flex flex-col items-center">
        <Title className="mb-6 text-5xl" level={1}>В избранном пусто!</Title>
        <Text className="w-[300px] text-center mb-5" >Загляните на главную, может вам что-то приглянётся</Text>
        <Link href="/"><Button >Перейти на главную</Button></Link>
    </div>)
}
export default FavEmpty
