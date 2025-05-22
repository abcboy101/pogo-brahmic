'use strict';

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

function getReph(_, consonant, diacritic) {
  const reph = {
    'क': '\uF005',
    'ट': '\uF001',
    'ड': '\uF001',
    'द': '\uF000',
    'र': '\uF000',
    'ल': '\uF002',
    'ज़': '\uF000',
  }[consonant] ?? '\uF306';
  return `${consonant}${reph}${diacritic}`;
}

function getLongE(_, consonant, rakar) {
  const matra = {
    'क': '\uF00D',
    'क\uF005': '\uF387',
    'ट': '\uF008',
    'र': '\uF008',
    'ल': '\uF00A',
    '\uF375': '\uF00D',
    '\uF389': '\uF008',
  }[consonant] ?? '\u0947';
  return `${consonant}${rakar}${matra}`;
}

function getShortI(_, consonant) {
  const matra = {
    'क': '\uF311',
    'ख': '\uF31E',
    'ग': '\uF30C',
    'च': '\uF314',
    'ज': '\uF31E',
    'ट': '\uF310',
    'ठ': '\uF30F',
    'ड': '\uF30F',
    'त': '\uF312',
    'थ': '\uF314',
    'द': '\uF30F',
    'ध': '\uF312',
    'न': '\uF312',
    'प': '\uF311',
    'प\uF306': '\uF310',
    'फ': '\uF311',
    'ब': '\uF311',
    'भ': '\uF314',
    'म': '\uF314',
    'र': '\uF30D',
    'ल': '\uF314',
    'व': '\uF311',
    'श': '\uF317',
    'ष': '\uF311',
    'स': '\uF319',
    'ह': '\uF311',
    'ढ़': '\uF311',
    '\uF337': '\uF319',
    '\uF33A': '\uF319',
    '\uF33Aट': '\uF320',
    '\uF33Aल': '\uF31E',
    '\uF33Aव': '\uF320',
    '\uF34Aट': '\uF320',
    '\uF34D': '\uF314',
    '\uF350': '\uF31D',
    '\uF353क': '\uF31E',
    '\uF353फ़': '\uF31D',
    '\uF35Aम': '\uF320',
    '\uF35Bक': '\uF320',
    '\uF35Bट': '\uF31E',
    '\uF35Bप': '\uF31D',
    '\uF35Bल': '\uF320',
    '\uF35Bव': '\uF320',
    '\uF376': '\uF311',
    '\uF389': '\uF314',
  }[consonant] ?? '\u093F';
  return `${matra}${consonant}`;
}

function getLongI(_, consonant) {
  const matra = {
   'क': '\uF32A',
   'ट': '\uF323',
   'फ': '\uF32A',
   'र': '\uF322',
   'ल': '\uF325',
   '\uF389': '\uF32B',
  }[consonant] ?? '\u093F';
  return `${consonant}${matra}`;
}

