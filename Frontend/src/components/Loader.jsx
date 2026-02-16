import './Loader.css';

const Loader = ({ text = "Loading", fullPage = false }) => {
    const loaderContent = (
        <div className="premium-loader-container">
            <span className="premium-loader"></span>
            <span className="loader-text">{text}...</span>
        </div>
    );

    if (fullPage) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}>
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
};

export const ButtonLoader = () => <span className="btn-spinner"></span>;

export default Loader;
