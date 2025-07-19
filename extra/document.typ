#set page(paper: "a5", numbering: "1", footer: context {
  if (counter(page).get().first() == 0) {
    none
  } else {
    align(if calc.even(counter(page).get().first()) { right } else { left }, counter(page).display("1"))
  }
})
#counter(page).update(0)
#set heading(numbering: (..nums) => nums.pos().map(num => (num - 1)).map(str).join("-"))
#set text(font: ("Noto Serif", "Noto Serif JP"))
#set table(stroke: none)

//#import "@preview/cjk-unbreak:0.1.1": remove-cjk-break-space
//#show: remove-cjk-break-space

#let target(s) = text(s, style: "italic")
#show emph: it => underline(it.body, evade: true)

#let dic = json("dic.json")


#let translate(s) = target(s
  .replace(regex("[_a-z]+"), it => if dic.keys().contains(it.text) { dic.at(it.text).token } else { it.text })
  .replace(regex(" -[aiueo]"), it => it.text.slice(2) + "\u{0302}"))

#let phonetic(s) = [[#s.replace(
    regex("[_a-z]+"),
    it => if dic.keys().contains(it.text) { dic.at(it.text).ipa } else { it.text },
  )]]

#let sorter(w) = w.clusters().map(c => "nmcdbktphxsfjzvaiueo".position(c))

#let entry(content) = (
  content
    .replace(regex("@[nad]"), it => "[[sep]]" + it.text + "[[sep]]")
    .split("[[sep]]")
    .map(it => if it.starts-with("@") { underline(it.slice(1)) } else { it })
    .join()
)

#let samples(..args) = align(center, table(
  columns: 4,
  align: left,
  fill: silver,
  ..args
    .pos()
    .map(arg => (
      arg.at(0),
      if arg.at(0) == "文" {
        (
          table.cell(colspan: 2, translate(arg.at(1))),
          arg.at(2),
        )
      } else {
        (
          translate(arg.at(1)),
          phonetic(arg.at(1)),
          entry(arg.at(2)),
        )
      },
    ))
    .flatten()
))

#align(center + horizon)[
  #text(size: 2em, [#(dic._self.token)文法 (草案)])\
  #link("https://sumi.space")[sumi.space]\

  #table(
    columns: 2,
    row-gutter: 0em,
    [作成日], [2025-07-14],
    [更新日], [2025-07-19],
  )

]
//#pagebreak()

#outline(title: "目次")
#pagebreak()

= 槪要
_#(dic._self.token)_は#link("https://sumi.space")[sumi.space]が作成してゐる人間言語.
SVO-NA詞順の對格言語.
cat語 (表記) , jbo語 (文法) , cmn語 (文法) , deu語 (形態素) の影響を受けた.

= 媒體

== 發音と正書法
基本的にlatn字を用ゐて表記する.
#align(center, table(
  columns: 5,
  stroke: none,
  align: (right, center, center, center, center),
  table.header([], [*軟腭*], [*硬腭*], [*舌*], [*脣*]),
  [*鼻*], [], [], [n], [m],
  [*有聲破裂*], [c [g]], [], [d], [b],
  [*無聲破裂*], [k], [], [t], [p],
  [*無聲摩擦*], [h [h -- x]], [x [ʃ]], [s], [f],
  [*有聲摩擦*], [], [j [ʒ]], [z], [v],
  [*接近*], [], [j], [r, l], [v [w]],
  [*中母*], [a], [i], [], [u],
  [*非中母*], [], [e], [], [o],
  table.footer([], [*中舌*], [*前舌*], [], [*後舌*]),
))

#target[j], #target[v]は詞頭または母音間にて摩擦音として實現する.

