
import { HeaderWrapper } from "@shared"
import { Typography,Button } from "antd"
import Link from "next/link"
export default function NotFoundPage() {
    const { Title } = Typography



    return (

        <HeaderWrapper title="404 страница не найдена">
            <div className="flex flex-col items-center mt-6">
                <Title level={1}>
                    ошибка 404 страница не найдена!
                </Title>
               <Link href="/"><Button size="large" >На главную</Button></Link> 
            </div>

        </HeaderWrapper>

    )
}
