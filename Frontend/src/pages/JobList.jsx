import { useState, useEffect } from 'react';
import { jobService } from '../services/apiService';
import { FiPlus, FiSearch, FiFilter, FiCalendar, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { formatDate } from '../utils/dateUtils';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data } = await jobService.getJobs();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this application?')) return;

        try {
            await jobService.deleteJob(id);
            setJobs(jobs.filter(job => job._id !== id));
        } catch (err) {
            console.error('Failed to delete job:', err);
            alert('Failed to delete job application.');
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.position.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied': return '#3b82f6';
            case 'interviewing': return '#8b5cf6';
            case 'offered': return '#22c55e';
            case 'rejected': return '#ef4444';
            default: return 'var(--text-secondary)';
        }
    };

    if (loading) return <Loader text="Fetching Jobs" />;

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>My Applications</h2>
                <Link to="/jobs/add" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiPlus size={18} /> Add Job
                </Link>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FiSearch size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search company or position..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiFilter size={18} color="var(--text-secondary)" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    >
                        <option value="all">All Status</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {filteredJobs.map((job, i) => (
                    <motion.div
                        key={job._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card"
                        style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem' }}>{job.company}</h3>
                                <p style={{ color: 'var(--accent)', fontWeight: '500' }}>{job.position}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    background: `${getStatusColor(job.status)}20`,
                                    color: getStatusColor(job.status),
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                }}>
                                    {job.status}
                                </span>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="btn-icon"
                                    style={{
                                        color: 'var(--danger)',
                                        padding: '4px',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        opacity: 0.6,
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseOver={(e) => e.target.style.opacity = 1}
                                    onMouseOut={(e) => e.target.style.opacity = 0.6}
                                    title="Remove Application"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiMapPin size={16} /> {job.location || 'Remote'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MdCurrencyRupee size={16} /> {job.salary || 'Not specified'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FiCalendar size={16} /> Applied on {formatDate(job.createdAt)}
                            </div>
                        </div>

                        {job.notes && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)', paddingTop: '0.8rem' }}>
                                {job.notes.substring(0, 100)}{job.notes.length > 100 ? '...' : ''}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
