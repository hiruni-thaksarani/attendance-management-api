import { Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark/:employeeId')
  async markAttendance(@Param('employeeId') employeeId: string) {
    return this.attendanceService.markAttendance(employeeId);
  }

  @Get('history/:employeeId')
  async getAttendanceHistory(@Param('employeeId') employeeId: string) {
    return this.attendanceService.getAttendanceHistory(employeeId);
  }
}
