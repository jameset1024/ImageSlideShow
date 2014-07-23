/*
Author: Erik Thomas
Site: www.erikjamesthomas.com
*/

(function($){
	$.fn.ImageSlide = function(options){
		var is = {
			el : $(this),
			imagesrc : [],
			linksrc : [],
			num : 0,
			timer : '',
			//adds user options
			settings : $.extend({
				speed : 10000,
				radio : true,
				arrows : true	
			}, options),
			init : function(){
				var doc = $(document);				
				is.gatherImages();
				is.gatherLinks();
				is.setHTML();
				is.checkbox();
				if(is.imagesrc.length > 1 ){
				is.timer = setInterval(function(){is.imageRotate()}, is.settings.speed);
				}
				doc.delegate('#leftarrow', 'click', function(){
					var dir = 'prev'; 
					is.nextprev(dir);
				});
				doc.delegate('#rightarrow', 'click', function(){
					var dir = 'next';
					is.nextprev(dir);
				});
			},
			gatherImages : function(){
				$('img').each(function(i){
					if(i <= 5){
					is.imagesrc[i] = $(this).attr('src');
					$(this).remove();
					}else{
					$(this).remove()
					};
				});//end each
				is.index = is.imagesrc.length; 
			},
			gatherLinks : function(){
				$('a').each(function(i){
					if(i <= 5){
					is.linksrc[i] = new Image();
					is.linksrc[i] = $(this).attr('href');
					$(this).remove();
					}else{
					$(this).remove()
					};
				});//end each
			},
			setHTML : function(){
				if(is.settings.radio){
					is.el.html('<div id="CheckBoxes"></div>');
				}else{
					is.el.html('')
				}
				
				if(is.settings.arrows){
				is.el.append('<div id="rightarrow"></div><div id="leftarrow"></div>');
				}
				
				var arrange = is.imagesrc.length;							
				for(i=0; i < is.imagesrc.length; i++){
					if(is.settings.radio){
					$('#CheckBoxes').append('<div data-image="' + i + '" class="checkbox"></div>');
					}
					is.el.append('<a href="' + is.linksrc[i] + '"><div class="ImageSlideShow" id="' + i + '"></div></a>');
					
					$("#" + i).css({'background-image' : 'url(' + is.imagesrc[i] + ')',
											'background-size' : 'cover',
											'background-position' : 'center',
											'background-repeat' : 'no-repeat',
											'z-index' : arrange});
					arrange--;
				}//end for loop
				// Activates the div checkbox for the first image
				$('div[data-image="0"]').addClass('checkbox-active');
			},
			imageRotate : function(){
				//This will move the first image added of all other images
				if(is.num == 0){
					$("#" + is.num).css('z-index', is.imagesrc.length)	
				}
				$("#" + is.num).fadeOut(600);
				//Deactivates current div checkbox
				$('.checkbox-active').removeClass('checkbox-active');
				//resets counter at the last image
				if(is.num == is.imagesrc.length - 1){
					is.num = 0;
					$("#" + is.num).css('z-index', 1);
				}else{				
				is.num++
				}
				$("#" + is.num).show();
				//Activates div checkbox for the rotate in image
				$(".checkbox[data-image=\"" + is.num + "\"]" ).addClass('checkbox-active');
			},
			checkbox : function(){
				$('.checkbox').each(function(){
					$(this).click(function(){
						//Deactivate div checkbox
						$('.checkbox-active').removeClass('checkbox-active')
						var value = $(this).attr('data-image');
						$("#" + is.num).hide();
						$("#" + value).show();
						//activate div checkbox
						$("div[data-image=\"" + value + "\"]").addClass('checkbox-active');						
						is.num = value;
						
						//resets timer after radio button click
						clearInterval(is.timer);
						is.timer = setInterval(function(){is.imageRotate()}, is.settings.speed);
					});
					
				});
			},
			nextprev : function(dir){
				console.log('responding');
				$("#" + is.num).hide();
				if(dir == 'next'){
					if(is.num == is.imagesrc.length - 1){						
						is.num = 0;							
					  }else{
						 is.num++
					  }
				}else if(dir == 'prev'){
					if(is.num == 0){
						is.num = is.imagesrc.length - 1;		
					  }else{
						 is.num--
					  }
				}

				$("#" + is.num).show();
				$("input[value=\"" + is.num + "\"]").prop('checked', true);
				clearInterval(is.timer);
				is.timer = setInterval(function(){is.imageRotate()}, is.settings.speed);
			}
		}// end var is
		
		//initiates slider
		is.init();
		
		
	};// end imageslide function	
}(jQuery));