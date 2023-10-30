import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const tonManifestUrl = 'https://twa-ton-spender.surge.sh/tonconnect-manifest.json'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TonConnectUIProvider manifestUrl={tonManifestUrl}>
            <App />
        </TonConnectUIProvider>
    </React.StrictMode>
)
