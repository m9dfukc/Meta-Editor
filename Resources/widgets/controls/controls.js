steal( 
	'jquery',
	'jquery/controller',
	'jquery/view/ejs',
	'./controls.css',
	'./scripts/jquery.timeago.js',
	'./scripts/jquery.timeago.functions.js' 
).then( './views/init.ejs', function($){
	
	/**
	 * @class Widgets.Controls
	 */
	$.Controller('Widgets.Controls',
	/** @Static */
	{
		defaults : {}
	},
	/** @Prototype */
	{
		init : function(){
			this.element.html("//widgets/controls/views/init.ejs",{
				message: "Hello World"
			});
		}
	})
	$(function() {
		$('time.timeago')
			.attr("datetime", iso8601(new Date()))
			.timeago();
	});
});