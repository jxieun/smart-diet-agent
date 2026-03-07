import { PrismaService } from '../prisma/prisma.service';
import { WeeklyReportResponseDto } from './dto/weekly-report-response.dto';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWeeklyReport(userId: string): Promise<WeeklyReportResponseDto>;
}
