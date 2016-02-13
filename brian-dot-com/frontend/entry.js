$(function(){
  $.ajax({
    type: 'GET',
    url: 'http://api.tumblr.com/v2/blog/brianpgerson.tumblr.com/posts?api_key=oYJfQejhqA9Vw5bpB1ejFGzoHjUSM8aVKKUmqCaQTsj6KeujM0',
    data: { get_param: 'value' },
    dataType: 'jsonp',
    success: function (data) {
    for (var i = 0; i <= 19; i++) {
        debugger;

        $('#results').append('<div style="text-align: center; border-top: 1px solid #aaa; width: 800px;"><a href="' + data.response.posts[i].post_url +'"> ' + data.response.posts[i].title + '</a>' + data.response.posts[i].body + '</div><br/><br/>');
                }
    }
});
});
