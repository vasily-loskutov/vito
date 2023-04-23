import { ICartItem, IGood, IReview } from '@models';
import { FC, useEffect } from 'react';
import NotFoundPage from "../404"
import { HeaderWrapper, CarouselGood, NextArrow, PrevArrow } from '@shared'
import { wrapper, goodsApi, reviewApi, useGetUserReviewQuery, useGetStoryGoodsQuery } from '@redux'
import { Rate, Button, Typography, Carousel, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CreateReview, Review } from '@entities';
import { useActions, useAppSelector } from '@hooks';
type PropTypes = {
  data: IGood,
  reviews: IReview[],
  status: number
}

const FullGoodPage: FC<PropTypes> = ({ status, data, reviews }) => {

  const router = useRouter()
  if (status == 404) {
    return <NotFoundPage />
  }


  const { Title, Text } = Typography
  const goBack = () => {
    router.back()
  }
  const [messageApi, contextHolder] = message.useMessage();
  const { addToCart } = useActions()
  const handleClick = () => {
    const cartItem: ICartItem = {
      linkToGoodPage: data.id,
      name: data.name,
      photo: data.photo,
      count: data.count,
      price: data.price
    }
    addToCart(cartItem)
    messageApi.success("Товар добавлен в коризну!")
  }

  const { isAuth, user } = useAppSelector(state => state.user)

  const { data: userReview, isLoading } = useGetUserReviewQuery(user.id)
  const arrayData = isAuth ? !isLoading ? userReview : [] : []

  const { data: storyGoodUser, isLoading: storyGoodLoading } = useGetStoryGoodsQuery(user.id)

  const isВought = arrayData.findIndex((item) => item.goodId === data.id);
  const isPurchasedGoods = isAuth ? !storyGoodLoading ? storyGoodUser.findIndex((item) => item.linkToGoodPage === data.id) : -1 : -1

  return (
    <>
      <HeaderWrapper title={data.name}>
        {contextHolder}
        <div className="mt-10 border border-slate-200 flex items-center justify-center md:justify-start ">
          <div className="flex gap-x-7 p-10 flex-col md:flex-row">
            <CarouselGood data={data.photo} size={{ width: 250, height: 250 }} />
            <div className="flex flex-col">
              <Rate disabled allowHalf defaultValue={data.rate} className="text-3xl mb-4" />
              <Title className='mb-1' level={3}>{data.name}</Title>
              <Text className="text-xl">{data.price} ₽</Text>
              <Text className="text-lg font-bold">Описание :</Text>
              <Text>{data.description}</Text>
              <div className="mt-4 flex gap-x-4">
                <Button onClick={handleClick}>добавить в корзину</Button>
                <Button onClick={goBack}>Назад</Button>
              </div>
            </div>
          </div>

        </div>
        <div>

          <Title>Комментарии:</Title>
          {isAuth && isВought === -1 && isPurchasedGoods !== -1 && < CreateReview />}
          {reviews.length >= 1 ?
          <>
            <div className='relative hidden md:inline mt-2'>

              <Carousel
                className='flex gap-x-6  max-w-[1700px]' dots={false} infinite={false}
                slidesToShow={3} slidesToScroll={2}

                arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
                {reviews.slice(0, 6).map((review) => (<Review data={review} isEditReview={false} key={review.id} />))
                }
              </Carousel>
             
            </div>
            <div className="flex flex-col gap-y-5 md:hidden mt-2">
            {reviews.slice(0, 6).map((review) => (<Review data={review} isEditReview={false} key={review.id} />))
                }
            </div>
            {reviews.length >= 5 && (<Link href={`/${data.id}/reviews`}><Button className="w-full mt-5 pb-20" size="large" >Смотреть все комментарии </Button></Link>)}
              </>
            : <Title>Комментариев под данным товаром пока что нет!</Title>}
        </div>
      </HeaderWrapper >
    </>);
}

export default FullGoodPage;
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

  const { data, error } = await store.dispatch(goodsApi.endpoints.getGood.initiate(context.params.id))

  const { data: reviews } = await store.dispatch(reviewApi.endpoints.getReview.initiate(context.params.id))
  console.log(error)

  if (error?.status === 404) {
    const { status, data } = error;

    return { props: { status, data, reviews } }
  }
  return { props: { status: 200, data, reviews } }
})
