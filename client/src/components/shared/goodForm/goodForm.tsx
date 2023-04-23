
import { Form, Button, InputNumber, Upload, Input, Typography, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { FC } from "react"
import { IGood } from "@models"
import type { UploadFile } from 'antd/es/upload/interface';
type ErrorType = {
    status: number;
    data: unknown
}
type PropTypes = {
    onFinishFailed: (errorInfo: any) => void;
    onFinish: (values: any) => Promise<void>;
    onDelete?: (id: number) => Promise<void>;
    isError?: boolean;
    error?: ErrorType;
    isCreate?: boolean;
    data?: IGood;
    categories: [string[]] | [];
    subcategories: [string[]] | [];
}
const GoodForm: FC<PropTypes> = ({ onFinish, onFinishFailed, isError, error, isCreate = true, data, onDelete, categories, subcategories }) => {
    const { Text } = Typography
    const { TextArea } = Input;

    const fileList: UploadFile[] = [


    ];

    let i = 0


    if (!isCreate) {

        for (let photo of data.photo) {

            fileList.push({
                uid: `${i}`,
                name: photo,
                status: 'done',
                url: `/${photo}`,
                thumbUrl: `/${photo}`,

            })
            i++
        }
    }
    return (

        <Form
            name="basic"
            className="w-[600px]"
            encType="multipart/form-data"
            onFinish={onFinish}
            autoComplete="off"

            onFinishFailed={onFinishFailed}
            initialValues={data ? {
                name: data.name, price: data.price,
                description: data.description, categories: data.categories,
                subcategories: data.subcategories
            } : {}}
        >
            { }
            <Form.Item
                label="фотографии"
                name="photo"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}>

                <Upload
                    defaultFileList={[...fileList]}
                    multiple
                    listType="picture"

                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>


            </Form.Item>
            <Form.Item
                label="Название товара"
                name="name"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}

            >
                <TextArea />

            </Form.Item>

            {isError && <Text type="danger">{error.data.message}</Text>}

            <Form.Item
                label="Цена"
                name="price"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
            >
                <InputNumber addonAfter="₽" />
            </Form.Item>
            <Form.Item
                label="Выберите категорию товара"
                name="categories"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}

            >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Выберите категорию товара"
                    options={categories ? categories : []}
                />

            </Form.Item>
            <Form.Item
                label="Выберите подкатегорию товара"
                name="subcategories"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}

            >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Выберите подкатегорию товара"
                    options={subcategories ? subcategories : []}
                />

            </Form.Item>
            <Form.Item
                label="Описание"
                name="description"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}
            >
                <TextArea />
            </Form.Item>
            <div className="flex gap-x-4">
                <Form.Item >
                    <Button size="large" htmlType="submit">
                        {isCreate ? "Создать" : "Изменить"}
                    </Button>
                </Form.Item>
                {!isCreate && (<Button size="large" danger onClick={() => onDelete(data.id)}>
                    Удалить
                </Button>)}

            </div>
        </Form>

    );
}

export default GoodForm