const DECODE_HINDI = {
  // CONSONANTS
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
  '\uF389': 'फ़्र', // fra
  '\uF3D1': 'क्र', // kra (standard, left loop closed)
  '\uF3E3': 'द्म', // dma
  '\uF3E4': 'द्य', // dya
  '\uF449': 'त्न', // tna
  '\uF45A': 'द्द', // dda
  '\uF46A': 'द्ध', // ddha
  '\uF493': 'द्व', // dva
  '\uF4F5': 'स्न', // sna (not used in most text)

  // Stacked forms
  '\uF5A2': 'ट्', // ṭ upper
  '\uF5A3': 'ठ्', // ṭh upper
  '\uF5A4': 'ड्', // ḍ upper
  '\uF5A5': 'ढ्', // ḍh upper
  '\uF61F': 'ट', // ṭ lower
  '\uF625': 'ठ', // ṭh lower
  '\uF62B': 'ड', // ḍ lower
  '\uF633': 'ढ', // ḍh lower

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
  '\uF390': 'फ़्‍', // f

  // Below-base forms
  '\uF1B0': '्र', // r (rakar, ◌्र)

  // Reph
  '\uF000': REPH, // r (reph in र्द, र्र, र्ज़; reordering)
  '\uF001': REPH, // r (reph in र्ट, र्ड; reordering)
  '\uF002': REPH, // r (reph in र्ल; reordering)
  '\uF003': REPH, // r (reph, unused; reordering)
  '\uF004': REPH, // r (reph, unused; reordering)
  '\uF005': REPH, // r (reph in र्क; reordering)
  '\uF006': REPH, // r (reph, unused; reordering)
  '\uF007': REPH, // r (reph, unused; reordering)
  '\uF306': REPH, // r (reph; reordering)


  // VOWELS
  // Diacritics
  '\uF300': '\u0901', // chandrabindu (◌ँ in ◌ैँ)

  // Vowel marks
  '\uF008': '\u0947', // long e (◌े in टे, रे, फ़्रे)
  '\uF009': '\u0947', // long e (unused)
  '\uF00A': '\u0947', // long e (◌े in ले)
  '\uF00B': '\u0947', // long e (unused)
  '\uF00C': '\u0947', // long e (unused)
  '\uF00D': '\u0947', // long e (◌े in के, फ्रे)
  '\uF00E': '\u0947', // long e (unused)
  '\uF00F': '\u0947', // long e (unused)
  '\uF387': '\u0947', // long e (◌े in र्के; duplicate of F00E)
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
  '\uF30C': SHORT_I, // short i (◌ि in गि; reordering)
  '\uF30D': SHORT_I, // short i (◌ि in रि; reordering)
  '\uF30E': SHORT_I, // short i (unused; reordering)
  '\uF30F': SHORT_I, // short i (◌ि in ठि, डि, दि; reordering)
  '\uF310': SHORT_I, // short i (◌ि in टि, र्पि; reordering)
  '\uF311': SHORT_I, // short i (◌ि in कि, पि, फि, बि, वि, षि, हि, ढ़ि, ब्रि; reordering)
  '\uF312': SHORT_I, // short i (◌ि in ति, धि, नि; reordering)
  '\uF313': SHORT_I, // short i (unused; reordering)
  '\uF314': SHORT_I, // short i (◌ि in चि, थि, भि, मि, लि, बि्, फ़्रि; reordering)
  '\uF315': SHORT_I, // short i (unused; reordering)
  '\uF316': SHORT_I, // short i (unused; reordering)
  '\uF317': SHORT_I, // short i (◌ि in शि; reordering)
  '\uF318': SHORT_I, // short i (unused; reordering)
  '\uF319': SHORT_I, // short i (◌ि in सि, क्षि, कि्; reordering)
  '\uF31A': SHORT_I, // short i (unused; reordering)
  '\uF31B': SHORT_I, // short i (unused; reordering)
  '\uF31C': SHORT_I, // short i (unused; reordering)
  '\uF31D': SHORT_I, // short i (◌ि in मि्, ल्फ़ि, स्पि; reordering)
  '\uF31E': SHORT_I, // short i (◌ि in खि, जि, क्लि, ल्कि, स्टि; reordering)
  '\uF31F': SHORT_I, // short i (unused; reordering)
  '\uF320': SHORT_I, // short i (◌ि in क्टि, क्वि, न्टि, ष्मि, स्कि, स्लि, स्वि; reordering)
  '\uF321': '\u0940', // long i (unused)
  '\uF322': '\u0940', // long i (◌ी in री)
  '\uF323': '\u0940', // long i (◌ी in टी)
  '\uF324': '\u0940', // long i (unused)
  '\uF325': '\u0940', // long i (◌ी in ली)
  '\uF326': '\u0940', // long i (unused)
  '\uF327': '\u0940', // long i (unused)
  '\uF328': '\u0940', // long i (unused)
  '\uF329': '\u0940', // long i (unused)
  '\uF32A': '\u0940', // long i (◌ी in की, फी)
  '\uF32B': '\u0940', // long i (◌ी in फ़्री)
  '\uF32C': '\u0940', // long i (unused)


  // SYLLABLES
  // Full forms
  '\uF334': 'छ', // cha (unused, GO uses the half form छ्‍ in all contexts)

  // Syllable ligatures
  '\uF01A': 'द्भु', // dbhu (द्भ + ◌ु)
  '\uF388': 'रु', // ru
  '\uF555': 'रू', // rū
  '\uF564': 'हु', // hu
  '\uF565': 'हू', // hū
};
const ENCODE_HINDI = [
  // CONSONANTS
  // Conjuncts
  ['क्ष', '\uF337'], // ksha
  ['ज्ञ', '\uF339'], // gya
  // ['क्र', '\uF363'], // kra (alternate, left loop open)
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
  ['फ़्र', '\uF389'], // fra
  ['क्र', '\uF3D1'], // kra (standard, left loop closed)
  ['द्म', '\uF3E3'], // dma
  ['द्य', '\uF3E4'], // dya
  ['त्न', '\uF449'], // tna
  ['द्द', '\uF45A'], // dda
  ['द्ध', '\uF46A'], // ddha
  ['द्व', '\uF493'], // dva
  // ['स्न', '\uF4F5'], // sna (not used in most text)

  // Stacked forms
  [/ट्ट/gu, '\uF5A2\uF61F'], // ṭṭ
  [/ट्ठ/gu, '\uF5A2\uF625'], // ṭṭh
  [/ट्ड/gu, '\uF5A2\uF62B'], // ṭḍ
  [/ट्ढ/gu, '\uF5A2\uF633'], // ṭḍh
  [/ठ्ट/gu, '\uF5A3\uF61F'], // ṭhṭ
  [/ठ्ठ/gu, '\uF5A3\uF625'], // ṭhṭh
  [/ठ्ड/gu, '\uF5A3\uF62B'], // ṭhḍ
  [/ठ्ढ/gu, '\uF5A3\uF633'], // ṭhḍh
  [/ड्ट/gu, '\uF5A4\uF61F'], // ḍṭ
  [/ड्ठ/gu, '\uF5A4\uF625'], // ḍṭh
  [/ड्ड/gu, '\uF5A4\uF62B'], // ḍḍ
  [/ड्ढ/gu, '\uF5A4\uF633'], // ḍḍh
  [/ढ्ट/gu, '\uF5A5\uF61F'], // ḍhṭ
  [/ढ्ठ/gu, '\uF5A5\uF625'], // ḍhṭh
  [/ढ्ड/gu, '\uF5A5\uF62B'], // ḍhḍ
  [/ढ्ढ/gu, '\uF5A5\uF633'], // ḍhḍh

  // Half forms (consonant + halant)
  ['क्', '\uF33A'], // k
  ['ख्', '\uF33B'], // kh
  ['ग्', '\uF33C'], // g
  ['घ्', '\uF33D'], // gh
  ['च्', '\uF33E'], // c
  ['ज्', '\uF33F'], // j
  ['ज़्', '\uF33F़'], // z
  ['झ्', '\uF340'], // jh
  ['ञ्', '\uF343'], // ñ
  ['ण्', '\uF344'], // ṇ
  ['त्', '\uF346'], // t
  ['थ्', '\uF347'], // th
  ['ढ्', '\uF348'], // ḍh
  ['न्', '\uF34A'], // n
  ['प्', '\uF34B'], // p
  ['फ्', '\uF34C'], // ph
  ['ब्', '\uF34D'], // b
  ['भ्', '\uF34E'], // bh
  ['म्', '\uF350'], // m
  ['य्', '\uF351'], // y
  ['ऱ्', '\uF352'], // r (eyelash)
  ['ल्', '\uF353'], // l
  ['ळ्', '\uF355'], // ḷ
  ['व्', '\uF356'], // v
  ['श्', '\uF357'], // ś
  ['ष्', '\uF35A'], // ṣ
  ['स्', '\uF35B'], // s
  ['ह्', '\uF35C'], // h
  ['फ़्', '\uF390'], // f

  // Below-base forms
  ['्र', '\uF1B0'], // r (rakar, ◌्र)

  // Reph
  [new RegExp(`([कटडदरलज़]?)([ं़ुूेैो्]*)${REPH}`, 'gu'), getReph], // r (reph; reordering)


  // VOWELS
  // Diacritics
  ['ैँ', 'ै\uF300'], // chandrabindu (◌ँ in ◌ैँ)

  // Vowel marks
  [/([कटरल\uF375\uF389][\uF000-\uF007\uF306]?)(\uF1B0?)\u0947/gu, getLongE], // long e
  [/([क]\uF1B0?)\u0948/gu, '$1\uF015'], // ai (◌ै in कै)
  [/([क])\u0941/gu, '$1\uF018'], // short u (◌ु in कु)
  [/([क])\u0942/gu, '$1\uF019'], // long u (◌ू in कू)
  [/([ल]|र्[क]|क\uF015)\u0902/gu, '$1\uF01B'], // ṁ (anusvara; ◌ं in लं, कैं)
  [new RegExp(`${SHORT_I}(प\uF306|\uF33A[टलव]|\uF34Aट|\uF353[कफ़]|\uF35Aम|\uF35B[कटपलव]|[कखगचजटठडतथदधनपफबभमरलवशषसहढ़\uF337\uF33A\uF34D\uF350\uF376\uF389\uF33A\uF35B]|)`, 'gu'), getShortI], // short i (reordering)
  [/([कटफरल\uF389])\u0940/gu, getLongI], // long i


  // SYLLABLES
  // Full forms
  // ['छ', '\uF334'], // cha (unused, GO uses the half form छ्‍ in all contexts)

  // Syllable ligatures
  ['द्भु', '\uF01A'], // dbhu
  ['रु', '\uF388'], // ru
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
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E48/gu, '$1\uF705'], // mai ek
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E49/gu, '$1\uF706'], // mai tho
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E4A/gu, '$1\uF707'], // mai tri
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E4B/gu, '$1\uF708'], // mai chattawa
  [/([ปฝฟฬ][\u0E38-\u0E3A]?)\u0E4C/gu, '$1\uF709'], // thanthakhat (silent letter)

  // Shifted down to compensate for shorter letters
  // (กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบผพภมยรฤลฦวศษสหอฮ + + ◌ุ◌ู◌ฺ)
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E48(?!\u0E33)/gu, '$1\uF70A'], // mai ek
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E49(?!\u0E33)/gu, '$1\uF70B'], // mai tho
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E4A(?!\u0E33)/gu, '$1\uF70C'], // mai tri
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E4B(?!\u0E33)/gu, '$1\uF70D'], // mai chattawa
  [/([ก-บผพภ-หอฮ][\u0E38-\u0E3A]?)\u0E4C(?!\u0E33)/gu, '$1\uF70E'], // thanthakhat (silent letter)


  // VOWELS
  // Shifted left to compensate for ascenders (ปฝฟฬ)
  [/([ปฝฟฬ])\u0E34/gu, '$1\uF701'], // short i
  [/([ปฝฟฬ])\u0E35/gu, '$1\uF702'], // long i
  [/([ปฝฟฬ])\u0E36/gu, '$1\uF703'], // short ue
  [/([ปฝฟฬ])\u0E37/gu, '$1\uF704'], // long ue
  [/([ปฝฟฬ])\u0E31/gu, '$1\uF710'], // mai han akat
  [/([ปฝฟฬ])\u0E4D/gu, '$1\uF711'], // nikkhahit
  [/([ปฝฟฬ])\u0E47/gu, '$1\uF712'], // mai tai khu

  // Shifted down to compensate for descenders (ฎฏ, currently unused)
  [/([ฎฏ])\u0E38/gu, '$1\uF718'], // short u
  [/([ฎฏ])\u0E39/gu, '$1\uF719'], // long u
  [/([ฎฏ])\u0E3A/gu, '$1\uF71A'], // phinthu


  // CONSONANTS
  // Without lower curves to allow a vowel (◌ุ◌ู◌ฺ) to be written below them
  [/ฐ(?=[\u0E38-\u0E3A])/gu, '\uF700'],
  [/ญ(?=[\u0E38-\u0E3A])/gu, '\uF70F'],
];

