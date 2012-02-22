jQuery.fn.justtext = function() {
     return $(this)  
            .clone()
            .children()
            .remove()
            .end()
            .text();
};