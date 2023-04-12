
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

  useEffect(() => {

    if (isLoading && refreshData) {
      checkAuth(refreshData)
    }
  }, [])

  return (
    <>
      <HeaderWrapper >
        <div className='flex flex-col justify-center'>
          <Title className='text-center' level={1}>Популярные товары</Title>

          <div className='mt-5 flex gap-8 flex-wrap'>

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

