$('.push-left').click(function(){
  if($('.navbar-collapse-left').hasClass('collapse')){
    $('.navbar-collapse-left').animate({
      left: 0
    }, 250);
  } else {
    $('.navbar-collapse-left').animate({
      left: -300
    }, 250);
  }
});
