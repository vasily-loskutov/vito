import { message } from "antd";

import { useCreateGoodMutation, useGetCategoriesQuery } from "@redux"
import { GoodForm } from "@shared"
import { ICategoryResponse } from "@models";
const CreateGood = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [createGood, { isError, error }] = useCreateGoodMutation()
    const onFinish = async (values: any) => {
        console.log(values)
        const formData = new FormData()
        formData.append('name', values.name.trim())
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('categories', values.categories);
        formData.append('subcategories', values.subcategories);
        for (let file of values.photo.fileList) {
            formData.append('file', file.originFileObj);
        }
        await createGood(formData)
        messageApi.success('Товар успешно создан!');

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        messageApi.error("ошибка");
    };
    const { data, isLoading } = useGetCategoriesQuery(null)
    console.log(data)
    let categories = []
    let subcategories = []
    if (!isLoading) {
        categories = data.map((elem) => ({ value: elem.tag, label: elem.name }))
        data.forEach((elem) => {
            const subElem = elem.subcategories.map((subElem) => ({ value: subElem[1], label: subElem[0] }))
            subcategories.push(...subElem)
        })

    }
    return (
        <>
            {contextHolder}
            <GoodForm onFinish={onFinish} onFinishFailed={onFinishFailed} isError={isError} error={error} categories={categories} subcategories={subcategories} />
        </>
    );
}

export default CreateGood
