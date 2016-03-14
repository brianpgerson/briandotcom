$(function(){
  $(document).on("scroll", function(){
    setTimeout(function(){
      $('.horizontal-border').addClass('grow-wide');
      setTimeout(function(){
        $('.horizontal-border').addClass('grow-tall');
      }, 480);
    }, 1000);
  });
});
