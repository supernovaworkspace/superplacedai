"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBackendRouter = createBackendRouter;
const express_1 = require("express");
const resume_1 = __importDefault(require("./resume"));
const skillgap_1 = __importDefault(require("./skillgap"));
const interview_1 = __importDefault(require("./interview"));
const jobs_1 = __importDefault(require("./jobs"));
const uploadCsv_1 = __importDefault(require("./uploadCsv"));
function createBackendRouter() {
    const router = (0, express_1.Router)();
    router.use("/agents/resume", resume_1.default);
    router.use("/agents/skillgap", skillgap_1.default);
    router.use("/agents/interview", interview_1.default);
    router.use("/agents/jobs", jobs_1.default);
    router.use("/jobs", uploadCsv_1.default);
    return router;
}
