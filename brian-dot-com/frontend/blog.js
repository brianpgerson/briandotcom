var Post = require('./post.js');

function Blog(el){
  this.$el = $(el);
  this.posts = this.myPosts();
}

Blog.prototype.myPosts = function(){
  $.ajax({
    type: 'GET',
    url: '/posts',
    dataType: 'json',
    success: function(myPosts) {
      this.addPosts(myPosts);
    }.bind(this)
  });
};

Blog.prototype.addPosts = function (posts) {
  this.posts = posts;
  this.addNewPosts();
};

Blog.prototype.postBuilder = function() {
  for (var i = this.posts.length - 1; i >= 0; i--) {
    this.$el
      .append('<div class="blog-post"><a href="' +
        this.posts[i].post_url +'"> ' +
        this.posts[i].title + '</a><p>' +
        this.posts[i].body +
        '</p></div><br/><br/>');
  }
};

Blog.prototype.addNewPosts = function() {
  $.ajax({
    type: 'GET',
    url: 'http://api.tumblr.com/v2/blog/brianpgerson.tumblr.com/posts?api_key=oYJfQejhqA9Vw5bpB1ejFGzoHjUSM8aVKKUmqCaQTsj6KeujM0',
    data: { get_param: 'value' },
    dataType: 'jsonp',
    success: function (data) {
      this.tumblrPostHandler(data);
    }.bind(this)
  });
};

Blog.prototype.tumblrPostHandler = function(data){
  var allPosts = [];
  if (data !== undefined){
    var postResponses = data.response.posts;
    postResponses.forEach(function(post){
      var date = Date.parse(post.date);
      var freshPost = new Post(post.title, post.body, post.post_url, date);
      allPosts.push(freshPost);
    });
    var response = $.ajax({
      type: 'GET',
      url: '/posts',
      dataType: 'json',
      success: function (internalPosts){
        this.compareTumblrToInternal(internalPosts, allPosts);
      }.bind(this),
      error: function(errResponse){
        console.log(errResponse);
      }
    });
  }
};

Blog.prototype.compareTumblrToInternal = function (data, tumblrPosts) {
  var dates = data.map(function(post){ return post.date; });
  var newPosts =
    tumblrPosts.filter(function(post) { return dates.indexOf(post.date) < 0; });
  newPosts.forEach(function(post){
    this.posts.push(post);
    $.ajax({
      type: 'POST',
      url: '/posts',
      data: { post: post },
      dataType: 'json',
      success: function (response) {
        console.log("You did it! Data:" + response);
        this.postBuilder();
      },
      error: function() {
        console.log("Uh oh");
      }
    });
  }.bind(this));
  this.postBuilder();
};

module.exports = Blog;
