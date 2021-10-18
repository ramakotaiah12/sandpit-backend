import { Controller, Dependencies, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/employees')
  async getEmployees(@Query() query) {
    const employees = await this.appService.getEmployees(
      parseInt(query.pageNumber),
      query.department,
    );
    return employees;
  }
}