分綴符と母音の竝び (例へば #target[-a]) の竝びから始まる單語を書く時に, 見えを良くする為に揚抑符を用ゐれる (例へば#target[â]) .

== 字名

#align(center, table(
  columns: 8,
  fill: (x, y) => if calc.even(x) { none } else { silver },
  [*a*], target[ha], [*(ä,æ)*], target[ja], [*b*], target[ba], [*c*], target[ca],
  [*d*], target[da], [*e*], target[he], [*(ə)*], target[ve], [*f*], target[fa],
  [*(g)*], target[nu], [*h*], target[xu], [*i*], target[hi], [*j*], target[je],
  [*k*], target[ka], [*l*], target[la], [*m*], target[ma], [*n*], target[na],
  [*o*], target[ho], [*(ö,ø,œ)*], target[jo], [*p*], target[pa], [*(q)*], target[ku],
  [*r*], target[ra], [*s*], target[sa], [*t*], target[ta], [*u*], target[hu],
  [*v*], target[vo], [*(w)*], target[vi], [*x*], target[xa], [*(y,ü)*], target[ju],
  [*z*], target[za],
))


= 文法
== 動詞と格
主に_動詞 (verb)_ が#(dic._self.token)文を構成する.
動詞は物の關係を表す.

日本語文 ‹貓が星を見る› を例とすると, 主要な動詞は ‹…が…を見る› で それは貓と星の關係を表す.

‹貓が星を見る› と ‹星が貓を見る› が指す物は異なる.
動詞が指す關係は一般に可換でない; 複數の_空欄_は異なる働きを持つ.
動詞中の空欄の, 他の空欄とは區別される働きを_格 (case)_ と言ふ.

#(dic._self.token)は基本格として

#align(center, table(
  columns: 3,
  align: left,
  [主格], [nominative], […が],
  [因格], [causal], […に因って],
  [對格], [accusative], […を],
  [屬格], [genitive], […から],
  [與格], [dative], […へ],
  [位格], [locative], […にて],
  [共格], [comitative], […が關わって],
  [己格], [recursive], [これが表す文自身を…として],
))
を持ち, 更に複合格を持つ.
主格以外を_斜格 (oblique)_ と言ふ.

#samples(
  ("動詞", "cat", "@nが貓"),
  ("動詞", "sun", "@nが恆星"),
  ("動詞", "see", "@nが@aを見る"),
  ("動詞", "give", "@nが@aを@dへ與ふ"),
)

== 最も單純な文
動詞は單體で文を構成する.
#samples(("文", "cat", " (何かが) 貓"), ("文", "see", " (何かが)  (何かを) 見る"))


== 法と制
動詞の法と制を指すには_法制詞 (tense-mood particle)_ を用ゐる.
制を, 時間に縛られない傾向を指す_體言的制 (nominal tense)_ と それ以外の_用言的制 (predicative tense)_ に分ける.
これらは自然言語に於ける名詞と動詞に似る.

用言的制は進行相を陰に表す.

#samples(
  ("法制詞", "", "叙實 體言的"),
  ("法制詞", "did", "叙實 過去"),
  ("法制詞", "do", "叙實 現在"),
  ("法制詞", "will", "叙實 未來"),
  ("法制詞", "if_be", "叙想 體言的"),
  ("法制詞", "if_did", "叙想 過去"),
  ("法制詞", "if_do", "叙想 現在"),
  ("法制詞", "if_will", "叙想 未來"),
  ("文", "see", "見る物 (gazer) だ"),
  ("文", "see do", "見てゐる"),
  ("文", "see if_did", "見たなら…"),
)

== 同格
主格 ‹何かが› を具體化するには どうするか.

隣接する動詞は主格を共有して兩立する.
これを_同格 (apposition)_ と言ふ.

#samples(("文", "cat see do", [何かが貓であり, 見てゐる\ →貓が見てゐる]))

同格は形容する.

#samples(
  ("動詞", "black", "@nは黑い"),
  ("文", "cat black see do", "何かが貓であり, 黑く, 見てゐる\n→黑貓が見てゐる"),
)

== 格助詞
對格 ‹何かを› を具體化するにどうするか.

格は自身に對應する_格助詞 (case particle)_ を持つ.
二個の動詞の主格同士が等しい事を同格が意味した樣に, 斜格と主格が等しい事を指すには格助詞を用ゐる.

#samples(
  ("格助詞", "him", "對格"),
  ("文", "cat black see do him sun", "貓が星を見てゐる"),
  ("動詞", "i", "@nは我"),
  ("格助詞", "to", "與格"),
  ("文", "i give did him sun to cat", "我が貓へ星を與へてゐた"),
)

