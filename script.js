'use strict';

/*
const RAKAR = '\u{10F1B0}';
const REPH = '\u{10F306}';
const SHORT_I = '\u{10093F}';

const NUKTA = '\u093C';
const HALANT = '\u094D';
const ZWNJ = '\u200C';
const ZWJ = '\u200D';
const CONSONANT = '[\u0915-\u0939\u0958-\u095F]';
const VOWEL = '[\u0904-\u0914]';
const MATRA = '[\u093E-\u094C]';
const MODIFIER = '[\u0900\u0901\u0902\u0903\u093D]';

// See https://learn.microsoft.com/en-us/typography/script-development/devanagari
const HALF = `(?:${CONSONANT}${NUKTA}?(?:${HALANT}[${ZWNJ}${ZWJ}]?|[${ZWNJ}${ZWJ}]${HALANT}))`; // C+[N]+<H+[<ZWNJ|ZWJ>]|<ZWNJ|ZWJ>+H>
const MAIN_CONSONANT = `(?:${CONSONANT}${NUKTA}?)`; // C+[N]+[A]
const MAIN_VOWEL = `(?:${VOWEL}${NUKTA}?(?:[${ZWJ}${ZWNJ}]?${HALANT}${CONSONANT}|${ZWJ}${CONSONANT}))?`; // V+[N]+[<[<ZWJ|ZWNJ>]+H+C|ZWJ+C>]
const INITIAL = `(?:${HALF}*${MAIN_CONSONANT}|${MAIN_VOWEL})`
const FINAL = `(?:${HALANT}[${ZWNJ}${ZWJ}]?|${MATRA}*${NUKTA}?${HALANT}?)?${MODIFIER}?`;

const DECODE_HINDI = {
  // Reph
  '\uF000': REPH, // r (reph in र्द, र्र; reordering)
  '\uF001': REPH, // r (reph in र्ट, र्ड; reordering)
  '\uF002': REPH, // r (reph in र्ल; reordering)
  '\uF003': REPH, // r (reph, unused; reordering)
  '\uF004': REPH, // r (reph, unused; reordering)
  '\uF005': REPH, // r (reph in र्क; reordering)
  '\uF006': REPH, // r (reph, unused; reordering)
  '\uF007': REPH, // r (reph, unused; reordering)

  // Vowel marks
  '\uF008': '\u0947', // long e (◌े in रे, टे, ट्रे)
  '\uF009': '\u0947', // long e (unused)
  '\uF00A': '\u0947', // long e (◌े in ले)
  '\uF00B': '\u0947', // long e (unused)
  '\uF00C': '\u0947', // long e (unused)
  '\uF00D': '\u0947', // long e (◌े in के, फ्रे)
  '\uF00E': '\u0947', // long e (unused)
  '\uF00F': '\u0947', // long e (unused)
  '\uF010': '\u0948', // ai (unused)
  '\uF011': '\u0948', // ai (unused)
  '\uF012': '\u0948', // ai (unused)
  '\uF013': '\u0948', // ai (unused)
  '\uF014': '\u0948', // ai (unused)
  '\uF015': '\u0948', // ai (◌ै in कै)
  '\uF016': '\u0948', // ai (unused)
  '\uF017': '\u0948', // ai (unused)
  '\uF018': '\u0941', // short u (◌ु in कु)
  '\uF019': '\u0942', // long u (◌ू in कू)
  '\uF01B': '\u0902', // ṁ (anusvara; ◌ं in लं, कैं)

  // Syllable ligature
  '\uF01A': 'द्भु', // dbhu (द्भ + ◌ु)

  // Below-base forms
  '\uF1B0': RAKAR, // r (rakar, ◌्र)

  // Diacritics
  '\uF300': '\u0901', // chandrabindu (◌ँ in ◌ैँ)
  '\uF306': REPH, // r (reph; reordering)

  // Vowel marks
  '\uF30C': SHORT_I, // short i (◌ि in गि; reordering)
  '\uF30D': SHORT_I, // short i (◌ि in रि; reordering)
  '\uF30E': SHORT_I, // short i (unused; reordering)
  '\uF30F': SHORT_I, // short i (◌ि in दि, डि, ठि; reordering)
  '\uF310': SHORT_I, // short i (◌ि in टि; reordering)
  '\uF311': SHORT_I, // short i (◌ि in कि, वि, हि, फि, बि, ब्रि; reordering)
  '\uF312': SHORT_I, // short i (◌ि in ति, धि, नि; reordering)
  '\uF313': SHORT_I, // short i (unused; reordering)
  '\uF314': SHORT_I, // short i (◌ि in मि, लि, चि, भि; reordering)
  '\uF315': SHORT_I, // short i (unused; reordering)
  '\uF316': SHORT_I, // short i (unused; reordering)
  '\uF317': SHORT_I, // short i (◌ि in शि; reordering)
  '\uF318': SHORT_I, // short i (unused; reordering)
  '\uF319': SHORT_I, // short i (◌ि in सि, क्षि; reordering)
  '\uF31A': SHORT_I, // short i (unused; reordering)
  '\uF31B': SHORT_I, // short i (unused; reordering)
  '\uF31C': SHORT_I, // short i (unused; reordering)
  '\uF31D': SHORT_I, // short i (unused; reordering)
  '\uF31E': SHORT_I, // short i (unused; reordering)
  '\uF31F': SHORT_I, // short i (unused; reordering)
  '\uF320': SHORT_I, // short i (unused; reordering)
  '\uF321': '\u0940', // long i (unused)
  '\uF322': '\u0940', // long i (◌ी in री)
  '\uF323': '\u0940', // long i (◌ी in टी, री)
  '\uF324': '\u0940', // long i (unused)
  '\uF325': '\u0940', // long i (◌ी in ली)
  '\uF326': '\u0940', // long i (unused)
  '\uF327': '\u0940', // long i (unused)
  '\uF328': '\u0940', // long i (unused)
  '\uF329': '\u0940', // long i (unused)
  '\uF32A': '\u0940', // long i (◌ी in की, फी)
  '\uF32B': '\u0940', // long i (unused)
  '\uF32C': '\u0940', // long i (unused)

  // Conjuncts
  '\uF337': 'क्ष', // ksha
  '\uF339': 'ज्ञ', // gya
  '\uF363': 'क्र', // kra (alternate, left loop open)
  '\uF364': 'ख्र', // khra
  '\uF365': 'ग्र', // gra
  '\uF366': 'घ्र', // ghra
  '\uF367': 'च्र', // chra
  '\uF368': 'ज्र', // jra
  '\uF369': 'झ्र', // jhra
  '\uF36B': 'ञ्र', // ñra
  '\uF36C': 'ण्र', // ṇra
  '\uF36E': 'त्र', // tra
  '\uF36F': 'थ्र', // thra
  '\uF370': 'द्र', // dra
  '\uF371': 'ध्र', // dhra
  '\uF373': 'न्र', // nra
  '\uF374': 'प्र', // pra
  '\uF375': 'फ्र', // phra
  '\uF376': 'ब्र', // bra
  '\uF377': 'भ्र', // bhra
  '\uF379': 'म्र', // mra
  '\uF37A': 'य्र', // yra
  '\uF37B': 'ल्र', // lra
  '\uF37C': 'व्र', // vra
  '\uF37D': 'श्र', // śra
  '\uF37E': 'ष्र', // ṣra
  '\uF37F': 'स्र', // sra
  '\uF380': 'ह्र', // hra
  '\uF3D1': 'क्र', // kra (standard, left loop closed)
  '\uF3E3': 'द्म', // dma
  '\uF3E4': 'द्य', // dya

  // Full forms
  '\uF334': 'छ', // cha (unused, GO uses the half form छ्‍ in all contexts)

  // Half forms (consonant + halant + ZWJ)
  '\uF33A': 'क्‍', // k
  '\uF33B': 'ख्‍', // kh
  '\uF33C': 'ग्‍', // g
  '\uF33D': 'घ्‍', // gh
  '\uF33E': 'च्‍', // c
  '\uF33F': 'ज्‍', // j
  '\uF340': 'झ्‍', // jh
  '\uF343': 'ञ्‍', // ñ
  '\uF344': 'ण्‍', // ṇ
  '\uF346': 'त्‍', // t
  '\uF347': 'थ्‍', // th
  '\uF348': 'ढ्‍', // ḍh
  '\uF34A': 'न्‍', // n
  '\uF34B': 'प्‍', // p
  '\uF34C': 'फ्‍', // ph
  '\uF34D': 'ब्‍', // b
  '\uF34E': 'भ्‍', // bh
  '\uF350': 'म्‍', // m
  '\uF351': 'य्‍', // y
  '\uF352': 'ऱ्‍', // r (eyelash)
  '\uF353': 'ल्‍', // l
  '\uF355': 'ळ्‍', // ḷ
  '\uF356': 'व्‍', // v
  '\uF357': 'श्‍', // ś
  '\uF35A': 'ष्‍', // ṣ
  '\uF35B': 'स्‍', // s
  '\uF35C': 'ह्‍', // h

  // Conjuncts
  '\uF449': 'त्न', // tna
  '\uF45A': 'द्द', // dda
  '\uF46A': 'द्ध', // ddha
  '\uF493': 'द्व', // dva
  '\uF4F5': 'स्न', // sna

  // Syllable ligatures
  '\uF555': 'रू', // rū
  '\uF564': 'हु', // hu
  '\uF565': 'हू', // hū

  // Stacked forms
  '\uF5A2': 'ट्', // ṭ upper
  '\uF5A3': 'ठ्', // ṭh upper
  '\uF5A4': 'ड्', // ḍ upper
  '\uF5A5': 'ढ्', // ḍh upper
  '\uF61F': 'ट', // ṭ lower
  '\uF625': 'ठ', // ṭh lower
  '\uF62B': 'ड', // ḍ lower
  '\uF633': 'ढ', // ḍh lower
};
const ENCODE_HINDI_CONJUNCTS = [
  // LIGATURES
  // Conjuncts
  ['द्भु', '\uF01A'], // dbhu
  ['क्ष', '\uF337'], // ksha
  ['ज्ञ', '\uF339'], // gya
  // ['क्र', '\uF363'], // kra (alternate), use standard form instead
  ['ख्र', '\uF364'], // khra
  ['ग्र', '\uF365'], // gra
  ['घ्र', '\uF366'], // ghra
  ['च्र', '\uF367'], // chra
  ['ज्र', '\uF368'], // jra
  ['झ्र', '\uF369'], // jhra
  ['ञ्र', '\uF36B'], // ñra
  ['ण्र', '\uF36C'], // ṇra
  ['त्र', '\uF36E'], // tra
  ['थ्र', '\uF36F'], // thra
  ['द्र', '\uF370'], // dra
  ['ध्र', '\uF371'], // dhra
  ['न्र', '\uF373'], // nra
  ['प्र', '\uF374'], // pra
  ['फ्र', '\uF375'], // phra
  ['ब्र', '\uF376'], // bra
  ['भ्र', '\uF377'], // bhra
  ['म्र', '\uF379'], // mra
  ['य्र', '\uF37A'], // yra
  ['ल्र', '\uF37B'], // lra
  ['व्र', '\uF37C'], // vra
  ['श्र', '\uF37D'], // śra
  ['ष्र', '\uF37E'], // ṣra
  ['स्र', '\uF37F'], // sra
  ['ह्र', '\uF380'], // hra
  ['क्र', '\uF3D1'], // kra (standard)
  ['द्म', '\uF3E3'], // dma
  ['द्य', '\uF3E4'], // dya
  ['त्न', '\uF449'], // tna
  ['द्द', '\uF45A'], // dda
  ['द्ध', '\uF46A'], // ddha
  ['द्व', '\uF493'], // dva
  ['स्न', '\uF4F5'], // sna
  ['रू', '\uF555'], // rū
  ['हु', '\uF564'], // hu
  ['हू', '\uF565'], // hū
];
const DECODE_THAI = {
  // CONSONANTS
  // Without lower curves to allow a vowel (◌ุ◌ู◌ฺ) to be written below them
  '\uF700': 'ฐ',
  '\uF70F': 'ญ',


  // VOWELS
  // Shifted left to compensate for ascenders (ปฝฟฬ)
  '\uF701': '\u0E34', // short i
  '\uF702': '\u0E35', // long i
  '\uF703': '\u0E36', // short ue
  '\uF704': '\u0E37', // long ue
  '\uF710': '\u0E31', // mai han akat
  '\uF711': '\u0E4D', // nikkhahit
  '\uF712': '\u0E47', // mai tai khu

  // Shifted down to compensate for descenders (ฎฏ, currently unused)
  '\uF718': '\u0E38', // short u
  '\uF719': '\u0E39', // long u
  '\uF71A': '\u0E3A', // phinthu


  // TONE MARKS
  // Shifted down and left to compensate for ascenders (ปฝฟฬ + no vowel + ◌ุ◌ู)
  '\uF705': '\u0E48', // mai ek
  '\uF706': '\u0E49', // mai tho
  '\uF707': '\u0E4A', // mai tri
  '\uF708': '\u0E4B', // mai chattawa
  '\uF709': '\u0E4C', // thanthakhat (silent letter)

  // Shifted down to compensate for shorter letters
  // (กขคฆงจฉชซญฐฑณดตถทธนบผพมยรลวศษสหอฮ + no vowel + ◌ุ◌ู)
  '\uF70A': '\u0E48', // mai ek
  '\uF70B': '\u0E49', // mai tho
  '\uF70C': '\u0E4A', // mai tri
  '\uF70D': '\u0E4B', // mai chattawa
  '\uF70E': '\u0E4C', // thanthakhat (silent letter)

  // Compensates for ascenders (unused due to being the same as regular codepoint)
  '\uF713': '\u0E48', // mai ek
  '\uF714': '\u0E49', // mai tho
  '\uF715': '\u0E4A', // mai tri
  '\uF716': '\u0E4B', // mai chattawa
  '\uF717': '\u0E4C', // thanthakhat (silent letter)
};
const ENCODE_THAI = [
  // TONE MARKS
  // Shifted down and left to compensate for ascenders (ปฝฟฬ + ◌ุ◌ู◌ฺ)
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E48/g, '$1\uF705'], // mai ek
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E49/g, '$1\uF706'], // mai tho
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E4A/g, '$1\uF707'], // mai tri
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E4B/g, '$1\uF708'], // mai chattawa
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E4C/g, '$1\uF709'], // thanthakhat (silent letter)

  // Shifted down to compensate for shorter letters
  // (กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบผพภมยรฤลฦวศษสหอฮ + + ◌ุ◌ู◌ฺ)
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E48(?!\u0E33)/g, '$1\uF70A'], // mai ek
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E49(?!\u0E33)/g, '$1\uF70B'], // mai tho
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E4A(?!\u0E33)/g, '$1\uF70C'], // mai tri
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E4B(?!\u0E33)/g, '$1\uF70D'], // mai chattawa
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E4C(?!\u0E33)/g, '$1\uF70E'], // thanthakhat (silent letter)


  // VOWELS
  // Shifted left to compensate for ascenders (ปฝฟฬ)
  [/([ปฝฟฬ])\u0E34/g, '$1\uF701'], // short i
  [/([ปฝฟฬ])\u0E35/g, '$1\uF702'], // long i
  [/([ปฝฟฬ])\u0E36/g, '$1\uF703'], // short ue
  [/([ปฝฟฬ])\u0E37/g, '$1\uF704'], // long ue
  [/([ปฝฟฬ])\u0E31/g, '$1\uF710'], // mai han akat
  [/([ปฝฟฬ])\u0E4D/g, '$1\uF711'], // nikkhahit
  [/([ปฝฟฬ])\u0E47/g, '$1\uF712'], // mai tai khu

  // Shifted down to compensate for descenders (ฎฏ, currently unused)
  [/([ฎฏ])\u0E38/g, '$1\uF718'], // short u
  [/([ฎฏ])\u0E39/g, '$1\uF719'], // long u
  [/([ฎฏ])\u0E3A/g, '$1\uF71A'], // phinthu


  // CONSONANTS
  // Without lower curves to allow a vowel (◌ุ◌ู◌ฺ) to be written below them
  [/ฐ(?=[\u0E38-\u0E3A])/g, '\uF700'],
  [/ญ(?=[\u0E38-\u0E3A])/g, '\uF70F'],
];
*/

