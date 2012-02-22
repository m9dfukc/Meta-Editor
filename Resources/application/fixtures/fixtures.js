// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("editor", 5, function(i, editor){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "editor "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
})