import { PropsWithChildren, useState, FC, memo, useEffect } from "react";
import { Layout, Drawer, Input, Menu, Badge, Modal, Tabs, Button } from 'antd';
import type { MenuProps, TabsProps } from "antd"
const { Search } = Input;
const { Header, Footer, Content } = Layout;
import {
  HeartOutlined, ShoppingCartOutlined,
  UserOutlined, MenuOutlined, MailOutlined, AppstoreOutlined,
  SettingOutlined, GithubOutlined
} from '@ant-design/icons';
import { Lobster } from "next/font/google";
import Link from "next/link"
import styles from "./headerWrapper.module.scss"
import { useAppSelector } from "@hooks"
import { LogIn, Register } from "@entities"


const lobster = Lobster({
  weight: ["400"],
  subsets: ['latin'],

})
type MenuItem = Required<MenuProps>['items'][number];

const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const onSearch = (value: string) => console.log(value)
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen((prev) => !prev)
  }
  const onClick = () => {
    console.log("click")
  }
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }
  const items: MenuItem[] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ];
  const { cartItems } = useAppSelector(state => state.cart)
  const { favoriteItems } = useAppSelector(state => state.favorite)
  const { isAuth, user } = useAppSelector(state => state.user)

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  }
  const showModal = () => {
    setIsModalOpen(true);
  }
  const [activeKey, setActiveKey] = useState("1")
  const toRegister = () => {
    setActiveKey('2')
  }
  const toLogIn = () => {
    setActiveKey('1')
  }
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Вход`,
      children: <LogIn toRegister={toRegister} />,
    },
    {
      key: '2',
      label: `Регистрация`,
      children: <Register toLogIn={toLogIn} />,
    },
  ];

  const onActiveKey = () => {
    setActiveKey((prev) => prev === '1' ? '2' : '1')
  }




  return (
    <>
      {domLoaded && (
        <>


          {!isAuth && (
            <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
              <div className="flex flex-col items-center ">
                <Tabs defaultActiveKey="1" activeKey={activeKey} items={tabItems} onChange={onActiveKey} />
              </div>

            </Modal>
          )}

          <Header className="bg-[#f4f4f4] flex items-center  justify-center" >
            <div className="container  flex justify-around">
              <div className=" flex items-center gap-x-8">
                <Link href="/"><h1 className={lobster.className + " text-3xl"} style={lobster.style}>Vito</h1></Link>
                <MenuOutlined onClick={handleOpen} className="basicHover text-2xl" />
                <Drawer title="Каталог" placement="left" onClose={handleClose} open={open}>
                  <Menu onClick={onClick} className='h-full w-full' mode="vertical" items={items} />
                </Drawer>
              </div>
              <Search placeholder="Поиск..." onSearch={onSearch} size="middle" className="max-w-[400px] flex items-center" />
              <nav className={styles.headerNav} >
                <Link href="/favorites">
                  <Badge count={favoriteItems.length} size="small" offset={[0, 7]}> <HeartOutlined className={styles.headerIco} /></Badge>
                </Link>
                <Link href="/cart" >
                  <Badge count={cartItems.length} size="small" offset={[0, 7]}><ShoppingCartOutlined className={styles.headerIco} /></Badge>
                </Link>
                {isAuth ? <Link href={`/profile/${user.id}`}><UserOutlined className={styles.headerIco} /></Link> : <UserOutlined className={styles.headerIco} onClick={showModal} />}
              </nav>
            </div>
          </Header>



          <Content className="bg-white content mb-40">
            <div className="flex justify-around">
              <div className="container ">

                {children}
              </div>
            </div>
          </Content>


          <Footer className="footer flex justify-center  ">
            <div className="flex flex-col items-center">
              <nav>
                <li className="list-none"><a href="https://github.com/vasily-loskutov" target="_blank"><GithubOutlined className="basicHover text-2xl" /></a></li>
              </nav>
              <h1>© 2023 vito.com</h1>
            </div>

          </Footer>



        </>
      )
      }
    </>

  );
}

export default memo(HeaderWrapper);