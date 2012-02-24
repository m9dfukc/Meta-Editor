steal( 
	'jquery/controller',
	'jquery/view/ejs',
	'application/scripts/jquery.colorbox.js',
	'./metainformation.css'
).then('./views/init.ejs', function($){
		
		/**
		 * @class Application.Widgets.Metainformation
		 */
		$.Controller('Widgets.Metainformation',
		/** @Static */
		{
			defaults : {},
			listensTo : ['show', 'hide']
		},
		/** @Prototype */
		{
			init : function(){
				
				this.element.html("//application/widgets/metainformation/views/init.ejs",{
					message: "Hello World"
				}).hide();
				
				if (DocModel == null) {
					var timestamp = (new Date()).getTime();
					DocModel = new Model.Document('unknown', 'unknown', timestamp);
				} 
			},
			showNameInput : function() {
				this.element.find('#meta-name').show()
				this.element.find('#meta-location').hide();
			},
			showLocationInput : function() {
				this.element.find('#meta-name').hide()
				this.element.find('#meta-location').show();
			},
			"#meta-name-ok click" : function(el, ev){
				var name = this.element.find('input[name="meta-name"]').val();
				if (name != "") DocModel.setOwner(name);
				this.showLocationInput();
			},
			"#meta-location-ok click" : function(el, ev){
				var location = this.element.find('input[name="meta-location"]').val();
				if (location != "") DocModel.setLocation(location);
				this.hide();
			},
			show : function(){
				this.element.show();
				this.element.find(".meta").hide();
				this.element.find("#meta-name").fadeIn("slow");
			},
			hide : function(){
				this.element.find(".meta").hide();
				this.element.fadeOut("slow");
			}
		})
	}
);