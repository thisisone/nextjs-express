node ver.js

rem cmd /C npm run build
rem pause

git add .
git commit -m "prod"
git push

vercel --prod

echo "https://unity.sidnft.com"
pause