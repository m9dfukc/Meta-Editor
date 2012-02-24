steal( 
	'jquery/controller', 
	'application/scripts/jquery.justtext.js',
	function($){
		$.Controller('Ui.Events',
		{
			listensTo : ['cut', 'copy', 'paste']
		},{
			'cut' : function() {
				var clip;
				if (clip = Titanium.UI.Clipboard.getData('text/html')) {
					Titanium.UI.Clipboard.setData('text/html', clip);
					//var txt = $(clip).justtext();
					//Titanium.UI.Clipboard.setText(txt);
					console.log(clip);
		  		}
			},
			'copy' : function() {
				var clip;
				if (clip = Titanium.UI.Clipboard.getData('text/html')) {
					Titanium.UI.Clipboard.setData('text/html', clip);
					//var txt = $(clip).justtext();
					//Titanium.UI.Clipboard.setText(txt);
					//console.log(Titanium.UI.Clipboard.getText());
					//console.log(clip);
		  		}
			},
			'paste' : function() {
		  		var clip;
		  		
				if (clip = Titanium.UI.Clipboard.getData('text/html')) {
					Titanium.UI.Clipboard.setData('text/html', clip);
					//Titanium.UI.Clipboard.setText(txt);
					//console.log(clip);
					//alert(txt);
		  		} else {
		  			var txt = Titanium.UI.Clipboard.getText();
		  			var timestamp = (new Date()).getTime();
		  			var a = txt.split(""), inject = '';
					if (a.length) {
						$(a).each(function(i, item) {
							inject += '<span date-time="'+timestamp+'">'+item+'</span>';
						});	
					}
		  			Titanium.UI.Clipboard.setData('text/html', inject);
		  		}
			}
		})
	}
);