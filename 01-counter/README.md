# Counter

## Dependencies

```bash
pnpm install ts-node
pnpm install ton ton-crypto ton-core

pnpm install @orbs-network/ton-access

pnpm install @tact-lang/compiler
```

## Interaction

1. Make sure `.env` contains `export TON_MNEMONIC=` value
2. Compile tact contract
`pnpm run compile`

3. Deploy a contract
`source .env && npx ts-node src/deploy.ts`
4. Interact with the contract
```bash
# get counter
pnpm run play EQDyIQNaImSQNAg_AX-kXUi5N1kM12L2w-wwbqAfa_p74k3W get

# set counter
pnpm run play EQDyIQNaImSQNAg_AX-kXUi5N1kM12L2w-wwbqAfa_p74k3W set 42

# increment counter
pnpm run play EQDyIQNaImSQNAg_AX-kXUi5N1kM12L2w-wwbqAfa_p74k3W inc
```
