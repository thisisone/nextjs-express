# 링크

여기 github 주소
https://github.com/thisisone/nextjs-express

유니티 webgl 압축 설명 문서
https://docs.unity3d.com/kr/2021.3/Manual/webgl-deploying.html

# ercel 로 express 서버를 배포해보자 / 유니티 webgl 압축 지원하는 페이지를 배포 가능

블로그 링크:
https://blog.sidnft.com/1225

- 따라하기 영상 있음
- 후기 있음

# 게임 홍보를 위한 유니티 webgl 페이지 만들기 / 홍보의 거리 v2 / street for promotion V2

블로그 링크:
https://blog.sidnft.com/1260

- 버전업 개발 일지 있음
- 결과물 데모: https://unity.sidnft.com

# 명령어

```
bun dev.ts
```

typescript 파일을 직접 실행하는게 개발에 할때 편해서 bun 을 사용했습니다. 어떤식으로든 dev.ts 를 실행하면 됩니다.

파일은 ./src/express.ts 를 변집합니다.

```
npm run build
```

배포 전엔 빌드하여 javscript 파일을 만드세요.

```
npm run start
```

이 명령어는 index.js 를 실행합니다.
배포된 서버에서도 이 명령어로 실행하게 됩니다.

```
vercel deploy
```

프리뷰로 배포한다.
관리자만 볼 수 있다.

처음에 이걸로 배포 되는줄 알고 시간을 기다렸는데
배포가 안되어서 시간남이가 많이 발생했었다

사용할 일은 없었음

```
vercel --prod
```

프로덕션 배포한다.
모두에게 보여지게 된다.

```
deply.bat
```

배치파일을 만들어서 실행하면 편했습니다.

# 각종 문제해결

vercel 에서 import 후 프로젝트 세팅할때
각종 명령어를 만질 수 있는데 아무것도 설정하지 말아야한다.

vercel.json 에 builds 를 build 로 오타를 냈더니 동작하지 않았다.

index.js 마지막에 `mobile.exports = app`
꼭 있어야한다.

# 추가작업 tailwind 동작하는 .html 빌드하기

단순히 html 파일을 작성하니까 모양이 나지 않았다.
그래서 tailwind 를 작용한 페이지를 html 파일로 만들 것이다.

```
npm i tailwindcss
```

tailwind 설치한다.

```
npx @tailwindcss/cli -i ./public/tailwind.css -o ./public/style.css --watch
```

자동으로 style.css 가 빌드 된다.

가끔 다시 실행해보면 문법 오류난것도 알려준다.

```
ok, __dirname=/var/task/dist/src, root_dir=/var/task, target_path=/var/task/public/webgl_mp/index.html, comp=, ext=.html, content_type=text/html, fsize=0


ok, __dirname=/var/task/dist/src, root_dir=/var/task, target_path=/var/task/public/webgl_mp/index.html, comp=, ext=.html, content_type=text/html, fsize=NG_ENOENT: no such file or directory, stat '/var/task/public/webgl_mp/index.html'


ok, fpath=/var/task/public/webgl_mp/index.html

```

# 수정사항

## BUG_250517 / 2025-05-17 버그 수정

fs.createReadStream 에 on("error", ~~~) 예외처리 추가
설명: https://serverdown.tistory.com/1225
