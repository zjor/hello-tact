# Counter UI

1. Creation 
```bash
pnpm create vite@latest 02-counter-ui -- --template react-ts
cd 02-contract-ui && pnpm install

pnpm install ton ton-core ton-crypto
pnpm install @orbs-network/ton-access

# to support Buffer
pnpm install vite-plugin-node-polyfills

# setup TonConnect
pnpm install @tonconnect/ui-react

# TWA theme properties
pnpm install @twa-dev/sdk

```

2. Deployed app: [https://twa-02-counter-ui.surge.sh](https://twa-02-counter-ui.surge.sh)
