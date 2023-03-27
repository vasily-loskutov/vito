import {FC} from 'react'
import { Button, Form, Input } from 'antd';
import styles from "./auth.module.scss"
import { useRegisterMutation } from '@redux';
import { IRegisterPayload } from '@models';
import {useActions} from "@hooks"
type PropTypes ={
    toLogIn:()=>void
  }
const Register:FC<PropTypes> = ({toLogIn}) => {
     const [register,{isLoading,error,isError}] = useRegisterMutation()
  
      const {registration} =  useActions()
    const onFinish = async(values: IRegisterPayload) => {
      console.log(values)
      try {
        const res =  await register(values)
        console.log(res)
        registration(res.data)
      } catch (error) {
            console.log(error)
      }
   
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
   
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
 
  >
        <Form.Item
      label="Вашe имя "
      name="name"
      rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
    >
      <Input />
     
    </Form.Item>
    <Form.Item
      label="Почта "
      name="email"
      rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
    >
      <Input />
    </Form.Item>
     { isError &&  <p className={styles.errorMessage}> {error.message}</p>} 
    <Form.Item
      label="Пароль"
      name="password"
      rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button  htmlType="submit">
        Зарегистрироваться
      </Button>
    </Form.Item>
    <p>У вас есть аккаунт? <a onClick={toLogIn} className={styles.linkStyles}>Войти</a></p>
  </Form>
     );
}
 
export default Register;
