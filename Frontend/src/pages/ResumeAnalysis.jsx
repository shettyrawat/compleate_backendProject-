import { useState, useEffect } from 'react';
import { resumeService } from '../services/apiService';
import { FiUpload, FiFileText, FiAlertCircle, FiCheckCircle, FiArrowRight, FiLayers, FiMonitor, FiServer, FiCpu, FiShield, FiCloud, FiSmartphone, FiSearch, FiActivity, FiDownload, FiEye, FiZap } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiPython, SiFigma } from 'react-icons/si';
import { FaJava, FaInfinity, FaBrain } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedResume from '../components/OptimizedResume';
import Loader, { ButtonLoader } from '../components/Loader';

const ResumeAnalysis = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptimized, setShowOptimized] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(null);

    // Sync editable data when result changes
    useEffect(() => {
        if (result?.analysis?.optimizedData) {
            setEditableData(result.analysis.optimizedData);
        }
    }, [result]);

    // ... (rest of roles and handlers)

    const roles = [
        { id: 'fullstack', name: 'Full Stack Developer', icon: <FiLayers /> },
        { id: 'frontend', name: 'Frontend Developer', icon: <FiMonitor /> },
        { id: 'backend', name: 'Backend Developer', icon: <FiServer /> },
        { id: 'react', name: 'React Developer', icon: <SiReact /> },
        { id: 'node', name: 'Node.js Developer', icon: <SiNodedotjs /> },
        { id: 'python', name: 'Python Developer', icon: <SiPython /> },
        { id: 'java', name: 'Java Developer', icon: <FaJava /> },
        { id: 'devops', name: 'DevOps Engineer', icon: <FaInfinity /> },
        { id: 'datascience', name: 'Data Scientist', icon: <FaBrain /> },
        { id: 'ai-ml', name: 'AI/ML Engineer', icon: <FiCpu /> },
        { id: 'cybersecurity', name: 'Cyber Security', icon: <FiShield /> },
        { id: 'cloud', name: 'Cloud Engineer', icon: <FiCloud /> },
        { id: 'ui-ux', name: 'UI/UX Designer', icon: <SiFigma /> },
        { id: 'mobile', name: 'Mobile App Developer', icon: <FiSmartphone /> },
        { id: 'qa', name: 'QA Engineer', icon: <FiSearch /> },
        { id: 'data-analyst', name: 'Data Analyst', icon: <FiActivity /> },
        { id: 'electrical-engineer', name: 'Electrical Engineer', icon: <FiZap /> },
    ];

    const filteredRoles = roles.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.size <= 5 * 1024 * 1024) {
            setFile(selected);
            setError('');
        } else {
            setError('Please select a file smaller than 5MB');
        }
    };

    const handleUpload = async () => {
        if (!file || !role) {
            setError('Please select a file and a role');
            return;
        }
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('role', roles.find(r => r.id === role)?.name);

        try {
            const { data } = await resumeService.uploadResume(formData);
            setResult(data);
        } catch (err) {
            setError(err || 'Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2.5rem' }}>AI Resume Analysis</h2>

            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="glass-card"
                        style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
                    >
                        <div style={{ width: '100%', textAlign: 'left', marginBottom: '1rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>1. Select a Role to Target</h3>
                            <div style={{ marginBottom: '1rem', position: 'relative' }}>
                                <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="text"
                                    placeholder="Search roles or type custom role..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setRole(''); // Clear selected role when searching
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 1rem 0.7rem 2.8rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                gap: '0.8rem',
                                marginBottom: '1rem',
                                maxHeight: '280px',
                                overflowY: 'auto',
                                padding: '0.5rem',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.03)'
                            }}>
                                {filteredRoles.map(r => (
                                    <div
                                        key={r.id}
                                        onClick={() => {
                                            setRole(r.id);
                                            setSearchTerm(r.name);
                                        }}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: role === r.id ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                                            background: role === r.id ? 'var(--bg-primary)' : 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: role === r.id ? 'var(--accent)' : 'var(--text-secondary)' }}>{r.icon}</div>
                                        <div style={{ fontWeight: '500', fontSize: '0.8rem' }}>{r.name}</div>
                                    </div>
                                ))}
                            </div>


                        </div>

                        <div style={{ width: '100%', textAlign: 'left' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>2. Upload your Resume</h3>
                            <div style={{
                                border: '2px dashed var(--glass-border)',
                                padding: '2rem',
                                borderRadius: '16px',
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.01)'
                            }}>
                                <div style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
                                    <FiUpload size={32} />
                                </div>
                                <input
                                    type="file"
                                    id="resume-upload"
                                    hidden
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="resume-upload" className="btn" style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', padding: '10px 20px', cursor: 'pointer' }}>
                                    {file ? file.name : 'Choose File'}
                                </label>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.85rem' }}>Max file size 5MB (PDF or DOCX)</p>
                            </div>
                        </div>

                        {error && <p style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiAlertCircle size={16} /> {error}</p>}

                        <button
                            disabled={!file || !role || loading}
                            onClick={handleUpload}
                            className="btn btn-primary"
                            style={{ minWidth: '240px', padding: '16px', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {loading ? <><ButtonLoader /> Analyzing...</> : 'Start Comprehensive Analysis'}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}
                    >
                        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                            <h3>ATS Score</h3>
                            <div style={{ margin: '2rem auto', width: '150px', height: '150px', borderRadius: '50%', border: '8px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
                                {result.analysis.atsScore}%
                            </div>
                            <p style={{ color: 'var(--text-secondary)' }}>Based on keyword matching for <strong>{roles.find(r => r.id === role)?.name}</strong>.</p>

                            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span style={{ fontSize: '0.9rem' }}>Keywords</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{result.analysis.keywordScore}/40</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(result.analysis.keywordScore / 40) * 100}%`, height: '100%', background: 'var(--accent)' }} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span style={{ fontSize: '0.9rem' }}>Formatting</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{result.analysis.formattingScore}/30</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(result.analysis.formattingScore / 30) * 100}%`, height: '100%', background: 'var(--accent)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Detected Skills</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                    {result.analysis.skills.map((skill, i) => (
                                        <span key={i} style={{ padding: '6px 14px', background: 'var(--bg-primary)', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--accent)', border: '1px solid var(--glass-border)' }}>
                                            {skill}
                                        </span>
                                    ))}
                                    {result.analysis.skills.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No skills detected.</p>}
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FiFileText size={20} color="var(--success)" /> Improvement Suggestions
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {result.analysis.suggestions.map((sg, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                            <FiCheckCircle size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <span>{sg}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                    <button onClick={() => setResult(null)} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }}>
                                        Analyze Another <FiArrowRight size={18} />
                                    </button>
                                    {result.analysis.optimizedData && (
                                        <button
                                            onClick={() => setShowOptimized(true)}
                                            className="btn btn-primary"
                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                        >
                                            <FiDownload size={18} /> Get Optimized PDF
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Optimized Resume Modal/Overlay */}
                        <AnimatePresence>
                            {showOptimized && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="resume-preview-overlay"
                                    style={{
                                        position: 'fixed',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'rgba(0,0,0,0.9)',
                                        zIndex: 1000,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '40px',
                                        overflowY: 'auto',
                                        color: 'white'
                                    }}
                                >
                                    <div className="no-print" style={{ display: 'flex', gap: '1rem', marginBottom: '20px', width: '100%', maxWidth: '800px', justifyContent: 'space-between' }}>
                                        <button
                                            onClick={() => setShowOptimized(false)}
                                            className="btn"
                                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}
                                        >
                                            <FiArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to Analysis
                                        </button>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button
                                                onClick={() => setIsEditing(!isEditing)}
                                                className="btn"
                                                style={{
                                                    background: isEditing ? 'var(--success)' : 'var(--bg-primary)',
                                                    border: '1px solid var(--glass-border)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    color: 'white'
                                                }}
                                            >
                                                <FiFileText /> {isEditing ? 'Finish Editing' : 'Edit Resume'}
                                            </button>
                                            <button
                                                onClick={() => window.print()}
                                                className="btn btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <FiDownload /> Export PDF
                                            </button>
                                        </div>
                                    </div>
                                    <OptimizedResume
                                        data={editableData}
                                        isEditable={isEditing}
                                        onUpdate={(newData) => setEditableData(newData)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeAnalysis;

