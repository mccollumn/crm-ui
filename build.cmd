@echo off

:Install packages
echo *** Installing Packages ***
call npm install

:Create production build
echo.
echo *** Building ***
call npm run build

:Copy files
echo.
echo *** Copying Files ***
call robocopy .\public .\.next\standalone\public /E
call robocopy .\.next\static .\.next\standalone\.next\static /E
call robocopy .\node_modules\next\dist\compiled\jest-worker .\.next\standalone\node_modules\next\dist\compiled\jest-worker /E
call copy .\deploy\start_server.cmd .\.next\standalone\
call copy .\deploy\web.config .\.next\standalone\

:Create logs directory
mkdir .\.next\standalone\logs

:Done
echo.
echo *** Build Complete ***
echo Copy .\.next\standalone\*.* to the appropriate location (e.g. C:\crm-ui\).