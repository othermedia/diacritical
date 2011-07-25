Diacritical
===========

Diacritical is a diacritic entry tool for text input fields.


Usage
-----

    var search   = $('#wordsearch'),
        language = Diacritical.Languages.French,
        keyboard = new Diacritical.Keyboard(language, search);
    
    search.after(keyboard.getHTML());
