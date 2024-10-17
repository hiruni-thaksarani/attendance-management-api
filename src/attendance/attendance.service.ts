import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, AttendanceDocument } from 'libs/schemas/attendance.schema';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async markAttendance(employeeId: string): Promise<Attendance> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Check if attendance already marked for today
    const existingAttendance = await this.attendanceModel
      .findOne({
        employeeId,
        date: today,
      })
      .exec();

    if (existingAttendance) {
      throw new Error('Attendance already marked for today');
    }

    // Determine if the employee is late (assuming 9:00 AM is the cutoff)
    const cutoffTime = new Date(today.setHours(9, 0, 0, 0));
    const status = now > cutoffTime ? 'late' : 'on-time';

    const newAttendance = new this.attendanceModel({
      employeeId,
      date: today,
      markTime: now,
      status,
    });

    return newAttendance.save();
  }

  async getAttendanceHistory(employeeId: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ employeeId }).sort({ date: -1 }).exec();
  }
}
