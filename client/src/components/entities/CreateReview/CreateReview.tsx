import { useAppSelector } from "@hooks";
import { useCreateReviewMutation } from "@redux";
import { IReview } from "@models";
import { Form,Card,Button,Input, Typography,Rate  } from "antd";
import {useSearchParams} from "next/navigation"
const CreateReview = () => {
    const searchParams = useSearchParams()
    
    const {user} = useAppSelector(state=>state.user)
     const [createReviewMutation] = useCreateReviewMutation()
    const onFinish = async(values: any) => {
     
              const review:IReview = {
                comment:values.comment,
                minus:values.minus,
                plus:values.plus, 
                userId:+user.id,
                goodId:+searchParams.get("id"),
                date: Date.now(),
                name:user.name,
                rate:values.rate
              }
              console.log(review)
          createReviewMutation(review)
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const { TextArea } = Input;
        const {Title}  = Typography
    return (  
        <Card className="bg-[#fcfcfcf1]">
            <Title level={2}>Написать комментарий</Title>
              <Form
                      name="basic"
                     autoComplete="off"
                     initialValues={{rate:2.5}}
                     className="w-[600px]"

                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}>
                    <Form.Item
                               label="Плюсы"
                               name="plus"
                               rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
                             >
                               <TextArea />
                    </Form.Item>
                    <Form.Item
                               label="Ваша оценка"
                               name="rate"
                               rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
                             >
                               <Rate allowHalf  />
                    </Form.Item>
                    <Form.Item
                               label="Минусы"
                               name="minus"
                               rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
                             >
                               <TextArea />
                    </Form.Item>
                    <Form.Item
                               label="Отзыв"
                               name="comment"
                               rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
                             >
                               <TextArea />
                    </Form.Item>
                         
    <Form.Item >
      <Button size="large" htmlType="submit">
        Создать 
      </Button>
    </Form.Item>
  </Form>
        </Card>
    );
}
 
export default CreateReview;
