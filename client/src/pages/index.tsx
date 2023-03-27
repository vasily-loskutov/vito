
import { HeaderWrapper } from '@shared'
import { wrapper,goodsApi,useRefreshQuery,authApi,useGetUsersQuery  } from '@redux'
import { IGood } from '@models'
import { Good } from '@entities'
import { useEffect } from 'react'
import { useActions } from '@/hooks'
import {Typography} from "antd"



type PropsTypes = {
  data: IGood[]

}
export default function Home({data}:PropsTypes) {
  
     const {data:refreshData,isLoading} = useRefreshQuery()
    
    const { Title} = Typography
    const {checkAuth} =  useActions()
   
         
  useEffect(()=>{
      if(isLoading && refreshData){
        checkAuth(refreshData)
      }
  },[])
  return (
    <HeaderWrapper>
      <div  className='flex flex-col'>
      <Title className='text-center'  level={1}>Популярные товары</Title>
        <div className='mt-5 flex gap-4'>

          {data.map(good=><Good good={good} key={good.id}/>)}
        </div>
      </div>
      
        
    </HeaderWrapper>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=>async (context)=>{
        const {data} = await store.dispatch(goodsApi.endpoints.getGoods.initiate())
    
        return {props:{data}}
})

