# 링크

github 주소
https://github.com/thisisone/nextjs-express

유니티 webgl 압축 설명
https://docs.unity3d.com/kr/2021.3/Manual/webgl-deploying.html

영상
https://www.youtube.com/watch?v=3IV60HVsW2M&t=17s

결과물 페이지
https://nextjs-express-eight.vercel.app/

# 명령어

vercel dev 로 실행하면 not found 404 로 나온다.
이것은 정사이다.

npm run start
는 정상으로 동작해야한다.

vercel deploy
프리뷰로 배포한다.
관리자만 볼 수 있다.

vercel --prod
정식으로 배포한다.
모두에게 공개된다.

# 각종 문제해결

vercel 에서 import 후 프로젝트 세팅할때
각종 명령어를 만질 수 있는데 아무것도 설정하지 말아야한다.

vercel.json 에 builds 를 build 로 오타를 냈더니 동작하지 않았다.

index.js 에

```
mobile.exports = app
```
