export const pullRequests = {
  domain: [0, 3500],
  ticks: 8,
  data: [
    {
      year: '2014',
      value: 2029,
    },
    {
      year: '2015',
      value: 2209,
    },
    {
      year: '2016',
      value: 2395,
    },
    {
      year: '2017',
      value: 3086,
    },
    {
      year: '2018',
      value: 2474,
    },
    {
      year: '2019',
      value: 2217,
    },
    {
      year: '2020',
      value: 2431,
    },
    {
      year: '2021—',
      value: 3064,
    },
  ],
};

export const siteReleases = {
  domain: [0, 900],
  ticks: 8,
  data: [
    {
      year: '2015',
      value: 244,
    },
    {
      year: '2016',
      value: 516,
    },
    {
      year: '2017',
      value: 753,
    },
    {
      year: '2018',
      value: 659,
    },
    {
      year: '2019',
      value: 828,
    },
    {
      year: '2020',
      value: 850,
    },
    {
      year: '2021—',
      value: 793,
    },
  ],
};

export const repositories = {
  domain: [0, 180],
  ticks: 8,
  data: [
    {
      year: '2015',
      value: 73,
    },
    {
      year: '2016',
      value: 94,
    },
    {
      year: '2017',
      value: 115,
    },
    {
      year: '2018',
      value: 140,
    },
    {
      year: '2019',
      value: 156,
    },
    {
      year: '2020',
      value: 169,
    },
    {
      year: '2021—',
      value: 174,
    },
  ],
};

export const iOSReleases = {
  domain: [0, 30],
  ticks: 6,
  data: [
    {
      year: '2014',
      value: 3,
    },
    {
      year: '2015',
      value: 23,
    },
    {
      year: '2016',
      value: 19,
    },
    {
      year: '2017',
      value: 7,
    },
    {
      year: '2018',
      value: 11,
    },
    {
      year: '2019',
      value: 8,
    },
    {
      year: '2020',
      value: 8,
    },
    {
      year: '2021—',
      value: 20,
    },
  ],
};

export const androidReleases = {
  domain: [0, 30],
  ticks: 6,
  data: [
    {
      year: '2014',
      value: 0,
    },
    {
      year: '2015',
      value: 25,
    },
    {
      year: '2016',
      value: 16,
    },
    {
      year: '2017',
      value: 7,
    },
    {
      year: '2018',
      value: 9,
    },
    {
      year: '2019',
      value: 2,
    },
    {
      year: '2020',
      value: 9,
    },
    {
      year: '2021—',
      value: 29,
    },
  ],
};

export const showAndTells = {
  domain: [0, 100],
  ticks: 4,
  data: [
    {
      year: '2017',
      value: 96,
    },
    {
      year: '2018',
      value: 86,
    },
    {
      year: '2019',
      value: 89,
    },
    {
      year: '2020',
      value: 43,
    },
    {
      year: '2021—',
      value: 79,
    },
  ],
};

export const showAndTellsByMonth = {
  domain: [0, 20],
  ticks: 4,
  columns: [
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
  ],
  series: ['2020', '2021'],
  data: {
    '2017': [0, 0, 9, 13, 4, 9, 8, 8, 5, 17, 9, 10],
    '2018': [4, 9, 10, 6, 9, 9, 4, 7, 3, 10, 5, 3],
    '2019': [11, 8, 14, 10, 7, 12, 8, 2, 7, 8, 5, 5],
    '2020': [3, 8, 3, 4, 4, 8, 3, 7, 3, 4, 7, 4],
    '2021': [8, 11, 2, 10, 6, 7, 4, 3, 10, 10, 6, 2],
  },
};

export const platformsByYear = {
  domain: [0, 18],
  ticks: 8,
  columns: [
    'Legacy PHP',
    'Node',
    'React',
    'React Native',
    'iOS',
    'Android',
    'Other',
  ],
  series: ['2020', '2021'],
  data: {
    '2017': [8, 5, 2, 1, 4, 4, 4],
    '2018': [10, 9, 10, 1, 6, 6, 4],
    '2019': [10, 15, 13, 1, 6, 6, 4],
    '2020': [10, 14, 14, 2, 6, 6, 5],
    '2021': [7, 14, 16, 3, 3, 3, 5],
  },
};

export const languagesByYear = {
  domain: [0, 24],
  ticks: 12,
  columns: [
    'PHP',
    'JavaScript',
    'TypeScript',
    'Objective-C',
    'Java',
    'Kotlin',
    'Swift',
    'Other',
  ],
  series: ['2020', '2021'],
  data: {
    '2017': [10, 9, 0, 4, 4, 0, 0, 1],
    '2018': [12, 17, 4, 6, 6, 0, 0, 1],
    '2019': [12, 17, 13, 6, 5, 1, 0, 1],
    '2020': [12, 15, 16, 6, 5, 1, 0, 2],
    '2021': [9, 12, 22, 2, 2, 1, 1, 2],
  },
};
