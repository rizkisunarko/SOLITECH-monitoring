import React, { useState, useEffect } from 'react';
import '../styles/HardwareStatistik.css';

const HardwareStatistik = ({ onBack }) => {
  const [realData, setRealData] = useState(null);
  const [ramHistory, setRamHistory] = useState([30, 45, 40, 35, 40]);
  const [selectedDetail, setSelectedDetail] = useState(null); // 'ethernet' | 'displayport' | null

  useEffect(() => {
    const fetchRealData = async () => {
      console.log("HardwareStatistik: Mengambil data dari agen...");
      try {
        const res = await fetch('http://localhost:5000/api/hardware');
        if (res.ok) {
          const data = await res.json();
          console.log("HardwareStatistik: Data berhasil diterima:", data);
          setRealData(data);
        } else {
          console.error("HardwareStatistik: Respon API tidak ok:", res.status);
          setRealData(null);
        }
      } catch (err) {
        console.error("HardwareStatistik: Gagal fetch data:", err);
        setRealData(null);
      }
    };
    fetchRealData();
    const interval = setInterval(fetchRealData, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (realData) {
      setRamHistory(prev => {
        const next = [...prev.slice(1), realData.ram.percent];
        return next;
      });
    }
  }, [realData]);

  // Determine temperature classes based on values
  const cpuTemp = realData ? realData.cpu.temp : 45;
  const cpuTempClass = cpuTemp > 75 ? 'temp-red' : (cpuTemp > 55 ? 'temp-orange' : 'temp-green');
  const cpuTempStatus = cpuTemp > 75 ? 'SUHU TINGGI' : (cpuTemp > 55 ? 'SUHU HANGAT' : 'SUHU STABIL');

  const gpuTemp = realData ? realData.gpu.temp : 60;
  const gpuTempClass = gpuTemp > 75 ? 'temp-red' : (gpuTemp > 55 ? 'temp-orange' : 'temp-green');
  const gpuTempStatus = gpuTemp > 75 ? 'SUHU TINGGI' : (gpuTemp > 55 ? 'SUHU HANGAT' : 'SUHU STABIL');
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
            <h3>Kesehatan<br/>Perangkat {realData && <span style={{ fontSize: '10px', color: '#10b981', display: 'block', marginTop: '4px' }}>• REAL-TIME</span>}</h3>
            <div className={`badge-optimal ${(cpuTemp > 75 || gpuTemp > 75) ? 'temp-red' : ''}`} style={(cpuTemp > 75 || gpuTemp > 75) ? { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' } : {}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {(cpuTemp > 75 || gpuTemp > 75) ? (
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"></path>
                ) : (
                  <>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </>
                )}
              </svg>
              {(cpuTemp > 75 || gpuTemp > 75) ? 'WARNING' : 'OPTIMAL'}
            </div>
          </div>
        </div>

        {/* CPU Card */}
        <div className="hardware-card cpu-card">
          <div className="hw-card-top">
            <div className="hw-info">
              <span className="hw-label">CENTRAL PROCESSING UNIT</span>
              <h4 className="hw-name">{realData ? realData.cpu.name : 'AMD Ryzen 9 5950X'}</h4>
            </div>
            <div className="hw-status">
              <div className={`hw-temp ${cpuTempClass}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                {cpuTemp}°C
              </div>
              <span className="hw-temp-status">{cpuTempStatus}</span>
            </div>
          </div>
          <div className="hw-progress-box">
            <div className="hw-progress-header">
              <span>Beban Kerja</span>
              <span>{realData ? realData.cpu.load : 15}%</span>
            </div>
            <div className="hw-progress-bar">
              <div className="hw-progress-fill fill-blue" style={{ width: `${realData ? realData.cpu.load : 15}%` }}></div>
            </div>
          </div>
        </div>

        {/* GPU Card */}
        <div className="hardware-card gpu-card">
          <div className="hw-card-top">
            <div className="hw-info">
              <span className="hw-label">GRAPHICS UNIT</span>
              <h4 className="hw-name">{realData ? realData.gpu.name : 'RTX 3080 Ti'}</h4>
            </div>
            <div className="hw-status">
              <div className={`hw-temp ${gpuTempClass}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                {gpuTemp}°C
              </div>
              <span className="hw-temp-status">{gpuTempStatus}</span>
            </div>
          </div>
          <div className="hw-progress-box">
            <div className="hw-progress-header">
              <span>Pemanfaatan</span>
              <span>{realData ? realData.gpu.load : 80}%</span>
            </div>
            <div className="hw-progress-bar">
              <div className="hw-progress-fill fill-orange" style={{ width: `${realData ? realData.gpu.load : 80}%` }}></div>
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
                <div className="hw-value"><b>{realData ? realData.ram.used : 8}GB</b>/{realData ? realData.ram.total : 16}GB</div>
              </div>
            </div>
            <div className="hw-small-chart">
              <div className="bar b1" style={{ height: `${ramHistory[0]}%` }}></div>
              <div className="bar b2" style={{ height: `${ramHistory[1]}%` }}></div>
              <div className="bar b3" style={{ height: `${ramHistory[2]}%` }}></div>
              <div className="bar b4" style={{ height: `${ramHistory[3]}%` }}></div>
              <div className="bar b5" style={{ height: `${ramHistory[4]}%` }}></div>
            </div>
          </div>

          <div className="hw-small-card">
            <div className="hw-small-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hw-small-icon"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
              <div className="hw-small-text">
                <span className="hw-label">Kapasitas SSD</span>
                <div className="hw-value"><b>{realData ? realData.ssd.used : 256}GB</b>/{realData ? realData.ssd.total : 512}GB</div>
              </div>
            </div>
            <div className="hw-small-progress">
              <div className="hw-progress-bar">
                <div className="hw-progress-fill fill-blue" style={{ width: `${realData ? realData.ssd.percent : 50}%` }}></div>
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
            <p>
              {realData 
                ? "Terhubung ke Agen Lokal. Memantau hardware komputer Anda secara real-time."
                : "Menggunakan data simulasi. Jalankan agen lokal di komputer Anda untuk melihat metrik asli."}
            </p>
          </div>
        </div>

        {/* Network & External */}
        <div className="network-section">
          <span className="section-label">NETWORK & EXTERNAL</span>
          
          <div className="network-list">
            <div className="network-item" onClick={() => setSelectedDetail('ethernet')} style={{ cursor: 'pointer' }}>
              <div className="network-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
              </div>
              <div className="network-info">
                <h4>Ethernet (LAN)</h4>
                <p>Connected - 1.0 Gbps</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            <div className="network-item" onClick={() => setSelectedDetail('displayport')} style={{ cursor: 'pointer' }}>
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

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="modal-overlay fade-in" onClick={() => setSelectedDetail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px', padding: '24px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--bg-light)', color: 'var(--accent-blue)' }}>
                  {selectedDetail === 'ethernet' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                  )}
                </div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  {selectedDetail === 'ethernet' ? 'Detail Ethernet (LAN)' : 'Detail Display Port'}
                </h3>
              </div>
              <button className="btn-close" onClick={() => setSelectedDetail(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '13px', color: 'var(--text-dark)', padding: 0 }}>
              {selectedDetail === 'ethernet' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Status</span>
                    <span style={{ fontWeight: '700', color: 'var(--green-success)' }}>Terhubung (Connected)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Kecepatan Tautan</span>
                    <span style={{ fontWeight: '700' }}>1.0 Gbps (Full Duplex)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Alamat IPv4</span>
                    <span style={{ fontWeight: '700' }}>192.168.1.10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Alamat MAC</span>
                    <span style={{ fontWeight: '700', fontFamily: 'monospace' }}>E4:D5:3G:6F:8A:12</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Total Terkirim (Tx)</span>
                    <span style={{ fontWeight: '700' }}>14.2 GB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Total Diterima (Rx)</span>
                    <span style={{ fontWeight: '700' }}>85.7 GB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-light)' }}>Pengontrol Network</span>
                    <span style={{ fontWeight: '700', fontSize: '12px', textAlign: 'right' }}>Intel(R) Ethernet Connection I219-V</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Status Display</span>
                    <span style={{ fontWeight: '700', color: 'var(--green-success)' }}>Aktif (Active)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Monitor Terhubung</span>
                    <span style={{ fontWeight: '700' }}>ASUS ROG Swift PG279Q</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Resolusi Maksimal</span>
                    <span style={{ fontWeight: '700' }}>3840 x 2160 (4K UHD)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Refresh Rate</span>
                    <span style={{ fontWeight: '700' }}>144 Hz (G-Sync Enabled)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-light)' }}>Kedalaman Warna</span>
                    <span style={{ fontWeight: '700' }}>10-bit Color (HDR Aktif)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-light)' }}>Pengontrol Grafis</span>
                    <span style={{ fontWeight: '700' }}>NVIDIA GeForce RTX 4070</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareStatistik;
