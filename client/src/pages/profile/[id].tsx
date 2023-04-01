import {useEffect, useState} from "react"
import { useAppSelector,useActions } from '@hooks'
import { HeaderWrapper } from '@shared'
import {useLogOutMutation} from "@redux"
import {Setting,StoryGoodsList,UserCommentList} from "@entities"
import { Card, Menu} from 'antd'
import { AppstoreOutlined, SettingOutlined,CaretLeftOutlined,ArrowLeftOutlined,EditOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router'

export default function Profile() {
  const router = useRouter()
  const [changeSection,setChangeSection] = useState("setting")
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const { user,isAuth } = useAppSelector(state => state.user)
      useEffect(()=>{
        if(!isAuth){
          router.push("/")
       }
      },[])
 
  
   const {logOut:logOutAction}  = useActions()
       const [logOutMutation] =  useLogOutMutation()

  const handleLogOut = async()=>{
      await logOutMutation(null);
      logOutAction()
      router.push("/")
  }
   if(changeSection === 'exit'){
    router.back()
   }
  const items: MenuItem[] = [
    getItem(<span  role="button" >Назад</span>, 'exit', <ArrowLeftOutlined  />),
    getItem('Ваши комментарии', 'data', <EditOutlined />),
    getItem('История покупок', 'purchases', <AppstoreOutlined />),
    getItem('Настройка акканута', 'setting', <SettingOutlined />),
    getItem(<span className="text-red-500" role="button" onClick={handleLogOut}>Выйти</span>, 'logOut', <CaretLeftOutlined />),


  ];
  const onClick: MenuProps['onClick'] = (e) => {
    setChangeSection(e.key)
  };

        
  return (
    <HeaderWrapper title="Профиль">
      <Card title="Ваш профиль" className="w-full mt-8 ">
        <div className="flex">
        <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} defaultOpenKeys={['setting']}/>
          {changeSection === "setting" && <Setting/>}
          {changeSection === "data" && <UserCommentList/>}
          {changeSection === "purchases" && <StoryGoodsList/>}
        </div>
     
      </Card>
    </HeaderWrapper>
  )
}
