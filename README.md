## Getting Started

### Configure environment

- install `node v18`.

```bash
brew install nvm
nvm install 18
```

### Install yarn dependencies

You need to install `yarn` packages for every project separately.
Navigate to a project folder and run `yarn`.

### Copy Environment variables (local)

We have already added dummy values for the necessary operations but if you need to modify or test some functionalities use the following steps

1. Rename the `.env.example` to `.env`
2. Ask for the credentials for the project in the [#website](https://clickhouse-inc.slack.com/archives/C02FCQ30GKA) Slack channel.
    >`STRAPI_API_URL` can be replaced with the local running strapi if you prefer to work in offline mode

### Copy Environment variables (vercel)
1. Go to your vercel Project that hosts this repo
2. Go to Settings
3. Click on Environment Variables
4. Click on create new tab
5. Add the env variables and select the list of env you want the environment to be applied
6. click Save

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

You can start editing the page by modifying the values inside `pages` directory. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
