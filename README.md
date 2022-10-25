# Nginx virtual host and proxy admin

Nginx server admin is a simple application to help you create and edit virtual hosts on your nginx installation.

Deploy it on all your servers and use it to administrate data.
It supports proxy, Html, and Php templates.

If you need more templates please open an issue or better yet create `pull request` with your desired template.

![nginx editor](./examples/homepage.png)

## why

Even if there are other options out there, most of them require some complicated install, a database or a docker. I wanted something that could integrate into and existing install, or deploy on other server without too much work.

- no database : data is read directly from nginx config.
- no need modifying you config files
- no docker, so no need encapsulating you docker into a container.

## Installation

- `git clone --depth 1 https://github.com/enyosolutions-team/nginx-vhost-admin.git`
- `cd nginx-vhost-admin`
- `npm install`
- `node app.js`

You can and should put the behind a node process manager, like `pm2`.

## Security

#### ip whitelisting

By default the access to the virtual hosts is restricted to the local ip address.
In order for your app to be accessible on the outside, you need add the whitelisted ip addresses that you'd like to whitelist. This can be done in `config/local.js`.

```javascript
  disableIpFiltering: false,
  whitelistedIps: ['127.0.0.1', '::1'],
```

If you don't need this feature you can disable it by setting `disableIpFiltering` to `true`.
An example use case if to allow connecting only from work for example.

#### user accounts

You can use http authentification to protect your app. By default it's enabled and there is a user you can use to connect

```javascript
 {
   security: {
     ...
      users: {
       admin: 'nginxAdminHost987654321',
       user2: 'nginxAdminHost987654321',
      },
      ...
  },
```

You can add more users and change passwords.

> ⚠️ You should change the default password to something else.

To disable this feature simply set `users: false` instead of the list of users in your local.js.

### Installaton

- Pull the code
- run `npm install`or `yarn`
- edit the config in `config/local.js` add all the ips you need to whitelist. This application has a strict whitelisting policy in order to reduce attack surface to hackers.

### demo

![nginx editor](./examples/homepage.png)
![nginx editor](./examples/create.png)
![nginx editor](./examples/edit.png)

<div class="copyright text-center my-auto">
                <span>Coded with ❤️ by  <a href="https://www.enyosolutions.com" target="_blank">Enyosolutions</a></span> with theme SB ADMIN 2
              </div>
