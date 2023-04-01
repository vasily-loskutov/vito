'use client'
import { IFavoriteItem, IGood } from '@models';
import { FC } from 'react';
import { Card, message, Button, Rate, Typography } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import styles from "./good.module.scss"

import Link from 'next/link';
import { CarouselGood } from '@shared';
import { useActions, useAppSelector } from '@hooks';


type PropsTypes = {
  good: IGood,

}
const Good: FC<PropsTypes> = ({ good }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { Text, Title } = Typography
  const { addToCart, addToFavorite } = useActions()
  const { favoriteItems } = useAppSelector(state => state.favorite)
  console.log(good)
  const addToFav = () => {
    const favItem = {
      name: good.name,
      price: good.price,
      photo: good.photo,
      linkToGood: good.id,
    }
    addToFavorite(favItem)
  }
  const handleClick = () => {
    messageApi.success("Товар добавлен в коризну!")
    const cartItem = {
      name: good.name,
      price: good.price,
      photo: good.photo,
      linkToGoodPage: good.id,
      count: good.count
    }

    addToCart(cartItem)

  }
  return (
    <>
    
      {contextHolder}
      <Card
        hoverable

        className={styles.good}
        cover={<CarouselGood data={good.photo} size={{ width: 160, height: 160 }} />}

      >
        <div className={styles.goodContainer}>
          <Text >{good.name}</Text>
          <Rate disabled allowHalf defaultValue={good.rate} className="text-sm" />
        </div>

        <Title level={4}>{good.price} ₽</Title>
        <div className={styles.goodInfo}>

          <HeartOutlined className={`text-2xl basicHover ` + (favoriteItems.map((favItem: IFavoriteItem) => favItem.name === good.name && " text-red-500 hover:text-red-600"))} onClick={addToFav} />
          <ShoppingCartOutlined className={styles.goodIco} onClick={handleClick} />
          <Link href={`/${good.id}`}><Button>Перейти</Button></Link>
        </div>
      </Card>

    </>
  );
}


export default Good;
