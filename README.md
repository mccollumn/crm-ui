# CRM User Interface

## Setup - Dev

Update environment variables:

Create a `.env.local` file with the `NEXTAUTH_SECRET` and `OKTA_CLIENT_SECRET` values. See `.env.local_example` for an example.

Install packages:

```bash
nvm use
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup - Production

Copy files:

The UI is hosted on `usw2wtcrm01w` in `C:\WebtrendsCRM\crm-ui`. Copy the entire Github repo into this location.

Update environment variables:

Edit the `.env.production` file and provide the `NEXTAUTH_SECRET` and `OKTA_CLIENT_SECRET` values.

- `NEXTAUTH_SECRET` - Found in [Passwordstate](https://secrets.webtrends.io/). Search for `crm`.
- `OKTA_CLIENT_SECRET` - Found in the Okta application configuration for CRM.

Install packages:

```bash
nvm use
npm install
```

Create production build:

```bash
npm run build
```

Start the server (port 80):

```bash
npm run start
```

The above build steps can also be completed by running the included `start_server.sh` script.

## Versioning

Update the `version` in `package.json`.

## Documentation

- [Next.js](https://nextjs.org/docs)
- [MUI Data Grid](https://mui.com/x/react-data-grid/)
- [react-hook-form-mui](https://www.npmjs.com/package/react-hook-form-mui)
