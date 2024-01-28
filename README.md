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

Use the following steps to deploy.

### Install Node.js

Download and install Node.js 20.9.0

- [Node.js Download](https://nodejs.org/en/download/)

### Build the App

#### Download

Download the [crm-ui](https://github.com/mccollumn/crm-ui) repo to a temporary location on the server that will host the UI. The project must be built from a location with access to the CRM API.

#### Environment Variables

Edit the `.env.production` file and provide the `NEXTAUTH_SECRET` and `OKTA_CLIENT_SECRET` values.

- `NEXTAUTH_SECRET`
- `OKTA_CLIENT_SECRET` - Found in the Okta application configuration for CRM.

#### Run Build Script

Open an elevated command prompt, navigate to the location where the [crm-ui](https://github.com/mccollumn/crm-ui) repo files where saved, and run:

```bat
build.cmd
```

This script will install packages, build the app, and copy additional required files.

#### Confirm Successful Build

Run `start_server.cmd` to start the Node.js server on port 3000. Confirm that the UI is accessible at `http://localhost:3000`.

### Copy Files

Copy the files output from the standalone build to the location where they will be hosted on the server. For example:

- Source: `\.next\standalone\`

- Destination: `C:\crm-ui\`

Now that the project is built, the source code is no longer needed and can be deleted.

<!-- ### Configure Website

Ensure that IIS is installed.

#### Application Request Routing

Ensure that Application Request Routing version 3 has been installed on the server. If ARR has not been installed, it is available for download [here](https://www.microsoft.com/download/details.aspx?id=47333). The download site displayed by this link includes installation instructions.

To enable ARR as a proxy:

- Open _Internet Information Services (IIS) Manager_.
- In the Connections pane, select the server.
- In the Server pane, double-click _Application Request Routing Cache_.
- In the Actions pane, click _Server Proxy Settings_.
- On the Application Request Routing page, select _Enable Proxy_.
- In the Actions pane, click _Apply_. This enables ARR as a proxy at the server level.

#### Create the Website

Configure the website and application pool using Information Services (IIS) Manager.

Create a new IIS website:

- In the Connections pane, navigate to Sites and click _Add Website_.
- Provide a name for the site (e.g. CRM UI).
- Provide the physical path to the UI (e.g. C:\crm-ui).
- Ensure Binding Type is `http` and Port is `80`.
- Click OK to create the website.

Disable .NET on the Application Pool:

- In the Connections pane, navigate to _Application Pools_.
- Locate the app pool for the new site.
- Select _Basic Settings_.
- Set _.NET CLR Version_ to _No Managed Code_.
- Click OK.

The app includes a `web.config` file that defines a URL Rewrite rule. Confirm the rule is being used:

- In the Connections pane, navigate to the site.
- In the Server pane, double-click _URL Rewrite_.
- There should be one inbound rule named `ReverseProxyInbound`. -->

### Create Windows Service

A Windows service is used to ensure the Node.js app is always running and will restart if it crashes.

#### Download NSSM

NSSM (Non-Sucking Service Manager) is an easy way to create a new service. Download the application from the official website.

[NSSM Download](https://nssm.cc/download)

#### Create the Service

To launch the tool's UI, open an elevated command prompt and run:

```bat
nssm.exe install
```

Create the service:

- Set the _Path_ to the location of the `start_server.cmd` file.
  - e.g. C:\crm-ui\start_server.cmd
- Set the _Service Name_. This is what will appear in the Windows services list.
  - e.g. CRM UI
- Click the _Details_ tab.
- Set a description for the service.
- Ensure that _Startup Type_ is set to _Automatic_.
- Click the _Log On_ tab.
- Ensure that _Log On As_ is set to _Local system Account_.
- Click the _Exit Actions_ tab.
- Ensure that the _Restart_ option is set to _Restart Application_.
- Click the _I/O_ tab.
- Provide _Output_ and _Error_ log paths.
  - e.g. C:\crm-ui\logs\service.log
  - e.g. C:\crm-ui\logs\service-error.log
- Click the _Install Service_ button.

Configure the service:

- Open the Windows Services console.
- Locate the newly created service.
- Double click the service name to edit the properties.
- Ensure that the _Startup Type_ is set to _Automatic_.
- Click the _Recovery_ tab.
- Set the First, Second, and Subsequent Failure options to _Restart teh Service_.
- Click _OK_.
- Start the service if it is not already running.

> Note: If you need to unistall the service, you can do so by running `nssm.exe remove "CRM UI"` from an elevated command prompt.

## Updating

To update the app after it has already been deployed:

- Download and build the new app per the instructions [above](#build-the-app).
- Stop the _CRM UI_ service.
- Replace the existing app files with new ones.
- Start the _CRM UI_ service.

## Versioning

Update the `version` in `package.json`.

## Documentation

- [Next.js](https://nextjs.org/docs)
- [MUI Data Grid](https://mui.com/x/react-data-grid/)
- [react-hook-form-mui](https://www.npmjs.com/package/react-hook-form-mui)
