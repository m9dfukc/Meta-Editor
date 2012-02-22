steal(
	'./application.css', 		// application CSS file
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'widgets/editor',
	'widgets/controls',
	function(){					// configure your application
		$('#controls').widgets_controls();
		$('#editor').widgets_editor();
	}
)