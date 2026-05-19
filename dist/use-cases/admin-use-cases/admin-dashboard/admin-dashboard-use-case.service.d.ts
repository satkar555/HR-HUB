import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
export declare class adminDashboardUseCaseService {
    private readonly dataServices;
    private readonly cls;
    constructor(dataServices: IDataServices, cls: IClsStore<AppClsStore>);
    generateOverallReviewInfo(): Promise<{
        totalReviews: number;
        totalCompletedReviews: number;
        totalSubmittedReviews: number;
        totalPendingReviews: number;
    }>;
    generateDepartmentReviewOverview(): Promise<{
        department: string;
        totalReviews: number;
        completedReviews: number;
        submittedReviews: number;
        pendingReviews: number;
    }[]>;
}
