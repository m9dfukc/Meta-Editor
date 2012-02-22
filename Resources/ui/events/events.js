steal( 'jquery/controller', 
	function($){
		$.Controller('Ui.Events',
		{
			listensTo : ['cut', 'copy', 'paste']
		},{
			'cut' : function() {
				alert("cut");
			},
			'copy' : function() {
				alert("copy");
			},
			'paste' : function() {
		  		if (Titanium.UI.Clipboard.hasText()) {
		  			alert(Titanium.UI.Clipboard.getText());	
		  		}
			}
		})
	}
);