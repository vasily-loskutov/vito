

import { HeaderWrapper } from '@shared'
import { wrapper, goodsApi } from '@redux'
import { IGood } from '@models'
import { Good } from '@entities'
import { Divider } from 'antd'

import { Typography } from "antd"



type PropsTypes = {
    data: IGood[]

}
export default function FindGoods({ data }: PropsTypes) {

    const { Title } = Typography
    console.log(data)
    return (
        <HeaderWrapper>
            <div className='flex flex-col'>
                <Title>Результаты поиска</Title>
                
                    {data.length > 0 ? (
                        <>
                        <div className="flex  ">
                        <div >
                            <h1>ФИЛЬТР</h1>
                            <Divider type="vertical"></Divider>
                        </div>
                            <div className="flex flex-col gap-y-4">
                                {data.map((good) => (<Good good={good} key={good.id} />))}
                            </div>
                            </div></>) : (<Title className="text-center">Ни чего не найдено :(</Title>)}

               
            </div>


        </HeaderWrapper>
    )
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

    const { data } = await store.dispatch(goodsApi.endpoints.search.initiate(context.params.message))

    return { props: { data } }
})

