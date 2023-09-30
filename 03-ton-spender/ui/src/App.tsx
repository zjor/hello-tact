import './App.css'
import {useSpenderContract} from "./hooks/useSpenderContract";
import {useTonConnect} from "./hooks/useTonConnect";
import {TonConnectButton} from "@tonconnect/ui-react";
import {fromNano} from "ton"
import tonSymbol from './assets/ton_symbol.png'

function App() {
    const { connected } = useTonConnect();
    const {total, spend, address} = useSpenderContract()

    return (
        <div>
            <div>
                Дорогой друг,<br/>
                сейчас у тебя есть уникальная возможность
                <strong>просрать 1 <img className="ton-symbol" src={tonSymbol}/>!</strong>
            </div>
            { !connected &&
                <div className="block">
                  <div>Подключи кошелек</div>
                  <TonConnectButton/>
                </div>
            }
            <div className="block">Как говорил Павел Дуров:</div>
            <div>
                <button
                    className="btn primary"
                    onClick={() => spend('1.0')}
                    disabled={!connected}
                >Let's do it!</button>
            </div>

            <div className="block">или хотя бы</div>

            <div>
                <button
                    className="btn secondary"
                    onClick={() => spend('0.5')}
                    disabled={!connected}>
                    Просрать 0.5 <img className="ton-symbol" src={tonSymbol}/>
                </button>
            </div>

            <div className="block">Всего было просрано:
                <strong> {total && fromNano(total)} <img className="ton-symbol" src={tonSymbol}/>-ов</strong></div>

            <div className="block">Полученные TON-чики пойдут на поддержание штанов автора этого
                <a href={`https://tonscan.org/address/${address}`}> контракта</a>.
            </div>


        </div>
    )
}

export default App
