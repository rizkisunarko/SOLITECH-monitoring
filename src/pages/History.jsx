import React from 'react';
import '../styles/History.css';

const History = () => {
  const historyData = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      date: '12 JAN 2024',
      badge: 'SELESAI',
      status: 'selesai',
      title: 'Fan Cleaning',
      desc: 'Pembersihan debu pada kipas pendingin utama untuk mengoptimalkan sirkulasi udara dan menurunkan suhu CPU hingga 5°C.'
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16"></path>
          <path d="M4 17h16"></path>
          <path d="M7 21L3 17l4-4"></path>
          <path d="M17 3l4 4-4 4"></path>
          <path d="M3 17V7"></path>
          <path d="M21 7v10"></path>
        </svg>
      ),
      date: '05 NOV 2023',
      badge: 'SELESAI',
      status: 'selesai',
      title: 'Baterai Diganti',
      desc: 'Penggantian unit baterai Lithium-ion original karena degradasi kapasitas di bawah 80%. Kalibrasi daya berhasil dilakukan.'
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      date: '15 OKT 2023',
      badge: 'ARSIP',
      status: 'arsip',
      title: 'Pembaruan Firmware',
      desc: 'Update sistem BIOS versi 2.4.1 untuk perbaikan bug pada manajemen daya dan dukungan hardware baru.'
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
        </svg>
      ),
      date: '22 AGU 2023',
      badge: 'SELESAI',
      status: 'selesai',
      title: 'Thermal Paste Re-application',
      desc: 'Pengaplikasian ulang pasta termal MX-4 pada prosesor untuk menjaga konduktivitas panas tetap maksimal.'
    }
  ];

  const filters = ['Semua Bulan', 'Januari', 'Desember', 'November', 'Oktober'];

  return (
    <div className="history-container fade-in">
      <div className="history-header">
        <h2>Riwayat Pemeliharaan</h2>
        <p>Rekam jejak aktivitas perawatan perangkat keras Anda.</p>
      </div>

      <div className="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Cari aktivitas..." />
      </div>

      <div className="filter-scroller">
        {filters.map((filter, index) => (
          <button 
            key={index} 
            className={`filter-pill ${index === 0 ? 'active' : 'inactive'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="timeline-container">
        {historyData.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-icon">
              {item.icon}
            </div>
            <div className={`timeline-card status-${item.status}`}>
              <div className="timeline-card-header">
                <span className="timeline-date">{item.date}</span>
                <span className={`timeline-badge badge-${item.status}`}>{item.badge}</span>
              </div>
              <h4 className="timeline-title">{item.title}</h4>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="export-container">
        <button className="btn-export-pdf">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Ekspor Laporan PDF
        </button>
      </div>
    </div>
  );
};

export default History;
