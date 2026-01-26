cmd /C npm run build
if %ERRORLEVEL% EQU 0 (
    echo BUILD OK
) else (
    echo BUILD NG
    exit %ERRORLEVEL%
)

cmd /C vercel --prod
if %ERRORLEVEL% EQU 0 (
    echo VERCEL OK
) else (
    echo VERCEL NG
    exit %ERRORLEVEL%
)
