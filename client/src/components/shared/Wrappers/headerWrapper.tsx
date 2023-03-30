import { PropsWithChildren, useState, FC, memo, useEffect } from "react";
import { Layout, Drawer, Input, Menu, Badge, Modal, Tabs } from 'antd';
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
import { useRouter } from 'next/router'
import styles from "./headerWrapper.module.scss"
import { useAppSelector } from "@hooks"
import { LogIn, Register } from "@entities"
import { useLazySearchQuery } from "@redux"

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
  const [searchGoodsQuery] = useLazySearchQuery()
  const router = useRouter()
  const onSearch = (value: string) => {
    console.log(value)
    router.push({
      pathname: '/search/[message]',
      query: { message: value }
    })
    searchGoodsQuery(value)

  }

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen((prev) => !prev)
  }
  const onClick = (value: any) => {

    router.push({
      pathname: '/search/[message]',
      query: { message: value.key }
    })
    searchGoodsQuery(value.key)
    handleClose()
  }
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }
  const items: MenuItem[] = [
    getItem('Смартфоны', 'sub1', <MailOutlined />, [
      getItem('Samsung', null, null, [getItem('Samsung a12', 'Samsung')], 'group'),
      getItem('Iphone', null, null, [getItem('Iphone 14 pro max', 'Iphone')], 'group'),
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
              <div className="flex flex-col items-center  ">
                <Tabs defaultActiveKey="1" activeKey={activeKey} items={tabItems} onChange={onActiveKey} />
              </div>

            </Modal>
          )}

          <Header className="bg-[#f4f4f4] flex items-center  justify-center" >
            <div className="container  flex justify-around">
              <div className=" flex items-center gap-x-8">
                <Link href="/"><h1 className={lobster.className + " text-3xl"} style={lobster.style}>Vito</h1></Link>
                <MenuOutlined onClick={handleOpen} className="basicHover text-2xl" />
                <Drawer title="Каталог" placement="left" onClose={handleClose} open={open} className="max-w-[450px]">
                  <Menu onClick={onClick} className='h-full w-full border-black ' mode="vertical" items={items} />
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
