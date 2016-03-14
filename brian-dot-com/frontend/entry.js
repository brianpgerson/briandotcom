var Post = require ('./post.js');
var Blog = require ('./blog.js');

$(document).on('page:change', function(){
      var $blog = $('#results');
      if ($blog.length > 0) {

        var blog = new Blog($blog);
      }
});
