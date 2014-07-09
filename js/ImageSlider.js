(function($){
	$.fn.ImageSlide = function(options){
		var is = {
			el : $(this),
			imagesrc : [],
			linksrc : [],
			num : 0,
			timer : '',
			settings : $.extend({
				speed : 10000	
			}, options),
			init : function(){				
				is.gatherImages();
				is.gatherLinks();
				is.setHTML();
				is.checkbox();
				if(is.imagesrc.length > 1 ){
				is.timer = setInterval(function(){is.imageRotate()}, is.settings.speed);
				}
				
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
					is.linksrc[i] = $(this).attr('href');
					$(this).remove();
					}else{
					$(this).remove()
					};
				});//end each
			},
			setHTML : function(){
				is.el.html('<div id="CheckBoxes"></div>');
				var arrange = is.imagesrc.length;							
				for(i=0; i < is.imagesrc.length; i++){
					
					$('#CheckBoxes').append('<input type="radio" name="image" class="imageButton" value="' + i + '">');
					
					is.el.append('<a href="' + is.linksrc[i] + '"><div class="ImageSlideShow" id="' + i + '"></div></a>');
					
					$("#" + i).css({'background-image' : 'url(' + is.imagesrc[i] + ')',
											'background-size' : 'contain',
											'z-index' : arrange});
					arrange--;
				}//end for loop
				$('input[value="0"]').prop('checked', true);
			},
			imageRotate : function(){
				if(is.num == 0){
					$("#" + is.num).css('z-index', is.imagesrc.length)	
				}
				$("#" + is.num).fadeOut(600);
				$("input[value=\"" + is.num + "\"]").prop('checked', false);
				if(is.num == is.imagesrc.length - 1){
					is.num = 0;
					$("#" + is.num).css('z-index', 1);
				}else{				
				is.num++
				}
				$("#" + is.num).show();
				$("input[value=\"" + is.num + "\"]").prop('checked', true);
			},
			checkbox : function(){
				$('input[name="image"]').each(function(){
					$(this).click(function(){
						var value = $(this).val();
						$("#" + is.num).hide();
						$("#" + value).show();						
						is.num = value;
						clearInterval(is.timer);
						is.timer = setInterval(function(){is.imageRotate()}, is.settings.speed);
					});
					
				});
			}
		}// end var is
		is.init();
		
		
	};// end imageslide function	
}(jQuery));