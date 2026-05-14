import React from 'react';
import '../styles/Settings.css';

const Settings = ({ onBack }) => {
  return (
    <div className="settings-container fade-in">
      {/* Header */}
      <div className="settings-header">
        <div className="settings-header-left">
          <button className="btn-back-settings" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          <h2>Pengaturan</h2>
        </div>
        <span className="settings-version">SYSTEM V2.4</span>
      </div>

      <div className="settings-content">
        {/* Profile Card */}
        <div className="settings-profile-card">
          <img src="https://i.pinimg.com/736x/85/38/f4/8538f477fbcdd04031bbcdd7f3dba6be.jpg" alt="Admin" className="settings-avatar" />
          <div className="settings-profile-info">
            <h3>Admin Perangkat</h3>
            <p>admin@monitoring.tech</p>
          </div>
        </div>

        {/* UMUM */}
        <div className="settings-section">
          <span className="settings-section-label">UMUM</span>
          <div className="settings-list-card">
            
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
                <div className="settings-item-text">
                  <h4>Notifikasi</h4>
                  <p>Peringatan real-time perangkat</p>
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
                  <h4>Bahasa</h4>
                  <p>Pilih bahasa aplikasi</p>
                </div>
              </div>
              <div className="settings-item-right-text">
                Indonesia <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></div>
                <div className="settings-item-text">
                  <h4>Dark Mode</h4>
                  <p>Gunakan tema gelap</p>
                </div>
              </div>
              <div className="toggle-switch">
                <div className="toggle-knob"></div>
              </div>
            </div>

          </div>
        </div>

        {/* KONFIGURASI DATA */}
        <div className="settings-section">
          <span className="settings-section-label">KONFIGURASI DATA</span>
          <div className="settings-list-card">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg></div>
                <div className="settings-item-text">
                  <h4>Satuan Suhu</h4>
                  <p>Format pembacaan sensor</p>
                </div>
              </div>
              <div className="settings-item-right-text">
                Celsius <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          </div>
        </div>

        {/* LAINNYA */}
        <div className="settings-section">
          <span className="settings-section-label">LAINNYA</span>
          <div className="settings-list-card">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
                <div className="settings-item-text">
                  <h4>Tentang App</h4>
                  <p>Versi, lisensi, dan pembuat</p>
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
          Keluar Akun
        </button>

        <div className="settings-footer">
          <p>HARDWARE MONITORING SYSTEM</p>
          <p>Build 2024.11.08.PRO</p>
        </div>

      </div>
    </div>
  );
};

export default Settings;
