#!/usr/bin/bash

# Set the node version
nvm use

# Install packages
echo "*** Installing packages ***"
npm install

# Create production build
echo -e "\n*** Building ***"
npm run build

# Start the server
echo -e "\n*** Starting the server ***"
npm run start

# Windows shortcut:
# "C:\Program Files\Git\bin\bash.exe" --cd=C:\WebtrendsCRM\crm-ui\ --init-file C:\WebtrendsCRM\crm-ui\start_server.sh