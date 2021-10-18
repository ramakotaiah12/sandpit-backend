import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { paginator } from './utils';

@Injectable()
export class AppService {
  getEmployees(page, department): Promise<any> {
    return new Promise(function (resolve, reject) {
      fs.readFile('employees.json', 'utf-8', (err, jsonData) => {
        if (err) {
          reject(err);
        } else {
          let filteredData;
          if (department) {
            filteredData = JSON.parse(jsonData).filter(
              (d) => d.department === department,
            );
          } else {
            filteredData = JSON.parse(jsonData);
          }
          const paginatedData = paginator({
            items: filteredData,
            page,
          });
          resolve(paginatedData);
        }
      });
    });
  }
}
