import { FC } from "react"
import { IGood } from "@models"
import { Image, Divider, Typography, message } from "antd"
import { useUpdateGoodMutation, useDeleteGoodMutation, useGetCategoriesQuery } from "@redux"
import { GoodForm } from "@shared"
type PropTypes = {
    good: IGood
}

const ChangeGoodItem: FC<PropTypes> = ({ good }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const { Title } = Typography
    const [updateGood] = useUpdateGoodMutation()
    const onFinish = async (values: any) => {
        console.log(values)
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('id', good.id.toString())
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('categories', values.categories);
        formData.append('subcategories', values.subcategories);
        for (let file of values.photo.fileList) {

            formData.append('file', file.originFileObj);
            formData.append('filesNames', file.name);
        }
        await updateGood(formData)
        messageApi.success('Товар успешно изменён!');


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        messageApi.error("ошибка");
    };
    const [deleteGood] = useDeleteGoodMutation()
    const onDelete = async (id: number) => {
        await deleteGood(id)
        messageApi.success('Товар успешно удалён!');
    }
    const { data: category, isLoading: categoryLoading } = useGetCategoriesQuery(null)

    let categories = []
    let subcategories = []
    if (!categoryLoading) {
        categories = category.map((elem) => ({ value: elem.tag, label: elem.name }))
        category.forEach((elem) => {
            const subElem = elem.subcategories.map((subElem) => ({ value: subElem[1], label: subElem[0] }))
            subcategories.push(...subElem)
        })

    }
    return (
        <div className="w-full ">
            {contextHolder}
            <div className="flex items-center gap-x-4 ">
                <Image src={`/${good.photo[0]}`} width={100} height={100} />
                <Title level={3}>{good.name}</Title>
            </div>
            <GoodForm onFinish={onFinish} onFinishFailed={onFinishFailed} isCreate={false} data={good} onDelete={onDelete} categories={categories} subcategories={subcategories} />
            <Divider></Divider>
        </div>
    );
}

export default ChangeGoodItem;
