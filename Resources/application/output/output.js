steal( 
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
				newest : 0
			}
		},
		/** @Prototype */
		{
			init : function(){
				//console.log( window.opener.tinyMCE.activeEditor.getContent() );
				var _this = this;
				var _opts = _this.options;
				
				this.element.html( 
					window.opener.tinyMCE.activeEditor.getContent()
				);
				this.element.append("<canvas></canvas>");
				
				this.element.find("span")
				.each(
					function() {
						var timestamp = $(this).attr('time');
      					if( timestamp > _opts.newest ) _opts.newest = timestamp;
      					if( timestamp < _opts.oldest ) _opts.oldest = timestamp;
					}
				)
				.each(
					function() {
						var timestamp = $(this).attr('time');
      					var age = _opts.newest - timestamp;
      					var lightness = 1 - (age / ( _opts.newest - _opts.oldest ));
      					var rgb = Math.floor(255*lightness);
						$(this).css('color', 'rgb('+rgb+','+rgb+','+rgb+')');
					}
				);			
			}
		});
	}
);