const encodeHindiCache = {};

/**
 * Encodes standard Hindi text into the Pokémon GO encoding.
 *
 * @param {string} value the string to encode
 * @returns {string} the encoded string
 */
function encodeHindi(value, print = false) {
  value = value.replaceAll(new RegExp(`(${INITIAL})(${FINAL})`, 'gu'), (value, s, e) => {
    if (value === '') return value;
    if (encodeHindiCache[value] !== undefined) return encodeHindiCache[value];

    const original = value;
    value = value.replaceAll(ZWNJ, '')
    value = value.replaceAll(ZWJ, '')

    // Unsupported conjuncts
    value = value.replaceAll('ट्न', `ट\u{10094D}न`); // ṭn
    value = value.replaceAll('ट्व', `ट\u{10094D}व`); // ṭv
    value = value.replaceAll('ज़्ल', `ज़\u{10094D}ल`); // zl

    // Prevent reph usage, leave as ra + halant
    value = value.replace(/र्(फ|द्र|प्र)/gu, 'र\u{10094D}$1')

    // Force reph usage, and break the following consonant cluster
    // Example: र् + प् + श = र्प्‌श, not र्प्श (r + p + sh = rp + sh, not r + psh)
    value = value.replaceAll(new RegExp(`(र्${CONSONANT})${HALANT}(${CONSONANT})`, 'gu'), '$1\u{10094D}$2');

    // reph + consonant cluster + short i (logical)
    // short i + consonant cluster + reph (visual)
    // Example: ि + क + र् = र्कि (i + k + r = rki)
    value = value.replace(new RegExp(`\u0930\u094D(${INITIAL})\u093F(${FINAL})`, 'gu'), `${SHORT_I}$1$2${REPH}`);

    // consonant cluster + short i (logical)
    // short i + consonant cluster (visual)
    // Example: ि + क = कि (i + k = ki)
    value = value.replace(new RegExp(`(${INITIAL})\u093F(${FINAL})`, 'gu'), `${SHORT_I}$1$2`);

    // reph + consonant cluster (logical)
    // consonant cluster + reph (visual)
    // Example: क + र् = र्क (k + r = rk)
    value = value.replace(new RegExp(`\u0930\u094D(${INITIAL})(${FINAL})`, 'gu'), `$1$2${REPH}`);

    // Perform all simple mappings
    ENCODE_HINDI.forEach(([pattern, replacement]) => {
    value = value.replaceAll(pattern, replacement);
    });

    value = value.replaceAll('\u{10094D}', '्')
    if (print) console.log([original, value]);
    encodeHindiCache[original] = value;
    //if (value.search(/\u094D/gu) >= 0) console.log([original, value]);
    return value;
  });
  return value;
}


