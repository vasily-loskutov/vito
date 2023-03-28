import type { IStoryGoodItem } from "@models";
import { FC } from "react";
type PropTypes = {
    item: IStoryGoodItem
}
import { Card, Typography, Button } from "antd";
import { CarouselGood } from "@shared";
import Link from "next/link";
const StoryGoodItem: FC<PropTypes> = ({ item }) => {
    const { Title, Text } = Typography
    console.log(item)
    return (
        <Card bordered={true} >
            <div className="flex gap-x-4">
                <CarouselGood data={item.photo} size={{ width: 120, height: 120 }} />
                <div className="flex flex-col justify-center">
                    <Link href={`/${item.linkToGoodPage}`}><Title level={3} className="hover:text-slate-600 transition-all">{item.name}</Title></Link>
                    <Title level={4} > <Text type="secondary" className="text-xl">цена:</Text> {item.price} ₽</Title>
                </div>
            </div>
            {
                !item.isFeedback && (<Link href={`/${item.linkToGoodPage}`}><Button size="large" className="w-full mt-4">Оставить отзыв</Button></Link>)
            }

        </Card>
    );
}

export default StoryGoodItem;
