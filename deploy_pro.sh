yarn build;
rsync -avz -e "ssh" dist/* root@chaiserver.cn:/home/var/www/jianghu/jianghu-web
