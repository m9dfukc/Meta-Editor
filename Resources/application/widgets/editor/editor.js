steal( 
	'jquery', 
	'jquery/controller',
	'jquery/view/ejs',
	'application/scripts/rangy-core.js',
	'application/scripts/rangy-functions.js',		
	'application/scripts/html5edit.js', 
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
			this.element.html("//application/widgets/editor/views/init.ejs",{
				data: ""
			});
		},
		insertCharacter : function(character, _class) {
			var timestamp = (new Date()).getTime();
			document.execCommand(
				"InsertHTML", 
				false, 
				'<span date-time="'+timestamp+'" class="'+_class+'">'+character+'</span>'
			);
		},
		'#editable keypress' : function(element, event) {
	    	if( (event.ctrlKey || event.metaKey) &&
	    		String.fromCharCode( event.which ).toLowerCase() == 'v') {
	    		$(element).ui_events().trigger("paste");
	    		return true;
	    	} 
	    	if( (event.ctrlKey || event.metaKey) && 
	    		String.fromCharCode( event.which ).toLowerCase() == 'c') {
	    		$(element).ui_events().trigger("copy");
	    		return true;
	    	}
	    	if( (event.ctrlKey || event.metaKey) && 
	    		String.fromCharCode( event.which ).toLowerCase() == 'x') {
	    		$(element).ui_events().trigger("cut");
	    		return true;
	    	}
	    	if( event.which == 37 ||
	    		event.which == 38 || event.which == 29 ||
	    		event.which == 40 || event.which == 8 ) {
	    		return true;
	    	}

	    	if( event.which == 9 ) {
	    		this.insertCharacter("\u00a0","tab");
	    		return false;
	    	}
	    	if( event.which == 32 ) {
	    		this.insertCharacter("\u00a0","space");
	    		return false;
	    	}
	    	
	    	this.insertCharacter("","char");
	    	return true;
		}
	})
});