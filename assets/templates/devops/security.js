module.exports = `
    location ~ /\.ht {
        deny  all;
        return 403;
    }

    location ~ js/container_.*_preview\.js$ {
        expires off;
        add_header Cache-Control 'private, no-cache, no-store';
    }

    location ~ \.(gif|ico|jpg|png|svg|js|css|htm|html|mp3|mp4|wav|ogg|avi|ttf|eot|woff|woff2)$ {
        allow all;
        ## Cache images,CSS,JS and webfonts for an hour
        ## Increasing the duration may improve the load-time, but may cause old files to show after an Matomo upgrade
        expires 1h;
        add_header Pragma public;
        add_header Cache-Control "public";
    }

    ## disable all access to the following directories
    location ~ ^/(config|tmp|core|lang|.git) {
        deny all;
        return 403; # replace with 404 to not show these directories exist
    }

    location ~ ^/(libs|vendor|plugins|misc|node_modules) {
        deny all;
        return 403;
    }

    ## properly display textfiles in root directory
    location ~/(.*\.md|LEGALNOTICE|LICENSE) {
        default_type text/plain;
    }
`;
