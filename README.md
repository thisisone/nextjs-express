# 링크

여기 github 주소
https://github.com/thisisone/nextjs-express

유니티 webgl 압축 설명 문서
https://docs.unity3d.com/kr/2021.3/Manual/webgl-deploying.html

# ercel 로 express 서버를 배포해보자 / 유니티 webgl 압축 지원하는 페이지를 배포 가능

블로그 링크:
https://serverdown.tistory.com/1225

- 따라하기 영상 있음
- 후기 있음

# 게임 홍보를 위한 유니티 webgl 페이지 만들기 / 홍보의 거리 v2 / street for promotion V2

블로그 링크:
https://serverdown.tistory.com/1260

- 버전업 개발 일지 있음
- 결과물 데모: https://unity.sidnft.com

# 명령어

```
vercel dev
```

이 명령어로 실행하면 not found 404 로 나온다.
이것은 정상입니다.

```
npm run start
```

이 명령어는 정상으로 동작해야 한다.

```
vercel deploy
```

프리뷰로 배포한다.
관리자만 볼 수 있다.

처음에 이걸로 배포 되는줄 알고 시간을 기다렸는데 안돼서 시간남이가 많이 발생했었음

```
vercel --prod
```

즉시 공개한다.
모두에게 보여지게 된다.

# 각종 문제해결

vercel 에서 import 후 프로젝트 세팅할때
각종 명령어를 만질 수 있는데 아무것도 설정하지 말아야한다.

vercel.json 에 builds 를 build 로 오타를 냈더니 동작하지 않았다.

index.js 마지막에 `mobile.exports = app`
꼭 있어야한다.
