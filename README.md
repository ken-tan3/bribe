# Next.js Sample App

- Server: Next.js 12.3(pages dir)
- DB: PlanetScale

## planetscale command

- access db

```cli
pscale connect bribe dev --port 3309
```

- push db

```cli
npx prisma db push
```

- connect db

```cli
pscale shell bribe dev
```

- switch organization

```cli
pscale org switch lexi
```

- fetch branch

```
pscale branch list bribe
```

# State External Store

- recoil-persist
  - https://github.com/polemius/recoil-persist
