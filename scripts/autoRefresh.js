/*var prevContent = new Array();
var contents = new Array();
var counter = 0;

setInterval(function(){
	
	
  $.ajax({
		url : '.',
	
		success : function(data) {
			//alert(data);
			$(data).each(function(){
				prevContent[counter] = contents[counter];
				contents[counter] = $(this);
				
				if(prevContent[counter] != contents[counter]){
					console.log(contents[counter].text);
				}
			});
		}
	});
	
	
}, 1000);*/
