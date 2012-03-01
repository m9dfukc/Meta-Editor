steal( 
	'jquery/controller',
	'jquery/view/ejs',
	'./metainformation.css'
).then('./views/init.ejs', function($){
		
		/**
		 * @class Application.Widgets.Metainformation
		 */
		$.Controller('Widgets.Metainformation',
		/** @Static */
		{
			defaults : {
				name : "unknown",
				location : "unknown"
			},
			listensTo : ['show', 'hide']
		},
		/** @Prototype */
		{
			init : function(){
				var _this = this;
				this.element.html("//application/widgets/metainformation/views/init.ejs",{
					message: "Hello World"
				}).hide();
				
				if (DocModel == null) {
					var timestamp = (new Date()).getTime();
					DocModel = new Model.Document('unknown', 'unknown', timestamp);
				} 
				$("#document-owner").click(function() {
					_this.show();
				})
				this.element.find('input[name="meta-name"]').keypress(function(e) {
					if (e.keyCode != 13 ) return;
					_this.options.name = _this.element.find('input[name="meta-name"]').val();
					if (_this.options.name != "") DocModel.setOwner(_this.options.name);
					_this.showLocationInput();
				});
				this.element.find('input[name="meta-location"]').keypress(function(e) {
					if (e.keyCode != 13 ) return;
					_this.options.location = _this.element.find('input[name="meta-location"]').val();
					if (_this.options.location != "") DocModel.setLocation(_this.options.location);
					_this.hide();
					$("#editor").fadeTo('fast', 1.0);
				});
			},
			showNameInput : function() {
				$('#meta-name').show(0, function() {
					$('#meta-name-value').focus();
				});
				$('#meta-location').hide();
				$("#editor").fadeTo('fast', 0.15);
			},
			showLocationInput : function() {
				$('#meta-name').hide();
				$('#meta-location').show(0, function() {
					$('#meta-location-value').focus();
				});
				$("#editor").fadeTo('fast', 0.15);
			},
			"#meta-name-ok click" : function(el, ev){
				this.options.name = this.element.find('input[name="meta-name"]').val();
				if (this.options.name != "") DocModel.setOwner(this.options.name);
				this.showLocationInput();
			},
			"#meta-location-ok click" : function(el, ev){
				this.options.location = this.element.find('input[name="meta-location"]').val();
				if (this.options.location != "") DocModel.setLocation(this.options.location);
				this.hide();
				$("#editor").fadeTo('fast', 1.0);
			},
			show : function(){
				this.element.find('input[name="meta-name"]').focus();
				this.element.show();
				this.element.find(".meta").hide();
				this.element.find("#meta-name").fadeIn("slow");
				$("#editor").fadeTo('fast', 0.15);
			},
			hide : function(){
				var text = this.options.name + " / " + this.options.location;
				$("#document-owner span").html(text);
				this.element.find(".meta").hide();
				this.element.fadeOut("slow");
				$("#editor").fadeTo('fast', 1.0);
			}
		})
	}
);