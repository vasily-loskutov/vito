
import { IGood } from '@models';
import { FC, SetStateAction, useEffect, Dispatch } from 'react';
import { Slider, Button, InputNumber, Typography } from 'antd';


import * as _ from "lodash"
import { useState } from 'react';

type PropsTypes = {
    goods: IGood[],
    setState: Dispatch<SetStateAction<IGood[]>>
}
type IValues = {
    min: number,
    max: number
}
interface IDefaultState {
    changeFilterButton: 1 | 2 | 3,
    values: IValues

}

const FIlter: FC<PropsTypes> = ({ goods, setState }) => {
    const [isLoading, setLoading] = useState(false)

    const defaultState: IDefaultState = {
        changeFilterButton: 1,
        values: {

            min: _.orderBy(goods, ['price'], ['desc']).at(-1).price,
            max: _.orderBy(goods, ['price'], ['desc'])[0].price
        }

    }
    const [changeFilterButton, setChangeFilterButton] = useState(defaultState.changeFilterButton)
    const [values, setValues] = useState(defaultState.values)


    const { Text } = Typography



    useEffect(() => {
        setLoading(true)
    }, [])
    useEffect(() => {
        setValues(defaultState.values)

    }, [goods])
    useEffect(() => {
        setState(goods.filter(item => item.price >= values.min && item.price <= values.max))

    }, [values])
    useEffect(() => {
        switch (changeFilterButton) {
            case 1:
                setState((prev) => _.orderBy(prev, ['rate'], ['desc']))
                break
            case 2:
                setState((prev) => _.orderBy(prev, ['price'], ['desc']))
                break
            case 3:
                setState((prev) => _.orderBy(prev, ['price'], ['asc']))
                break
        }

    }, [changeFilterButton, values])


    const handleChange = (values: number[]) => {
        setValues({ min: values[0], max: values[1] })

    }
    const handleMin = (value: number) => {
        setValues((prev) => ({ max: prev.max, min: value }))


    }
    const handleMax = (value: number) => {
        setValues((prev) => ({ min: prev.min, max: value }))


    }
    const setDefault = () => {
        setValues(defaultState.values)
        setChangeFilterButton(defaultState.changeFilterButton)
    }
    return (
        <>
            {
                isLoading ? (<div className="max-w-[400px] flex flex-col gap-y-4" >
                    <div className="flex gap-2 flex-wrap ">
                        <Button size='small' className={changeFilterButton === 1 ? "borderGreen" : ""} onClick={() => setChangeFilterButton(1)}>По рейтингу</Button>
                        <Button size='small' className={changeFilterButton === 2 ? "borderGreen" : ""} onClick={() => setChangeFilterButton(2)}>C начала дорогие</Button>
                        <Button size='small' className={changeFilterButton === 3 ? "borderGreen" : ""} onClick={() => setChangeFilterButton(3)}>C начала дешёвые</Button>
                    </div>
                    <div className="flex flex-col gap-y-3 ">
                        <Text className="text-xl" strong>Цена</Text>
                        <div className=" flex  items-center justify-center ">
                            <InputNumber value={values.min} onChange={handleMin} size="large" />
                            <span className='text-2xl'>-</span>
                            <InputNumber value={values.max} onChange={handleMax} size="large" />
                        </div>
                        <Slider range={{ draggableTrack: true }} min={defaultState.values.min} value={[values.min, values.max]} onChange={handleChange} max={defaultState.values.max} defaultValue={[goods.at(-1).price, goods[0].price]} />

                        <Button size='large' className='w-full' danger onClick={setDefault}>Очистить фильтр</Button>
                    </div>

                </div>
                ) : < h1 > Loading </ h1 >
            }
        </>

    );
}


export default FIlter;
