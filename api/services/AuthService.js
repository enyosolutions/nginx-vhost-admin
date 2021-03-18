const bcrypt = require('bcryptjs');


module.exports = {
  beforeCreate(user) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {return reject(err);}
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) {
            return reject(error);
          }
          user.encryptedPassword = hash;
          delete user.password;
          delete user.cPassword;
          delete user.confirmPassword;
          resolve(true);
        });
      });
    });
  },

  beforeUpdate(user) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {return reject(err);}
        if (user.password) {
          if (user.password !== user.confirmPassword) {
            return reject(new EnyoError('error_wrong_password_confirmation'));
          }
          bcrypt.hash(user.password, salt, (err2, hash) => {
            if (err2) {
              return reject(err2);
            }
            user.encryptedPassword = hash;
            delete user.password;
            delete user.cPassword;
            delete user.confirmPassword;
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    });
  },

  comparePassword(password, user) {
    return new Promise((resolve, reject) => {
      if (!password || !user || !user.encryptedPassword) {
        reject(new Error('error_missing_password'));
        return;
      }
      bcrypt.compare(password, user.encryptedPassword, (err, match) => {
        if (err) {resolve(err);}
        if (match) {
          resolve(true);
        } else {
          reject(new Error('Mot de passe incorrect'));
        }
      });
    });
  }
};
