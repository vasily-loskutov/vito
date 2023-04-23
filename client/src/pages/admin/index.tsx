import { useEffect, useState } from "react"
import { useAppSelector } from '@hooks'
import { HeaderWrapper } from '@shared'

import { CreateGood, ChangeGoods, ChangeCatalog } from "@entities"
import {
    AppstoreOutlined,
    ArrowLeftOutlined, EditOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Card, Menu } from 'antd'
import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()
    const [changeSection, setChangeSection] = useState("create")
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
    const { user } = useAppSelector(state => state.user)

    useEffect(() => {
        if (!user.isAdmin) {
            router.push("/")
        }
    }, [])




    if (changeSection === 'exit') {
        router.back()
    }
    const items: MenuItem[] = [
        getItem(<span role="button" >Назад</span>, 'exit', <ArrowLeftOutlined />),
        getItem('создать товар', 'create', <EditOutlined />),
        getItem('редактирование товаров', 'edit', <AppstoreOutlined />),
        getItem('редактирование каталога', 'catalog', <UnorderedListOutlined />),


    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setChangeSection(e.key)
    };


    return (
        <HeaderWrapper title="админ панель">
            <Card title="Админ панель" className="w-full mt-8 ">
                <div className="flex">
                    <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} defaultOpenKeys={['setting']} />
                    {changeSection === "create" && <CreateGood />}
                    {changeSection === "edit" && <ChangeGoods />}
                    {changeSection === "catalog" && <ChangeCatalog />}
                </div>

            </Card>
        </HeaderWrapper>
    )
}
