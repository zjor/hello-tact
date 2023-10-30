import { FC } from 'react'
import styles from './Description.module.css'

const Description: FC = () => {
    const linkHref = 'https://tonscan.org/address/EQChtz9nKgStm-KTXQxDSSx8xbNCl4b7nnAduJbJH8NI6bVQ'

    return (
        <div className={styles.description}>
            The TONs received will be used to support the pants of the author of this{' '}
            <a href={linkHref} target={'_blank'} className={styles.description__link} rel="noreferrer">
                contract.
            </a>
        </div>
    )
}

export default Description
