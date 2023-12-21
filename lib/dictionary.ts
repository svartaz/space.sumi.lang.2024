import { replaceAll } from "./utility";

//η, Θ θ,, , , , ς, Φ, Ψ ψ, ω.

export const language = 'kov'

interface Entry {
  signifier: string;
  signified: string;
  klass: string;
  etymology?: string;
}

const dictionaryObject = {
  _autonym: { signifier: language, klass: 'Verb', signified: '$0はkoz的' },

  // pronoun
  i: { signifier: 'ri', klass: 'Verb', signified: '$0は我' },
  thou: { signifier: 'ru', klass: 'Verb', signified: '$0は汝' },

  who: { signifier: 're', klass: 'Verb', signified: '$0は誰 (何)' },
  an: { signifier: 'ra', klass: 'Verb', signified: '$0は何か' },
  the: { signifier: 'ro', klass: 'Verb', signified: '$0は彼' },

  that: { signifier: 'de', klass: 'Verb←Sentence', signified: 's↦$0 (事象) を$1 (文{s})は意味する' },
  _ask: { signifier: 'da', klass: 'Verb←Sentence', signified: 's↦$0 (眞理値) を$1 (文{s}) は持つ' },
  what: { signifier: 'do', klass: 'Verb←Sentence', signified: '' },

  of: { signifier: 'du', klass: 'Verb→Verb←Verb', signified: '' },
  yes: { signifier: 'bo', klass: 'Verb→Verb←Verb', signified: '' },

  _open: { signifier: 'bi', klass: '', signified: '引用 開' },
  _close: { signifier: 'bu', klass: '', signified: '引用 閉' },
  _quote: { signifier: 'ba', klass: '', signified: '引用 1詞' },

  set0: { signifier: 'qi', klass: 'Setter', signified: 'は' },
  set1: { signifier: 'qe', klass: 'Setter', signified: 'を' },
  set2: { signifier: 'qa', klass: 'Setter', signified: 'へ' },
  _set: { signifier: 'qu', klass: 'Verb→Setter', signified: '' },

  swap1: { signifier: 'se', klass: 'Verb←Verb', signified: '$0は$1をvする↦$1は$0をvする' },
  swap2: { signifier: 'sa', klass: 'Verb←Verb', signified: '$0は$1を$2へvする↦$2は$0を$1へvする' },
  _swap: { signifier: 'su', klass: 'Verb→Setter', signified: '' },

  // logic
  and: { signifier: 'zi', klass: 'a→a←a', signified: '(論理) 前者' },
  regardless: { signifier: 'ze', klass: 'a→a←a', signified: '(論理) 連言' },
  not: { signifier: 'za', klass: 'a→a', signified: '(論理) 否定' },
  iff: { signifier: 'zo', klass: 'a→a←a', signified: '(論理) 同値' },
  or: { signifier: 'zu', klass: 'a→a←a', signified: '(論理) 選言' },

  // mood
  may: { signifier: 'ce', klass: 'Verb→Verb', signified: '可能' },
  must: { signifier: 'co', klass: 'Verb→Verb', signified: '必然' },

  // _aspect
  _begin: { signifier: 'mi', klass: 'Verb→Verb', signified: 'v↦{v}し始める' },
  _while: { signifier: 'ma', klass: 'Verb→Verb', signified: 'v↦{v}したり' },
  _end: { signifier: 'mu', klass: 'Verb→Verb', signified: 'v↦{v}し終へる' },

  // numerals
  zero: { signifier: 'gi', klass: 'Numeral', signified: '0' },
  one: { signifier: 'ne', klass: 'Numeral', signified: '1' },
  two: { signifier: 'mo', klass: 'Numeral', signified: '2' },
  three: { signifier: 'cu', klass: 'Numeral', signified: '3' },
  four: { signifier: 'di', klass: 'Numeral', signified: '4' },
  five: { signifier: 'be', klass: 'Numeral', signified: '5' },
  six: { signifier: 'qo', klass: 'Numeral', signified: '6' },
  seven: { signifier: 'tu', klass: 'Numeral', signified: '7' },
  eight: { signifier: 'pi', klass: 'Numeral', signified: '8' },
  nine: { signifier: 'xe', klass: 'Numeral', signified: '9' },
  ten: { signifier: 'so', klass: 'Numeral', signified: '10' },
  eleven: { signifier: 'fu', klass: 'Numeral', signified: '11' },
  some: { signifier: 'ga', klass: 'Numeral', signified: '∃' },
  each: { signifier: 'gu', klass: 'Numeral', signified: '∀' },

  // generic
  do: { signifier: 'don', klass: 'Verb', signified: '$0 (行爲者) は$1 (行爲) をする', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dōną' },
  come: { signifier: 'qem', klass: 'Verb', signified: '$0は$1 (始點) から移動する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kweman%C4%85' },
  go: { signifier: 'can', klass: 'Verb', signified: '$0は$1 (終點) へ移動する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gāną' },

  // basic
  have: { signifier: 'xab', klass: 'Verb', signified: '$0は$1を有する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjaną' },
  cause: { signifier: 'qos', klass: 'Verb', signified: '$0 (原因) は$1 (結果)を起こす', etymology: 'https://en.wiktionary.org/wiki/caussa#Latin' },
  make: { signifier: 'mut', klass: 'Verb', signified: '$0 (材料) は$1 (FIXME)を爲す', etymology: 'https://en.wiktionary.org/wiki/muto#Latin' },
  use: { signifier: 'nit', klass: 'Verb', signified: '$0 (使用者) は$1 (道具)を$2 (機能, 目的)に使ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85n' },
  worth: { signifier: 'verd', klass: 'Verb', signified: '$0は$1に$2 (基準)にて値する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werþaz' },

  // language
  true: { signifier: 'ver', klass: 'Verb', signified: '$0は眞', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wēraz' },
  name: { signifier: 'nam', klass: 'Verb', signified: '$0 (名)は$1を意味する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô' },
  say: { signifier: 'sac', klass: 'Verb', signified: '$0 (發言者)は$1 (發言)を言ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjaną' },
  speak: { signifier: 'speq', klass: 'Verb', signified: '$0 (話者)は$1 (言語)を話す', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sprekaną' },

  // position
  below: { signifier: 'nid', klass: 'Verb', signified: '$0は$1 (上)の下に位置する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/niþ' },
  behind: { signifier: 'xind', klass: 'Verb', signified: '$0は$1 (前)の後に位置する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder' },
  left: { signifier: 'ligq', klass: 'Verb', signified: '$0は$1 (右)の左に位置する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/link' },
  before: { signifier: 'fur', klass: 'Verb', signified: '$0は$1 (未來)の過去に位置する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai' },
  in: { signifier: 'daq', klass: 'Verb', signified: '$0は$1 (外)の内に位置する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þakjaną' },
  far: { signifier: 'fer', klass: 'Verb', signified: '$0と$0は遠い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai' },
  cross: { signifier: 'qruq', klass: 'Verb', signified: '$0と$0は交叉する', etymology: 'https://en.wiktionary.org/wiki/crux#Latin' },

  // life
  live: { signifier: 'lib', klass: 'Verb', signified: '$0 (生物)は生きる', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjaną' },
  bear: { signifier: 'ber', klass: 'Verb', signified: '$0 (親)は$1 (子)を生む', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/beraną' },
  man: { signifier: 'man', klass: 'Verb', signified: '$0は人 (人格)', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/manô' },
  male: { signifier: 'cum', klass: 'Verb', signified: '$0は雄', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gumô' },
  female: { signifier: 'vib', klass: 'Verb', signified: '$0は雌', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wībą' },
  animal: { signifier: 'diz', klass: 'Verb', signified: '$0は動物', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/deuzą' },
  plant: { signifier: 'cras', klass: 'Verb', signified: '$0は植物', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grasą' },
  wake: { signifier: 'vaq', klass: 'Verb', signified: '$0は覺める', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakāną' },
  rot: { signifier: 'rut', klass: 'Verb', signified: '$0は腐る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rutāną' },
  sick: { signifier: 'siq', klass: 'Verb', signified: '$0は病む', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaną' },
  dwell: { signifier: 'vun', klass: 'Verb', signified: '$0は$1 (家, 巢)に住む', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wunāną' },

  // physiology
  eat: { signifier: 'et', klass: 'Verb', signified: '$0は$1 (食物)を食ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/etaną' },
  digest: { signifier: 'melt', klass: 'Verb', signified: '$0は$1 (食物)を消化する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltaną' },
  vomit: { signifier: 'puq', klass: 'Verb', signified: '$0は$1 (吐瀉物)を吐く', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/pukaną' },
  excrete: { signifier: 'sqit', klass: 'Verb', signified: '$0は$1 (糞尿)を排泄する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skitiz' },

  // family
  sibling: { signifier: 'brod', klass: 'Verb', signified: '$0と$0は同胞', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brōþēr' },
  spouse: { signifier: 'xiv', klass: 'Verb', signified: '$0と$0は番ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hīwą' },

  // face
  smile: { signifier: 'smil', klass: 'Verb', signified: '$0は笑む', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smīlijaną' },
  laugh: { signifier: 'lax', klass: 'Verb', signified: '$0は嗤ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjaną' },
  frown: { signifier: 'fron', klass: 'Verb', signified: '$0は顔を顰める', etymology: 'https://en.wiktionary.org/wiki/frown#English' },
  weep: { signifier: 'vop', klass: 'Verb', signified: '$0は$1 (涙)を泣く', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wōpijaną' },

  // sense
  sense: { signifier: 'fol', klass: 'Verb', signified: '$0は$1 (刺戟)を感覺する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fōlijaną' },
  touch: { signifier: 'tuq', klass: 'Verb', signified: '$0は$1 (實體)を觸覺する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tukkōną' },
  hear: { signifier: 'xoz', klass: 'Verb', signified: '$0は$1 (音源)を聞く', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauzijaną' },
  see: { signifier: 'sex', klass: 'Verb', signified: '$0は$1 (光源)を見る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sehwaną' },
  smell: { signifier: 'riq', klass: 'Verb', signified: '$0は$1 ()を嗅ぐ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukaną' },
  taste: { signifier: 'smaq', klass: 'Verb', signified: '$0は$1を味はふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smakkuz' },
  hurt: { signifier: 'ser', klass: 'Verb', signified: '$0は$1 (刺戟)に痛む', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sairaz' },

  // emotion
  mood: { signifier: 'mod', klass: 'Verb', signified: '$0は氣分$1を持つ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mōdaz' },
  love: { signifier: 'lub', klass: 'Verb', signified: '$0は$1を好む', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lubō' },
  want: { signifier: 'vil', klass: 'Verb', signified: '$0は$1を欲する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljaną' },
  amaze: { signifier: 'mas', klass: 'Verb', signified: '$0は$1に驚く', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/masōną' },
  fear: { signifier: 'furt', klass: 'Verb', signified: '$0は$1を恐れる', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz' },
  anger: { signifier: 'vod', klass: 'Verb', signified: '$0は$1に怒る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wōdaz' },
  enjoy: { signifier: 'plaq', klass: 'Verb', signified: '$0は$1を樂しむ', etymology: 'https://en.wiktionary.org/wiki/placere', },
  proud: { signifier: 'stult', klass: 'Verb', signified: '$0は$1を誇る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz' },

  // thought
  think: { signifier: 'dagq', klass: 'Verb', signified: '$0は$1に感謝する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/þankijaną' },
  know: { signifier: 'vit', klass: 'Verb', signified: '$0は$1を知る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witaną' },
  expect: { signifier: 'vard', klass: 'Verb', signified: '$0は$1を豫期する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wardāną' },
  aim: { signifier: 'til', klass: 'Verb', signified: '$0は$1 (目的)を目指す', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tilą' },
  believe: { signifier: 'qred', klass: 'Verb', signified: '$0は$1と信ずる', etymology: 'https://en.wiktionary.org/wiki/credo#Latin' },
  //', { signifier: 'assume: klass: 'Verb', signified: '', etymology: '' },
  //', { signifier: 'plan: klass: 'Verb', signified: '', etymology: '' },

  // colour
  colour: { signifier: 'far', klass: 'Verb', signified: '$0は$1 (色)を發する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz' },
  bright: { signifier: 'bert', klass: 'Verb', signified: '$0は明るい', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz' },
  red: { signifier: 'rod', klass: 'Verb', signified: '$0は赤い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz' },
  yellow: { signifier: 'cel', klass: 'Verb', signified: '$0黃色を發する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gelwaz' },
  green: { signifier: 'cron', klass: 'Verb', signified: '$0は綠色を發する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz' },
  blue: { signifier: 'blev', klass: 'Verb', signified: '$0青い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz' },

  // geometry
  big: { signifier: 'crot', klass: 'Verb', signified: '$0は大きい', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz' },
  long: { signifier: 'lag', klass: 'Verb', signified: '$0は長い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz' },
  thick: { signifier: 'diq', klass: 'Verb', signified: '$0は厚い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz' },
  wide: { signifier: 'vid', klass: 'Verb', signified: '$0は幅廣い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABdaz' },

  point: { signifier: 'pugc', klass: 'Verb', signified: '$0は點', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/pung%C5%8D' },
  line: { signifier: 'pad', klass: 'Verb', signified: '$0は線', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/pa%C3%BEaz' },
  plane: { signifier: 'flat', klass: 'Verb', signified: '$0は面', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flataz' },
  angle: { signifier: 'vigq', klass: 'Verb', signified: '$0は$1 (角)を爲す', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/winkilaz' },
  center: { signifier: 'mid', klass: 'Verb', signified: '$0は$1 (中心)を持つ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/midjaz' },
  curve: { signifier: 'bind', klass: 'Verb', signified: '$0は曲がる', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bindan%C4%85' },
  shape: { signifier: 'sqap', klass: 'Verb', signified: '$0は$1 (形狀)を持つ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skap%C4%85' },
  interval: { signifier: 'req', klass: 'Verb', signified: '$0 (境界)は$1 (領域)を定める', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raikijan%C4%85' },

  // geography
  land: { signifier: 'land', klass: 'Verb', signified: '$0は陸地', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85' },
  sky: { signifier: 'sqiv', klass: 'Verb', signified: '$0は上空', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiw%C3%B4' },
  sea: { signifier: 'mar', klass: 'Verb', signified: '$0は海洋', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari' },
  mountain: { signifier: 'berc', klass: 'Verb', signified: '$0は山岳', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz' },
  lake: { signifier: 'sev', klass: 'Verb', signified: '$0は湖沼', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/saiwiz' },
  river: { signifier: 'flom', klass: 'Verb', signified: '$0は河川', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaumaz' },

  // celestial
  sun: { signifier: 'sun', klass: 'Verb', signified: '$0は恆星', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD' },
  planet: { signifier: 'stern', klass: 'Verb', signified: '$0は惑星', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stern%C7%AD' },
  moon: { signifier: 'men', klass: 'Verb', signified: '$0は衞星', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4' },

  // physics
  time: { signifier: 'tim', klass: 'Verb', signified: '$0は時間', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4' },
  space: { signifier: 'rom', klass: 'Verb', signified: '$0は空間', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85' },
  wave: { signifier: 'svel', klass: 'Verb', signified: '$0は波', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swellan%C4%85' },
  light: { signifier: 'lit', klass: 'Verb', signified: '$0は電磁波, 光', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85' },
  sound: { signifier: 'qlig', klass: 'Verb', signified: '$0は音', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85' },
  heat: { signifier: 'xet', klass: 'Verb', signified: '$0は熱', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitaz' },

  // matter
  solid: { signifier: 'fast', klass: 'Verb', signified: '$0は固體', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz' },
  liquid: { signifier: 'vet', klass: 'Verb', signified: '$0は液體', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wētaz' },
  gas: { signifier: 'cas', klass: 'Verb', signified: '$0は氣體', etymology: 'https://en.wiktionary.org/wiki/gas#Dutch' },
  plasma: { signifier: 'plasm', klass: 'Verb', signified: '$0は電漿', etymology: 'https://en.wiktionary.org/wiki/%CF%80%CE%BB%CE%AC%CF%83%CE%BC%CE%B1#Ancient_Greek' },

  water: { signifier: 'vat', klass: 'Verb', signified: '$0は水', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr' },
  salt: { signifier: 'salt', klass: 'Verb', signified: '$0は鹽', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85' },
  oil: { signifier: 'elaj', klass: 'Verb', signified: '$0は油脂', etymology: 'https://en.wiktionary.org/wiki/%E1%BC%90%CE%BB%CE%B1%CE%AF%CE%B1#Ancient_Greek' },
  stone: { signifier: 'sten', klass: 'Verb', signified: '$0は礦石', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz' },
  metal: { signifier: 'ez', klass: 'Verb', signified: '$0は金屬', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aiz' },

  // culture
  play: { signifier: 'spil', klass: 'Verb', signified: '$0は$1 (遊戲)を遊ぶ', etymology: 'spil' },
  sing: { signifier: 'sig', klass: 'Verb', signified: '$0は$1 (樂曲)を演奏する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85' },
  dance: { signifier: 'dans', klass: 'Verb', signified: '$0は$1 (舞踊)を踊る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn' },

  // civilisation
  country: { signifier: 'did', klass: 'Verb', signified: '$0は國', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEeud%C5%8D' },
  town: { signifier: 'durp', klass: 'Verb', signified: '$0は市街', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEurp%C4%85' },

  // species
  cat: { signifier: 'qat', klass: 'Verb', signified: '$0は猫', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz' },
  dog: { signifier: 'xund', klass: 'Verb', signified: '$0は犬', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz' },
  sheep: { signifier: 'sqep', klass: 'Verb', signified: '$0は羊', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85' },
  horse: { signifier: 'xrus', klass: 'Verb', signified: '$0は馬', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85' },
  cow: { signifier: 'bul', klass: 'Verb', signified: '$0は牛', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bul%C3%B4' },

  // society
  law: { signifier: 'lac', klass: 'Verb', signified: '$0 (規則, 法)は$1 (文)を定める', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lag%C4%85' },
  buy: { signifier: 'buc', klass: 'Verb', signified: '$0は$1 (商品)を$2 (買ひ手)に賣る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bugjan%C4%85' },
  fight: { signifier: 'fet', klass: 'Verb', signified: '$0は$1に抗ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehtan%C4%85' },

  // speech
  declare: { signifier: 'deqlar', klass: 'Verb', signified: '$0は$1 (文)を選言する', etymology: 'https://en.wiktionary.org/wiki/declaro#Latin' },
  deceive: { signifier: 'lic', klass: 'Verb', signified: '$0は$1 (文)と僞る', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leugan%C4%85' },
  forgive: { signifier: 'ned', klass: 'Verb', signified: '$0は$1 (事象, 人)を許す', etymology: 'nēþō-' },

  // unsorted
  world: { signifier: 'qosm', klass: 'Verb', signified: '$0は世界', etymology: 'https://en.wiktionary.org/wiki/%CE%BA%CF%8C%CF%83%CE%BC%CE%BF%CF%82#Ancient_Greek' },
  old: { signifier: 'ald', klass: 'Verb', signified: '$0は古い', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aldaz' },
  part: { signifier: 'del', klass: 'Verb', signified: '$0は$1 (全體)の部分', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz' },
  differ: { signifier: 'and', klass: 'Verb', signified: '$0は$0と違ふ', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/an%C3%BEeraz' },
  spin: { signifier: 'spin', klass: 'Verb', signified: '$0は$1 (中心)を回轉する', etymology: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spinnan%C4%85' },
}

const phonology = (s: string) =>
  replaceAll(s, [
    //['q(?=[ie](?!$))', 'k'],
    //['c(?=[ie](?!$))', 'j'],
    //['[gm](?=[^ieaou])', 'n'],

    // no L
    ['l', 'r'],

    // no intervocalic H B P
    ['(?<=[ieaou])h(?=[ieaou])', 'q'],
    ['(?<=[ieaou])p(?=[ieaou])', 'f'],
    ['(?<=[ieaou])b(?=[ieaou])', 'v'],

    // less initial consonant cluster
    ['(?<=^[cdbq])r([ieaou])(?=[^ieaou][ieaou])', '$1r'],

    // no high vowel in closed syllable
    //['i(?=[^ieaou][ieaou])', 'e'],
    //['u(?=[^ieaou][ieaou])', 'o'],
  ]);

export const dictionary: Map<string, Entry> =
  new Map(
    Object.entries(dictionaryObject)
      .map(([k, { klass, signifier, ...v }]) => {
        if (klass == 'Verb')
          for (const i of [2, 1, 0])
            if (v.signified.includes('$' + i)) {
              signifier = signifier.replace(/(?<=...)$/, ['i', 'e', 'a'][i]);
              klass += i;
              break;
            }

        return [k, { ...v, klass, signifier: phonology(signifier) }];
      })
  );

for (const [k0, { signifier: signifier0 }] of dictionary)
  for (const [k1, { signifier: signifier1 }] of dictionary)
    if (k0 != k1 && signifier0 == signifier1)
      console.error(`keys '${k0}' and '${k1}' hath same signifier '${signifier0}'`);

console.log('check complete');

export const translate = (s: string) =>
  s.replace(/[_A-Z0-9]+/g, (key: string) =>
    dictionary.get(key.toLowerCase())?.signifier || key
  );

export const search = (signifier: string) => {
  for (const [k, v] of dictionary.entries())
    if (v.signifier == signifier)
      return { k, ...v };

  return null;
}
