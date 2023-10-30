import { FC } from 'react'
import LoadingImg from './loading.png'

const Loading: FC = () => {
    return (
        <div>
            <img src={LoadingImg} alt={'loading'} />
        </div>
    )
}

export default Loading
