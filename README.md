# Nginx server admin

Nginx server admin is a simple application to help you create and edit virtual hosts on your nginx installation. Deploy it on all your servers and use it to administrate data. It supports Reverse, Html, and Php  templates. If you need more templates please open an issue or better yet create `pull request` with your desired template.

![nginx editor](./examples/homepage.png)


### Security

#### ip whitelisting
By default the access to the virtual hosts is restricted to the local ip address.
In order for your app to be accessible on the outside, you need add the whitelisted ip addresses that you'd like to whitelist. This can be done in `config/local.js`.

```javascript
  disabledIpFiltering: false,
  whitelistedIps: ['127.0.0.1', '::1'],
```

If you don't need this feature you can disable it by setting `disabledIpFiltering` to `true`.
An example use case if to allow connecting only from work for example.


#### user accouunts

You can use http authentification to protect your app. By default is enable and there is a user you can use to connect

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
To disable  this feature simply remove all the accounts from the `users` section.


### Installaton

+ Pull the code
+ run `npm install`or `yarn`
+ edit the config in `config/local.js`  add all the ips you need to whitelist. This application has a strict whitelisting policy in order to reduce attack surface to hackers.


### demo

![nginx editor](./examples/homepage.png)
![nginx editor](./examples/create.png)
![nginx editor](./examples/edit.png)

