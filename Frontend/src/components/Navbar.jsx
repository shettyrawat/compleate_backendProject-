import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { MdLanguage } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { i18n, t } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(newLang);
        localStorage.setItem('lang', newLang);
    };

    const handleLogout = () => {
        if (window.confirm(t('logout_confirm') || 'Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <nav className="glass-card" style={{ margin: '1rem', padding: '0.8rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                Anjob 🚀
            </Link>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {user && (
                    <>
                        <Link to="/jobs">{t('nav.jobs')}</Link>
                        <Link to="/resume">{t('nav.resume')}</Link>
                        <Link to="/interview">{t('nav.interview')}</Link>
                        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {user.profilePicture ? (
                                <>
                                    <img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        referrerPolicy="no-referrer"
                                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <span style={{ display: 'none' }}>{t('nav.profile') || 'Profile'}</span>
                                </>
                            ) : (
                                t('nav.profile') || 'Profile'
                            )}
                        </Link>
                    </>
                )}

                <div style={{ display: 'flex', gap: '0.8rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1rem' }}>
                    <button onClick={toggleLanguage} className="btn" style={{ padding: '5px' }}>
                        <MdLanguage size={20} />
                    </button>
                    {user && (
                        <button onClick={handleLogout} className="btn" style={{ padding: '5px', color: 'var(--danger)' }}>
                            <FiLogOut size={20} />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
