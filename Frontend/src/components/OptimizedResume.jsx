import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin, FiGithub, FiPlus, FiTrash2 } from 'react-icons/fi';

const OptimizedResume = ({ data, isEditable, onUpdate }) => {
    if (!data) return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Generating optimized content... Please wait a moment.
        </div>
    );

    // Helpers to handle updates
    const handleChange = (path, value) => {
        const newData = { ...data };
        const keys = path.split('.');
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        onUpdate(newData);
    };

    const handleListChange = (path, index, field, value) => {
        const newData = { ...data };
        const keys = path.split('.');
        let list = newData;
        for (const key of keys) {
            list = list[key];
        }
        if (field) {
            list[index][field] = value;
        } else {
            list[index] = value;
        }
        onUpdate(newData);
    };

    const addListItem = (path, template) => {
        const newData = { ...data };
        const keys = path.split('.');
        let list = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            list = list[keys[i]];
        }
        list[keys[keys.length - 1]].push(template);
        onUpdate(newData);
    };

    const removeListItem = (path, index) => {
        const newData = { ...data };
        const keys = path.split('.');
        let list = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            list = list[keys[i]];
        }
        list[keys[keys.length - 1]].splice(index, 1);
        onUpdate(newData);
    };

    // Flexible data mapping
    const personal = data.personalInfo || {};
    const name = personal.name || data.name || 'Your Name';
    const email = personal.email || data.email || '';
    const phone = personal.phone || data.phone || '';
    const location = personal.location || data.location || '';
    const summaryText = data.summary || '';
    const expList = data.experience || [];
    const eduList = data.education || [];
    const skillList = data.skills || [];
    const linkList = personal.links || data.links || [];

    const editStyle = (isSection = false) => isEditable ? {
        borderBottom: isSection ? '1px dashed #3182ce' : '1px dashed #cbd5e0',
        cursor: 'text',
        backgroundColor: 'rgba(49, 130, 206, 0.05)',
        padding: '2px 4px',
        borderRadius: '2px',
        minWidth: '20px',
        display: 'inline-block'
    } : {};

    return (
        <div id="optimized-resume-content" className="resume-printable-area" style={{
            padding: '40px 50px',
            backgroundColor: 'white',
            color: '#000',
            fontFamily: '"Times New Roman", Times, serif',
            maxWidth: '100%',
            width: '800px',
            margin: '20px auto',
            lineHeight: '1.5',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            borderRadius: '2px',
            textAlign: 'left',
            position: 'relative',
            zIndex: 1
        }}>
            {/* Header */}
            <header style={{ borderBottom: '3pt solid #000', paddingBottom: '15px', marginBottom: '20px', textAlign: 'center' }}>
                <h1
                    contentEditable={isEditable}
                    onBlur={(e) => handleChange('personalInfo.name', e.target.textContent)}
                    suppressContentEditableWarning
                    style={{ margin: '0 0 10px 0', fontSize: '28pt', color: '#000', textTransform: 'uppercase', fontWeight: 'bold', ...editStyle() }}
                >
                    {name}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', fontSize: '11pt', color: '#000' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiMail size={14} />
                        <span contentEditable={isEditable} onBlur={(e) => handleChange('personalInfo.email', e.target.textContent)} suppressContentEditableWarning style={editStyle()}>{email}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiPhone size={14} />
                        <span contentEditable={isEditable} onBlur={(e) => handleChange('personalInfo.phone', e.target.textContent)} suppressContentEditableWarning style={editStyle()}>{phone}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FiMapPin size={14} />
                        <span contentEditable={isEditable} onBlur={(e) => handleChange('personalInfo.location', e.target.textContent)} suppressContentEditableWarning style={editStyle()}>{location}</span>
                    </span>
                </div>
                {/* Links */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '8px', fontSize: '10pt', flexWrap: 'wrap' }}>
                    {linkList.map((link, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <a href={link.startsWith('http') ? link : `https://${link}`} style={{ color: '#000', textDecoration: 'underline' }}>
                                {link.toLowerCase().includes('linkedin') ? <FiLinkedin size={13} /> : link.toLowerCase().includes('github') ? <FiGithub size={13} /> : <FiGlobe size={13} />}
                                <span contentEditable={isEditable} onBlur={(e) => handleListChange('personalInfo.links', i, null, e.target.textContent)} suppressContentEditableWarning style={editStyle()}>{link}</span>
                            </a>
                            {isEditable && <FiTrash2 size={12} color="red" cursor="pointer" onClick={() => removeListItem('personalInfo.links', i)} />}
                        </div>
                    ))}
                    {isEditable && <button onClick={() => addListItem('personalInfo.links', 'linkedin.com/in/username')} style={{ border: 'none', background: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '9pt', display: 'flex', alignItems: 'center', gap: '2px' }}><FiPlus /> Add Link</button>}
                </div>
            </header>

            {/* Summary */}
            <section style={{ marginBottom: '25px' }}>
                <h2 style={{ fontSize: '14pt', borderBottom: '1.5pt solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', color: '#000', fontWeight: 'bold' }}>Professional Summary</h2>
                <p
                    contentEditable={isEditable}
                    onBlur={(e) => handleChange('summary', e.target.textContent)}
                    suppressContentEditableWarning
                    style={{ margin: 0, fontSize: '11pt', textAlign: 'justify', color: '#000', ...editStyle() }}
                >
                    {summaryText || 'Click to add summary.'}
                </p>
            </section>

            {/* Experience */}
            <section style={{ marginBottom: '25px' }}>
                <h2 style={{ fontSize: '14pt', borderBottom: '1.5pt solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', color: '#000', fontWeight: 'bold' }}>Work Experience</h2>
                {expList.map((exp, i) => (
                    <div key={i} style={{ marginBottom: '18px', breakInside: 'avoid', position: 'relative' }}>
                        {isEditable && <FiTrash2 size={14} color="red" style={{ position: 'absolute', right: '-25px', top: '0', cursor: 'pointer' }} onClick={() => removeListItem('experience', i)} />}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                            <strong contentEditable={isEditable} onBlur={(e) => handleListChange('experience', i, 'role', e.target.textContent)} suppressContentEditableWarning style={{ fontSize: '12pt', color: '#000', ...editStyle() }}>{exp.role || exp.title}</strong>
                            <span contentEditable={isEditable} onBlur={(e) => handleListChange('experience', i, 'duration', e.target.textContent)} suppressContentEditableWarning style={{ fontSize: '11pt', color: '#000', ...editStyle() }}>{exp.duration || exp.dates}</span>
                        </div>
                        <div contentEditable={isEditable} onBlur={(e) => handleListChange('experience', i, 'company', e.target.textContent)} suppressContentEditableWarning style={{ fontStyle: 'italic', fontSize: '11pt', marginBottom: '6px', color: '#000', ...editStyle() }}>{exp.company || exp.employer}</div>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '11pt', color: '#000' }}>
                            {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((point, j) => (
                                <li key={j} style={{ marginBottom: '3px', position: 'relative' }}>
                                    <span contentEditable={isEditable} onBlur={(e) => {
                                        const newDesc = [...exp.description];
                                        newDesc[j] = e.target.textContent;
                                        handleListChange('experience', i, 'description', newDesc);
                                    }} suppressContentEditableWarning style={editStyle()}>{point}</span>
                                    {isEditable && <FiTrash2 size={12} color="#aaa" cursor="pointer" onClick={() => {
                                        const newDesc = exp.description.filter((_, idx) => idx !== j);
                                        handleListChange('experience', i, 'description', newDesc);
                                    }} style={{ marginLeft: '10px' }} />}
                                </li>
                            ))}
                            {isEditable && <li style={{ listStyle: 'none' }}><button onClick={() => {
                                const newDesc = Array.isArray(exp.description) ? [...exp.description, 'New achievement point...'] : [exp.description, 'New achievement point...'];
                                handleListChange('experience', i, 'description', newDesc);
                            }} style={{ border: 'none', background: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '9pt' }}><FiPlus /> Add Point</button></li>}
                        </ul>
                    </div>
                ))}
                {isEditable && <button onClick={() => addListItem('experience', { role: 'Job Title', company: 'Company', duration: '2023 - Present', description: ['Key contribution...'] })} className="no-print" style={{ width: '100%', padding: '10px', border: '1px dashed #3182ce', borderRadius: '4px', background: 'rgba(49, 130, 206, 0.05)', color: '#3182ce', cursor: 'pointer', marginTop: '10px' }}><FiPlus /> Add Experience</button>}
            </section>

            {/* Education */}
            <section style={{ marginBottom: '25px' }}>
                <h2 style={{ fontSize: '14pt', borderBottom: '1.5pt solid #000', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase', color: '#000', fontWeight: 'bold' }}>Education</h2>
                {eduList.map((edu, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', breakInside: 'avoid', position: 'relative' }}>
                        {isEditable && <FiTrash2 size={14} color="red" style={{ position: 'absolute', right: '-25px', top: '0', cursor: 'pointer' }} onClick={() => removeListItem('education', i)} />}
                        <div>
                            <strong contentEditable={isEditable} onBlur={(e) => handleListChange('education', i, 'degree', e.target.textContent)} suppressContentEditableWarning style={{ fontSize: '12pt', color: '#000', ...editStyle() }}>{edu.degree}</strong>
                            <div contentEditable={isEditable} onBlur={(e) => handleListChange('education', i, 'institution', e.target.textContent)} suppressContentEditableWarning style={{ fontSize: '11pt', color: '#000', ...editStyle() }}>{edu.institution || edu.school}</div>
                        </div>
                        <span contentEditable={isEditable} onBlur={(e) => handleListChange('education', i, 'duration', e.target.textContent)} suppressContentEditableWarning style={{ fontSize: '11pt', color: '#000', ...editStyle() }}>{edu.duration || edu.date}</span>
                    </div>
                ))}
                {isEditable && <button onClick={() => addListItem('education', { degree: 'Degree Name', institution: 'University', duration: '2019 - 2023' })} className="no-print" style={{ width: '100%', padding: '10px', border: '1px dashed #3182ce', borderRadius: '4px', background: 'rgba(49, 130, 206, 0.05)', color: '#3182ce', cursor: 'pointer', marginTop: '10px' }}><FiPlus /> Add Education</button>}
            </section>

            {/* Skills */}
            <section style={{ breakInside: 'avoid' }}>
                <h2 style={{ fontSize: '14pt', borderBottom: '1.5pt solid #000', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', color: '#000', fontWeight: 'bold' }}>Skills</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11pt', color: '#000', lineHeight: '1.4' }}>
                    {skillList.map((skill, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', ...editStyle() }}>
                            <span contentEditable={isEditable} onBlur={(e) => handleListChange('skills', i, null, e.target.textContent)} suppressContentEditableWarning>{skill}</span>
                            {isEditable && <FiTrash2 size={10} color="#aaa" cursor="pointer" onClick={() => removeListItem('skills', i)} />}
                            {i < skillList.length - 1 && !isEditable && <span>,</span>}
                        </div>
                    ))}
                    {isEditable && <button onClick={() => addListItem('skills', 'New Skill')} style={{ border: 'none', background: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '9pt', display: 'flex', alignItems: 'center', gap: '2px' }}><FiPlus /> Add Skill</button>}
                </div>
            </section>

            {/* Print Specific Styles */}
            <style>
                {`
                @media print {
                    * {
                        visibility: hidden !important;
                        overflow: visible !important;
                        -webkit-print-color-adjust: exact !important;
                    }
                    html, body, #root, .main-layout, .page-container {
                        height: auto !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: visible !important;
                        background: white !important;
                        display: block !important;
                        visibility: visible !important;
                    }
                    .resume-preview-overlay {
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        display: block !important;
                        visibility: visible !important;
                        z-index: 99999 !important;
                        overflow: visible !important;
                    }
                    .resume-preview-overlay *, .resume-printable-area, .resume-printable-area * {
                        visibility: visible !important;
                    }
                    .resume-printable-area {
                        position: relative !important;
                        box-shadow: none !important;
                        border: none !important;
                        padding: 0 !important;
                        margin: 1.5cm auto !important;
                        width: 90% !important;
                        background: white !important;
                    }
                    .no-print, button, svg {
                        display: none !important;
                    }
                    h1, h2, h3, p, li, span, strong, a {
                        color: black !important;
                        background: transparent !important;
                        border: none !important;
                    }
                    @page { size: A4; margin: 0; }
                }
                `}
            </style>
        </div>
    );
};

export default OptimizedResume;
