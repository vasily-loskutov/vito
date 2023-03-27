import { IReview } from "@models";
import { Card, Typography, Button, Rate, Form, Input } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import { FC, useState } from "react"
import { displayDate } from "@utils";
import { useAppSelector } from "@hooks";
import { useDeleteReviewMutation, useUpdateReviewMutation } from "@redux"
type PropTypes = {
  data: IReview,
  isEditReview: boolean,
  position?: "horizontal" | "vertical"
}
const Review: FC<PropTypes> = ({ data, isEditReview, position }) => {
  const { TextArea } = Input;
  const { Text } = Typography;
  const [isChangeEdit, setChangeEdit] = useState(false)
  const { user } = useAppSelector(state => state.user)
  const [removeReview] = useDeleteReviewMutation()
  const [updateReview] = useUpdateReviewMutation()
  const handleDelete = async (id) => {
    await removeReview(id)
  }
  const handleEdit = () => {
    setChangeEdit((prev) => !prev)
  }
  const onFinish = async (values: any) => {
    const review: IReview = {
      comment: values.comment,
      minus: values.minus,
      plus: values.plus,
      userId: user.id,
      goodId: data.goodId,
      date: Date.now(),
      name: user.name,
      rate: values.rate
    }
    await updateReview(review)
    console.log(review)
    setChangeEdit((prev) => !prev)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (<Card className={" bg-[#F1F1F1F1]  ml-3 " + (position === "horizontal" ? " w-full" : " max-w-[600px]")} >
    <Form
      name="basic"

      onFinish={onFinish}
      initialValues={
        {
          plus: data.plus,
          comment: data.comment,
          minus: data.minus,
          rate: data.rate
        }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="flex flex-col justify-around">
        <div className="flex justify-between ">
          <div className="flex gap-x-3 items-center">
            <Text>{data.name}</Text>

            <Text>{displayDate(data.date)}</Text>

          </div>
          {data.userId === user.id && <CloseOutlined className="text-red-400 text-xl" onClick={() => handleDelete(data.id)} />}

        </div>

        {isChangeEdit ? (<Form.Item name="rate"  >
          <Rate allowHalf className="text-[20px] mt-1" />
        </Form.Item>)
          :
          (<Rate allowHalf disabled defaultValue={data.rate} className="text-[20px] mt-1" />)
        }

        <div className="p-2">

          <div className="flex flex-col ">

            <Text type="success" className="text-lg" strong>Плюсы</Text>
            {isChangeEdit ? (<Form.Item name="plus"  >
              <TextArea />
            </Form.Item>)
              :
              (<Text className="ml-2 max-w-md">{data.plus}</Text>)
            }

          </div>
          <div className="flex flex-col  pt-2">
            <Text type="danger" className="text-lg" strong>Минусы</Text>
            {isChangeEdit ? (<Form.Item name="minus"  >
              <TextArea />
            </Form.Item>)
              :
              (<Text className="ml-2 max-w-md">{data.minus}</Text>)
            }

          </div>
          <div className="flex flex-col  pt-2">
            <Text className="text-lg" strong>комментарий</Text>
            {isChangeEdit ? (<Form.Item name="comment"  >
              <TextArea />
            </Form.Item>)
              :
              (<Text className="ml-2 max-w-md">{data.comment}</Text>)
            }

          </div>


        </div>

      </div>

      {isChangeEdit && (<Form.Item >
        <Button htmlType="submit" size="large" className="w-full">
          Сохранить
        </Button>
      </Form.Item>)}
      {isEditReview && (<Button size="large" className=" mt-3 w-full" onClick={handleEdit}>{isChangeEdit ? 'Отмена' : 'Изменить'}</Button>)}
    </Form>
  </Card>);
}

export default Review;
