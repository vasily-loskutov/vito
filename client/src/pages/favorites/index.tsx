import {FC}from "react"
import { HeaderWrapper } from "@shared";
import { FavoriteItem } from "@entities";
import { useAppSelector } from "@hooks";
import { IFavoriteItem } from "@models";
import styles from "./fav.module.scss"
import {Typography} from "antd"
const Favorites:FC = () => {
    const {favoriteItems} = useAppSelector(state=>state.favorite)
    const {Title} = Typography
    return ( <HeaderWrapper>
        <div className={styles.favContainer}>
        <Title level={1} >Избранное</Title>
        <div className={styles.favItemsContainer}>
           {favoriteItems.map((favItem:IFavoriteItem)=> <FavoriteItem data={favItem}/>)}
        </div>
        </div>
    </HeaderWrapper> );
}
 
export default Favorites;