/**
 * Encodes standard Hindi text into the Pokémon GO encoding.
 *
 * @param {string} value the string to encode
 * @returns {string} the encoded string
 */
/*
function encodeHindi(value) {
  value = value.replace(new RegExp(`(${INITIAL})(${FINAL})`, 'gu'), (syllable, initial, final) => {
    // LIGATURES
    // Conjuncts
    ENCODE_HINDI_CONJUNCTS.forEach(([pattern, replacement]) => {
      syllable = syllable.replaceAll(pattern, replacement);
    });
    return syllable;
  });

  // LIGATURES
  // Conjuncts
  // ENCODE_HINDI_CONJUNCTS.forEach(([pattern, replacement]) => {
  //   value = value.replaceAll(pattern, replacement);
  // });

  // // FIRST PASS: reorder reph and short i
  // // Rakar
  // value = value.replace(new RegExp(`(${INITIAL})्र(${NUKTA}?)(${FINAL}?)`, 'gu'), '$1\uF1B0$2$3');

  // // Reph
  // value = value.replace(/र्([दर])/gu, '$1\uF000'); // r (reph in र्द, र्र)
  // value = value.replace(/र्([टड])/gu, '$1\uF001'); // r (reph in र्ट, र्ड)
  // value = value.replace(/र्(ल)/gu, '$1\uF002'); // r (reph in र्ल)
  // value = value.replace(/र्(क)/gu, '$1\uF005'); // r (reph in र्क)
  // value = value.replace(new RegExp(`र्(${HALF}*${CONSONANT})`, 'gu'), '$1\uF306'); // r (reph)

  // short i + consonant cluster (visual)
  // consonant cluster + short i (logical)
  // value = value.replace(new RegExp(`(${INITIAL})${SHORT_I}*${NUKTA}?${HALANT}?`, 'gu'), '$2ि$1')

  return value;
}

function decodeHindi(value) {
  // FIRST PASS: map all simple characters, map all forms of reph to \uF000 and all forms of short i to \u093F
  value = value.replace(/\u094D/g, '\u094D\u200C'); // explicit halant
  value = value.replace(/\u093F/g, SHORT_I); // short i
  value = value.replace(/[\uF000-\uF633]/g, (c) => DECODE_HINDI[c] ?? c); // Private Use

  // SECOND PASS: reorder reph and short i
  // consonant cluster + short i + nukta (visual) is displayed with the nukta on the short i
  // It appears short i + consonant cluster + nukta was intended, giving a logical order of consonant cluster + nukta + short i
  value = value.replace(new RegExp(`(${INITIAL})${SHORT_I}(${NUKTA})(${MODIFIER}?)`, 'gu'), '$1$2ि$3');

  // consonant cluster + short i + reph (visual) is displayed as a reph overlapping a short i
  // It appears short i + consonant cluster + reph was intended, giving a logical order of reph + consonant cluster + short i
  value = value.replace(new RegExp(`(${INITIAL})${SHORT_I}${REPH}(${NUKTA}?${HALANT}?${MODIFIER}?)`, 'gu'), 'र्$1ि$2')

  // consonant cluster + short i + rakar (visual)
  // It appears short i + consonant cluster + rakar was intended, giving a logical order of consonant cluster + rakar + short i
  value = value.replace(new RegExp(`(${INITIAL})${SHORT_I}${RAKAR}(${NUKTA}?${HALANT}?${MODIFIER}?)`, 'gu'), '$1्रि$2')

  // consonant cluster + reph + short i + rakar (visual)
  // It appears short i + reph + consonant cluster + rakar was intended, giving a logical order of reph + consonant cluster + rakar + short i
  value = value.replace(new RegExp(`(${INITIAL})${REPH}${SHORT_I}${RAKAR}(${NUKTA}?${HALANT}?${MODIFIER}?)`, 'gu'), 'र्$1्रि$2')

  // consonant cluster + reph + short i + consonant cluster (visual)
  // reph + consonant cluster + consonant cluster + short i (logical)
  value = value.replace(new RegExp(`(${INITIAL})${REPH}${SHORT_I}(${NUKTA}?${HALANT}?${MODIFIER}?)(${HALF}*${CONSONANT}${NUKTA}?)(?=${FINAL})`, 'gu'), 'र्$1$3ि$2')

  // short i + consonant cluster (visual)
  // consonant cluster + short i (logical)
  value = value.replace(new RegExp(`${SHORT_I}(${NUKTA}?${HALANT}?${MODIFIER}?)(${HALF}*${CONSONANT}${NUKTA}?)`, 'gu'), '$2ि$1')

  // consonant cluster + reph (visual)
  // reph + consonant cluster (logical)
  value = value.replace(new RegExp(`(${INITIAL})${REPH}`, 'gu'), 'र्$1')

  value = value.replaceAll(SHORT_I, 'ि')
  value = value.replaceAll(REPH, 'र्')
  value = value.replaceAll(RAKAR, '्र')
  value = value.replaceAll(ZWNJ, '')
  value = value.replaceAll(ZWJ, '')

  value = value.replace(/\u094D\u093C/g, '\u093C\u094D'); // halant + nukta -> nukta + halant
  return value;
}

function encodeThai(value) {
  ENCODE_THAI.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });
  return value;
}

function decodeThai(value) {
  return value.replace(/[\uF700-\uF71A]/g, (c) => DECODE_THAI[c]);
}

function encodeText(value) {
  if (/[\u0900-\u097F]/.test(value))
    value = encodeHindi(value);
  if (/[\u0E00-\u0E7F]/.test(value))
    value = encodeThai(value);
  return value;
}

function decodeText(value) {
  if (/[\u0900-\u097F\uF000-\uF633]/.test(value))
    value = decodeHindi(value);
  if (/[\u0E00-\u0E7F\uF700-\uF71A]/.test(value))
    value = decodeThai(value);
  return value;
}
*/

