//js application/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('application/application.html', {
		markdown : ['application']
	});
});