import { ReportsService } from './reports.service';
import { WeeklyReportResponseDto } from './dto/weekly-report-response.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getWeeklyReport(req: any): Promise<WeeklyReportResponseDto>;
}
