import React, { useState } from 'react';
import '../styles/Guide.css';

const Guide = () => {
  const filters = ['Semua', 'Prosesor', 'Baterai', 'Kebersihan', 'Layar'];
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'completed'
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');

  const startHardwareScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    setScanMessage('Menghubungkan ke sensor perangkat...');

    const messages = [
      'Menghubungkan ke sensor perangkat...',
      'Membaca sensor suhu CPU (Core 0 - Core 7)...',
      'Memeriksa RPM kipas pendingin heatsink...',
      'Menganalisis siklus pengisian baterai...',
      'Memindai fragmentasi alokasi RAM...',
      'Mengukur efisiensi distribusi daya (VRM)...',
      'Pengecekan selesai! Mempersiapkan laporan...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const nextProgress = prev + 5;
        
        // Update message based on progress
        const messageIndex = Math.min(
          Math.floor((nextProgress / 100) * messages.length),
          messages.length - 1
        );
        if (messages[messageIndex] && messages[messageIndex] !== scanMessage) {
          setScanMessage(messages[messageIndex]);
        }

        if (nextProgress >= 100) {
          clearInterval(interval);
          setScanState('completed');
          return 100;
        }
        return nextProgress;
      });
    }, 150); // 100% in 3 seconds (20 steps * 150ms)
  };

  const thermalPasteGuideDetail = {
    title: 'Cara Ganti Thermal Paste',
    desc: 'Langkah demi langkah mengganti pasta termal untuk menjaga suhu CPU tetap stabil.'
  };

  return (
    <div className="guide-container fade-in">
      {/* Header */}
      <div className="guide-header-top">
        <div className="guide-header-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="brand-icon">
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
          <h2 className="guide-main-title">Monitoring Hardware</h2>
        </div>
        <button className="btn-icon-guide">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
      </div>

      {/* Title Section */}
      <div className="guide-title-section">
        <span className="guide-subtitle">MAINTENANCE CENTRAL</span>
        <h3>Panduan Perawatan</h3>
        <p>Optimalkan kinerja perangkat keras Anda dengan panduan teknis yang presisi.</p>
      </div>

      {/* Search Bar */}
      <div className="guide-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Cari panduan teknis..." />
      </div>

      {/* Filters */}
      <div className="guide-filters">
        {filters.map((filter, idx) => (
          <button key={idx} className={`filter-pill-guide ${idx === 0 ? 'active' : ''}`}>{filter}</button>
        ))}
      </div>

      {/* Cards Container */}
      <div className="guide-cards-container">
        
        {/* Featured Card */}
        <div className="guide-card featured-card">
          <div className="featured-image">
            <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="PC Maintenance" />
          </div>
          <div className="featured-content">
            <div className="tag-advanced">TINGKAT LANJUT</div>
            <h4>Cara Ganti Thermal Paste</h4>
            <p>Langkah demi langkah mengganti pasta termal untuk menjaga suhu CPU tetap stabil...</p>
            <div className="featured-footer">
              <span className="read-time">12 Menit Membaca</span>
              <button className="btn-read-more" onClick={() => setSelectedGuide('thermal')}>
                Baca Selengkapnya 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Standard Card 1 */}
        <div className="guide-card standard-card">
          <div className="standard-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
          </div>
          <h4>Bersihkan Debu Tanpa Bongkar</h4>
          <p>Gunakan metode tekanan udara terkendali untuk membersihkan heatsink tanpa membatalkan garansi perangkat.</p>
          <div className="card-tags">
            <span className="tag">Hardware</span>
            <span className="tag">Easy</span>
          </div>
        </div>

        {/* Standard Card 2 */}
        <div className="guide-card standard-card">
          <div className="standard-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><line x1="10" y1="6" x2="10" y2="18"></line><line x1="14" y1="12" x2="6" y2="12"></line></svg>
          </div>
          <h4>Tips Hemat Baterai</h4>
          <p>Kalibrasi siklus pengisian daya dan manajemen voltase latar belakang untuk memperpanjang usia sel lithium-ion.</p>
          <div className="card-tags">
            <span className="tag">Battery</span>
            <span className="tag">Optimization</span>
          </div>
        </div>

        {/* Diagnosis Banner */}
        <div className="diagnosa-banner">
          <h4>Diagnosa Mandiri</h4>
          <p>Butuh bantuan teknis lebih lanjut? Gunakan alat diagnosa otomatis kami.</p>
          <button className="btn-diagnosa" onClick={startHardwareScan}>Mulai Scan Hardware</button>
        </div>

      </div>

      {/* Modal Detail Guide (Cara Ganti Thermal Paste) */}
      {selectedGuide === 'thermal' && (
        <div className="modal-overlay fade-in" onClick={() => setSelectedGuide(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{thermalPasteGuideDetail.title}</h3>
              <button className="btn-close" onClick={() => setSelectedGuide(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body" style={{ padding: '0 20px 20px', lineHeight: '1.6' }}>
              <img 
                src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="PC Maintenance" 
                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', maxHeight: '250px', objectFit: 'cover' }} 
              />
              <p style={{ marginBottom: '15px' }}>{thermalPasteGuideDetail.desc}</p>
              <h4>Alat yang dibutuhkan:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                <li>Thermal Paste baru (seperti MX-4 atau Thermal Grizzly)</li>
                <li>Obeng plus (Philips)</li>
                <li>Tisu / kain microfiber dan alkohol (isopropyl)</li>
              </ul>
              <h4>Langkah-langkah:</h4>
              <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
                <li style={{ marginBottom: '8px' }}>Matikan PC dan cabut semua kabel yang terhubung.</li>
                <li style={{ marginBottom: '8px' }}>Buka casing PC dan lepas pendingin CPU secara perlahan.</li>
                <li style={{ marginBottom: '8px' }}>Bersihkan sisa thermal paste lama di permukaan CPU dan pendingin menggunakan alkohol dan tisu.</li>
                <li style={{ marginBottom: '8px' }}>Teteskan thermal paste baru seukuran biji kacang di tengah CPU.</li>
                <li style={{ marginBottom: '8px' }}>Pasang kembali pendingin. Jangan menekan terlalu keras tapi pastikan terpasang rata.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
      {/* Simulation Scan Hardware Overlay */}
      {scanState !== 'idle' && (
        <div className="modal-overlay fade-in" style={{ zIndex: 1100 }} onClick={() => scanState === 'completed' && setScanState('idle')}>
          <div className="modal-content scan-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '32px', textAlign: 'center' }}>
            {scanState === 'scanning' ? (
              <div className="scan-loading-view">
                <div className="radar-spinner" style={{ margin: '0 auto 24px' }}>
                  <div className="radar-ripple"></div>
                  <div className="radar-core">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="radar-icon-spin">
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                  </div>
                </div>
                <h3 className="scan-title" style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 12px 0' }}>Memindai Perangkat Keras...</h3>
                <div className="scan-progress-wrapper" style={{ margin: '24px 0' }}>
                  <div className="scan-progress-bar" style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', position: 'relative', marginBottom: '8px' }}>
                    <div className="scan-progress-fill" style={{ width: `${scanProgress}%`, height: '100%', backgroundColor: 'var(--accent-blue)', borderRadius: '4px', transition: 'width 0.15s ease-out' }}></div>
                  </div>
                  <span className="scan-progress-text" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-blue)' }}>{scanProgress}%</span>
                </div>
                <p className="scan-status-message" style={{ fontSize: '13px', color: 'var(--text-light)', minHeight: '40px', margin: 0 }}>{scanMessage}</p>
              </div>
            ) : (
              <div className="scan-result-view fade-in">
                <div className="success-icon-wrapper flex-center" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--green-bg)', color: 'var(--green-success)', margin: '0 auto 20px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="scan-title" style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 8px 0' }}>Scan Selesai!</h3>
                <div className="scan-result-badge" style={{ display: 'inline-block', backgroundColor: 'var(--green-bg)', color: 'var(--green-success)', fontSize: '12px', fontWeight: '800', padding: '6px 16px', borderRadius: '20px', margin: '8px 0 20px', letterSpacing: '0.5px' }}>
                  KESEHATAN SISTEM: 95% (SANGAT BAIK)
                </div>
                <div className="scan-result-details" style={{ backgroundColor: 'var(--bg-light)', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '24px', fontSize: '13px', lineHeight: '1.6' }}>
                  <p style={{ margin: '0 0 8px 0', fontWeight: '700', color: 'var(--text-dark)' }}>Ringkasan Hasil Diagnosa:</p>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Suhu CPU stabil di rata-rata 45°C.</li>
                    <li>Kipas pendingin berputar normal pada 2100 RPM.</li>
                    <li>Kesehatan Baterai 92% dengan tegangan seimbang.</li>
                    <li>Saran: Lakukan penggantian thermal paste dalam 15 hari sesuai jadwal pemeliharaan berkala Anda.</li>
                  </ul>
                </div>
                <button className="btn-primary" onClick={() => setScanState('idle')} style={{ width: '100%', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: '800', border: 'none', backgroundColor: 'var(--accent-blue)', color: 'var(--white)', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>Tutup Laporan</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
