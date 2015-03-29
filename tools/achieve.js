var Parse = require('parse').Parse;
var read = require('read');

Parse.initialize("EVYQ3z8RxbmAwigJXTpGXHu7bzeMY8DEJOJSxVYj", "iHa7fkaXNIWZAUvmjyDftPXpzJjSRsGTb5blnjcY");

var Achievement = Parse.Object.extend('Achievement');
var text = process.argv.slice(2).join(' ').trim();

if (text) {
  read({ prompt: 'Username:' }, function(err, username) {
    if (err) {
      console.log('Error reading username:', err);
      return;
    }

    read({ prompt: 'Password:', silent: true }, function(err, password) {
      if (err) {
        console.log('Error reading password:', err);
        return;
      }

      Parse.User.logIn(username, password, {
        success: function(user) {
          new Achievement()
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
    });
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
