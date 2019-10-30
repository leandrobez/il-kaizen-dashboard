//percentuals
const coefficients = {
  param1: 4.95,
  param2: 4.5,
  fatorPesoOsseo: 0.712
};
//sevenSkins
const getSevenSkinFolds = genre => {
  if (genre == 'm') {
    return {
      param1: 1.112,
      param2: 0.00043499,
      param3: 0.00000055,
      param4: 0.00028826
    };
  } else {
    return {
      param1: 1.097,
      param2: 0.00046971,
      param3: 0.0000005623,
      param4: 0.00012828
    };
  }
};
//three skins
const getThreeSkinsFolds = genre => {
  if (genre == 'm') {
    return {
      param1: 1.10938,
      param2: 0.0008267,
      param3: 0.0000016,
      param4: 0.0002574
    };
  } else {
    return {
      param1: 1.0994921,
      param2: 0.0009929,
      param3: 0.0000023,
      param4: 0.0001392
    };
  }
};

const limitMale = [
  {
    ranking: 'Excelente',
    limits: [
      {
        ages: [18, 25],
        min: 4,
        max: 9
      },
      {
        ages: [26, 35],
        min: 8,
        max: 13
      },
      {
        ages: [36, 45],
        min: 10,
        max: 16
      },
      {
        ages: [46, 55],
        min: 12,
        max: 18
      },
      {
        ages: [56, 65],
        min: 13,
        max: 19
      }
    ]
  },
  {
    ranking: 'Bom',
    limits: [
      {
        ages: [18, 25],
        min: 10,
        max: 12
      },
      {
        ages: [26, 35],
        min: 14,
        max: 17
      },
      {
        ages: [36, 45],
        min: 17,
        max: 20
      },
      {
        ages: [46, 55],
        min: 19,
        max: 22
      },
      {
        ages: [56, 65],
        min: 20,
        max: 22
      }
    ]
  },
  {
    ranking: 'Média',
    limits: [
      {
        ages: [18, 25],
        min: 13,
        max: 16
      },
      {
        ages: [26, 35],
        min: 18,
        max: 21
      },
      {
        ages: [36, 45],
        min: 21,
        max: 23
      },
      {
        ages: [46, 55],
        min: 23,
        max: 35
      },
      {
        ages: [56, 65],
        min: 23,
        max: 26
      }
    ]
  },
  {
    ranking: 'Acima da Média',
    limits: [
      {
        ages: [18, 25],
        min: 17,
        max: 21
      },
      {
        ages: [26, 35],
        min: 26,
        max: 30
      },
      {
        ages: [36, 45],
        min: 28,
        max: 32
      },
      {
        ages: [46, 55],
        min: 29,
        max: 34
      },
      {
        ages: [56, 65],
        min: 30,
        max: 35
      }
    ]
  },
  {
    ranking: 'Excessivo',
    limits: [
      {
        ages: [18, 25],
        min: 22,
        max: 28
      },
      {
        ages: [26, 35],
        min: 26,
        max: 30
      },
      {
        ages: [36, 45],
        min: 28,
        max: 32
      },
      {
        ages: [46, 55],
        min: 29,
        max: 34
      },
      {
        ages: [56, 65],
        min: 30,
        max: 35
      }
    ]
  }
];
const limitFemale = [
  {
    ranking: 'Excelente',
    limits: [
      {
        ages: [18, 25],
        min: 13,
        max: 17
      },
      {
        ages: [26, 35],
        min: 14,
        max: 18
      },
      {
        ages: [36, 45],
        min: 16,
        max: 20
      },
      {
        ages: [46, 55],
        min: 17,
        max: 23
      },
      {
        ages: [56, 65],
        min: 18,
        max: 24
      }
    ]
  },
  {
    ranking: 'Bom',
    limits: [
      {
        ages: [18, 25],
        min: 18,
        max: 21
      },
      {
        ages: [26, 35],
        min: 19,
        max: 22
      },
      {
        ages: [36, 45],
        min: 21,
        max: 25
      },
      {
        ages: [46, 55],
        min: 24,
        max: 27
      },
      {
        ages: [56, 65],
        min: 25,
        max: 28
      }
    ]
  },
  {
    ranking: 'Média',
    limits: [
      {
        ages: [18, 25],
        min: 22,
        max: 25
      },
      {
        ages: [26, 35],
        min: 23,
        max: 26
      },
      {
        ages: [36, 45],
        min: 26,
        max: 29
      },
      {
        ages: [46, 55],
        min: 28,
        max: 31
      },
      {
        ages: [56, 65],
        min: 29,
        max: 32
      }
    ]
  },
  {
    ranking: 'Acima da Média',
    limits: [
      {
        ages: [18, 25],
        min: 26,
        max: 29
      },
      {
        ages: [26, 35],
        min: 27,
        max: 31
      },
      {
        ages: [36, 45],
        min: 30,
        max: 34
      },
      {
        ages: [46, 55],
        min: 32,
        max: 35
      },
      {
        ages: [56, 65],
        min: 33,
        max: 36
      }
    ]
  },
  {
    ranking: 'Excessivo',
    limits: [
      {
        ages: [18, 25],
        min: 30,
        max: 37
      },
      {
        ages: [26, 35],
        min: 32,
        max: 39
      },
      {
        ages: [36, 45],
        min: 35,
        max: 41
      },
      {
        ages: [46, 55],
        min: 36,
        max: 42
      },
      {
        ages: [56, 65],
        min: 37,
        max: 41
      }
    ]
  }
];
//evalition female
const evaliationFemale = {
  getSkins: () => {
    return [{ key: 'tricipital' }, { key: 'supra_iliaca' }, { key: 'coxa' }];
  },
  getDensity: (sum, age) => {
    let params = getThreeSkinsFolds('f');
    let parc1 = params.param1 - params.param2 * sum;
    let parc2 = params.param3 * sum * sum;
    let parc3 = params.param4 * age;
    return (parc1 + parc2 - parc3).toFixed(2);
  },
  getConst: (sum, age) => {
    let params = getSevenSkinFolds('f');
    let parc1 = params.param1 - params.param2 * sum;
    let parc2 = params.param3 * sum * sum;
    let parc3 = params.param4 * age;
    return (parc1 + parc2 - parc3).toFixed(2);
  },
  getPercFat: PC => {
    return ((coefficients.param1 / PC - coefficients.param2) * 100).toFixed(2);
  },
  getBonesWeight: (alt, biestiloide, condilo) => {
    let prod = (biestiloide / 100) * (condilo / 100) * 400;
    let prod1 = Math.pow(alt, 2);
    let prod2 = prod * prod1;
    return 3.02 * Math.pow(prod2, 0.712);
  },
  getRanges: age => {
    let faixas = [];
    if (age < limitFemale[0].limits[0]) {
      limitFemale.forEach(ranges => {
        faixas.push({ ranking: ranges.ranking, limits: ranges.limits[0] });
      });
    } else {
      if (age > limitFemale[0].limits[4]) {
        limitFemale.forEach(ranges => {
          faixas.push({ ranking: ranges.ranking, limits: ranges.limits[4] });
        });
      } else {
        limitFemale.forEach(ranges => {
          ranges.limits.forEach(limit => {
            let ages = limit.ages;
            let bottom = ages[0];
            let higher = ages[1];
            if (age >= bottom && age <= higher) {
              faixas.push({ ranking: ranges.ranking, limits: limit });
            }
          });
        });
      }
    }
    return faixas;
  },
  residual: 0.241
};

