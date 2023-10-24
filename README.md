# CRM User Interface

## Setup - Dev

Install packages:

```bash
nvm use
npm install
```

Create a `.env.local` file with the `NEXTAUTH_SECRET` and `OKTA_CLIENT_SECRET` values. See `.env.local_example` for an example.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup - Production

Install packages:

```bash
nvm use
npm install
```

Edit the `.env.production` file and provide the `NEXTAUTH_SECRET` and `OKTA_CLIENT_SECRET` values.

- `NEXTAUTH_SECRET` - Found in [Passwordstate](https://secrets.webtrends.io/). Search for `crm`.
- `OKTA_CLIENT_SECRET` - Found in the Okta application configuration for CRM.

Create production build:

```bash
npm run build
```

Start the server (port 80):

```bash
npm run start
```

The above steps can also be completed by running the included `start_server.sh` script.

## Versioning

Update the `version` in `package.json`.

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [MUI Data Grid](https://mui.com/x/react-data-grid/)
- [react-hook-form-mui](https://www.npmjs.com/package/react-hook-form-mui)
