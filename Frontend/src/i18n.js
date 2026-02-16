import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            nav: {
                dashboard: "Dashboard",
                jobs: "Jobs",
                resume: "Resume",
                interview: "Interview",
                profile: "Profile",
                logout: "Logout",
            },
            profile: {
                title: "Your Profile",
                settings: "Manage your account settings",
                username: "Username",
                email: "Email Address",
                joined: "Joined on",
                success: "Updated successfully!",
                error: "Failed to update",
                change_password: "Change Password",
                otp_sent: "OTP sent to your email!",
                otp_placeholder: "Enter 6-digit code",
                new_password: "New Password",
                confirm_password: "Confirm Password",
            },
            auth: {
                login: "Login",
                register: "Register",
                email: "Email Address",
                password: "Password",
                name: "Full Name",
            },
        },
    },
    hi: {
        translation: {
            nav: {
                dashboard: "डैशबोर्ड",
                jobs: "नौकरियां",
                resume: "रिज्यूमे",
                interview: "साक्षात्कार",
                profile: "प्रोफ़ाइल",
                logout: "लॉग आउट",
            },
            profile: {
                title: "आपकी प्रोफ़ाइल",
                settings: "अपनी खाता सेटिंग प्रबंधित करें",
                username: "उपयोगकर्ता नाम",
                email: "ईमेल पता",
                joined: "को शामिल हुए",
                success: "सफलतापूर्वक अपडेट किया गया!",
                error: "अपडेट करने में विफल",
                change_password: "पासवर्ड बदलें",
                otp_sent: "ओटीपी आपके ईमेल पर भेजा गया!",
                otp_placeholder: "6-अंकीय कोड दर्ज करें",
                new_password: "नया पासवर्ड",
                confirm_password: "पासवर्ड की पुष्टि करें",
            },
            auth: {
                login: "लॉगिन",
                register: "पंजीकरण",
                email: "ईमेल पता",
                password: "पासवर्ड",
                name: "पूरा नाम",
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
