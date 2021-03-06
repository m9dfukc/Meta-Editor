steal(
	'jquery',
	function($){
		
		generateMenu = function() {
			var menu = Titanium.UI.createMenu();
			var fileItem = menu.addItem("File");
			
			fileItem.addItem("New", function(e) {
			    var currentWindow = Titanium.UI.getCurrentWindow();  
			    var newWindow = currentWindow.createWindow('app://application/application.html');  
			    newWindow.setWidth(755);  
			    newWindow.setHeight(650);
			    newWindow.setX(20);
			    newWindow.setY(40);
			    newWindow.open();  
			    newWindow.focus();
			});
			
			fileItem.addItem("Open File", function(e) {
			    if (DocModel != null) DocModel.open();
			});
			
			fileItem.addItem("Save", function(e) {
			    if (DocModel != null) DocModel.save();
			}); 
			
			fileItem.addItem("Save As ...", function(e) {
				if (DocModel != null) DocModel.saveAs();
			});
			
			fileItem.addSeparatorItem();
			
			fileItem.addItem("Preview / Print", function(e) {
			    var currentWindow = Titanium.UI.getCurrentWindow();  
			    var newWindow = currentWindow.createWindow('app://application/output/output.html');  
			    newWindow.setWidth(770);  
			    newWindow.setHeight(720);
			    newWindow.open();  
			    newWindow.focus();
			});
			
			/*
			fileItem.addSeparatorItem();
			
			fileItem.addItem("Export as PDF", function(e) {
			    alert("export!");
			});
			*/
			Titanium.UI.setMenu(menu);
		}
		
		generateMenu();
	}
);