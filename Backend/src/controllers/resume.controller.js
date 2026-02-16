import Resume from '../models/Resume.js';
import { v2 as cloudinary } from 'cloudinary';
import { extractText } from '../services/resumeParser.service.js';
import { calculateScore, generateOptimizedData } from '../services/resumeScoring.service.js';
// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload and analyze resume
// @route   POST /api/resumes/upload
// @access  Private
export const uploadResume = async (req, res, next) => {
    try {
        console.log('Upload request received:', req.file ? req.file.originalname : 'No file');
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        // 1. Parse text
        console.log('Extracting text from:', req.file.mimetype);
        const text = await extractText(req.file.buffer, req.file.mimetype);
        console.log('Text extracted, length:', text.length);

        // 2. Score & Optimize in parallel (Performance fix)
        const { role } = req.body;
        console.log('Starting AI analysis for role:', role || 'General');

        const [scoring, optimizedData] = await Promise.all([
            calculateScore(text, role),
            generateOptimizedData(text, role)
        ]);

        // 3. Upload to Cloudinary using stream
        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto', folder: 'resumes' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
        };

        const uploadResult = await uploadToCloudinary(req.file.buffer);
        console.log('Cloudinary upload successful:', uploadResult.secure_url);

        // 4. Save to DB
        const resume = await Resume.create({
            user: req.user.id,
            fileUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            analysis: {
                atsScore: scoring.atsScore,
                skills: scoring.skills,
                suggestions: scoring.suggestions,
                completenessScore: scoring.completenessScore,
                formattingScore: scoring.formattingScore,
                keywordScore: scoring.keywordScore,
                optimizedData: optimizedData
            }
        });

        res.status(201).json(resume);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all user resumes
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({ user: req.user.id });
        res.json(resumes);
    } catch (error) {
        next(error);
    }
};
