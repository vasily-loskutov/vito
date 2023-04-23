import { CatalogForm } from "@shared";
import { FC } from "react"
import { ICategoryResponse, ICategory } from "@models"
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "@redux"
import { message } from 'antd';
type PropTypes = {
    data: ICategoryResponse;
}
const ChangeCatalogItem: FC<PropTypes> = ({ data }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [deleteCategory] = useDeleteCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const handleDelete = async (id: number) => {
        await deleteCategory(id)
        messageApi.success("Категория успешно удалена!")
    }
    const onFinish = async (values: any) => {
        const payload: ICategory = {
            id: data.id,
            name: values.name,
            tag: values.tag,
            subcategories: values.subcategories

        };
        await updateCategory(payload)
        messageApi.success("Изменения успешно сохранены!")
    }
    const onFinishFailed = async (values: any) => {
        console.log(values)
    }
    return (
        <div>
            {contextHolder}
            <CatalogForm onFinish={onFinish} onFinishFailed={onFinishFailed} data={data} isCreate={false} onDelete={handleDelete} />
        </div>

    );
}

export default ChangeCatalogItem            