const IS_APPLE = window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
const IS_ANDROID = window.navigator.userAgent.match(/Android/i);

// https://github.com/jhildenbiddle/canvas-size#test-results
const MAX_CANVAS_DIM = 32767;
const MAX_CANVAS_AREA = IS_APPLE ? 4096 * 4096 : IS_ANDROID ? 8192 * 8192 : 16384 * 16384;

window.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const modeSelect = document.getElementById('colorscheme');
  const qualitySelect = document.getElementById('quality');
  const sizeSelect = document.getElementById('size');
  const textNormal = document.getElementById('text-normal');
  const textAdjusted = document.getElementById('text-adjusted');
  const textNormalHidden = document.getElementById('text-normal-hidden');
  const textAdjustedHidden = document.getElementById('text-adjusted-hidden');
  const canvas = document.getElementById('text-adjusted-canvas');
  let textCurrent = textNormal;

  // Get dimensions for canvas in pixels
  const paddingTop = +window.getComputedStyle(textNormal).getPropertyValue('padding-top').slice(0, -2);
  const paddingLeft = +window.getComputedStyle(textNormal).getPropertyValue('padding-left').slice(0, -2);
  const maxWidth = ((value) => value !== 'none' ? +value.slice(0, -2) : 0)(window.getComputedStyle(document.body).maxWidth);
  let quality = 1;

  function setText(value) {
    textNormal.value = value;
    textAdjusted.value = value;
    textNormalHidden.innerText = value;
    textAdjustedHidden.innerText = value;
    localStorage.setItem('tt-query', value);
    drawText(value);
  }

  function drawText(value) {
    const scaleFactor = window.devicePixelRatio * quality;  // max zoom is 500%
    // const font = (fontSize * scaleFactor) + 'px "Noto Sans Thai", "Nopua", sans-serif';
    const fontSize = +window.getComputedStyle(textNormal).getPropertyValue('font-size').slice(0, -2);
    const lineHeight = +window.getComputedStyle(textNormal).getPropertyValue('line-height').slice(0, -2);
    const font = (fontSize * scaleFactor) + 'px "Lato", "Noto Sans Thai Adjusted", "Siddhanta Adjusted", "Siddhanta Nukta", "Roboto Bold", "Nopua", sans-serif';
    document.fonts.ready.then((fontSet) => fontSet.load(font, value)).then(() => {
      const ctx = canvas.getContext("2d");

      // Calculate the new canvas size
      const canvasWidth = maxWidth || textNormal.clientWidth;
      canvas.width = Math.min(MAX_CANVAS_DIM, canvasWidth * scaleFactor);
      canvas.style.width = (canvas.width / scaleFactor) + 'px';
      ctx.width = canvas.width;

      const canvasHeight = textNormal.clientHeight;
      canvas.height = Math.min(MAX_CANVAS_DIM, canvasHeight * scaleFactor, MAX_CANVAS_AREA / canvas.width);
      canvas.style.height = (canvas.height / scaleFactor) + 'px';
      ctx.height = canvas.height;

      ctx.clearRect(0, 0, ctx.width, ctx.height);
      ctx.font = font;
      ctx.fillStyle = window.getComputedStyle(textNormal).color;
      ctx.textBaseline = 'baseline';
      value = value.replaceAll(/\u200D./g, '');  // GO text engine eats characters after ZWJ

      let y = (paddingTop + 1/2*lineHeight + (3/8+3/256)*fontSize) * scaleFactor;
      value.split('\n').forEach((line) => {
        for (let i = 0, x = paddingLeft * scaleFactor; i < line.length; i++) {
          const metrics = ctx.measureText(line[i]);
          if (line[i].codePointAt(0) >= 0xF30C && line[i].codePointAt(0) <= 0xF320) {
            // offset it so it is drawn starting at the cursor, rather than before it
            x += ctx.measureText('ि').width;
          }
          else if (line[i] === '\u200C') {
            // manually draw the Lato ZWNJ glyph
            ctx.fillRect(
              x - 23/139 * 6/64 * fontSize * scaleFactor,
              y - 1610/1882 * 61/64 * fontSize * scaleFactor,
              46/139 * 6/64 * fontSize * scaleFactor,
              2000/1882 * 61/64 * fontSize * scaleFactor
            );
          }
          ctx.fillText(line[i], x, y);
          x += metrics.width;
        }
        y += lineHeight * scaleFactor;
      });
    });
  }

  function changeTheme(value) {
    main.classList.remove('mode-system', 'mode-light', 'mode-dark');
    main.classList.add(`mode-${value}`);
    localStorage.setItem('mode', value);
  }

  function changeQuality(value) {
    quality = value;
    localStorage.setItem('tt-quality', value);
  }

  function changeSize(value) {
    textNormal.style.fontSize = value + '%';
    textAdjusted.style.fontSize = value + '%';
    textNormalHidden.style.fontSize = value + '%';
    textAdjustedHidden.style.fontSize = value + '%';
    localStorage.setItem('tt-size', value);
  }

  function getPreferredLanguage() {
    const languages = navigator.languages;
    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i].split('-')[0].toLowerCase();
      if (lang === 'hi') {
        return 'hindi';
      }
      else if (lang === 'th') {
        return 'thai';
      }
    }
    return 'hindi';  // default to hindi
  }

  function changeKeyboard(value) {
    console.log(value);
    if (value === 'hindi') {
      document.getElementById('keyboard-thai').classList.add('keyboard-hidden');
      document.getElementById('keyboard-hindi').classList.remove('keyboard-hidden');
    }
    else if (value === 'thai') {
      document.getElementById('keyboard-hindi').classList.add('keyboard-hidden');
      document.getElementById('keyboard-thai').classList.remove('keyboard-hidden');
    }
    else {
      document.getElementById('keyboard-hindi').classList.add('keyboard-hidden');
      document.getElementById('keyboard-thai').classList.add('keyboard-hidden');
    }
    localStorage.setItem('tt-keyboard', value);
  }

  modeSelect.addEventListener('change', (e) => {
    changeTheme(e.target.value);
    drawText(textNormal.value);
  });

  qualitySelect.addEventListener('change', (e) => {
    changeQuality(+e.target.value);
    drawText(textNormal.value);
  });

  sizeSelect.addEventListener('change', (e) => {
    changeSize(+e.target.value);
    drawText(textNormal.value);
  });

  textNormal.addEventListener('focus', () => {
    textCurrent = textNormal;
  });

  textAdjusted.addEventListener('focus', () => {
    textCurrent = textAdjusted;
  });

  textNormal.addEventListener('input', (e) => {
    setText(e.target.value);
  });

  textAdjusted.addEventListener('input', (e) => {
    setText(e.target.value);
  });

  textNormal.addEventListener('blur', () => {
    textNormal.scrollTo(0, 0);
  });

  textAdjusted.addEventListener('blur', () => {
    textAdjusted.scrollTo(0, 0);
  });

  document.getElementById('keyboard-select-hindi').addEventListener('click', (e) => {
    changeKeyboard(e.target.value);
  });

  document.getElementById('keyboard-select-thai').addEventListener('click', (e) => {
    changeKeyboard(e.target.value);
  });

  document.getElementById('keyboard-select-hide').addEventListener('click', (e) => {
    changeKeyboard(e.target.value);
  });

  document.getElementById('contact-link').href = atob('bWFpbHRvOmFiY2JveUBidWxiYWdhcmRlbi5uZXQ=');

  Array.from(document.getElementById('keyboard-hindi').getElementsByClassName('key')).forEach((element) => {
    element.addEventListener('click', () => {
      const c = String.fromCodePoint(parseInt(element.id.substring(4), 16));
      const newPos = textCurrent.selectionStart + c.length;
      setText(textCurrent.value.substring(0, textCurrent.selectionStart) + c + textCurrent.value.substring(textCurrent.selectionEnd));
      textCurrent.focus();
      textCurrent.selectionStart = textCurrent.selectionEnd = newPos;
    });
    console.log(element.innerHTML);
    if (IS_APPLE && element.innerHTML.includes('\u200C')) {
      element.innerHTML = element.innerHTML.replaceAll('\u200C', '');
    }
  })

  Array.from(document.getElementById('keyboard-thai').getElementsByClassName('key')).forEach((element) => {
    element.addEventListener('click', () => {
      const c = String.fromCodePoint(parseInt(element.id.substring(4), 16));
      const newPos = textCurrent.selectionStart + c.length;
      setText(textCurrent.value.substring(0, textCurrent.selectionStart) + c + textCurrent.value.substring(textCurrent.selectionEnd));
      textCurrent.focus();
      textCurrent.selectionStart = textCurrent.selectionEnd = newPos;
    });
    console.log(element.innerHTML);
    if (IS_APPLE && element.innerHTML.includes('◌\u200C')) {
      element.innerHTML = element.innerHTML.replaceAll('◌\u200C', '');
    }
  })

  const savedMode = localStorage.getItem('mode') ?? 'system';
  modeSelect.value = savedMode;
  changeTheme(savedMode);

  const savedQuality = localStorage.getItem('tt-quality') ?? '1';
  qualitySelect.value = savedQuality;
  changeQuality(savedQuality);

  const savedSize = localStorage.getItem('tt-size') ?? '150';
  sizeSelect.value = savedSize;
  changeSize(savedSize);

  const savedKeyboard = localStorage.getItem('tt-keyboard') ?? getPreferredLanguage();
  document.getElementById(`keyboard-select-${savedKeyboard}`).checked = true;
  changeKeyboard(savedKeyboard);

  const savedQuery = localStorage.getItem('tt-query') ?? '';
  setText(savedQuery);
});
