@echo off

node ver.js

npm run tsc
pause

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