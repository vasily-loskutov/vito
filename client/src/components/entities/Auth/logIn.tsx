import {FC} from 'react'
import { Button, Form, Input } from 'antd';
import styles from "./auth.module.scss"
import { useLogInMutation } from '@redux';
import { useActions } from '@hooks';
type PropTypes ={
  toRegister:()=>void
}
const LogIn:FC<PropTypes> = ({toRegister}) => {
       const [logIn,{isError,error}] = useLogInMutation()
         const {logIn:logInAction} =   useActions()
       console.log(error)
    const onFinish = async (values: any) => {
      console.log(values)
      try {
        const res = await logIn(values)
        console.log(res);
        logInAction(res.data)
      } catch (error) {
        
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
      label="Почта"
      name="email"
      rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
    >
      <Input />
    </Form.Item>
      {isError && error.message === "Пользователь с таким email не был найден" && <p className={styles.errorMessage}>{error.message}</p>}

    <Form.Item
      label="Пароль"
      name="password"
      rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
    >
      <Input.Password />
     
    </Form.Item>
      {isError && error.message === "Пароль неверный" && <p className={styles.errorMessage}>{error.message}</p>}


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button  htmlType="submit" className='w-full' >
        Войти
      </Button>
    </Form.Item>
    <p>У вас нет аккаунта? <a onClick={toRegister} className={styles.linkStyles}>Зарегистрироваться</a></p>
  </Form>
     );
}
 
export default LogIn;
