import fs from 'fs';
import { parse } from 'fast-csv';
import type { Trial } from '@/app/types';

const filePath = process.cwd() + '/src/db/trialsDatabase.csv';
const defaultOptions = { headers: true };

let data: Trial[] | null = null;

export const getData = async () => {
  return data || (await readCsvFile());
};

const readCsvFile: () => Promise<Trial[]> = () =>
  new Promise((resolve, reject) => {
    const content: Trial[] = [];

    fs.createReadStream(filePath)
      .pipe(parse(defaultOptions))
      .on('error', (error) => {
        console.log(error);
        reject([]);
      })
      .on('data', (row) => {
        content.push(row);
      })
      .on('end', () => {
        data = content;
        resolve(content);
      });
  });