/**
 * Decodes Hindi text from Pokémon GO into the standard encoding.
 *
 * @param {string} value the string to decode
 * @returns {string} the decoded string
 */
function decodeHindi(value, fixMalformed = true) {
  const preserveZWNJ = document.getElementById('decode-zwnj')?.checked ?? false;
  const preserveZWJ = document.getElementById('decode-zwj')?.checked ?? false;

  // Perform all simple mappings
  value = value.replace(/\u094D/gu, '\u094D\u200C'); // explicit halant
  value = value.replace(/\u093F/gu, SHORT_I); // short i
  value = value.replace(/[\uF000-\uF633]/gu, (c) => DECODE_HINDI[c] ?? c); // Private Use

  // Malformed double short i
  // short i + short i + consonant cluster + consonant cluster (malformed)
  // short i + consonant cluster + short i + consonant cluster (visual)
  // consonant cluster + short i + consonant cluster + short i (logical)
  if (fixMalformed)
    value = value.replace(new RegExp(`${SHORT_I}${SHORT_I}(${INITIAL}${FINAL}${REPH}?)`, 'gu'), `${SHORT_I}$1${SHORT_I}`);

  // short i + consonant cluster + reph (visual)
  // reph + consonant cluster + short i (logical)
  // Example: ि + क + र् = र्कि (i + k + r = rki)
  value = value.replace(new RegExp(`${SHORT_I}(${INITIAL})(${FINAL})${REPH}`, 'gu'), 'र्$1\u093F$2');

  // short i + consonant cluster (visual)
  // consonant cluster + short i (logical)
  // Example: ि + क = कि (i + k = ki)
  value = value.replace(new RegExp(`${SHORT_I}(${INITIAL})(${FINAL})`, 'gu'), '$1\u093F$2');

  // consonant cluster + reph (visual)
  // reph + consonant cluster (logical)
  // Example: क + र् = र्क (k + r = rk)
  value = value.replace(new RegExp(`(${INITIAL})(${FINAL})${REPH}`, 'gu'), 'र्$1$2');

  value = value.replaceAll(SHORT_I, 'ि')
  value = value.replaceAll(REPH, 'र्')

  if (!preserveZWNJ)
    value = value.replaceAll(ZWNJ, '')
  if (!preserveZWJ)
    value = value.replaceAll(ZWJ, '')

  value = value.replace(/\u094D\u093C/gu, '\u093C\u094D'); // halant + nukta -> nukta + halant
  if (fixMalformed)
    value = value.replace(/टय्ॎ/gu, 'ट्य'); // malformed ṭya (Buizel)
  return value;
}

