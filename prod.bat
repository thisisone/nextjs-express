@echo off

node ver.js
if %ERRORLEVEL% EQU 0 (
    echo VER OK
) else (
    echo VER NG
    exit %ERRORLEVEL%
)

cmd /C npm run tsc
if %ERRORLEVEL% EQU 0 (
    echo BUILD OK
) else (
    echo BUILD NG
    exit %ERRORLEVEL%
)

rem git add .ver
rem git add app\ver.tsx
git add *
git commit -m "prod"
git push

cmd /C vercel --prod


echo ""
echo https://unity.sidnft.com
echo https://unity.sidnft.com/webgl_mp/index.html
echo ""

pause