steal( 
	'jquery', 
	'jquery/controller',
	'jquery/view/ejs', 
	'./editor.css'
).then( './views/init.ejs', function($){

	/**
	 * @class Widgets.Editor
	 */
	$.Controller('Widgets.Editor',
	/** @Static */
	{
		defaults : {},
		
	},
	/** @Prototype */
	{
		init : function(){
			this.element.html("//widgets/editor/views/init.ejs",{
				data: ""
			});
		}
	})
});