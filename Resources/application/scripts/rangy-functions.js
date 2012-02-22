function gEBI(id) {
    return document.getElementById(id);
}
function reportSelectionText() {
    alert(rangy.getSelection().getRangeAt(0));
}

function reportSelectionHtml() {
    alert(rangy.getSelection().toHtml());
}

function inspectSelection() {
    alert(rangy.getSelection().inspect());
}

function deleteSelection() {
    rangy.getSelection().deleteFromDocument();
}

function collapseSelectionToStart() {
    rangy.getSelection().collapseToStart();
}

function collapseSelectionToEnd() {
    rangy.getSelection().collapseToEnd();
}

function getFirstRange() {
    var sel = rangy.getSelection();
    return sel.rangeCount ? sel.getRangeAt(0) : null;
}

function showContent(frag) {
    var displayEl = gEBI("selectioncontent");
    var codeEl = gEBI("code");
    while (displayEl.firstChild) {
        displayEl.removeChild(displayEl.firstChild);
    }
    if (frag) {
        displayEl.appendChild(frag);
    }
    codeEl.value = displayEl.innerHTML;
}

function inspectRange() {
    var range = getFirstRange();
    if (range) {
        alert(range.inspect());
    }
}

function reportRangeHtml() {
    var range = getFirstRange();
    if (range) {
        alert(range.toHtml());
    }
}

function extractRange() {
    var range = getFirstRange();
    if (range) {
        showContent(range.extractContents());
    }
}

function cloneRange() {
    var range = getFirstRange();
    if (range) {
        showContent(range.cloneContents());
    }
}

function deleteRange() {
    var range = getFirstRange();
    if (range) {
        range.deleteContents();
    }
}

function surroundRange() {
    var range = getFirstRange();
    if (range) {
        var el = document.createElement("span");
        el.style.backgroundColor = "pink";
        try {
            range.surroundContents(el);
        } catch(ex) {
            if ((ex instanceof rangy.RangeException || Object.prototype.toString.call(ex) == "[object RangeException]") && ex.code == 1) {
                alert("Unable to surround range because range partially selects a non-text node. See DOM Level 2 Range spec for more information.\n\n" + ex);
            } else {
                alert("Unexpected errror: " + ex);
            }
        }
    }
}

function insertNodeAtRange() {
    var range = getFirstRange();
    if (range) {
        var el = document.createElement("span");
        el.style.backgroundColor = "lightblue";
        el.style.color = "red";
        el.style.fontWeight = "bold";
        el.appendChild(document.createTextNode("**INSERTED NODE**"));
        range.insertNode(el);
        rangy.getSelection().setSingleRange(range);
    }
}

function createButton(parentNode, clickHandler, value) {
    var button = document.createElement("input");
    button.type = "button";
    button.unselectable = true;
    button.className = "unselectable";
    button.ontouchstart = button.onmousedown = function() {
        clickHandler();
        return false;
    };
    button.value = value;
    parentNode.appendChild(button);
    button = null;
}