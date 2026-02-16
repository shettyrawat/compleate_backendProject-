import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    location: String,
    salary: String,
    status: {
        type: String,
        enum: ['applied', 'interviewing', 'offered', 'rejected', 'accepted'],
        default: 'applied'
    },
    notes: String,
    timeline: [
        {
            event: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
