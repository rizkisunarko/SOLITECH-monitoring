import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Schedule from './Schedule';
import History from './History';
import HardwareStatistik from './HardwareStatistik';
import Guide from './Guide';
import Profile from './Profile';
import Settings from './Settings';
import '../styles/Dashboard.css';

const Dashboard = ({ user: propUser }) => {
  const { t } = useLanguage();
  const [activeNav, setActiveNav] = useState('beranda');
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempUnit, setTempUnit] = useState(localStorage.getItem('tempUnit') || 'C');

  useEffect(() => {
    const handleTempChange = () => {
      setTempUnit(localStorage.getItem('tempUnit') || 'C');
    };
    window.addEventListener('tempUnitChanged', handleTempChange);
    return () => window.removeEventListener('tempUnitChanged', handleTempChange);
  }, []);

  const baseCpuTemp = 45;
  const displayCpuTemp = tempUnit === 'F' ? Math.round(baseCpuTemp * 9/5 + 32) : baseCpuTemp;

  // Get user from props or localStorage
  const [user, setUser] = useState(() => {
    if (propUser) return propUser;
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : { name: 'User', email: 'user@solitech.com' };
  });

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  return (
    <div className="dashboard-layout has-sidebar">
      
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand flex-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="brand-icon">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
          </svg>
          <span className="brand-text">SOLITECH</span>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeNav === 'beranda' ? 'active' : ''}`} onClick={() => setActiveNav('beranda')}>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span className="nav-text">{t('nav.home')}</span>
          </button>
          <button className={`nav-item ${activeNav === 'jadwal' ? 'active' : ''}`} onClick={() => setActiveNav('jadwal')}>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span className="nav-text">{t('nav.schedule')}</span>
          </button>
          <button className={`nav-item ${activeNav === 'riwayat' ? 'active' : ''}`} onClick={() => setActiveNav('riwayat')}>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="nav-text">{t('nav.history')}</span>
          </button>
          <button className={`nav-item ${activeNav === 'panduan' ? 'active' : ''}`} onClick={() => setActiveNav('panduan')}>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <span className="nav-text">{t('nav.guide')}</span>
          </button>
          <button className={`nav-item ${activeNav === 'profil' ? 'active' : ''}`} onClick={() => setActiveNav('profil')}>
            <div className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="nav-text">{t('nav.profile')}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {activeNav === 'beranda' && (
          showStats ? (
            <HardwareStatistik onBack={() => setShowStats(false)} />
          ) : (
          <div className="fade-in">
            {/* Header Top */}
            <div className="dash-header-top">
              <div className="dash-logo-title">
                {/* The logo is now in sidebar, but we can keep title here for mobile or just as page title */}
                <h1 className="dash-title">{t('dashboard.title')}</h1>
              </div>
              <button className="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </button>
            </div>

            {/* Welcome Section */}
            <div className="welcome-section">
              <div className="welcome-text">
                <p>{t('dashboard.welcome')}</p>
                <h2>{t('dashboard.hello', { name: user?.name || 'User' })}</h2>
              </div>
              <div className="active-device">
                <div className="active-device-label">{t('dashboard.activeDevice')}</div>
                <div className="active-device-name">{user?.device || 'PC-GAMER-01'}</div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="dash-content">
              
              {/* Statistik Hardware Button */}
              <button className="btn-statistik-hardware" onClick={() => setShowStats(true)}>
                <div className="statistik-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <span className="statistik-text">{t('dashboard.statsBtn')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="statistik-chevron">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              {/* Status Card */}
              <div className="card status-card">
                <div className="status-info">
                  <div className="status-dot"></div>
                  <div className="status-text">
                    <h3>{t('dashboard.healthy')}</h3>
                    <p>{t('dashboard.healthyDesc')}</p>
                  </div>
                </div>
                <div className="badge-active">{t('dashboard.activeBadge')}</div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card dashed-border">
                  <div className="stat-header">
                    <div className="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                      </svg>
                    </div>
                    <div className="stat-label">{t('dashboard.cpuTemp')}
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="stat-value">
                    {displayCpuTemp}<span className="stat-unit">° {tempUnit}</span>
                  </div>
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill" style={{width: '45%'}}></div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="5" rx="2" ry="2"></rect>
                        <rect x="4" y="15" width="16" height="5" rx="2" ry="2"></rect>
                        <line x1="8" y1="4" x2="8" y2="9"></line>
                        <line x1="16" y1="4" x2="16" y2="9"></line>
                        <line x1="8" y1="15" x2="8" y2="20"></line>
                        <line x1="16" y1="15" x2="16" y2="20"></line>
                      </svg>
                    </div>
                    <div className="stat-label">{t('dashboard.memory')}</div>
                  </div>
                  <div className="stat-value">
                    40<span className="stat-unit">%</span>
                  </div>
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>

              {/* Battery Card */}
              <div className="card battery-card">
                <div className="battery-circle">
                  95%
                </div>
                <div className="battery-info">
                  <h3>{t('dashboard.battery')}</h3>
                  <p>{t('dashboard.batteryDesc')}</p>
                </div>
                <div className="battery-icon flex-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
              </div>

              {/* Maintenance Card */}
              <div className="maintenance-card style-new">
                <div className="maintenance-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  {t('dashboard.maintenance')}
                </div>
                <h3>{t('dashboard.maintenanceTitle')}</h3>
                <p>{t('dashboard.maintenanceDesc')}</p>
                <button className="btn-maintenance">{t('dashboard.maintenanceBtn')}</button>
              </div>

              {/* Arsitektur Sistem Card */}
              <div className="card architecture-card">
                <div className="architecture-header">
                  <h3>{t('dashboard.architecture')}</h3>
                  <p>{t('dashboard.architectureDesc')}</p>
                </div>
                <div className="architecture-image">
                  <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Motherboard Architecture" />
                </div>
              </div>
            </div>
          </div>
          )
        )}

        {activeNav === 'jadwal' && (
          <Schedule />
        )}

        {activeNav === 'riwayat' && (
          <History />
        )}

        {activeNav === 'panduan' && (
          <Guide />
        )}

        {activeNav === 'profil' && (
          showSettings ? (
            <Settings user={user} onBack={() => setShowSettings(false)} />
          ) : (
            <Profile user={user} onUpdateProfile={updateUser} onSettingsClick={() => setShowSettings(true)} />
          )
        )}
      </main>
    </div>
  );
};

export default Dashboard;
