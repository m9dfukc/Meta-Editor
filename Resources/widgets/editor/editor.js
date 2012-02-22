steal( 
	'jquery', 
	'jquery/controller',
	'jquery/view/ejs', 
	'jquery/dom/selection',
	'./editor.css', 
	'./scripts/rangy-core.js',
	'./scripts/rangy-functions.js'
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
	
	$(function() {
		rangy.init();
	    function insertAtCursor(event) { 
	        var sel = rangy.getSelection();
	        var range = sel.rangeCount ? sel.getRangeAt(0) : null;
	        var parent;
	        if (range) {
	            if (event.keyCode == 13 ) {
	                var el = document.createElement("br");
	            } else if(event.keyCode == 32) {
	                var el = document.createElement("span");
	                $(el).attr('data-time', event.timeStamp); 
	                el.appendChild(document.createTextNode('\u00a0'));
	            } else {
	                var el = document.createElement("span");
	                var _char = String.fromCharCode(event.keyCode | event.which);
	                $(el).attr('data-time', event.timeStamp); 
	                el.appendChild(document.createTextNode(_char));
	            }
	            // Check if the cursor is at the end of the text in an existing span
	            if (range.endContainer.nodeType == 3
	                    && (parent = range.endContainer.parentNode)
	                    && (parent.tagName == "SPAN")) {
	                range.setStartAfter(parent);
	            }
	            range.insertNode(el); 
	            range.setStartAfter(el);
	            rangy.getSelection().setSingleRange(range); 
	        } 
	    }
	    
	    $('#editable').focus(function() {
	        if ($(this).html() == $(this).attr('standard')) $(this).html("");
	    }).keypress(function(event) { 
	        insertAtCursor(event);
	        return false;
	    }).mouseup(function() {
	        var sel = $(this).selection();
	        //console.log(sel);
	    });
	
	});
});