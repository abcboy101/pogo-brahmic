import re
import unicodedata
from collections.abc import Iterable

REPLACEMENTS_HINDI = [
    # LIGATURES
    # Pokémon GO's text system does not allow for the selection of context-sensitive ligatures like these,
    # so they are each given a separate codepoint in the PUA.

    # Conjuncts
    ('\uF01A', 'द्भु'),  # dbhu
    ('\uF337', 'क्ष'),  # ksha
    ('\uF339', 'ज्ञ'),  # gya
    ('\uF363', 'क्र'),  # kra (alternate)
    ('\uF364', 'ख्र'),  # khra
    ('\uF365', 'ग्र'),  # gra
    ('\uF366', 'घ्र'),  # ghra
    ('\uF367', 'च्र'),  # chra
    ('\uF368', 'ज्र'),  # jra
    ('\uF369', 'झ्र'),  # jhra
    ('\uF36B', 'ञ्र'),  # ñra
    ('\uF36C', 'ण्र'),  # ṇra
    ('\uF36E', 'त्र'),  # tra
    ('\uF36F', 'थ्र'),  # thra
    ('\uF370', 'द्र'),  # dra
    ('\uF371', 'ध्र'),  # dhra
    ('\uF373', 'न्र'),  # nra
    ('\uF374', 'प्र'),  # pra
    ('\uF375', 'फ्र'),  # phra
    ('\uF376', 'ब्र'),  # bra
    ('\uF377', 'भ्र'),  # bhra
    ('\uF379', 'म्र'),  # mra
    ('\uF37A', 'य्र'),  # yra
    ('\uF37B', 'ल्र'),  # lra
    ('\uF37C', 'व्र'),  # vra
    ('\uF37D', 'श्र'),  # śra
    ('\uF37E', 'ष्र'),  # ṣra
    ('\uF37F', 'स्र'),  # sra
    ('\uF380', 'ह्र'),  # hra
    ('\uF3D1', 'क्र'),  # kra (standard)
    ('\uF3E3', 'द्म'),  # dma
    ('\uF3E4', 'द्य'),  # dya
    ('\uF449', 'त्न'),  # tna
    ('\uF45A', 'द्द'),  # dda
    ('\uF46A', 'द्ध'),  # ddha
    ('\uF493', 'द्व'),  # dva
    ('\uF4F5', 'स्न'),  # sna
    ('\uF555', 'रू'),  # rū
    ('\uF564', 'हु'),  # hu
    ('\uF565', 'हू'),  # hū

    # Full forms
    ('\uF334', 'छ'),  # cha (unused, GO uses the half form in all contexts)

    # Half forms
    # We add a halant to allow them to ligate with the following character.
    ('\uF33A', 'क्'),  # k
    ('\uF33B', 'ख्'),  # kh
    ('\uF33C', 'ग्'),  # g
    ('\uF33D', 'घ्'),  # gh
    ('\uF33E', 'च्'),  # c
    ('\uF33F', 'ज्'),  # j
    ('\uF340', 'झ्'),  # jh
    ('\uF343', 'ञ्'),  # ñ
    ('\uF344', 'ण्'),  # ṇ
    ('\uF346', 'त्'),  # t
    ('\uF347', 'थ्'),  # th
    ('\uF348', 'ढ्'),  # ḍh
    ('\uF34A', 'न्'),  # n
    ('\uF34B', 'प्'),  # p
    ('\uF34C', 'फ्'),  # ph
    ('\uF34D', 'ब्'),  # b
    ('\uF34E', 'भ्'),  # bh
    ('\uF350', 'म्'),  # m
    ('\uF351', 'य्'),  # y
    ('\uF352', 'र्‍'),  # r (eyelash)
    ('\uF353', 'ल्'),  # l
    ('\uF355', 'ळ्'),  # ḷ
    ('\uF356', 'व्'),  # v
    ('\uF357', 'श्'),  # ś
    ('\uF35A', 'ष्'),  # ṣ
    ('\uF35B', 'स्'),  # s
    ('\uF35C', 'ह्'),  # h

    # Stacked forms
    # We add a halant to the upper forms to allow them to ligate with the following consonant.
    ('\uF5A2', 'ट्'),  # ṭ upper
    ('\uF5A3', 'ठ्'),  # ṭh upper
    ('\uF5A4', 'ड्'),  # ḍ upper
    ('\uF5A5', 'ढ्'),  # ḍh upper
    ('\uF61F', 'ट'),  # ṭ lower
    ('\uF625', 'ठ'),  # ṭh lower
    ('\uF62B', 'ड'),  # ḍ lower
    ('\uF633', 'ढ'),  # ḍh lower


    # COMBINING CHARACTERS
    (re.compile(r'[\uF008-\uF00F]'), '\u0947'),  # long e
    (re.compile(r'[\uF010-\uF017]'), '\u0948'),  # ai
    ('\uF018', '\u0941'),  # short u
    ('\uF019', '\u0942'),  # long u
    ('\uF01B', '\u0902'),  # ṁ
    ('\uF300', '\u0901'),  # chandrabindu
    (re.compile(r'[\uF321-\uF32C]'), '\u0940'),  # long i

    # Pokémon GO writes "short i" in visual order, before the corresponding consonant cluster.
    # In Unicode, "short i" should be written in logical order, after the corresponding consonant cluster.
    # To find a consonant cluster, we match zero or more consonant + halant sequences followed by a consonant.
    (re.compile(r'[\u093F\uF30C-\uF320]((?:[\u0915-\u0939\u0958-\u095F\uF000-\uF007\uF1B0\uF306]\u094D)*[\u0915-\u0939\u0958-\u095F\uF000-\uF007\uF1B0\uF306])'), '\\1\u093F'),  # combining i

    # Pokémon GO writes "initial r" in visual order, at the end of the corresponding consonant cluster.
    # In Unicode, "initial r" should be written in logical order, at the start of the corresponding consonant cluster.
    # To find a consonant cluster, we match zero or more consonant + halant sequences followed by a consonant.
    # To allow the ligature to join properly, we add a halant between the r and the rest of the consonant cluster.
    (re.compile(r'((?:[\u0915-\u0939\u0958-\u095F]\u094D)*[\u0915-\u0939\u0958-\u095F])[\uF000-\uF007\uF306]'), r'र्\1'),  # combining r (repha)

    # Pokémon GO writes "final r" in visual order, at the end of the corresponding consonant cluster.
    # In Unicode, "final r" should be written in logical order, also at the end of the corresponding consonant cluster.
    # To allow the ligature to join properly, we add a halant between the rest of the consonant cluster and the r.
    (re.compile('([\u0915-\u0939\u0958-\u095F])\uF1B0'), '\\1\u094Dर'), # combining r (rakar)
]
REPLACEMENTS_THAI = [
    # CONSONANTS
    # Without lower curves to allow a vowel to be written below them
    ('\uF700', 'ฐ'),
    ('\uF70F', 'ญ'),


    # VOWELS
    # Shifted left to compensate for ascenders (ปฝฟฬ)
    ('\uF701', '\u0E34'),  # short i
    ('\uF702', '\u0E35'),  # long i
    ('\uF703', '\u0E36'),  # short ue
    ('\uF704', '\u0E37'),  # long ue
    ('\uF710', '\u0E31'),  # mai han akat
    ('\uF711', '\u0E4D'),  # nikkhahit
    ('\uF712', '\u0E47'),  # mai tai khu

    # Shifted down to compensate for descenders (ฎฏ, currently unused)
    ('\uF718', '\u0E38'),  # short u
    ('\uF719', '\u0E39'),  # long u
    ('\uF71A', '\u0E3A'),  # phinthu


    # TONE MARKS
    # Shifted down and left to compensate for ascenders (ปฝฟฬ + ◌ุู◌ู)
    ('\uF705', '\u0E48'),  # mai ek
    ('\uF706', '\u0E49'),  # mai tho
    ('\uF707', '\u0E4A'),  # mai tri
    ('\uF708', '\u0E4B'),  # mai chattawa
    ('\uF709', '\u0E4C'),  # thanthakhat (silent letter)

    # Shifted down to compensate for shorter letters
    # (กขคฆงจฉชซญฐฑณดตถทธนบผพมยรลวศษสหอฮ + ◌ุู◌ู)
    ('\uF70A', '\u0E48'),  # mai ek
    ('\uF70B', '\u0E49'),  # mai tho
    ('\uF70C', '\u0E4A'),  # mai tri
    ('\uF70D', '\u0E4B'),  # mai chattawa
    ('\uF70E', '\u0E4C'),  # thanthakhat (silent letter)

    # Compensates for ascenders (unused due to being the same as regular codepoint)
    ('\uF713', '\u0E48'),  # mai ek
    ('\uF714', '\u0E49'),  # mai tho
    ('\uF715', '\u0E4A'),  # mai tri
    ('\uF716', '\u0E4B'),  # mai chattawa
    ('\uF717', '\u0E4C'),  # thanthakhat (silent letter)
]


def decode(s: str, key: Iterable[tuple[str | re.Pattern, str]]):
    for pattern, repl in key:
        if isinstance(pattern, re.Pattern):
            s = pattern.sub(repl, s)
        else:
            s = s.replace(pattern, repl)
    return unicodedata.normalize('NFC', s)


def decode_file(src, dst, key: Iterable[tuple[str | re.Pattern, str]]):
    with open(src, 'r', encoding='utf-8') as f:
        data = f.read()
    data = decode(data, key)
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(data)
