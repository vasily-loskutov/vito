import { PropsWithChildren, useState, FC, memo, useEffect } from "react";
import { Layout, Drawer, Input, Menu, Badge, Modal, Tabs, Typography, AutoComplete } from 'antd';
import type { TabsProps } from "antd"
const { Search } = Input;
const { Header, Footer, Content } = Layout;
import {
  HeartOutlined, ShoppingCartOutlined,
  UserOutlined, MenuOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { Lobster } from "next/font/google";
import Link from "next/link"
import { useRouter } from 'next/router'
import styles from "./headerWrapper.module.scss"
import { useAppSelector, useActions } from "@hooks"
import { LogIn, Register } from "@entities"
import { useLazySearchQuery, useGetCategoriesQuery } from "@redux"
import Head from "next/head";
const lobster = Lobster({
  weight: ["400"],
  subsets: ['latin'],

})

type PropTypes = {
  title?: string
}
const HeaderWrapper: FC<PropsWithChildren<PropTypes>> = ({ children, title = "Vito" }) => {
  const { cartItems } = useAppSelector(state => state.cart)
  const { favoriteItems } = useAppSelector(state => state.favorite)
  const { isAuth, user, } = useAppSelector(state => state.user)


  const [searchGoodsQuery] = useLazySearchQuery()
  const router = useRouter()
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (value: string) => {
    console.log(value)
    router.push({
      pathname: '/search/[message]',
      query: { message: value }
    })
    searchGoodsQuery(value)

  }
  const findItems = async (e) => {
    const value = await searchGoodsQuery(e.target.value)
    console.log(value)
    setOptions(e.target.value ? value.data.map((elem) => ({ value: elem.name })) : []);

  }
  const { Text } = Typography
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen((prev) => !prev)
  }

  const onClick = async (value: any) => {




    router.push(`/category/?categories=${value.keyPath[1]}&subcategories=${value.keyPath[0]}`);

    handleClose()
  }
  const handleOpen = () => {
    setOpen((prev) => !prev)
  }
  const { data, isLoading } = useGetCategoriesQuery(null)
  const items = []

  if (!isLoading) {
    for (let elem of data) {
      const item = {
        label: elem.name,
        key: elem.tag,
        children: [...elem.subcategories.map((subcategory => ({ label: subcategory[0], key: subcategory[1] })))],
      }
      items.push(item)
    }
  }





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
      <Head>
        <title>{title}</title>
      </Head>
      {domLoaded && (
        <>


          {!isAuth && (
            <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
              <div className="flex flex-col items-center  ">
                <Tabs defaultActiveKey="1" activeKey={activeKey} items={tabItems} onChange={onActiveKey} />
              </div>

            </Modal>
          )}

          <header className="bg-[#f4f4f4] py-4  " >

            <div className="  container-xl flex  justify-around ">

              <div className=" flex gap-x-2 content-center md:gap-x-8 ">

                <Link href="/"><h1 className={lobster.className + " hidden text-3xl md:inline-block"} style={lobster.style}>Vito</h1></Link>
                <MenuOutlined onClick={handleOpen} className="basicHover text-2xl" />
                <Drawer title="Каталог" placement="left" onClose={handleClose} open={open} className="max-w-[450px]" >
                  <Menu onClick={onClick} className='h-full w-full md:hidden' mode="horizontal" items={items} />
                  <Menu onClick={onClick} className='h-full w-full hidden md:inline-block ' mode="vertical" items={items} />


                </Drawer>
              </div>
              <div className="flex items-center mt-1">
                <AutoComplete className="w-[300px] md:w-[400px] " options={options} >
                  <Input.Search placeholder="Поиск..." onSearch={onSearch} onChange={findItems} className="w-[300px] md:w-[400px]" />
                </AutoComplete>
              </div>
              <nav className="hidden items-center gap-x-4 lg:flex" >
                <Link href="/favorites">
                  <Badge count={favoriteItems.length} size="small" offset={[0, 7]}> <HeartOutlined className={styles.headerIco} /></Badge>
                </Link>
                <Link href="/cart" >
                  <Badge count={cartItems.length} size="small" offset={[0, 7]}><ShoppingCartOutlined className={styles.headerIco} /></Badge>
                </Link>
                {isAuth ? <Link href={`/profile/${user.id}`}><UserOutlined className={styles.headerIco} /></Link> : <UserOutlined className={styles.headerIco} onClick={showModal} />}
                {user.isAdmin && <Link href={`/admin`}><Text strong>админ панель</Text></Link>}
              </nav>
            </div>

          </header>

          <nav className="w-full bg-[#f4f4f4] flex justify-center items-center gap-x-2 fixed bottom-0 z-30 py-4 lg:hidden ">
            <Link href="/"><h1 className={lobster.className + "  text-2xl "} style={lobster.style}>Vito</h1></Link>

            <div className="w-[100px] flex justify-between items-center">


              <Link href="/favorites">
                <Badge count={favoriteItems.length} size="small" offset={[0, 7]}> <HeartOutlined className={styles.headerIco} /></Badge>
              </Link>
              <Link href="/cart" >
                <Badge count={cartItems.length} size="small" offset={[0, 7]}><ShoppingCartOutlined className={styles.headerIco} /></Badge>
              </Link>
              {isAuth ? <Link href={`/profile/${user.id}`}><UserOutlined className={styles.headerIco} /></Link> : <UserOutlined className={styles.headerIco} onClick={showModal} />}
              {user.isAdmin && <Link href={`/admin`}><Text strong>админ панель</Text></Link>}
            </div>
          </nav>
          <Content className="bg-white content mb-40">
            <div className="flex justify-around">
              <div className="container  ">

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
