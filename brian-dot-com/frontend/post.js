function Post(title, body, url, date) {
  this.title = title;
  this.body = body;
  this.url = url;
  this.date = date;
  this.author = "Brian Gerson";
}

module.exports = Post;
