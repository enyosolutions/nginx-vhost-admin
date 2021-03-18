module.exports = `

# ------------------------------------------------------------
# {{ host }}
# ------------------------------------------------------------


server {
    listen 80;
    server_name {{ host }};

    access_log  /var/log/nginx/{{appName}}_access.log;
    error_log  /var/log/nginx/{{appName}}_error.log debug;

    root {{ appRootFolder }};

    location / {
        try_files $uri $uri/ /index.html;
    }
}

`;
