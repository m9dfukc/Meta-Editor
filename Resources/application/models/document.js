steal( 
	'jquery/class', 
	'jquery/view/view.js',
	'jquery/view/ejs/ejs.js',
	'application/scripts/tiny_mce/jquery.tinymce.js', 
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
					.attr('data-owner', this.owner)
					.attr('data-location', this.location)
					.attr('datetime', this.date);
				    	
			},
			retrieveData: function(){
				
				var data = tinyMCE.activeEditor.getContent();
				var meta = this.element.find("#controls");
				var trash = this.element.find("#trash");
				var out = $.View('//application/views/file.ejs',{
					"filedata" : data,
					"owner" : $(meta).attr("data-owner"),
					"location" : $(meta).attr("data-location")
				});
				return out;
			},
			setOwner: function(str) {
				this.owner = str;
				$(this.element).find('#controls').attr('data-owner', this.owner);
			},
			setLocation: function(str) {
				this.location = str;
				$(this.element).find('#controls').attr('data-location', this.location);
			},
			setDate: function(str) {
				this.date = str;
			},
			setTrash: function(str) {
				$("#trash").html(str);
			},
			save: function() {
			    if (this.file != "") {
			    	var file = Titanium.Filesystem.getFile(this.file);
					file.write(this.retrieveData());
					alert("Document saved to file!");
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
			            	var owner = $(tmp).closest("meta[name='author']").text();
			            	var location = $(tmp).closest("meta[name='author-location']").text();
			            	var filedata = $(tmp).closest("#filedata").html();
			            	var trash = $(tmp).closest("#trash").html();
			            	
			            	_this.setOwner(owner);
			            	_this.setLocation(location);
			            	_this.setTrash(trash);
			            	_this.file = file;
			            	
			            	tinyMCE.activeEditor.setContent(filedata);
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