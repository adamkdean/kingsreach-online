$(function() {
  $('.nav-toggle').on('click', function(){
    $('.navigation').slideToggle();
  });
});

$(function(){
    $('nav a').click(function(){
      $('a').removeClass("active");
      $(this).addClass("active");
  });
});
