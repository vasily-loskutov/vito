

import { HeaderWrapper } from '@shared'
import { wrapper, goodsApi } from '@redux'
import { IGood } from '@models'
import { Good, Filter } from '@entities'
import { Typography, Pagination } from 'antd'
import type { PaginationProps } from 'antd';
import { useState, useEffect } from "react"
import * as _ from "lodash"
import { pagination } from "@utils"

type PropsTypes = {
    data: IGood[]

}
export default function FindGoods({ data }: PropsTypes) {

    const [goods, setGoods] = useState(data)
    useEffect(() => {
        setGoods(data)
    }, [data])

    const [current, setCurrent] = useState(1);
    const [dataCrop, setDataCrop] = useState(goods)
    useEffect(() => {
        setDataCrop(pagination(6, current, goods))
    }, [current, goods])
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    const { Title } = Typography
    return (

        <HeaderWrapper title="Результаты поиска">
            <div className='flex flex-col gap-y-4'>
                <Title>Результаты поиска</Title>

                {data.length > 0 ? (
                    <>
                        <div className="flex gap-x-6 flex-col items-center gap-y-5 lg:flex-row lg:items-start">
                            <div >
                                <Filter goods={data} setState={setGoods} />
                            </div>
                            <div className="flex flex-col">
                                <div className="grid grid-cols-1  row-auto gap-y-4 gap-x-7  lg:grid-cols-3 sm:grid-cols-2">
                                    {dataCrop.map((good) => (<Good good={good} key={good.id} />))}
                                </div>

                                {goods.length > 6 && (<Pagination defaultCurrent={1} pageSize={6} total={goods.length} onChange={onChange} className="mt-4" />)}
                            </div>
                        </div>
                    </>) : (<Title className="text-center">Ни чего не найдено :(</Title>)}


            </div>


        </HeaderWrapper>

    )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

    const { data } = await store.dispatch(goodsApi.endpoints.searchByCategory.initiate({
        categories: [context.query.categories],
        subcategories: [context.query.subcategories]
    }))


    return { props: { data } }
})

