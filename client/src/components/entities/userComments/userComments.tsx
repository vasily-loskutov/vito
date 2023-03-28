

import { useAppSelector } from '@hooks'
import { useGetUserReviewQuery } from '@redux'

import { FC } from 'react'
import Review from '../review/review'
import UserCommentsEmpty from './userCommentsEmpty'




const  UserCommentList:FC = () => {
       const {user} = useAppSelector(state=>state.user)
     const {data,isLoading} = useGetUserReviewQuery(user.id)
        console.log(data)
    return ( 
    <div className="overflow-scroll overflow-x-hidden  h-[450px] w-full flex flex-col gap-y-2">
        {!isLoading ? data.length !== 0 ? data.map((review)=><Review data={review} isEditReview={true} key={review.id} position="horizontal" />) : <UserCommentsEmpty/> : "Loading"}
    </div>
    

   );
}
 
export default UserCommentList;
