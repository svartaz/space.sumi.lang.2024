const consonant1 = ['g', 'n', 'm', 'c', 'd', 'b', 'k', 't', 'p', 'h', 'x', 's', 'f', 'j', 'z', 'v', 'r', 'l']
const consonant2 = consonant1.flatMap(a =>
  consonant1.map(b =>
    a + b
  )
)
  .filter(it =>
    ![
      // geminate
      /(.)\1/,

      // nasals
      /[gnm]{2,}/,

      // sibilants
      /[xjsz]{2,}/,

      // liquids
      /lr/,

      // nasal + r
      /[gnm]r/,

      // sibilant + r
      /[xsjz]r/,

      // plosive + fricative
      /pf/g,
      /bv/g,

      // mismatching nasal
      /[nm][ckh]/,
      /[gm][xj]/,
      /[gm][dtszlr]/,
      /[gn][bpfv]/,

      // matching nasal
      /[ck]g/,
      /[dt]n/,
      /[bp]m/,

      // unvoiced + voiced
      /[ktphxsf][cdbjzv]/,

      // voiced + unvoiced
      /[cdbjzv][ktphxsf]/,
    ].some(re => re.test(it))
  );

const nucleus1 = ['i', 'e', 'a', 'o', 'u'];
const nucleus2 = ['i[aou]', '[eao][iu]', 'u[iea]'];
const nucleus3 = ['i[aou]i', 'i[ao]u', 'u[ea]i', 'u[iea]u'];
const nucleus = [...nucleus1, ...nucleus2, ...nucleus3].join('|')

const initial2 = consonant2.filter(it =>
  ![
    /[gnm]./,

    // h + nasal
    /h[gnm]/,
  ].some(re => re.test(it))
);
const initial = [...consonant1, ...initial2].join('|')

const final2 = consonant2.filter(it =>
  ![
    /[cdbktp][gnm]/,
  ].some(re => re.test(it))
);
const final = [...consonant1, ...final2].join('|')


export const testRoot = root =>
  new RegExp(`^(${initial})(${nucleus})(${final})?$`).test(root);

export const testWord = root =>
  new RegExp(`^(${initial})((${nucleus})(${final}))*(${nucleus})$`).test(root);