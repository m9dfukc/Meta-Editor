steal(
	'jquery',
	'widgets/editor',
	'widgets/controls',
	'ui/events/events.js',
	'ui/menus/context.js',
	'./scripts/rangy-core.js',
	'./scripts/rangy-functions.js',		
	'./application.css', 
	function(){	
		$('#controls').widgets_controls();
		$('#editor').widgets_editor();

		rangy.init();
			
		function insertCharacter(character, _class) {
			var timestamp = (new Date()).getTime();
			document.execCommand(
				"InsertHTML", 
				false, 
				'<span date-time="'+timestamp+'" class="'+_class+'">'+character+'</span>'
			);
		};
		
	    $('#editable').keydown(function(event) {
	    	if( event.ctrlKey && String.fromCharCode( event.which ).toLowerCase() == 'v' ||
	    		event.which == 224 && String.fromCharCode( event.which ).toLowerCase() == 'v') {
	    		return;
	    	} 
	    	if( event.ctrlKey && String.fromCharCode( event.which ).toLowerCase() == 'c' ||
	    		event.which == 224 && String.fromCharCode( event.which ).toLowerCase() == 'c') {
	    		return;
	    	}
	    	if( event.which == 37 ||
	    		event.which == 38 || event.which == 29 ||
	    		event.which == 40 || event.which == 8 ) {
	    		return;
	    	}
	    	
	    	if( event.which == 9 ) {
	    		insertCharacter("\u00a0","tab");
	    		return false;
	    	}
	    	if( event.which == 32 ) {
	    		insertCharacter("\u00a0","space");
	    		return false;
	    	}
	    	
	    	insertCharacter("","char");
	    });
	    
	   	
	   	$('#test').mouseup(function() {
            reportSelectionHtml();
        });
	}
)