$(function() {
  $('.nav-toggle').on('click', function(){
    $('.navigation').slideToggle();
  });
  var clicked = false;
  $('.nav-toggle').click(function () {
      clicked = true;
  });
  if (clicked) {
    $('.donate-anchor').css({
      'z-index': -1
    });
  } else {
    $('.donate-anchor').css({
      'z-index': 1
    });
  }
});
