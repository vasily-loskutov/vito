import { FC } from "react"
import { HeaderWrapper } from "@shared";
import { FavoriteItem } from "@entities";
import { useAppSelector } from "@hooks";
import { IFavoriteItem } from "@models";
import styles from "./fav.module.scss"
import FavEmpty from "./favEmpty"
import { Typography } from "antd"
const Favorites: FC = () => {
    const { favoriteItems } = useAppSelector(state => state.favorite)
    const { Title } = Typography
    return (<HeaderWrapper title="Избранное">

        <div className={styles.favContainer}>
            {favoriteItems.length > 0 ?
                (<> <Title level={1} >Избранное</Title>
                    <div className={styles.favItemsContainer}>
                        {favoriteItems.map((favItem: IFavoriteItem) => <FavoriteItem data={favItem} />)}
                    </div></>) : <FavEmpty />
            }

        </div>
    </HeaderWrapper>);
}

export default Favorites;
