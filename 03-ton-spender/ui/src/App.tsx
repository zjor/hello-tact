import './App.css'
import {useState} from 'react'
import {useSpenderContract} from "./hooks/useSpenderContract";
import {useTonConnectUI} from '@tonconnect/ui-react';
import {TonConnectButton} from "@tonconnect/ui-react";
import {fromNano} from "ton"
import tonSymbol from './assets/ton_symbol.png'

function App() {
    const [connected, setConnected] = useState<boolean>(false)
    const {total, spend, address} = useSpenderContract()
    const [tonConnectUI] = useTonConnectUI();
    tonConnectUI.onStatusChange(_ => {
        if (connected != tonConnectUI.connected) {
            setConnected(tonConnectUI.connected)
        }
    })

    return (
        <div>
            <div>
                Дорогой друг,<br/>
                сейчас у тебя есть уникальная возможность
                &nbsp;<strong>просрать 1 <img className="ton-symbol" src={tonSymbol}/>!</strong>
            </div>
            { !connected &&
                <div className="block flex flex-col center-items">
                  <div>Подключи кошелек</div>
                  <TonConnectButton/>
                </div>
            }
            <div className="block">Как говорил Павел Дуров:</div>
            <div>
                <button
                    className={`btn primary ${!connected ? "disabled" : ""}`}
                    onClick={() => spend('1.0')}
                    disabled={!connected}
                >Let's do it!</button>
            </div>

            <div className="block">или хотя бы</div>

            <div>
                <button
                    className={`btn secondary ${!connected ? "disabled" : ""}`}
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

            { connected &&
                <div className="note flex flex-col center-items">
                  Но если совсем не охота, то можно отключить кошелек.
                  <TonConnectButton/>
                </div>
            }

        </div>
    )
}

export default App
