
import { FC } from 'react'
import { useActions, useAppSelector } from "@hooks"
import { Button, Form, Input, message } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useUserUpdateMutation } from "@redux"
import { IUserInfo } from '@models';
const Setting: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector(state => state.user)

  const { updateUser: updateUserActions } = useActions()
  const [updateUser] = useUserUpdateMutation()
  const onFinish = async (values: IUserInfo) => {
    const payload = { ...values, id: user.id }
    await updateUser(payload)
    updateUserActions({ ...payload, isActivated: user.isActivated })
    messageApi.success('Изменения успешно сохранены');
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    messageApi.error('Ошибка');
  };
  return (
    <>
      {contextHolder}

      <Form
        name="basic"
        className="ml-6"
        initialValues={{
          name: user.name,
          email: user.email,

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}

      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input status={!user.isAuctivated ? "warning" : ""} prefix={!user.isAuctivated && <ExclamationCircleOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}


export default Setting
