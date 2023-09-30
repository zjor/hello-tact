import './App.css'
import {useSpenderContract} from "./hooks/useSpenderContract";
import {useTonConnect} from "./hooks/useTonConnect";
import {TonConnectButton} from "@tonconnect/ui-react";
import {fromNano} from "ton"

function App() {
    const { connected } = useTonConnect();
    const {total, available, spend, address} = useSpenderContract()

    return (
        <div>
            <div>
                Дорогой друг,<br/>
                сейчас у тебя есть уникальная возможность <strong>просрать 1 TON!</strong>
            </div>
            { !connected &&
                <div>
                  <div>Подключи кошелек</div>
                  <TonConnectButton/>
                </div>
            }
            <div>Как говорил Павел Дуров:</div>
            <div>
                <button onClick={() => spend('1.0')}>Let's do it!</button>
            </div>

            <div>или хотя бы</div>

            <div>
                <button onClick={() => spend('0.5')}>Просрать 0.5 TON</button>
            </div>

            <div>Всего было просрано: <strong>{total && fromNano(total)} TON-ов</strong></div>

            <div>Полученные TON-чики пойдут на поддержание штанов автора этого
                <a href={`https://tonscan.org/address/${address}`}> контракта</a>.
            </div>


        </div>
    )
}

export default App
