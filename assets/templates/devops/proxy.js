const securityConfig = require('./security');

module.exports = `
# ------------------------------------------------------------
# {{ host }}
# ------------------------------------------------------------

server {
    set $server "{{ targetServer || '127.0.0.1' }}";
    set $forward_scheme         "http";
    set $port         "{{ appPort }}";

    listen 80;
    server_name {{ host }};
    root /apps/{{ appName }};

    access_log  /var/log/nginx/{{appName}}_access.log;
    error_log  /var/log/nginx/{{appName}}_error.log error;

    location / {
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header   X-Real-IP $remote_addr;
      proxy_set_header   X-Forwarded-For $remote_addr;
      proxy_set_header X-Forwarded-Host $host;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header   Host      $http_host;
      proxy_pass         $forward_scheme://$server:$port;
      proxy_http_version 1.1;
    }

    location ~ \.(gif|ico|jpg|png|svg|js|css|htm|html|mp3|mp4|wav|ogg|avi|ttf|eot|woff|woff2)$ {
        allow all;
        ## Cache images,CSS,JS and webfonts for an hour
        ## Increasing the duration may improve the load-time, but may cause old files to show after an Matomo upgrade
        expires 1h;
        add_header Pragma public;
        add_header Cache-Control "public";

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header   Host      $http_host;
        proxy_pass         $forward_scheme://$server:$port;
        proxy_http_version 1.1;
    }
    # security
    ${securityConfig}
}
`;
