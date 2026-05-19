"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashboardUseCaseService = void 0;
const common_1 = require("@nestjs/common");
const abstracts_1 = require("../../../core/abstracts");
const cls_store_abstract_1 = require("../../../core/abstracts/adapters/cls-store.abstract");
const review_progress_status_enum_1 = require("../../../common/enums/review-progress-status.enum");
let adminDashboardUseCaseService = class adminDashboardUseCaseService {
    constructor(dataServices, cls) {
        this.dataServices = dataServices;
        this.cls = cls;
    }
    async generateOverallReviewInfo() {
        const totalReviews = await this.dataServices.review.getAllWithoutPagination();
        const totalCompletedReviews = totalReviews.filter((review) => review.progressStatus === review_progress_status_enum_1.ReviewProgressStatusEnum.COMPLETED);
        const totalSubmittedReviews = totalReviews.filter((review) => review.progressStatus === review_progress_status_enum_1.ReviewProgressStatusEnum.SUBMITTED);
        const totalPendingReviews = totalReviews.filter((review) => review.progressStatus === review_progress_status_enum_1.ReviewProgressStatusEnum.PENDING);
        return {
            totalReviews: totalReviews.length,
            totalCompletedReviews: totalCompletedReviews.length,
            totalSubmittedReviews: totalSubmittedReviews.length,
            totalPendingReviews: totalPendingReviews.length,
        };
    }
    async generateDepartmentReviewOverview() {
        const [allReviews, allTeams, allTeamMemberships] = await Promise.all([
            this.dataServices.review.getAllWithoutPagination(),
            this.dataServices.team.getAllWithoutPagination(),
            this.dataServices.teamMember.getAllWithoutPagination({}, { team: true }),
        ]);
        const response = allTeams.map((team) => {
            const currentTeamMembers = allTeamMemberships
                .filter((teamMember) => teamMember.team.id === team.id)
                .map((teamMember) => {
                return teamMember.member;
            });
            currentTeamMembers.push(team.leader);
            const currentTeamReviews = allReviews.filter((review) => currentTeamMembers.some((member) => member.id === review.reviewee.id));
            return {
                department: team.department,
                totalReviews: currentTeamReviews.length,
                completedReviews: currentTeamReviews.filter((review) => review.progressStatus === review_progress_status_enum_1.ReviewProgressStatusEnum.COMPLETED).length,
                submittedReviews: currentTeamReviews.filter((review) => review.progressStatus === review_progress_status_enum_1.ReviewProgressStatusEnum.SUBMITTED).length,
                pendingReviews: currentTeamReviews.filter((review) => review.progressStatus === review_progress_status_enum_1.ReviewProgressStatusEnum.PENDING).length,
            };
        });
        return response;
    }
};
exports.adminDashboardUseCaseService = adminDashboardUseCaseService;
exports.adminDashboardUseCaseService = adminDashboardUseCaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [abstracts_1.IDataServices,
        cls_store_abstract_1.IClsStore])
], adminDashboardUseCaseService);
//# sourceMappingURL=admin-dashboard-use-case.service.js.map