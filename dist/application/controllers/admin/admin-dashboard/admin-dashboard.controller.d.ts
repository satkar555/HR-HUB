import { adminDashboardUseCaseService } from 'src/use-cases/admin-use-cases/admin-dashboard/admin-dashboard-use-case.service';
export declare class AdminDashbaordController {
    private adminDashboardUseCaseService;
    constructor(adminDashboardUseCaseService: adminDashboardUseCaseService);
    getOverallReviewInfo(): Promise<import("../../../../common/interface/response/app-response").AppResponse<{
        totalReviews: number;
        totalCompletedReviews: number;
        totalSubmittedReviews: number;
        totalPendingReviews: number;
    }>>;
    getDepartmentReviewOverview(): Promise<import("../../../../common/interface/response/app-response").AppResponse<{
        department: string;
        totalReviews: number;
        completedReviews: number;
        submittedReviews: number;
        pendingReviews: number;
    }[]>>;
}
