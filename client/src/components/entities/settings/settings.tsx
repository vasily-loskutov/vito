
import { FC, useState } from 'react'
import { useActions, useAppSelector } from "@hooks"
import { Button, Form, Input, message, Modal, Typography, Tooltip } from 'antd';
import { ExclamationCircleOutlined, CheckCircleFilled } from "@ant-design/icons"
import { useUserUpdateMutation, useLogOutMutation, useDeleteUserMutation } from "@redux"
import { useRouter } from "next/router"
import { IUserInfo } from '@models';
const Setting: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const { Title } = Typography
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAppSelector(state => state.user)
  const router = useRouter()
  const { updateUser: updateUserActions, logOut } = useActions()
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
  const [logOutMutation] = useLogOutMutation();
  const [deleteUserMutation] = useDeleteUserMutation();
  const deleteAccount = async () => {
    setIsModalOpen(false);
    await logOutMutation(null);
    await deleteUserMutation(+user.id)

    logOut()
    router.push("/")
  }
  const emailNotСonfirmed = <span>ваша почта не подтверждена</span>;
  const emailСonfirmed = <span>ваша почта подтверждена</span>;
  return (
    <>
      {contextHolder}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]} >
        <div className="flex flex-col justify-center items-center gap-y-6">
          <Title level={3}>Вы точно хотите удалить свой профиль?</Title>
          <div className="flex gap-x-4">
            <Button danger size="large" onClick={deleteAccount}>Да</Button>
            <Button size="large" onClick={handleCancel}>Отмена</Button>
          </div>
        </div>
      </Modal>
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
          <Input status={!user.isActivated ? "warning" : ""} className={user.isActivated && "borderGreen"}
            prefix={!user.isActivated ?
              <Tooltip placement="topRight" title={emailNotСonfirmed} className="flex items-left">
                <ExclamationCircleOutlined className="text-orange-400 " />
              </Tooltip> :
              <Tooltip placement="topRight" title={emailСonfirmed} className="flex items-left">
                <CheckCircleFilled className="text-green-500 " />
              </Tooltip>
            } />
        </Form.Item>

        <Form.Item>
          <div className="flex gap-x-5">
            <Button htmlType="submit"  >
              Сохранить
            </Button>
            <Button danger onClick={showModal}>Удалить профиль</Button>
          </div>

        </Form.Item>
      </Form>

    </>
  )
}


export default Setting
