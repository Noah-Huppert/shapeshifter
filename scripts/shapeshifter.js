$(document).on('click', '.controls a', false);

$(document).on('click', '.set-desktop, .set-mobile', function(event){
  $('.controls a').removeClass('selected');
  $(this).addClass('selected');
});

$(document).on('click', '.set-desktop', function(event) {
  $('.frame-wrapper')
    .removeClass('mobile')
    .removeClass('iphone-4')
    .removeClass('iphone-5')
    .removeClass('ipad')
    .addClass('desktop')
    .attr('style', '');
  $('.orientation-toggle').addClass('disabled')
  if (Modernizr.localstorage){
    localStorage.setItem('shapeshifter-device', 'desktop');
  }
});

$(document).on('click', '.set-mobile', function(event) {
  $('.frame-wrapper')
    .removeClass('desktop')
    .addClass('mobile')
    .attr('style', '');
  $('.orientation-toggle').removeClass('disabled')
});

$(document).on('click', '.set-iphone-4', function(event) {
  $('.frame-wrapper')
    .removeClass('iphone-5')
    .removeClass('ipad')
    .addClass('iphone-4')
    .attr('style', '');
  if (Modernizr.localstorage){
    localStorage.setItem('shapeshifter-device', 'iphone-4');
  }
});

$(document).on('click', '.set-iphone-5', function(event) {
  $('.frame-wrapper')
    .removeClass('iphone-4')
    .removeClass('ipad')
    .addClass('iphone-5')
    .attr('style', '');
  if (Modernizr.localstorage){
    localStorage.setItem('shapeshifter-device', 'iphone-5');
  }
});

$(document).on('click', '.set-ipad', function(event) {
  $('.frame-wrapper')
    .removeClass('iphone-4')
    .removeClass('iphone-5')
    .removeClass('ipad')
    .attr('style', '');
    if (Modernizr.localstorage){
    localStorage.setItem('shapeshifter-device', 'ipad');
  }
});

$(document).on('click', '.set-custom', function(event) {//Custom viewport size -> click
	//$('.frame-wrapper').attr('class', 'frame-wrapper mobile iphone-5');
	$('#customWH').toggle();
	$('#customWH').transition({ x: -1 * $('#customWH').width()});
  if (Modernizr.localstorage){
  	 localStorage.setItem('shapeshifter-device', 'desktop');
  	 localStorage.setItem('shapeshifter-orientation', 'portrait');
  }
});

$(document).on('click', '#customWH img', function(event) {//Custom viewport size set button -> click
	if($('#customW').val() != '' && $('#customH').val() != ''){/* Checking to make sure all values have been entered */
		$('#customWH').transition({ x: $('#customWH').width()});
		$('#customWH').hide();
		 $('.frame-wrapper').css({
		 	'width' : $('#customW').val(),
		 	'height' : $('#customH').val(),
		 	'padding' : '20px'
		 });
		 $('#customW').val('');
		 $('#customH').val('');
	} 
	/* Below is a fancy looking way of telling the user to enter all values */
	else{
		$('#customWH')
		.transition({ x: $('#customWH').width()}, function(){//Hides input bar
		$('#customWH img').hide();
		$('.customInput').hide();
		$('#customResizeError').show().html('Please specify both width and height');
		})
		.transition({ x: -1 * $('#customWH').width() + 10}, function(){ //Shows input bar, displays message for 2 seconds
			$('#customWH')
			.transition({ x: ( -1 * $('#customWH').width()) - 10, duration: 2000})//A little feedback movement to let user know that its going to go away
			.transition({ x: $('#customWH').width(), delay: 0}, function(){//Shows regular input bar
				$('#customResizeError').show().html('');
				$('#customWH img').show();
				$('.customInput').show();
			})
			.transition({ x: -1 * $('#customWH').width()});
		});
	} 
	/* End Else */
});

$(document).on('click', '.orientation-toggle', function(event) {
  if (!$('.orientation-toggle').hasClass('disabled')){
    if ($('.frame-wrapper').hasClass('landscape')){
      $('.frame-wrapper').removeClass('landscape');
      $('.controls').removeClass('landscape');
      if (Modernizr.localstorage){
        localStorage.setItem('shapeshifter-orientation', 'portrait');
      }
    } else {
      $('.frame-wrapper').addClass('landscape');
      $('.controls').addClass('landscape');
      if (Modernizr.localstorage){
        localStorage.setItem('shapeshifter-orientation', 'landscape');
      }
    }
  }
});

$(document).on('click', '#customURLContainer img', function(event) {
  var url;
  url = $('#customURL').val();
  if (url.length > 0){
    $('.frame').attr('src', url);
  }
  $('#customURLContainer').transition({ x: $('#customURLContainer').width()}, function(){
  	$('#customURLContainer').hide();
  });
});

$(document).on('click', '.set-location', function(event) {
  //var url;
  //url = prompt("Enter a new URL to browse to:", "http://");
   $('#customURLContainer').show();
  $('#customURLContainer').transition({ x: -1 * $('#customURLContainer').width()});
  /*if (url.length > 0){
    $('.frame').attr('src', url);
  }*/
});

$(document).ready(function(){
  if (window.location.origin != 'http://cobyism.com' && window.location.href != 'http://localhost:4000/'){
    $('.frame').attr('src', '../');
  }
  if (Modernizr.localstorage){
    device = localStorage.getItem('shapeshifter-device');
    orientation = localStorage.getItem('shapeshifter-orientation');
    $("body").removeClass('transitions');
    $(".set-" + device).click();
    if (orientation == "landscape"){
      $(".orientation-toggle").click();
    }
    $("body").addClass('transitions');
  }
  if (getUrlParam('url') != ""){
    $('.frame').attr('src', getUrlParam('url'));
  }
});

function getUrlParam(name){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* Keyboard shortcuts */

$(document).bind('keydown', 'alt+shift+u', function(){$('.set-desktop').click()});
$(document).bind('keydown', 'alt+shift+i', function(){$('.set-iphone-4').click()});
$(document).bind('keydown', 'alt+shift+o', function(){$('.set-iphone-5').click()});
$(document).bind('keydown', 'alt+shift+p', function(){$('.set-ipad').click()});
$(document).bind('keydown', 'alt+shift+l', function(){$('.orientation-toggle').click()});
$(document).bind('keydown', 'alt+shift+g', function(){$('.set-location').click()});
