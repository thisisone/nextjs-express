# 링크

github 주소
https://github.com/thisisone/nextjs-express

vercel express 문서
https://vercel.com/guides/using-express-with-vercel

예제 소스
https://github.com/vercel/examples/tree/main/solutions/express

영상
https://www.youtube.com/watch?v=ep5crSLD7y4

vercel 프로젝트
https://vercel.com/lee-gun-ils-projects/nextjs-express

유니티 webgl 압축
https://docs.unity3d.com/kr/2021.3/Manual/webgl-deploying.html

# 명령어

로컬 테스트
node index.js

코드에 나오는 json

```
{
	"version": 2,
	"rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

영상에 내오는 json

```
{
"version": 2,
"build*": [
{
"src": "server.js",
"use": "@vercel/node"
}
],
"routes": [
{
"src": "/(.*)",
"dest": "/"
}
]
}
```
