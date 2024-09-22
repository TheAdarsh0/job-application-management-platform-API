import express from "express";
import {
    employerGetAllApplications,
    jobseekerDeleteApplication,
    jobseekerGetAllApplications,
    postApplication,
    
  } from "../controllers/applicationController.js";
  import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall",isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
router.post("/post", isAuthenticated, postApplication);

export default router;