Diacritical.Keyboard = function(language, textField, options) {
    this.textField  = jQuery(textField);
    this.language    = language;
    this.defaultCase = 'lower';
};

Diacritical.Keyboard.prototype.setCase = function(newCase) {
    var oldCase = this.textCase, oldKeys, newKeys;
    
    if (!oldCase) {
        oldCase = newCase == 'lower' ? 'upper' : 'lower';
    }
    
    oldKeys = this[oldCase + 'Keys'];
    newKeys = this[newCase + 'Keys'];
    
    jQuery.map(oldKeys, function(button) {
        button.style.display = 'none';
    });
    
    jQuery.map(newKeys, function(button) {
        button.style.display = '';
    });
    
    this.textCase = newCase;
};

Diacritical.Keyboard.prototype.insert = function(character) {
    var field     = this.textField[0],
        value     = this.textField.val(),
        selection = this.constructor.getSelection(field),
        fore      = value.substring(0, selection.start),
        aft       = value.substring(selection.end, value.length);
    
    this.textField.val(fore + character + aft);
    this.constructor.setSelection(field, selection.start + 1, selection.start + 1);
};

Diacritical.Keyboard.prototype.getHTML = function() {
    if (this._html) return this._html;
    
    var self = this, createButton;
    
    this._html    = document.createElement('div');
    this._toggle  = document.createElement('button');
    
    this._html.className   = 'diacritical-keyboard';
    this._toggle.className = 'toggle';
    this._toggle.innerHTML = '^';
    
    createButton = function(character) {
        var ctrl = document.createElement('button');
        
        ctrl.innerHTML = character;
        
        jQuery(ctrl).bind('click', function(evnt) {
            evnt.preventDefault();
            self.insert(character);
        });
        
        return ctrl;
    };
    
    this.upperKeys = jQuery.map(this.language.Uppercase, createButton);
    this.lowerKeys = jQuery.map(this.language.Lowercase, createButton);
    
    jQuery(this._toggle).bind('click', function(evnt) {
        evnt.preventDefault();
        
        self.setCase(self.textCase == 'lower' ? 'upper' : 'lower');
    });
    
    jQuery.map(this.upperKeys.concat(this.lowerKeys), function(button) {
        self._html.appendChild(button);
    });
    
    this._html.appendChild(this._toggle);
    
    this.setCase(this.defaultCase);
    
    return this._html;
};

Diacritical.Keyboard.prototype.hide = function() {
    jQuery(this._html).hide();
};

Diacritical.Keyboard.prototype.show = function() {
    jQuery(this._html).show();
};

Diacritical.Keyboard.getSelection = function(el) {
    var start = el.selectionStart,
        end   = el.selectionEnd;
    
    if (typeof start != 'number' || typeof end != 'number') {
        start = end = el.value.length;
    }
    
    return {start: start, end: end};
};

Diacritical.Keyboard.setSelection = function(el, start, end) {
    el.selectionStart = start;
    el.selectionEnd   = end;
};
