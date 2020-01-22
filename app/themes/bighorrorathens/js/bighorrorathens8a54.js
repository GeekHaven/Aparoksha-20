$(document).ready(function(){

  var ua = navigator.userAgent,
      isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

  if($('.addthis_toolbox').length > 0) addthis.addEventListener('addthis.ready', get_initial_share_link_positions);

  // INITIATE MIXITUP
  $('#Grid').mixitup({
      effects: ['fade'],
      easing: 'snap',
      resizeContainer: true,
      transitionSpeed: 600,
      onMixStart: function(e) {
        $("li.filter").removeClass("current-list-item");
        $("li[data-filter='" + e['filter'] +"']").addClass("current-list-item");
      }
  });

  /*
   * MOUSE INTERACTIONS
   */
  
  // Show Work/Post details on hover, with a fancy animation
  // REFACTOR IT, too long! 
  if( !isMobileWebkit ) {
    $('div.fitem').hover(
      function() {
        $(this).find('.fi-image-wrapper').stop().animate({opacity: 0}, 350);
        $(this).find('.fi-icon-wrapper').stop().animate({right: 20, opacity: 1}, 450, 'easeInOutQuart');
        $(this).find('.fi-info').stop().animate({left: 0, opacity: 1}, 450, 'easeInOutQuart');
        $(this).find('.fi-info p.fi-title').stop().delay(100).animate({left: 0, opacity: 1}, 450, 'easeInOutQuart');
      },
      function(){
        $(this).find('.fi-info p.fi-title').stop().animate({left: -570, opacity: 0}, 450, 'easeInOutQuart');
        $(this).find('.fi-icon-wrapper').stop().delay(100).animate({right: -570, opacity: 0}, 450, 'easeInOutQuart');
        $(this).find('.fi-info').stop().delay(100).animate({left: -570, opacity: 0}, 450, 'easeInOutQuart');
        $(this).find('.fi-image-wrapper').stop().delay(150).animate({opacity: 1}, 350);
      }
    );
  }

  // Show page name when hovering on the icon on a featured item
  $('.fi-icon-wrapper').hover(
    function(){
      $(this).find('.fi-icon-title').animate({opacity: 1, right: 0}, 300, 'easeInOutQuart');
    }, 
    function(){
      $(this).find('.fi-icon-title').animate({opacity: 0, right: -65}, 300, 'easeInOutQuart');
    }
  );

  // Show links when hovering on "Share"
  $('.bh-share').mouseenter(function(){
    $('.addthis_toolbox').stop().fadeIn(200);
    for (var i = 0; i < link_positions.length; i++) {
      $('.addthis_toolbox > span:nth-child(' + (i+1) + ')').stop().animate({left: link_positions[i]}, 200);
    }
  });
  $('#bh-share-container').mouseleave( function(){
    $('.addthis_toolbox').stop().fadeOut(200);
    $('.addthis_toolbox > span').stop().animate({left: 0}, 200);
  });

  // Scroll back to top.
  $("#back-to-top a").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 600, 'easeInOutQuart');
    return false;
  });

  
  // Big Icon animation, in bottom of homepage
  $(".big-icon a").hover(
    function(){
      $(this).siblings(".rays").css('transform', 'rotate(0deg)').animate({
        transform: 'rotate(36000deg)'
      }, 1800000, 'linear');
    },
    function(){
      $(this).siblings(".rays").stop(true, false);
    }
  );

  function get_initial_share_link_positions() {
    link_positions = [];
    $('.addthis_toolbox > span').each(function(i, e){
      if(i == 0) link_positions[i] = 0;
      else link_positions[i] = link_positions[i-1] + share_link_width;

      share_link_width = $(e).find('a').width() + 12;
      console.log(share_link_width);
    });
    $('.addthis_toolbox').addClass('after_init');
  }

  /* 
    WAYPOINT STUFF 
  */
  // Sticky post content

  $(window).load(function(){

   if( $('.journal-left').height() < $('.journal-right').height() && !isMobileWebkit) {

    $('.single-post article.type-post .journal-left').waypoint('sticky', {
      offset: 126
    });

    $('.single-post article.type-post .journal-info').waypoint(
      function(d) {
        console.log('hits top, scrolling '+d);
        $('.sticky-wrapper').removeClass('reached-bottom');
      },
      { offset: 126 }
    );

    $('.journal-left').css('width', $('.journal-left').outerWidth() + 'px' );


  }
   
  $('.sticky-wrapper').css('position', 'absolute');

  });

  $(window).scroll(function(){ 
    if($('.journal-left').length > 0 && !isMobileWebkit) {

      var off = $('.journal-left').offset();
      var height = $('.journal-left').outerHeight();

      var off2 = $('#journal-item-wrapper').offset();
      var height2 = $('#journal-item-wrapper').outerHeight();
      if( (off.top + height) >= (off2.top + height2 - 139) ) { 
        $('.sticky-wrapper').addClass('reached-bottom');
        $.waypoints('refresh');
        console.log('bottom');
      }

    }

    var wscrt = $(window).scrollTop();
    if( wscrt <= 40 ) var martop = 70 - wscrt;
    else var martop = 30;
    if( isMobileWebkit ) $("header hr.slim").animate({marginTop: martop + 'px'}, 300 );
    else $("header hr.slim").css('margin-top', martop + 'px');
  });

  $('#logo a').hoverwords({delay: 10});

});
