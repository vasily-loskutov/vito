
import { message, Divider } from "antd";
import { CatalogForm } from "@shared";
import { useCreateCategoryMutation } from "@redux";
import { ICategory } from "@models"
const CreateCategory = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [createCategory] = useCreateCategoryMutation()
    const onFinish = async (value: ICategory) => {
        await createCategory(value)
        messageApi.success('каталог успешно создан!');
    }
    const onFinishFailed = (value: any) => {
        console.log(value)
        messageApi.error('ошибка');
    }
  
    return (
        <div>
            {contextHolder}
            <CatalogForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
            <Divider></Divider>
        </div>

    );
}

export default CreateCategory
