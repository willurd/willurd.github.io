#!/usr/bin/env node

var Parse = require('parse').Parse;
var read = require('read');

Parse.initialize("EVYQ3z8RxbmAwigJXTpGXHu7bzeMY8DEJOJSxVYj", "iHa7fkaXNIWZAUvmjyDftPXpzJjSRsGTb5blnjcY");

var Achievement = Parse.Object.extend('Achievement');
var username = process.argv[2];
var password = process.argv[3];
var text = process.argv.slice(4).join(' ').trim();

if (text) {
  Parse.User.logIn(username, password, {
    success: function(user) {
      console.log(4);
      var acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(false);

      var achievement = new Achievement();
      achievement.setACL(acl);
      achievement
        .save({text: text})
        .then(function(object) {
          console.log('success');
        }, function(e) {
          console.log('error:', e);
        });
    },
    error: function(user, error) {
      console.log('Unable to log in:', error);
    }
  });
} else {
  new Parse.Query(Achievement)
    .limit(10)
    .descending('createdAt')
    .find(function(achievements) {
      console.log('Achievements:', achievements.map(function(achievement) {
        return achievement.get('text');
      }));
    });
}
