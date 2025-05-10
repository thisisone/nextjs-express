@rem node ver.js

git add .ver
git add app\ver.tsx
git commit -m "prod"
git push

cmd /C vercel --prod
pause

echo ""
echo https://unity.sidnft.com
echo https://unity.sidnft.com/webgl_mp/index.html
echo ""