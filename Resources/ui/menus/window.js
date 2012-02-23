steal(
	'jquery',
	'ui/events/events.js',
	function($){
		var menu = Titanium.UI.createMenu();
		var fileItem = menu.addItem("File");
		
		fileItem.addItem("New", function(e) {
		    var currentWindow = Titanium.UI.getCurrentWindow();  
		    var newWindow = currentWindow.createWindow('app://application/application.html');  
		    newWindow.setWidth(770);  
		    newWindow.setHeight(650);
		    newWindow.setX(20);
		    newWindow.setY(40);
		    newWindow.open();  
		    newWindow.focus();
		});
		
		fileItem.addItem("Open File", function(e) {
		    var props = {multiple:false,directories:false,files:true,types:['gif','png','jpg']};
		    Titanium.UI.openFileChooserDialog(function(f)
		    {
		        if (f.length)
		        {
		            alert(f[0]);
		        }
		    },
		    props);
		});
		
		fileItem.addItem("Save", function(e) {
		    alert("save!");
		});
		
		fileItem.addItem("Save As ...", function(e) {
		    alert("save!");
		});
		
		fileItem.addSeparatorItem();
		
		fileItem.addItem("Print", function(e) {
		    var currentWindow = Titanium.UI.getCurrentWindow();  
		    var newWindow = currentWindow.createWindow('app://ui/output/output.html');  
		    newWindow.setWidth(415);  
		    newWindow.setHeight(620);
		    newWindow.open();  
		    newWindow.focus();
		});
		
		fileItem.addSeparatorItem();
		
		fileItem.addItem("Export as PDF", function(e) {
		    alert("export!");
		});
		
		Titanium.UI.setMenu(menu);
	}
);