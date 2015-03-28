var Parse = require('parse').Parse;

Parse.initialize('EVYQ3z8RxbmAwigJXTpGXHu7bzeMY8DEJOJSxVYj', 'iHa7fkaXNIWZAUvmjyDftPXpzJjSRsGTb5blnjcY');

var Achievement = Parse.Object.extend('Achievement');
var text = process.argv.slice(2).join(' ').trim();

if (text) {
  new Achievement()
    .save({text: text})
    .then(function(object) {
      console.log('success');
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
