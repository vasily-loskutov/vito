

import { HeaderWrapper } from '@shared'
import { wrapper, goodsApi } from '@redux'
import { IGood } from '@models'
import { Good, Filter } from '@entities'
import { Typography } from 'antd'
import { useState, useEffect } from "react"
import * as _ from "lodash"


type PropsTypes = {
    data: IGood[]

}
export default function FindGoods({ data }: PropsTypes) {
    const [goods, setGoods] = useState(data)
    useEffect(() => {
        setGoods(data)
    }, [data])

    const { Title } = Typography
    return (
        <>


            <HeaderWrapper title="Результаты поиска">
                <div className='flex flex-col gap-y-4'>
                    <Title>Результаты поиска</Title>

                    {data.length > 0 ? (
                        <>
                            <div className="flex gap-x-6">
                                <div >
                                    <Filter goods={data} setState={setGoods} />
                                </div>
                                <div className="flex  gap-4 ">
                                    {goods.map((good) => (<Good good={good} key={good.id} />))}
                                </div>
                            </div>
                        </>) : (<Title className="text-center">Ни чего не найдено :(</Title>)}


                </div>


            </HeaderWrapper>
        </>
    )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

    const { data } = await store.dispatch(goodsApi.endpoints.search.initiate(context.params.message))

    return { props: { data } }
})

