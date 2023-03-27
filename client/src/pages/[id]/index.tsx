import { IGood, IReview } from '@models';
import { FC } from 'react';

import { HeaderWrapper, CarouselGood, NextArrow, PrevArrow } from '@shared'
import { wrapper, goodsApi, reviewApi, useGetUserReviewQuery } from '@redux'
import { Rate, Button, Typography, Carousel } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CreateReview, Review } from '@entities';
import { useAppSelector } from '@hooks';
type PropTypes = {
  data: IGood,
  reviews: IReview[]
}

const FullGoodPage: FC<PropTypes> = ({ data, reviews }) => {
  const { back } = useRouter()
  const { Title, Text } = Typography
  const goBack = () => {
    back()
  }

  const { isAuth, user } = useAppSelector(state => state.user)
  const { data: userReview, isLoading } = useGetUserReviewQuery(user.id)

  const arrayData = isAuth ? !isLoading ? userReview : [] : []

  const isВought = arrayData.findIndex((item) => item.goodId === data.id);


  return (<HeaderWrapper>
    <div className="mt-10 border border-slate-200 flex items-center">
      <div className="flex gap-x-7 p-10">
        <CarouselGood data={data.photo} size={{ width: 250, height: 250 }} />
        <div className="flex flex-col">
          <Rate disabled allowHalf defaultValue={data.rate} className="text-3xl mb-4" />
          <Title className='mb-1' level={3}>{data.name}</Title>
          <Text className="text-xl">{data.price} ₽</Text>
          <Text className="text-lg font-bold">Описание :</Text>
          <Text>{data.description}</Text>
          <div className="mt-4 flex gap-x-4">
            <Button >добавить в корзину</Button>
            <Button onClick={goBack}>Назад</Button>
          </div>
        </div>
      </div>

    </div>
    <div>

      <Title>Комментарии:</Title>
      {isAuth && isВought === -1 && < CreateReview />}
      <div className='relative'>

        <Carousel
          className='flex gap-x-6 mt-2 max-w-[1700px] ' dots={false} infinite={false}
          slidesToShow={3} slidesToScroll={2}

          arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
          {reviews.slice(0, 6).map((review) => (<Review data={review} isEditReview={false} key={review.id} />))}
        </Carousel>
        {reviews.length >= 5 && (<Link href={`/${data.id}/reviews`}><Button className="w-full mt-5 pb-20" size="large" >Смотреть все комментарии </Button></Link>)}

      </div>
    </div>
  </HeaderWrapper >);
}

export default FullGoodPage;
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { data } = await store.dispatch(goodsApi.endpoints.getGood.initiate(context.params.id[0]))
  console.log(context.params.id[0])
  const { data: reviews } = await store.dispatch(reviewApi.endpoints.getReview.initiate(context.params.id[0]))
  console.log(reviews)
  return { props: { data, reviews } }
})
