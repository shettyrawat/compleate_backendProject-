import api from './api';

// Job Service
export const jobService = {
    getJobs: () => api.get('/jobs'),
    addJob: (jobData) => api.post('/jobs', jobData),
    updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
    deleteJob: (id) => api.delete(`/jobs/${id}`)
};

// Resume Service
export const resumeService = {
    uploadResume: (formData) => api.post('/resumes/upload', formData),
    getResumes: () => api.get('/resumes')
};

// Interview Service
export const interviewService = {
    startInterview: (data) => api.post('/interviews/start', data),
    startAdaptiveInterview: (data) => api.post('/interviews/adaptive/start', data),
    submitAnswer: (id, data) => api.post(`/interviews/${id}/answer`, data),
    submitAdaptiveAnswer: (id, data) => api.post(`/interviews/adaptive/${id}/step`, data),
    getInterviews: () => api.get('/interviews')
};

// Analytics Service
export const analyticsService = {
    getDashboardStats: () => api.get('/analytics/dashboard')
};

// Chatbot Service
export const chatbotService = {
    sendMessage: (message, history) => api.post('/chatbot', { message, history })
};

