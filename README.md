Diacritical
===========

Diacritical is a diacritic entry tool for text fields. It provides a "virtual
keyboard" UI which allows users to insert accented characters by clicking
buttons in a web page rather than trying to find them in their operating system
character map.


Languages
---------

Diacritical comes with lists of characters with diacritics for three languages:
French, German and Spanish. Every character is available as both upper and
lower case.


Usage
-----

The library has two main objects: a collection of languages and the virtual
keyboard. New instances of `Diacritical.Keyboard` must be given a language and
a text field to attach to. To insert the keyboard UI into the DOM, call the
`getHTML` method on the keyboard instance.

    var search   = $('#wordsearch'),
        language = Diacritical.Languages.French,
        keyboard = new Diacritical.Keyboard(language, search);
    
    search.after(keyboard.getHTML());

New languages are easy to add: they're just objects with `Uppercase` and
`Lowercase` properties, each of which should be an array of strings, as in this
example:

    var Vowels = {
        Uppercase: ['A', 'E', 'I', 'O', 'U'],
        Lowercase: ['a', 'e', 'i', 'o', 'u']
    };

Note that accented characters will generally have to be given as Unicode code
points, so instead of `'é'`, use `'\u00E9'`.


Requirements and browser support
--------------------------------

Diacritical relies on [jQuery] for DOM manipulation, but otherwise has no
dependencies. The reliance on jQuery is fairly superficial and the library
could very easily be ported to other DOM libraries.

For browsers which support the `selectionStart` and `selectionEnd` properties
on text inputs, character insertion is intelligent and behaves as one would
expect. For older browsers which do not support these properties, accented
characters are simply appended to the current text value.

[jQuery]: http://jquery.com
