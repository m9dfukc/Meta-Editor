steal( 
	'jquery',
	'jquery/controller',
	'jquery/view/ejs',
	'application/scripts/jquery.timeago.js',
	'application/scripts/jquery.timeago.functions.js',
	'./controls.css'	
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
			this.element.html("//application/widgets/controls/views/init.ejs",{
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