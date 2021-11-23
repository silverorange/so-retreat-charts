import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';

const data = readFileSync('./data/platforms-and-languages.csv');

interface Record {
  name: string;
  platform: string;
  language: string;
  start: string;
  end: string;
}

const records: Record[] = parse(data, {
  columns: ['name', 'platform', 'language', 'start', 'end'],
});

const platformMap = {
  legacy: 'Legacy',
  react: 'React',
  next: 'React',
  express: 'Node',
  'react-native': 'React Native',
  node: 'Node',
  android: 'Android',
  ios: 'iOS',
  laravel: 'Other',
  bedrock: 'Other',
  static: 'Other',
  satis: 'Other',
  emberjs: 'Other',
  apollo: 'Node',
  gulp: 'Node',
  ansible: 'Other',
  sqlite: 'Other',
};

const languageMap = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  php: 'PHP',
  yaml: 'Other',
  python: 'Other',
  c: 'Other',
  'objective-c': 'Objective-C',
  kotlin: 'Kotlin',
  swift: 'Swift',
  java: 'Java',
  html: 'Other',
};

interface Output {
  [year: string]: {
    platforms: {
      [platform: string]: number;
    };
    languages: {
      [language: string]: number;
    };
  };
}

const output: Output = {};

['2017', '2018', '2019', '2020', '2021'].forEach((year) => {
  output[year] = {
    languages: {},
    platforms: {},
  };

  records
    .filter(
      (record) =>
        Number(record.start.substr(0, 4)) <= Number(year) &&
        (record.end === '' || Number(record.end.substr(0, 4)) > Number(year))
    )
    .forEach((record) => {
      const platform = platformMap[record.platform];

      if (output[year].platforms[platform]) {
        output[year].platforms[platform]++;
      } else {
        output[year].platforms[platform] = 1;
      }

      const language = languageMap[record.language];

      if (output[year].languages[language]) {
        output[year].languages[language]++;
      } else {
        output[year].languages[language] = 1;
      }
    });
});

console.log(output);
