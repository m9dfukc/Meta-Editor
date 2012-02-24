steal(
	'jquery',
	function($){
		var menu = Titanium.UI.createMenu();
	    menu.addItem('Cut', function() {
	        $('#editable').ui_events().trigger("cut");
	    });
	    menu.addItem('Copy', function() {
	        $('#editable').ui_events().trigger("copy");
	    });
	    menu.addItem('Paste', function() {
	        $('#editable').ui_events().trigger("paste");
	    });
	    Titanium.UI.getMainWindow().setContextMenu(menu);
	}
);