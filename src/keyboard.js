Diacritical.Keyboard = function(language, textField, options) {
    this._textField      = jQuery(textField);
    this._insertionPoint = this.getInsertionPoint();
    this.language        = language;
    this.defaultCase     = 'lower';
};

Diacritical.Keyboard.prototype.setCase = function(newCase) {
    var oldCase = this._case, oldKeys, newKeys;
    
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
    
    this._case = newCase;
};

Diacritical.Keyboard.prototype.insert = function(character) {
    var caret = this.getInsertionPoint(),
        value = this._textField.val(),
        fore  = value.substring(0, caret),
        aft   = value.substring(caret, value.length);
    
    this._textField.val(fore + character + aft);
};

Diacritical.Keyboard.prototype.getInsertionPoint = function() {
    return this._textField.val().length;
};

Diacritical.Keyboard.prototype.getHTML = function() {
    if (this._html) return this._html;
    
    var self = this, createButton, insertButton;
    
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
    
    insertButton = function(button) {
        self._html.appendChild(button);
    };
    
    this.upperKeys = jQuery.map(this.language.Uppercase, createButton);
    this.lowerKeys = jQuery.map(this.language.Lowercase, createButton);
    
    jQuery(this._toggle).bind('click', function(evnt) {
        evnt.preventDefault();
        
        self.setCase(self._case == 'lower' ? 'upper' : 'lower');
    });
    
    jQuery.map(this.upperKeys, insertButton);
    jQuery.map(this.lowerKeys, insertButton);
    
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
