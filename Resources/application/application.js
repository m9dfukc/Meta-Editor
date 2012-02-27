/* All the global stuff */
var DocModel = null;

steal(
	'jquery',
	'application/models/document.js',
	'application/widgets/tinyeditor/tinyeditor.js',
	'application/widgets/controls/controls.js',
	'application/widgets/metainformation/metainformation.js',
	'application/ui/events/events.js',
	'application/ui/menus/context.js',
	'application/ui/menus/window.js',
	'./application.css', 
	function(){	
			
		var timestamp = (new Date()).getTime();
		DocModel = new Model.Document('unknown', 'unknown', timestamp);
		
		//Step 1 Enter Name, Location
		//Step 2 Polute document Model
		//Step 3 Load Editor Interface / Controls / Menu and Events
		
		$('#controls').widgets_controls();
		$('#editor').widgets_tinyeditor();
		//$('#metainformation').widgets_metainformation();
		//$('#metainformation').widgets_metainformation().trigger('show');
		
		$('#test').mouseup(function() {
            //reportSelectionHtml();
        });
	}
)