格助詞は同格を一個の動詞として扱ふ.

#samples(
  ("文", "give did to cat", "貓へ與へてゐた"),
  ("文", "give did to cat black", "黑い貓へ與へてゐた"),
)

== 格交換
eng語の受動態が對格を主格へ移動する樣に, #(dic._self.token)は_格交換 (case exchange)_ を任意の格に適用する.

#translate("done"), 格$k$に對應する格助詞, 動詞が竝ぶと動詞句を構成し, その動詞句に對する同格は主格の代はりに$k$に一致する.
この時に#translate("him")を省略する.

#samples(
  ("構造助詞", "done", "格交換"),
  ("格助詞", "by", "@n"),
  ("動詞", "water", "@nは水"),
  ("文", "i give did him water to cat", "私は水を貓へ與へてゐた"),
  ("文", "water done (him) give did by i to cat", " (同) "),
  ("文", "cat done to give did by i him water", " (同) "),
)

== 文動詞
文 ‹…する› から得れる動詞 ‹#entry("@nは…する事である")› を_文動詞 (sentential verb)_ と言ふ.

#samples(
  ("構造助詞", "that … _close", "文動詞化. @nは…する事である"),
  ("動詞", "know", "@nは@aを知る"),
  ("文", "i know do him that cat see do him sun (_close)", "貓が星を見てゐる事を我は知ってゐる"),
)

無くとも文の構造に影響しない#translate("_close")を省略せらる.

單純な文動詞を己格に對する各交換で再現せらる.

#samples(
  ("文", "i know do him that cat see do (_close)", "貓が見てゐる事を我は知ってゐる"),
  ("文", "i know do him done ly see do by cat", "(同)"),
)

== 逐次的同格
同格は論理的連言 ‹かつ› を表すのみならず, 逐次的な ‹それから› をも表せる.
これは華語の連動文に似る.

#samples(
  ("接續詞", "then", "それから"),
  ("動詞", "eat", "@nが@aを食ふ"),
  ("述詞", "go", "@nが@aへ往く"),
  ("文", "go then eat", [往ってから食ふ\ →食ひに往く]),
)

== 時相
時相を指す助動詞を用ゐる.

#samples(
  ("動詞", "begin", "開始相"),
  ("動詞", "end", "終了相"),
  ("動詞", "live", "@nが生きる"),
  ("文", "i begin live do", [我が生き始めた\ →我が生まれた]),
  ("文", "i end live will", [我が生き終はらう\ →我が死なう]),
)

現在時制と非進行相は兩立しない.

== 關係修飾

ここまでの文法では, 斜格を埋めた動詞で更に斜格を埋める方法が無い.

#samples(
  ("文", "i see do him cat", [我が貓を見てゐる]),
  ("文", "i see do him cat eat do", [我が, 飲食する貓を見てゐる]),
  ("文", "? i see do him cat eat do him water", [? 我が, 飲食する貓を水を見てゐる]),
  ("文", "?", [我が, 水を飲む貓を見てゐる]),
)

この例文で#translate("water")は#translate("eat")の對格を埋めたいが, 代はりに#translate("see")の對格を埋めてゐる.
これを防ぐために#translate("which")を用ゐる.

#samples(
  ("構造助詞", "which … _close", "斜格添加"),
  ("文", "i see do him cat eat do which him water (_close)", [我が水を飲む貓を見てゐる]),
)

#pagebreak()
= 飜譯
#table(
  columns: 2,
  [
  ],
  translate(""),
)


#pagebreak()
#set page(columns: 2)
= 辞書
#align(center, table(
  columns: 1,
  align: left,
  ..dic
    .keys()
    .map(k => text(size: 9pt)[
      #dic.at(k).token
      #text(size: 7pt)[
        #if dic.at(k).token == dic.at(k).ipa { none } else { text()[[#dic.at(k).ipa]] }
        #entry(if "ja" in dic.at(k) { dic.at(k).ja } else { dic.at(k).en })
      ]
    ])
))
