
import { FC } from 'react'
import { HeaderWrapper } from "@shared"
import { useSearchParams } from 'next/navigation'
import { useGetGoodQuery, useGetReviewQuery } from "@redux"
import { Image, Typography, Divider } from 'antd'
import Link from "next/link"
import { Review } from "@entities"
const Reviews: FC = () => {
  const searchParams = useSearchParams()
  const { data, isLoading } = useGetGoodQuery(searchParams.get("id"))
  const { data: reviews, isLoading: reviewLoading } = useGetReviewQuery(searchParams.get("id"))
  const { Title, Text } = Typography
  console.log(reviews)
  return (

    <HeaderWrapper>
      <>
        {!isLoading ?
          <div className="mt-4 flex items-center justify-between ">
            <div className=" flex items-center gap-x-3">
              <Image src={data?.photo[0]} width={100} height={100} />
              <Link href={`/${data?.id}`}><Title level={2} className="basicHover">{data?.name}</Title></Link>
            </div>
            <Title level={4}>{data?.price} ₽</Title>

          </div>
          : "Loading"}
        <Divider></Divider>
        {!reviewLoading ? (
          <>
            <div className="flex gap-x-2">
              <Title level={2}>Отзывы</Title>
              <Text className="text-xl mt-5" type="secondary" strong>{reviews?.length}</Text>
            </div>
            <div className="flex flex-col mt-6 items-center gap-y-4 ">
              {reviews?.map(review => <Review data={review} key={review.id} position="horizontal" />)}
            </div>
          </>
        )

          : "Loading"}
      </>
    </HeaderWrapper>
  )
}

export default Reviews
