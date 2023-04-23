
import { HeaderWrapper } from '@shared'
import { wrapper, goodsApi, useRefreshQuery } from '@redux'
import { IGood } from '@models'
import { Good } from '@entities'
import { useEffect, useState } from 'react'
import { useActions } from '@hooks'
import { Typography, Pagination } from "antd"
import type { PaginationProps } from 'antd';
import * as _ from "lodash"
import { pagination } from "@utils"

type PropsTypes = {
  data: IGood[]

}
export default function Home({ data }: PropsTypes) {

  const { data: refreshData, isLoading } = useRefreshQuery(null)

  const { Title } = Typography
  const { checkAuth } = useActions()
  const popularGoods = _.orderBy(data, ['rate'], ['desc'])
  console.log(data)
  useEffect(() => {

    if (isLoading && refreshData) {
      checkAuth(refreshData)
    }
  }, [])

  return (
    <>
      <HeaderWrapper >
        <div className='flex flex-col justify-center items-center'>
          <Title className='text-center' level={1}>Популярные товары</Title>

          <div className='mt-5 grid grid-cols-1  row-auto gap-y-4 gap-x-7  lg:grid-cols-3 sm:grid-cols-2'>

            {popularGoods.slice(0, 8).map(good => <Good good={good} key={good.id} />)}
          </div>



        </div>


      </HeaderWrapper>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const { data } = await store.dispatch(goodsApi.endpoints.getGoods.initiate(null))

  return { props: { data } }
})

