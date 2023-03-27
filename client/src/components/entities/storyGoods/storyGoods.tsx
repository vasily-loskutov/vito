
import { useGetStoryGoodsQuery} from '@redux'

import { FC } from 'react'
import { useAppSelector } from '@hooks'
import StoryGoodItem from './storyGood'
import StoryGoodsEmpty from './storyGoodsEmpty'



const StoryGoodsList:FC = () => {
          const {user} =   useAppSelector(state=>state.user)
            const {data,isLoading}= useGetStoryGoodsQuery(user.id)
           
            const arrayData = !isLoading ? [...data] : []
           
    return ( 
    <div className="overflow-scroll overflow-x-hidden  h-[450px] w-full">

          {isLoading? "loading" : 
          arrayData.length > 0 ? arrayData?.reverse()?.map(item=>(<StoryGoodItem item={item} key={item.id}/>))
           : <StoryGoodsEmpty/>}
    </div>
    

   );
}
 
export default StoryGoodsList;
