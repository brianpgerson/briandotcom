/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Post = __webpack_require__ (1);
	var Blog = __webpack_require__ (2);

	$(document).on('page:change', function(){
	      var $blog = $('#results');
	      if ($blog.length > 0) {
	        debugger;
	        var blog = new Blog($blog);
	      }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Post(title, body, url, date) {
	  this.title = title;
	  this.body = body;
	  this.url = url;
	  this.date = date;
	  this.author = "Brian Gerson";
	}

	module.exports = Post;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Post = __webpack_require__(1);

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


/***/ }
/******/ ]);