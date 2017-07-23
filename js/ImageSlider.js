/*
Author: Erik Thomas
Company: Bright Thought, LLC
Website: www.brightthoughtdesign.com
*/

(function($){
	"use strict";
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
				style : 'fade',
				radio : true,
				arrows : true,
				height : '50%',
				bgcolor : '#ffffff',
				slideLength : 5,
				bgsize : 'cover'	
			}, options),
			init : function(){
				var doc = $(document);				
				is.gatherImages();
				is.setHTML(is.settings.style);
				is.checkbox();
				if(is.imagesrc.length > 1 ){
				is.timer = setInterval(function(){is.imageRotate(is.settings.style);}, is.settings.speed);
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
				$('img', is.el).each(function(i){
					if(i <= is.settings.slideLength){
						is.imagesrc[i] = new Image();
						is.imagesrc[i] = $(this).attr('src');
						if($(this).parent('a').length){
							is.linksrc[i] = $(this).closest('a').attr('href');
							$(this).unwrap();
						}
						$(this).remove();
					}else{
						$(this).remove();
					}
				});//end each
				is.index = is.imagesrc.length; 
			},
			
			setHTML : function(style){
				is.el.addClass('imageslider');
				is.el.css({'width' : '100%',
							'height' : is.settings.height});
				if(is.settings.radio){
					is.el.html('<div id="CheckBoxes"></div>');
				}else{
					is.el.html('');
				}
				
				if(is.settings.arrows && is.imagesrc.length > 1){
					is.el.append('<div id="rightarrow"></div><div id="leftarrow"></div>');
				}
				switch(style){
					case 'fade' :
						is.el.css('background-color', is.settings.bgcolor);
						var arrange = is.imagesrc.length;							
						for(i=0; i < is.imagesrc.length; i++){
							if(is.settings.radio){
								$('#CheckBoxes').append('<div data-image="' + i + '" class="checkbox"></div>');
							}
							is.el.append('<div class="ImageSlideShow" id="' + i + '"></div>');
							if(typeof is.linksrc[i] !== 'undefined'){
								$("#" + i).wrap('<a href="' + is.linksrc[i] + '"></a>');
							}
							$("#" + i).css({'background-image' : 'url(' + is.imagesrc[i] + ')',
													'background-size' : is.settings.bgsize,
													'background-position' : 'center',
													'background-repeat' : 'no-repeat',
													'background-color' : is.settings.bgcolor,
													'z-index' : arrange});
							arrange--;
						}//end for loop						
					break;
					
					case 'slide' :
						var containerWidth = is.el.width();
						var originalWidth = containerWidth;
						containerWidth = containerWidth * is.imagesrc.length;
						is.el.append('<ul id="btSlide"></ul>');
						$('#btSlide').css('width', containerWidth);
						is.el.css('overflow', 'hidden');
						$('#btSlide').css({'list-style-type' : 'none',
										'margin' : 0,
										'padding' : 0,
										'height' : '100%',
										'position' : 'relative'});
						for(var i=0; i < is.imagesrc.length; i++){
						if(is.settings.radio){
								$('#CheckBoxes').append('<div data-image="' + i + '" class="checkbox"></div>');
							}
						$('#btSlide').append('<li data-slide="' + i + '"><div class="ImageSlideShow" id="' + i + '"></div></li>');
						$("#" + i).css({'background-image' : 'url(' + is.imagesrc[i] + ')',
													'background-size' : 'cover',
													'background-position' : 'center',
													'background-repeat' : 'no-repeat',
													'width' : originalWidth,
													'z-index' : arrange});
							
						}//end for loop
						$('#btSlide > li').css({'width' : originalWidth, 'display' : 'inline-block'});
					break;
				}
				// Activates the div checkbox for the first image
						$('div[data-image="0"]').addClass('checkbox-active');
			},
			slideFunction : function(count){
				var content = $('#btSlide li[data-slide='+ count +']').clone();
				$('#btSlide li[data-slide='+ count +']').remove();
				$('#btSlide').append( content );
				$('#btSlide').css({'left' : 0 });	
			},
			imageRotate : function(style){
				switch(style){
					case 'fade' :
						//This will move the first image added of all other images
						if(is.num === 0){
							$("#" + is.num).css('z-index', is.imagesrc.length);	
						}
						$("#" + is.num).fadeOut(600);
						//Deactivates current div checkbox
						$('.checkbox-active').removeClass('checkbox-active');
						//resets counter at the last image
						if(is.num === is.imagesrc.length - 1){
							is.num = 0;
							$("#" + is.num).css('z-index', 1);
						}else{				
							is.num++;
						}
						$("#" + is.num).show();
						//Activates div checkbox for the rotate in image
						$(".checkbox[data-image=\"" + is.num + "\"]" ).addClass('checkbox-active');
					break;
					
					case 'slide' :
						
						
						var imageWidth = is.el.width();
						
						  $("#btSlide").animate({left : -imageWidth}, 500, function(){
							  $('.checkbox-active').removeClass('checkbox-active');
							  
							  is.slideFunction( is.num );
							  
							  if(is.num === is.imagesrc.length - 1){
								  is.num = 0;
							  }else{				
								  is.num++;
							  }
							  
							  $(".checkbox[data-image=\"" + is.num + "\"]" ).addClass('checkbox-active');
						  });
					  
						
					
					break;
				}
			},
			checkbox : function(){
				$('.checkbox').each(function(){
					$(this).click(function(){
						//Deactivate div checkbox
						$('.checkbox-active').removeClass('checkbox-active');
						var value = $(this).attr('data-image'), currentCount = is.num;
						
						if(is.settings.style === 'fade'){
							$("#" + is.num).fadeOut(600);
							$("#" + value).fadeIn(600);
							//activate div checkbox
							$("div[data-image=\"" + value + "\"]").addClass('checkbox-active');						
							is.num = value;
						}else if(is.settings.style === 'slide'){
							var imageWidth = is.el.width(), nextContent;
							nextContent = $('#btSlide li[data-slide='+ value +']').clone();
							$('#btSlide li[data-slide='+ value +']').remove();
							$('#btSlide li:first-child').after( nextContent );
							
							$("#btSlide").animate({left : -imageWidth}, 500, function(){
								$('.checkbox-active').removeClass('checkbox-active');
								
								is.slideFunction( currentCount );
								
								$(".checkbox[data-image=\"" + value + "\"]" ).addClass('checkbox-active');
								is.num = value;
							});
						}
						//resets timer after radio button click
						clearInterval(is.timer);
						is.timer = setInterval(function(){is.imageRotate(is.settings.style);}, is.settings.speed);
					});
					
				});
			},
			nextprev : function(dir){
				var currentCount = is.num;
				if(is.settings.style === 'fade'){
					$('.checkbox-active').removeClass('checkbox-active');
					$("#" + is.num).fadeOut(600);
				}
				if(dir === 'next'){
					if(is.num === is.imagesrc.length - 1){						
						is.num = 0;							
					  }else{
						 is.num++;
					  }
				}else if(dir === 'prev'){
					if(is.num === 0){
						is.num = is.imagesrc.length - 1;		
					  }else{
						 is.num--;
					  }
				}
				if(is.settings.style === 'fade'){
					$("#" + is.num).fadeIn(600);
					$(".checkbox[data-image=\"" + is.num + "\"]" ).addClass('checkbox-active');
				}else if(is.settings.style === 'slide'){
					var imageWidth = is.el.width(), nextContent;
					nextContent = $('#btSlide li[data-slide='+ is.num +']').clone();
					$('#btSlide li[data-slide='+ is.num +']').remove();
					$('#btSlide li:first-child').after( nextContent );
					
					$("#btSlide").animate({left : -imageWidth}, 500, function(){
						$('.checkbox-active').removeClass('checkbox-active');
						
						is.slideFunction( currentCount );
						
						$(".checkbox[data-image=\"" + is.num + "\"]" ).addClass('checkbox-active');
					});
				}
				clearInterval(is.timer);
				is.timer = setInterval(function(){is.imageRotate(is.settings.style);}, is.settings.speed);
			}
		};// end var is
		
		//initiates slider
		is.init();
		
		
	};// end imageslide function	
}(jQuery));