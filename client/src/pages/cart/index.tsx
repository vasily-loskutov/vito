import { HeaderWrapper } from '@shared';
import { FC, useState } from 'react';

import { ICartItem, IStoryGoodItem } from '@models';

import { useActions, useAppSelector } from '@hooks';
import { CartItem } from '@entities';
import { Button, Modal, Typography, message } from 'antd';
import styles from "./cart.module.scss"
import CartEmpty from "./cartEmpty"
import { useSaveStoryGoodsMutation } from "@redux"
const Cart: FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { cartItems, totalPrice } = useAppSelector(state => state.cart)
    const { user } = useAppSelector(state => state.user)
    const { isAuth } = useAppSelector(state => state.user)
    const { removeCart } = useActions()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { Title, Paragraph } = Typography;
    console.log(cartItems)

    const handleCancel = () => {

        setIsModalOpen(false);
    };
    const [saveStoryGoodMutation] = useSaveStoryGoodsMutation()
    const onBuy = async () => {
        if (isAuth) {
            setIsModalOpen(true);
            cartItems.forEach(async (cartItem: ICartItem) => {
                const cartItemDto: IStoryGoodItem = {
                    name: cartItem.name,
                    userId: user.id,
                    price: cartItem.price,
                    photo: cartItem.photo,
                    linkToGoodPage: cartItem.linkToGoodPage,
                    isFeedback: false,
                    count: cartItem.count
                }

                await saveStoryGoodMutation(cartItemDto)
            })

            removeCart()
        } else {
            messageApi.error('Вы не авторизованны, что бы оформить покупку авторизуйтесь!');
        }


    }
    return (<HeaderWrapper title='Корзина'>
        {contextHolder}
        <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
            <div className="flex flex-col items-center">
                <Title level={1}>Спасибо за покупку!</Title>
                <Paragraph className="text-xl">На забудьте оставить отзыв!</Paragraph>

            </div>
        </Modal>
        {cartItems.length > 0 ?
            (<div className={styles.cartContainer}>
                <Title level={1}>Корзина</Title>
                <div className={styles.cartItemsContainer}>
                    {cartItems.map((cartItem: ICartItem, idx: number) => <CartItem data={cartItem} key={idx} />)}
                </div>
                <div className={styles.cartCheckContainer}>
                    <h1 className="text-2xl">Итого: {totalPrice} ₽</h1>
                    <Button size="large" className="mr-5 mt-3" onClick={onBuy}>Оформить заказ</Button>
                </div>
            </div>) : <CartEmpty />
        }


    </HeaderWrapper>);
}

export default Cart;

