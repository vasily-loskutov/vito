import { Form, Button, Input, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FC } from "react"
import { ICategoryResponse } from "@models"

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
    data?: ICategoryResponse
}
const CatalogForm: FC<PropTypes> = ({ onFinish, onFinishFailed, isError, error, isCreate = true, data }) => {
    
    return (

        <Form
            name="basic"
            className="w-[600px]"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={data ? {
                categories: data.name,
                tagCategories: data.tag,

            } : {}}
            onFinishFailed={onFinishFailed}

        >

            <Form.Item
                label="Название категории"
                name="categories"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}>
                <Input placeholder="Введите название новой категории" />
            </Form.Item>

            <Form.Item
                label="Тэг категории"
                name="tagCategories"
                rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}>
                <Input placeholder="Введите название тэг новой категории" />
            </Form.Item>

            <Form.List
                name="subcategories"
                initialValue={!isCreate ?
                    data?.subcategories.map((elem) => ({ subcategoryName: elem[0], subcategoryTag: elem[1] }))
                     : []}
                rules={[

                ]}
            >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'subcategoryName']}
                                    rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}

                                >
                                    <Input placeholder="Подкатегория" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'subcategoryTag']}
                                    rules={[{ required: true, message: 'Это поле обязательно для заполнения!' }]}

                                >
                                    <Input placeholder="Тэг подкатегории" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Добавить подкатегорию
                            </Button>

                        </Form.Item>
                    </>
                )}
            </Form.List>

            <div className="flex gap-x-4">
                <Form.Item >
                    <Button size="large" htmlType="submit">
                        {isCreate ? "Создать" : "Сохранить"}
                    </Button>
                </Form.Item>
                {!isCreate && (<Button size="large" danger onClick={() => handleDelete(data.id)}>
                    Удалить
                </Button>)}

            </div>



        </Form>

    );
}

export default CatalogForm
