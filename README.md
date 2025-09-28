# Pokémon GO Hindi/Thai Text Tool
## What is this tool?
This is a tool that allows you to preview how Hindi and Thai text will appear in <i>Pokémon GO</i>.
While your phone, computer, and web browser most likely support the complex text layout needed to display Brahmic scripts like Devanagari and Thai correctly, _Pokémon GO_ does not.
Instead, the game uses modified fonts and encodings that allow the game's text engine to display the correct forms of characters.
<!--
To convert your text into the format used by <i>Pokémon GO</i>, tap the "Encode" button.
To convert text from <i>Pokémon GO</i> into a readable format, tap the "Decode" button.
-->

## Fonts used in _Pokémon GO_
_Pokémon GO_ uses the following fonts:
- [Lato](https://fonts.google.com/specimen/Lato) (Latin, Cyrillic, and Greek scripts)
- [Noto Sans Thai](https://fonts.google.com/noto/specimen/Noto+Sans+Thai) Adjusted (Thai script)
- [Siddhanta](https://svayambhava.blogspot.com/2014/01/siddhanta.html) Adjusted (Devanagari script)
- [Roboto Bold](https://fonts.google.com/specimen/Roboto) (miscellaneous)

Lato is used as the default font, while the other three fonts are used as fallbacks.
Japanese, Korean, and Chinese text are rendered using the system font.


## Licensing
The code in the repository itself is licensed under the [GNU General Public License, Version 3.0](LICENSE).

The fonts in this repository are included under the following licenses:
- Lato and Noto Sans Thai: [SIL Open Font License, Version 1.1](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)
- Siddhanta: [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](https://creativecommons.org/licenses/by-nc-nd/3.0/)
- Roboto Bold: [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)

Niantic's adjusted versions of Noto Sans Thai and Siddhanta are licensed under the same terms.

This app also uses two additional fonts, used to ensure consistent rendering of PUA glyphs as "tofu" or as invisible zero-width characters, regardless of what system fonts are available:
- [Topua](fonts/Topua-Regular.ttf), which has the Private Use Area mapped to Lato's _.notdef_ glyph
- [Nopua](fonts/Nopua-Regular.ttf), which has the Private Use Area mapped to Lato's _uni0000_ glyph

As modified versions of Lato, they are also licensed under the SIL Open Font License, Version 1.1.