//evaliation male
const evaliationMale = {
  getSkins: () => {
    return [{ key: 'peitoral' }, { key: 'abdominal' }, { key: 'coxa' }];
  },
  getDensity: (sum, age) => {
    let params = getThreeSkinsFolds('m');
    let parc1 = params.param1 - params.param2 * sum;
    let parc2 = params.param3 * sum * sum;
    let parc3 = params.param4 * age;
    return (parc1 + parc2 - parc3).toFixed(2);
  },
  getConst: (sum, age) => {
    let params = getSevenSkinFolds('m');
    let parc1 = params.param1 - params.param2 * sum;
    let parc2 = params.param3 * sum * sum;
    let parc3 = params.param4 * age;
    return parseFloat(parc1 + parc2 - parc3).toFixed(2);
  },
  getPercFat: PC => {
    return parseFloat(
      (coefficients.param1 / PC - coefficients.param2) * 100
    ).toFixed(2);
  },
  getBonesWeight: (alt, biestiloide, condilo) => {
    return (
      (3.02 * (alt ^ (2 * (biestiloide / 100) * (condilo / 100) * 400))) ^ 0.712
    );
  },
  getRanges: age => {
    let faixas = [];
    if (age < limitMale[0].limits[0]) {
      limitMale.forEach(ranges => {
        faixas.push({ ranking: ranges.ranking, limits: ranges.limits[0] });
      });
    } else {
      if (age > limitMale[0].limits[4]) {
        limitMale.forEach(ranges => {
          faixas.push({ ranking: ranges.ranking, limits: ranges.limits[4] });
        });
      } else {
        limitMale.forEach(ranges => {
          ranges.limits.forEach(limit => {
            let ages = limit.ages;
            let bottom = ages[0];
            let higher = ages[1];
            if (age >= bottom && age <= higher) {
              faixas.push({ ranking: ranges.ranking, limits: limit });
            }
          });
        });
      }
    }
    return faixas;
  },
  residual: 0.209
};

export default {
  evaliationFemale,
  evaliationMale
};
