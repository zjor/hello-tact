import { FC } from 'react'
import Loading from './states/Loading/Loading.tsx'
import Go from './states/Go/Go.tsx'
import ToSpend from './states/ToSpend/ToSpend.tsx'
import styles from './Screen.module.css'

enum State {
    Loading,
    Go,
    TotalSpent
}

type Props = {
    state: State
}

const Screen: FC<Props> = ({ state }) => {
    return (
        <div className={styles.screen}>
            {[<Loading key={State.Loading} />, <Go key={State.Go} />, <ToSpend key={State.TotalSpent} />][state]}

            <svg
                className={styles.screen__bg}
                xmlns="http://www.w3.org/2000/svg"
                width="242"
                height="175"
                viewBox="0 0 242 175"
                fill="none"
            >
                <path
                    d="M0 120.787L4.00828 168.703C26.0538 170.699 81.4442 173.891 118.244 174.692C155.044 175.493 212.489 168.546 236.489 164.71L242 113.585V7.00535L236.5 5.00385L161.25 0.755692L86.1781 2.99603L8.01656 10.9819L3.00621 50.9112L0 94.8334V120.787Z"
                    fill="url(#paint0_linear_88_1020)"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_88_1020"
                        x1="9.49901"
                        y1="1.00084"
                        x2="233.12"
                        y2="167.966"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#95ECFC" />
                        <stop offset="1" stopColor="#188ECA" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}

export default Screen
