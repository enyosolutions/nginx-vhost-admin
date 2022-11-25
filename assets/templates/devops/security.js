module.exports = `
    location ~ /\.ht {
        deny  all;
        return 403;
    }

    location ~ js/container_.*_preview\.js$ {
        expires off;
        add_header Cache-Control 'private, no-cache, no-store';
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
