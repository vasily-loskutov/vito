import { CarouselGood } from '@shared';
import { IFavoriteItem } from '@models';
import Link from "next/link"
import { FC } from 'react';
import { Button, Typography } from 'antd';
import { useActions, useAppSelector } from "@hooks"
import styles from "./favItem.module.scss"
type PropTypes = {
    data: IFavoriteItem
}
const FavoriteItem: FC<PropTypes> = ({ data }) => {
    const { removeFavItem, addToCart, removeCartItem } = useActions()
    const { cartItems } = useAppSelector(state => state.cart)
    const handleDelete = (name: string) => {
        removeFavItem(name)
    }
    const { Title } = Typography
    const handleClick = () => {
        const cartItem = {
            name: data.name,
            price: data.price,
            photo: data.photo,
            linkToGoodPage: data.linkToGood,
            count: 1
        }
        addToCart(cartItem)
    }
    const deleteInCart = (name: string) => {
        removeCartItem(name)
    }

    return (
        <div className={styles.favItemContainer}>
            <CarouselGood data={data.photo} size={{ width: 160, height: 160 }} />
            <div>
                <Link href={`/${data.linkToGood}`}><Title level={3} className="max-w-[400px]">{data.name}</Title></Link>
                <Button danger type="dashed" onClick={() => handleDelete(data.name)}>Удалить из избранного</Button>
            </div>
            <div>
                <Title level={4}>{data.price} ₽</Title>
                {cartItems.findIndex((f) => f.name === data.name) === -1 ? (<Button onClick={handleClick}>В корзину</Button>)
                    : <Button onClick={() => deleteInCart(data.name)}>В корзинe</Button>}
            </div>
        </div>);
}

export default FavoriteItem;
