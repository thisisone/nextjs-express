@rem node ver.js

git add .ver
git add app\ver.tsx
git commit -m "prod"
git push

vercel --prod
pause
