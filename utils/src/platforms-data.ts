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
  legacy: 'legacy',
  react: 'react',
  next: 'react',
  express: 'node',
  'react-native': 'react-native',
  node: 'node',
  android: 'android',
  ios: 'ios',
  laravel: 'other',
  bedrock: 'other',
  static: 'other',
  satis: 'other',
  emberjs: 'other',
  apollo: 'node',
  gulp: 'node',
  ansible: 'other',
  sqlite: 'other',
};

const languageMap = {
  typescript: 'typescript',
  javascript: 'javascript',
  php: 'php',
  yaml: 'other',
  python: 'other',
  c: 'other',
  'objective-c': 'objective-c',
  kotlin: 'kotlin',
  swift: 'swift',
  java: 'java',
  html: 'other',
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
