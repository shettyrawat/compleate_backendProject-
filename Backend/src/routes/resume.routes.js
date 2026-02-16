import express from 'express';
const router = express.Router();
import multer from 'multer';
import { uploadResume, getResumes } from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.middleware.js';

// Multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type'), false);
        }
    }
});

router.use(protect); // Protect all resume routes

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResumes);

export default router;
