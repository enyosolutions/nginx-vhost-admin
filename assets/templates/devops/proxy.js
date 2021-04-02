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
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://{{ targetServer || '127.0.0.1' }}:{{appPort}};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;
