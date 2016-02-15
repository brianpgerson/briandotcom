var Post = require ('./post.js');
var Blog = require ('./blog.js');

$(function(){
  var $blog = $('#results');
  var blog = new Blog($blog);
  blog.postBuilder();

});
