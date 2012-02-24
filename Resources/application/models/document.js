steal( 
	'jquery/class', 
	function($){
		$.Class('Model.Document',
		{
			init: function( owner, location, date ) {
				this.element = $(".container");
				
				this.owner = owner;
				this.location = location;
				this.date = date;
				
				this.file = "";
				
				$(this.element).find('#controls')
					.attr('owner', this.owner)
					.attr('location', this.location)
					.attr('date', this.date);
				    	
			},
			retrieveData: function(){
				return this.element.html();
			},
			setOwner: function(str) {
				this.owner = str;
				$(this.element).find('#controls').attr('owner', this.owner);
			},
			setLocation: function(str) {
				this.location = str;
				$(this.element).find('#controls').attr('location', this.location);
			},
			save: function() {
			    if (this.file != "") {
			    	var file = Titanium.Filesystem.getFile(this.file);
					file.write(this.retrieveData());
			    } else {
			    	this.saveAs();	
			    }
			},
			saveAs: function() {
				var _this = this;
				var fileData = this.retrieveData();
			    var options = {  
					title: "Save file as...",  
					types: ['grey'],
					typesDescription: "All files",
					path: Titanium.Filesystem.getUserDirectory()
				};
				Titanium.UI.openSaveAsDialog(function(filenames) {
					if (filenames.length) {
						var fileSelected = filenames[0];
						var file = Titanium.Filesystem.getFile(fileSelected);
						file.write(fileData);
						_this.file = fileSelected;
					}
				}, options);
			},
			open: function() {
				var _this = this; 
			    var options = {
			    	multiple: false,
			    	directories: false,
			    	files: true,
			    	types: ['grey'],
			    	path: Titanium.Filesystem.getUserDirectory() 
			    };
			    Titanium.UI.openFileChooserDialog(function(filenames)
			    {
			        if (filenames.length) {
			            var fileSelected = filenames[0];
			            var file = Titanium.Filesystem.getFile(fileSelected);
			            if (file.exists()) {
			            	var tmp = file.read().toString();
			            	_this.element.html(tmp);
			            	$('#metainformation').trigger('hide');
			            }
			        }
			    },
			    options);
			},
			debug: function() {
				console.log(this);
				console.log($(this.element));
				console.log(this.element);
				console.log(this.element.html());
			}
		})
	}
);