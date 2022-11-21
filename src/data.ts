interface DataSet {
  domain: [number, number];
  ticks: number;
  columns: string[];
  series: string[];
  data: { [key: string]: number[] };
}

export const pullRequests: DataSet = {
  domain: [0, 3500],
  ticks: 8,
  columns: [
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022—',
  ],
  series: ['years'],
  data: {
    years: [2029, 2209, 2395, 3086, 2474, 2217, 2431, 3263, 3215],
  },
};

export const siteReleases: DataSet = {
  domain: [0, 900],
  ticks: 8,
  columns: ['2015', '2016', '2017', '2018', '2019', '2020', '2021—'],
  series: ['years'],
  data: {
    years: [244, 516, 753, 659, 828, 850, 793],
  },
};

export const repositories: DataSet = {
  domain: [0, 180],
  ticks: 8,
  columns: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022—'],
  series: ['years'],
  data: {
    years: [74, 94, 116, 141, 156, 169, 176, 182],
  },
};

export const iOSReleases: DataSet = {
  domain: [0, 30],
  ticks: 6,
  columns: [
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022—',
  ],
  series: ['years'],
  data: {
    years: [3, 23, 19, 7, 11, 8, 8, 22, 18],
  },
};

export const androidReleases: DataSet = {
  domain: [0, 30],
  ticks: 6,
  columns: [
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022—',
  ],
  series: ['years'],
  data: {
    years: [0, 25, 16, 7, 9, 2, 9, 31, 20],
  },
};

export const showAndTells: DataSet = {
  domain: [0, 100],
  ticks: 4,
  columns: ['2017', '2018', '2019', '2020', '2021—'],
  series: ['years'],
  data: {
    years: [96, 86, 89, 43, 79],
  },
};

export const showAndTellsByMonth: DataSet = {
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

export const platformsByYear: DataSet = {
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

export const languagesByYear: DataSet = {
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
