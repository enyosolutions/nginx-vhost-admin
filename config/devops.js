module.exports = {
  authorizedIps: ['163.172.81.20', '::1', '127.0.0.1', '::ffff:163.172.81.20', '::ffff:127.0.0.1'],
  devops: {
    projectFolder: '/Users/faou/Projects',
    configFolder: '/Users/faou/Projects',
    nginxConfigFolder: '/usr/local/etc/nginx/sites-enabled',
    servers: {
    },
    mysql: {
      localhost: {
        username: 'root',
        password: 'toor'
      },
    },
    mongodb: {
      localhost: 'mongodb://root:toor@localhost:27017/admin',
      jabbahut: 'mongo url',
    }
  }
};
