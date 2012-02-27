steal( 
	'jquery', 
	'jquery/controller',
	'jquery/view/ejs',
	'application/scripts/tiny_mce/jquery.tinymce.js',
	'application/scripts/jquery.create.js',
	'./tinyeditor.css'
).then( './views/init.ejs', function($){

	/**
	 * @class Widgets.Editor
	 */
	$.Controller('Widgets.Tinyeditor',
	/** @Static */
	{
		defaults : {
			page : 0
		},
		
	},
	/** @Prototype */
	{
		init : function(){
			var _this = this;
		
			this.element.html("//application/widgets/tinyeditor/views/init.ejs",{
				data: ""
			});
			
			this.element.find('textarea.tinymce').tinymce({
			    setup : function(ed) {
			        ed.onInit.add(function(ed){
			            ed.dragStart = false;
	                    $(ed.getDoc())
	                    .bind('dragstart', function(l){
	                        ed.dragStart = true;
	                        console.log("dstart");
	                    })
	                    .bind('drop', function(l) {
	                    	console.log("drop");
	                        if (ed.dragStart === false) {
	                            l.preventDefault();
	                            l.stopPropagation();
	                            return false;
	                        }
	                        ed.dragStart = false;
	                    })
	                });
					ed.onKeyPress.add(function(ed, l) {
		                var sel = ed.selection;
	                    var node = sel.getNode();
	                    var code = [13,8,46];
	                    
	                    l.isEvilKey = ($.inArray( l.keyCode, code) !== -1);
	                    l.isSpace = (l.charCode == 32);
	                    l.isChar = ((String.fromCharCode(l.keyCode)).search(/\w/) != -1) || l.isSpace;
	                    
	                    //console.log(l);
	        
	                    if (!sel.isCollapsed() && (l.isChar || l.isEvilKey || l.isSpace) && !(l.metaKey || l.ctrlKey) ) {
	                        var nodes = $(sel.getContent());
	                        $('#trash').append(nodes);
	                    }
	                    
	                    if (l.isChar && !l.metaKey && !l.ctrlKey) {  
	                        l.preventDefault(); 
	                        var el;
	                        if (l.isSpace) {
	                        	el = ed.dom.create('span',
	                        	{
		                            'datetime' : l.timeStamp, 
		                            'data-owner' : DocModel.owner, 
		                            'data-location' : DocModel.location,
		                            'class' : "space"
		                        }, "&nbsp;");
	                        } else {
	                        	el = ed.dom.create('span',
		                        {
		                            'datetime' : l.timeStamp, 
		                            'data-owner' : DocModel.owner, 
		                            'data-location' : DocModel.location
		                        }, String.fromCharCode(l.charCode));
	                        }	                            
	                        if (node.nodeName == "SPAN") {
	                            $(node).after(el);
	                            sel.setNode(el);
	                            sel.collapse(false);
	                            Titanium.API.notice("cursor action in span node!");
	                        } else {
	                            sel.setNode(el);
	                        }
	                        return false;
	                    } else if(l.isEvilKey) {
	                        if (l.keyCode == 13) {
	                            l.preventDefault(); 
	                            var el = ed.dom.create('br');
	                            if (node.nodeName == "SPAN") {
	                                $(node).after(el);  
	                                sel.setNode(el);
	                            	sel.collapse(false);
	                            	Titanium.API.notice("cursor action in span node!");
	                            } else {
	                                sel.setNode(el);
	                            }
	                            return false;
	                        }
						}     
	               	});
	               	ed.onKeyDown.add(function(ed, l) { 
	                    if (l.keyCode == 9) {
	                    	var sel = ed.selection;
	                    	var node = sel.getNode();
	                    	var timestamp = (new Date()).getTime();
	                    	l.preventDefault();
	                    	var _space ='<span datetime="'+timestamp+'" data-owner="'+DocModel.owner+'" data-location="'+DocModel.owner+'" class="space">&nbsp;</span>';
	                    	if (node.nodeName == "SPAN") {
	                            $(node)
	                            	.after(_space)
	                            	.after(_space)
	                            	.after(_space);
	                            
	                            sel.setNode(el);
	                            sel.collapse(false);
	                            Titanium.API.notice("cursor action in span node!");
	                        } else {		
								ed.execCommand('mceInsertContent', false, _space);
								ed.execCommand('mceInsertContent', false, _space);
								ed.execCommand('mceInsertContent', false, _space);
							}
							return false;
						}
	               	});
	               	
	               	ed.onPaste.add(function(ed, e) {
           				console.debug('Pasted plain text');
      				});
	            	   	
				},
				
				
				// Location of TinyMCE script
				script_url : '/application/scripts/tiny_mce/tiny_mce.js',
				content_css : '/application/widgets/tinyeditor/tiny_mce.css',
				 
				// General options
				theme : "advanced",
				plugins : "save,searchreplace,print,paste,noneditable,visualchars,nonbreaking,template",
				mode : 'specific_textareas',
				
				// Theme options
				theme_advanced_buttons1 : "newdocument,save,print,|,bold,italic,underline,|,cut,copy,paste,|,undo,redo",
				theme_advanced_buttons2 : "",
				theme_advanced_buttons3 : "",
				theme_advanced_buttons4 : "",
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				theme_advanced_statusbar_location : "",
				theme_advanced_resizing : true,
	
	            valid_elements : "span[datetime|data-owner|data-location|class],br",
	            valid_children: "body[span|br],-span[span]",
	            verify_html : true,
	            
	            force_br_newlines : true,
	            force_p_newlines : false,
	            forced_root_block : '',
	            
	            formats : {
	                alignleft : {selector : 'span', 'classes' : 'left'},
	                aligncenter : {selector : 'span', 'classes' : 'center'},
	                alignright : {selector : 'span', 'classes' : 'right'},
	                alignfull : {selector : 'span', 'classes' : 'full'},
	                bold : {selector : 'span', 'classes' : 'bold'},
	                italic : {selector : 'span', 'classes' : 'italic'},
	                underline : {selector : 'span', 'classes' : 'underline', exact : true}
	            },
	            
	            paste_auto_cleanup_on_paste : true,
	            paste_remove_styles : true,
	            paste_text_linebreaktype : "br",
	            paste_strip_class_attributes : "mso",
	            paste_postprocess  : function(pl, o) {
		            var strhtml = o.node.innerHTML;
		            try {
		            	var el = $(strhtml);
		            }  catch(e) {
						var el = $("<div/>");
					}
		            console.log(el);
					if ($(el).closest("span[datetime][data-owner]").length == 0) {
		            	var timestamp = (new Date()).getTime();
	                    var strtxt = o.node.textContent;
	                    strhtml = "";
	                    for(i=0;i<strtxt.length;i++) {
	                        var _char = strtxt.charAt(i);
	                        var _regex = /\s/;
	                        
	                        strhtml += 
	                        _regex.test(_char) 
	                            ? '<span datetime="'+timestamp+'" data-owner="'+DocModel.owner+'" data-location="'+DocModel.owner+'" class="space">&nbsp;</span>' 
	                            : '<span datetime="'+timestamp+'" data-owner="'+DocModel.owner+'" data-location="'+DocModel.owner+'">'+_char+'</span>';
	                            
	                    }
		            }
	                o.node.innerHTML = strhtml;
	            },
				
				save_onsavecallback: function() {
					DocModel.save();
					return false;
				}
			});
			
			$("#test").click(function() {
				_this.options.page++;
				_this.element.find('#textarea').append('<textarea name="page_'+_this.options.page+'" id="page_'+_this.options.page+'" page="'+_this.options.page+'" rows="15" cols="80" class="tinymce"></textarea>');
				tinyMCE.execCommand('mceAddControl',false,'page_'+_this.options.page);
				/*
				tinyMCE.onAddEditor.add(function(mgr,ed) {
					tinyMCE.execCommand('mceFocus',false,ed);
				});
				*/
			});
		}
	})
});