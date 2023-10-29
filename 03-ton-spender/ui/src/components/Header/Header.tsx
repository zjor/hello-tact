import { FC } from 'react'
import styles from './Header.module.css'

const Header: FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <h1 className={styles.header__title}>Spend a TON</h1>
            </div>
        </div>
    )
}

export default Header
