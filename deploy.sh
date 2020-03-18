#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

# 部署到自定义域域名
echo 'www.zhyipeng.site' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
git push -f git@github.com:zhyipeng/zhyipeng.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:zhyipeng/mypage-frontend.git master:gh-pages

cd -


# zip -r public.zip .
# ssh zhyipeng "rm -rf /srv/www/public"
# ssh zhyipeng "mkdir /srv/www/public"
# scp public.zip root@zhyipeng:/srv/www/public
# ssh zhyipeng "unzip /srv/www/public/public.zip -d /srv/www/public"
