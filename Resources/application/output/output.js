steal( 
	'jquery',
	'jquery/controller',
	'application/scripts/jcanvas.js',
	function($){

		/**
		 * @class Ui.Output
		 */
		$.Controller('Application.Output',
		/** @Static */
		{
			defaults : {
				oldest : Infinity,
				newest : 0,
				owner  : "",
				location : "",
				canvas : null,
				ctx : null 
			}
		},
		/** @Prototype */
		{
			init : function(){
				//// console.log( window.opener.tinyMCE.activeEditor.getContent() );
				var _this = this;
				var _opts = _this.options;
				var charOwner = "";
				
				_opts.owner = charOwner = $("#controls", window.opener.document).attr('data-owner');
				_opts.location = $("#controls", window.opener.document).attr('data-location');
				
				$("#filedata").html( 
					window.opener.tinyMCE.activeEditor.getContent()
				);
				var _trash = $("#trash", window.opener.document).html();
				$("#trash").html( 
					_trash
				);
				if ($("#trash").find("span").length != 0) {
					$("#trash").show();
				} else {
					$("#trash").hide();
				}
				var txt = _opts.owner + " / " + _opts.location + " / Grey Editor Document";
				$("#document-owner").html(txt);
				
				this.generate1();	
				
				var _pos1 = $("#filedata").position();
					
				$("#var1").click(function() {
					_this.generate1();	
				});		
				$("#var2").click(function() {
					_this.generate2();	
				});
			},
			
			generate1 : function() {
				// console.log("generate var 1");
				
				$(".label").remove();
				
				var _this = this;
				var _opts = _this.options;
				var page = 1;
				
				var lastCharOwner = _opts.owner;

				$("#filedata span")
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
						var charOwner = $(this).attr("data-owner");
						
      					if( timestamp > _opts.newest && charOwner == _opts.owner) _opts.newest = timestamp;
      					if( timestamp < _opts.oldest && charOwner == _opts.owner) _opts.oldest = timestamp;
					}
				)
				.each(
					function() {
						var charOwner = $(this).attr("data-owner");
						var _span = this;
						
						if( charOwner == _opts.owner ) {
							var timestamp = $(this).attr('datetime');
	      					var age = _opts.newest - timestamp;
	      					var lightness = (age / ( _opts.newest - _opts.oldest ));
	      					var rgb = Math.floor(255*lightness) - 25;
							$(this).css(
								{
									'color' : 'rgb('+rgb+','+rgb+','+rgb+')',
									'background-color': 'rgb(255, 255, 255)'
								}
							);
						} else {
							$(this).css(
								{
									'color': 'rgb(100, 100, 100)',
									'background-color': 'rgb(255, 255, 255)'
								}
							).attr("class","border");
						}
						
						if (charOwner !== lastCharOwner) {
							var pos = $(this).offset();
							var text = "";
							if (charOwner == "unknown") {
								text = "unknown";
							} else if (charOwner == "clipboard") {
								text = "clipboard";
							} else {
								text = charOwner + " / " + $(this).attr("data-location");
							}
							
							$("<div class='label'>Source: "+text+"</div>")
							.prependTo("#output")
							.css(
								{
									"top" : (pos.top - 8) + "px",
									"left" : (pos.left) + "px"
								}
							);
						}
						
						/*
						if (pos.left == 25 && pos.top >= 900 * page) {
							//// console.log("left");
							$(_span).before("<div class='snippets'>ewrwerewrewrwrewrewrewrwerewqrewqreqwrewqr ewr qwr qwr wr wq rqw </div>");
							page++;
						}
						*/
					
						lastCharOwner = charOwner;
					}
				);
				
				$("#trash span")
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
						var charOwner = $(this).attr("data-owner");
						
      					if( timestamp > _opts.newest) _opts.newest = timestamp;
      					if( timestamp < _opts.oldest) _opts.oldest = timestamp;
					}
				)
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
      					var age = _opts.newest - timestamp;
      					var lightness = (age / ( _opts.newest - _opts.oldest ));
      					var rgb = Math.floor(255*lightness) - 25;
						$(this).css(
							{
								'color' : 'rgb('+rgb+','+rgb+','+rgb+')',
								'background-color': 'none'
							}
						);
					}
				);
			},
			
			generate2 : function() {
				// console.log("generate var 2");
				
				$(".label").remove();
				
				var _this = this;
				var _opts = _this.options;
				var charOwner = "";
				var lastTimestamp = null;
				
				$("#filedata span")
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
      					if( timestamp > _opts.newest && charOwner == _opts.owner) _opts.newest = timestamp;
      					if( timestamp < _opts.oldest && charOwner == _opts.owner) _opts.oldest = timestamp;
					}
				)
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
      					var age = _opts.newest - timestamp;
      					var lightness = (age / ( _opts.newest - _opts.oldest ));
      					var rgb = Math.floor(255*lightness) - 25;
	      					
						if (timestamp - lastTimestamp >= 15000 && lastTimestamp !== null) {	
							$(this).css(
								{
									'color' : 'rgb('+rgb+','+rgb+','+rgb+')',
									'background-color' : 'rgb('+rgb+','+rgb+','+rgb+')'
								}
							).removeAttr("border");
						} else {
							$(this).css(
								{
									'color': 'rgb(170, 170, 170)',
									'background-color': 'rgb(255, 255, 255)'
								}
							).removeAttr("border");
						}
						
						lastTimestamp = timestamp;
					}
				);
				
				$("#trash span")
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
      					if( timestamp > _opts.newest) _opts.newest = timestamp;
      					if( timestamp < _opts.oldest) _opts.oldest = timestamp;
					}
				)
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
      					var age = _opts.newest - timestamp;
      					var lightness = (age / ( _opts.newest - _opts.oldest ));
      					var rgb = Math.floor(255*lightness) - 25;
	      					
						if (timestamp - lastTimestamp >= 15000 && lastTimestamp !== null) {	
							$(this).css(
								{
									'color' : 'rgb('+rgb+','+rgb+','+rgb+')',
									'background-color' : 'rgb('+rgb+','+rgb+','+rgb+')'
								}
							).removeAttr("border");
						} else {
							$(this).css(
								{
									'color': 'rgb(170, 170, 170)',
									'background-color': "none"
								}
							).attr("class","border");
						}
						
						lastTimestamp = timestamp;
					}
				);
			}
		});
	}
);