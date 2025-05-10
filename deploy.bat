node ver.js

cmd /C npm run build
pause

git add .
git commit -m "prod"
git push

vercel --prod
pause