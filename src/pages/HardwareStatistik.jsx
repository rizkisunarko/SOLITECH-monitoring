import React from 'react';
import '../styles/HardwareStatistik.css';

const HardwareStatistik = ({ onBack }) => {
  return (
    <div className="hardware-stats-container fade-in">
      {/* Header section with back button */}
      <div className="stats-header-top">
        <div className="stats-header-left">
          <button className="btn-back-stats" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="stats-header-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="brand-icon">
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
            <h2>Monitoring<br/>Hardware</h2>
          </div>
        </div>
        <div className="stats-header-actions">
          <button className="btn-icon-stats">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="btn-icon-stats">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="stats-main-content">
        {/* Status Sistem */}
        <div className="status-sistem-section">
          <span className="section-label">STATUS SISTEM</span>
          <div className="status-sistem-header">
            <h3>Kesehatan<br/>Perangkat</h3>
            <div className="badge-optimal">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              OPTIMAL
            </div>
          </div>
        </div>

        {/* CPU Card */}
        <div className="hardware-card cpu-card">
          <div className="hw-card-top">
            <div className="hw-info">
              <span className="hw-label">CENTRAL PROCESSING UNIT</span>
              <h4 className="hw-name">AMD Ryzen 9 5950X</h4>
            </div>
            <div className="hw-status">
              <div className="hw-temp temp-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                45°C
              </div>
              <span className="hw-temp-status">SUHU STABIL</span>
            </div>
          </div>
          <div className="hw-progress-box">
            <div className="hw-progress-header">
              <span>Beban Kerja</span>
              <span>15%</span>
            </div>
            <div className="hw-progress-bar">
              <div className="hw-progress-fill fill-blue" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>

        {/* GPU Card */}
        <div className="hardware-card gpu-card">
          <div className="hw-card-top">
            <div className="hw-info">
              <span className="hw-label">GRAPHICS UNIT</span>
              <h4 className="hw-name">RTX 3080 Ti</h4>
            </div>
            <div className="hw-status">
              <div className="hw-temp temp-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                60°C
              </div>
              <span className="hw-temp-status">RENDERING AKTIF</span>
            </div>
          </div>
          <div className="hw-progress-box">
            <div className="hw-progress-header">
              <span>Pemanfaatan</span>
              <span>80%</span>
            </div>
            <div className="hw-progress-bar">
              <div className="hw-progress-fill fill-orange" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        {/* RAM and SSD Row */}
        <div className="hw-row">
          <div className="hw-small-card">
            <div className="hw-small-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hw-small-icon"><rect x="4" y="4" width="16" height="5" rx="2" ry="2"></rect><rect x="4" y="15" width="16" height="5" rx="2" ry="2"></rect><line x1="8" y1="4" x2="8" y2="9"></line><line x1="16" y1="4" x2="16" y2="9"></line><line x1="8" y1="15" x2="8" y2="20"></line><line x1="16" y1="15" x2="16" y2="20"></line></svg>
              <div className="hw-small-text">
                <span className="hw-label">Penyimpanan RAM</span>
                <div className="hw-value"><b>8GB</b>/16GB</div>
              </div>
            </div>
            <div className="hw-small-chart">
              {/* Dummy bar chart */}
              <div className="bar b1"></div>
              <div className="bar b2"></div>
              <div className="bar b3"></div>
              <div className="bar b4"></div>
              <div className="bar b5"></div>
            </div>
          </div>

          <div className="hw-small-card">
            <div className="hw-small-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hw-small-icon"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
              <div className="hw-small-text">
                <span className="hw-label">Kapasitas SSD</span>
                <div className="hw-value"><b>256GB</b>/512GB</div>
              </div>
            </div>
            <div className="hw-small-progress">
              <div className="hw-progress-bar">
                <div className="hw-progress-fill fill-blue" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Analytics Banner */}
        <div className="analytics-banner">
          <div className="analytics-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <div className="analytics-text">
            <h4>Real-time Analytics</h4>
            <p>"Pulse icon signifies real-time data and hardware vitality."</p>
          </div>
        </div>

        {/* Network & External */}
        <div className="network-section">
          <span className="section-label">NETWORK & EXTERNAL</span>
          
          <div className="network-list">
            <div className="network-item">
              <div className="network-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
              </div>
              <div className="network-info">
                <h4>Ethernet (LAN)</h4>
                <p>Connected - 1.0 Gbps</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            <div className="network-item">
              <div className="network-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              </div>
              <div className="network-info">
                <h4>Display Port 1</h4>
                <p>4K @ 144Hz Active</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HardwareStatistik;