/**
 * Encodes standard Thai text into the Pokémon GO encoding.
 *
 * @param {string} value the string to encode
 * @returns {string} the encoded string
 */
function encodeThai(value) {
  ENCODE_THAI.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });
  return value;
}

/**
 * Decodes Thai text from Pokémon GO into the standard encoding.
 *
 * @param {string} value the string to decode
 * @returns {string} the decoded string
 */
function decodeThai(value) {
  return value.replace(/[\uF700-\uF71A]/gu, (c) => DECODE_THAI[c]);
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
      value = value.replaceAll(/\u200D./gu, '');  // GO text engine eats characters after ZWJ

      let y = (paddingTop + 1/2*lineHeight + (3/8+3/256)*fontSize) * scaleFactor;
      value.split('\n').forEach((line) => {
        for (let i = 0, x = paddingLeft * scaleFactor; i < line.length; i++) {
          const metrics = ctx.measureText(line[i]);
          /* if (line[i].codePointAt(0) >= 0xF30C && line[i].codePointAt(0) <= 0xF320) {
            // offset it so it is drawn starting at the cursor, rather than before it (no longer needed in 0.291.0)
            x += ctx.measureText('ि').width;
          } */
          if (line[i] === '\u200C') {
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

  document.getElementById('encode').addEventListener('click', (e) => {
    setText(encodeText(textAdjusted.value));
  });

  document.getElementById('decode').addEventListener('click', (e) => {
    setText(decodeText(textNormal.value));
  });

  document.getElementById('download').addEventListener('click', (e) => {
    canvas.toBlob((blob) => {
      const link = document.getElementById('downloadLink');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.click();
      link.href = "#";
      URL.revokeObjectURL(url);
    }, 'image/png');
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
    if (IS_APPLE && element.innerHTML.includes('\u200C')) {
      element.innerHTML = element.innerHTML.replaceAll('\u200C', '');
      element.innerHTML = element.innerHTML.replaceAll('◌', '');
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
    if (IS_APPLE && element.innerHTML.includes('\u200C')) {
      element.innerHTML = element.innerHTML.replaceAll('\u200C', '\u200D');
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
