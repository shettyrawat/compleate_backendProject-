import Job from '../models/Job.js';
import Interview from '../models/Interview.js';
import Resume from '../models/Resume.js';
import mongoose from 'mongoose';

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
export const getDashboardStats = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // 1. Job Status counts
        const jobStats = await Job.aggregate([
            { $match: { user: userId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const formattedJobStats = {
            applied: 0,
            interviewing: 0,
            offered: 0,
            rejected: 0,
            accepted: 0,
            total: 0
        };

        jobStats.forEach(stat => {
            formattedJobStats[stat._id] = stat.count;
            formattedJobStats.total += stat.count;
        });

        // 2. Weekly application trends (last 4 weeks)
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

        const weeklyTrends = await Job.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: fourWeeksAgo }
                }
            },
            {
                $group: {
                    _id: { $week: '$createdAt' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        // 3. Interview Avg Score
        const interviewStats = await Interview.aggregate([
            { $match: { user: userId, status: 'completed' } },
            { $group: { _id: null, avgScore: { $avg: '$overallScore' }, count: { $sum: 1 } } }
        ]);

        res.json({
            jobs: formattedJobStats,
            weeklyApplications: weeklyTrends,
            interviews: {
                count: interviewStats.length > 0 ? interviewStats[0].count : 0,
                avgScore: interviewStats.length > 0 ? interviewStats[0].avgScore : 0
            }
        });
    } catch (error) {
        next(error);
    }
};
