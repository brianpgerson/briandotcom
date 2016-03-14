$(function(){
  $(document).on("scroll", function(){
    $('.horizontal-border').addClass('grow-wide');
    setTimeout(function(){
      $('.horizontal-border').addClass('grow-tall');
    }, 480);
  });
});
