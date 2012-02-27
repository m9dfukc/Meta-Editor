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
				owner  : "" 
			}
		},
		/** @Prototype */
		{
			init : function(){
				//console.log( window.opener.tinyMCE.activeEditor.getContent() );
				var _this = this;
				var _opts = _this.options;
				var charOwner = "";
				
				_opts.owner = charOwner = $("#controls", window.opener.document).attr('data-owner');
				console.log(_opts.owner);
				
				this.element.find("#filedata").html( 
					window.opener.tinyMCE.activeEditor.getContent()
				);
				this.element.find("#trash").html( 
					$("#trash", window.opener.document).html()
				);
				this.element.append("<canvas></canvas>");
				
				this.element.find("span")
				.each(
					function() {
						var timestamp = $(this).attr('datetime');
      					if( timestamp > _opts.newest ) _opts.newest = timestamp;
      					if( timestamp < _opts.oldest ) _opts.oldest = timestamp;
					}
				)
				.each(
					function() {
						charOwner = $(this).attr("data-owner");
							if( charOwner == _opts.owner ) {
							var timestamp = $(this).attr('datetime');
	      					var age = _opts.newest - timestamp;
	      					var lightness = (age / ( _opts.newest - _opts.oldest ));
	      					var rgb = Math.floor(200*lightness)+55;
							$(this).css('color', 'rgb('+rgb+','+rgb+','+rgb+')');
						} else {
							$(this).css(
								{
									'color': 'rgb(230, 230, 230)',
									'text-decoration' : 'underline',
									'text-decoration-style' : 'dotted'
								}
							)
						}
					}
				);			
			}
		});
	}
);