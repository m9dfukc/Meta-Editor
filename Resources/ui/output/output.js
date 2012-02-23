steal( 
	'jquery/controller', 
	function($){

		/**
		 * @class Ui.Output
		 */
		$.Controller('Ui.Output',
		/** @Static */
		{
			defaults : {}
		},
		/** @Prototype */
		{
			init : function(){
				this.element.html( 
					$("#editable", window.opener.document ).html()
				);
			}
		});
	}
);