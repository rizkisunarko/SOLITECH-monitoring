import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Settings.css';

const Settings = ({ user, onBack }) => {
  const { language, setLanguage, t } = useLanguage();
  const profileName = user?.name || 'Admin Perangkat';
  const profileEmail = user?.email || 'admin@monitoring.tech';
  const profileAvatar = user?.avatar || 'https://i.pinimg.com/736x/85/38/f4/8538f477fbcdd04031bbcdd7f3dba6be.jpg';

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [tempUnit, setTempUnit] = useState(localStorage.getItem('tempUnit') || 'C');

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTempUnitChange = (e) => {
    const unit = e.target.value;
    setTempUnit(unit);
    localStorage.setItem('tempUnit', unit);
    // Optional: trigger custom event if needed so Dashboard can catch it without reload
    window.dispatchEvent(new Event('tempUnitChanged'));
  };

  return (
    <div className="settings-container fade-in">
      {/* Header */}
      <div className="settings-header">
        <div className="settings-header-left">
          <button className="btn-back-settings" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          <h2>{t('settings.title')}</h2>
        </div>
        <span className="settings-version">{t('settings.version')}</span>
      </div>

      <div className="settings-content">
        {/* Profile Card */}
        <div className="settings-profile-card">
          <img src={profileAvatar} alt={profileName} className="settings-avatar" />
          <div className="settings-profile-info">
            <h3>{profileName}</h3>
            <p>{profileEmail}</p>
          </div>
        </div>

        {/* UMUM */}
        <div className="settings-section">
          <span className="settings-section-label">{t('settings.general')}</span>
          <div className="settings-list-card">

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
                <div className="settings-item-text">
                  <h4>{t('settings.notif')}</h4>
                  <p>{t('settings.notifDesc')}</p>
                </div>
              </div>
              <div className="toggle-switch active">
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
                <div className="settings-item-text">
                  <h4>{t('settings.language')}</h4>
                  <p>{t('settings.languageDesc')}</p>
                </div>
              </div>
              <div className="settings-item-right-text">
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  style={{
                    border: 'none', 
                    background: 'transparent', 
                    color: 'var(--text-dark)', 
                    fontWeight: 700, 
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></div>
                <div className="settings-item-text">
                  <h4>{t('settings.darkMode')}</h4>
                  <p>{t('settings.darkModeDesc')}</p>
                </div>
              </div>
              <div className={`toggle-switch ${isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(!isDarkMode)}>
                <div className="toggle-knob"></div>
              </div>
            </div>

          </div>
        </div>

        {/* KONFIGURASI DATA */}
        <div className="settings-section">
          <span className="settings-section-label">{t('settings.config')}</span>
          <div className="settings-list-card">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg></div>
                <div className="settings-item-text">
                  <h4>{t('settings.tempUnit')}</h4>
                  <p>{t('settings.tempUnitDesc')}</p>
                </div>
              </div>
              <div className="settings-item-right-text">
                <select 
                  value={tempUnit} 
                  onChange={handleTempUnitChange}
                  style={{
                    border: 'none', 
                    background: 'transparent', 
                    color: 'var(--text-dark)', 
                    fontWeight: 700, 
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="C">Celsius (°C)</option>
                  <option value="F">Fahrenheit (°F)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* LAINNYA */}
        <div className="settings-section">
          <span className="settings-section-label">{t('settings.others')}</span>
          <div className="settings-list-card">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
                <div className="settings-item-text">
                  <h4>{t('settings.about')}</h4>
                  <p>{t('settings.aboutDesc')}</p>
                </div>
              </div>
              <div className="settings-item-right-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          </div>
        </div>

        <button className="btn-settings-logout" onClick={() => window.location.href = '/'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          {t('settings.logout')}
        </button>

        <div className="settings-footer">
          <p>{t('settings.footerDesc')}</p>
          <p>{t('settings.footerBuild')}</p>
        </div>

      </div>
    </div>
  );
};

export default Settings;
