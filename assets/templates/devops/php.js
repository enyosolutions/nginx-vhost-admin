module.exports = `

# ------------------------------------------------------------
# {{ host }}
# ------------------------------------------------------------


server {
    listen   80; ## listen for ipv4; this line is default and implied

    root {{appRootFolder}};

    access_log  /var/log/nginx/{{appName}}_access.log;
    error_log  /var/log/nginx/{{appName}}_error.log debug;

    index index.html index.htm app.php  index.php;

    server_name {{ host }};
    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ [^/]\.php(/|$) {
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;
        fastcgi_pass php7.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_read_timeout 1200;
        include fastcgi_params;
    }
}
`;
