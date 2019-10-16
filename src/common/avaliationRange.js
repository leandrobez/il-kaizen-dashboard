const Male = [
  {
    faixa: [18, 25],
    excelente: {
      perc_min: 4,
      perc_max: 9
    },
    bom: {
      perc_min: 10,
      perc_max: 12
    },
    media: {
      perc_min: 13,
      perc_max: 16
    },
    acima: {
      perc_min: 17,
      perc_max: 21
    },
    excessivo: {
      perc_min: 22,
      perc_max: 28
    }
  },
  {
    faixa: [26, 35],
    excelente: {
      perc_min: 8,
      perc_max: 13
    },
    bom: {
      perc_min: 14,
      perc_max: 17
    },
    media: {
      perc_min: 18,
      perc_max: 21
    },
    acima: {
      perc_min: 22,
      perc_max: 25
    },
    excessivo: {
      perc_min: 26,
      perc_max: 30
    }
  },
  {
    faixa: [36, 45],

    excelente: {
      perc_min: 10,
      perc_max: 16
    },
    bom: {
      perc_min: 17,
      perc_max: 20
    },
    media: {
      perc_min: 21,
      perc_max: 33
    },
    acima: {
      perc_min: 24,
      perc_max: 27
    },
    excessivo: {
      perc_min: 28,
      perc_max: 32
    }
  },
  {
    faixa: [46, 55],
    excelente: {
      perc_min: 12,
      perc_max: 18
    },
    bom: {
      perc_min: 19,
      perc_max: 22
    },
    media: {
      perc_min: 23,
      perc_max: 35
    },
    acima: {
      perc_min: 26,
      perc_max: 28
    },
    excessivo: {
      perc_min: 29,
      perc_max: 34
    }
  },
  {
    faixa: [56, 65],
    excelente: {
      perc_min: 13,
      perc_max: 19
    },
    bom: {
      perc_min: 20,
      perc_max: 22
    },
    media: {
      perc_min: 23,
      perc_max: 26
    },
    acima: {
      perc_min: 27,
      perc_max: 29
    },
    excessivo: {
      perc_min: 30,
      perc_max: 35
    }
  }
];

const Female = [
  {
    faixa: [18, 25],
    excelente: {
      perc_min: 13,
      perc_max: 17
    },
    bom: {
      perc_min: 18,
      perc_max: 21
    },
    media: {
      perc_min: 22,
      perc_max: 25
    },
    acima: {
      perc_min: 26,
      perc_max: 29
    },
    excessivo: {
      perc_min: 30,
      perc_max: 37
    }
  },
  {
    faixa: [26, 35],
    excelente: {
      perc_min: 14,
      perc_max: 18
    },
    bom: {
      perc_min: 14,
      perc_max: 17
    },
    media: {
      perc_min: 19,
      perc_max: 22
    },
    acima: {
      perc_min: 23,
      perc_max: 26
    },
    excessivo: {
      perc_min: 27,
      perc_max: 31
    }
  },
  {
    faixa: [36, 45],

    excelente: {
      perc_min: 16,
      perc_max: 20
    },
    bom: {
      perc_min: 21,
      perc_max: 25
    },
    media: {
      perc_min: 26,
      perc_max: 29
    },
    acima: {
      perc_min: 30,
      perc_max: 34
    },
    excessivo: {
      perc_min: 35,
      perc_max: 41
    }
  },
  {
    faixa: [46, 55],
    excelente: {
      perc_min: 17,
      perc_max: 23
    },
    bom: {
      perc_min: 24,
      perc_max: 27
    },
    media: {
      perc_min: 28,
      perc_max: 31
    },
    acima: {
      perc_min: 32,
      perc_max: 35
    },
    excessivo: {
      perc_min: 36,
      perc_max: 42
    }
  },
  {
    faixa: [56, 65],
    excelente: {
      perc_min: 18,
      perc_max: 24
    },
    bom: {
      perc_min: 25,
      perc_max: 28
    },
    media: {
      perc_min: 29,
      perc_max: 32
    },
    acima: {
      perc_min: 33,
      perc_max: 36
    },
    excessivo: {
      perc_min: 37,
      perc_max: 41
    }
  }
];

const allAges = (age, genre) => {
  let ages = [];
  let key = 0;
  let fx = [];
  let min,
    max = 0;
  if (genre == 'm') {
    fx = allMales();
  } else {
    fx = allFemales();
  }
  fx.forEach((value, index) => {
    if (age >= value.faixa[0] && age <= value.faixa[1]) {
      min = value.faixa[0];
      min = value.faixa[1];
      key = index;
    }
  });
  for (let i = min; i <= max; i++) {
    ages.push(i);
  }
  return { ages: age, key: key };
};

const allMales = () => {
  return Male;
};

const allFemales = () => {
  return Female;
};

const malesToAge = age => {
  if (age > 65) {
    age = 65;
  }
  let ages = allAges(age, 'm');
  return Male[ages.key];
};

const femalesToAge = age => {
  if (age > 65) {
    age = 65;
  }
  let ages = allAges(age, 'f');
  return Female[ages.key];
};

const makeLimits = (min, max) => {
  let ranged = [],
    init = 1;
  let steps = min;
  for (let i = min; i <= max; i++) {
    ranged.push(i);
    steps = steps + init;
  }
  return ranged;
};

export default {
  allMales,
  allFemales,
  malesToAge,
  femalesToAge,
  makeLimits,
  allAges
};
