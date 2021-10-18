import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';
import axios from 'axios';

const departments = [
  'HR',
  'IT',
  'RESEARCH',
  'DEVELOPMENT',
  'SALES',
  'MARKETING',
  'OPERATIONS',
  'SECURITY',
  'MANAGEMENT',
  'EXECUTIVES',
];
function transformData(data) {
  const modifiedData = data.results.map((user) => {
    return {
      name: user.name,
      department: departments[Math.floor(Math.random() * departments.length)],
      email: user.email,
      location: user.location,
      picture: user.picture,
    };
  });
  return modifiedData;
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await axios
    .get('https://randomuser.me/api/?results=200')
    .then(async (response) => {
      console.log('fetching data from randomuser.me ..');
      // console.log(response.data);

      const transformedData = transformData(response.data);
      const jsonString = JSON.stringify(transformedData);
      fs.writeFileSync('./employees.json', jsonString);
      console.log('successfully loaded data');
    });
  await app.listen(5000);
}

bootstrap();
