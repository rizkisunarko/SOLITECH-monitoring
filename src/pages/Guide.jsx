import React, { useState } from 'react';
import '../styles/Guide.css';

const Guide = () => {
  const filters = ['Semua', 'Prosesor', 'Baterai', 'Kebersihan', 'Layar'];
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'completed'
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Tips Baru Tersedia', message: 'Cara Ganti Thermal Paste ditambahkan ke panduan.', type: 'info', read: false },
    { id: 2, title: 'Optimasi Baterai', message: 'Saran optimasi daya baterai laptop diperbarui.', type: 'success', read: false },
    { id: 3, title: 'Perawatan Layar', message: 'Panduan baru untuk membersihkan panel OLED.', type: 'info', read: true }
  ]);

  const guidesData = [
    {
      id: 'thermal',
      title: 'Cara Ganti Thermal Paste',
      desc: 'Langkah demi langkah mengganti pasta termal untuk menjaga suhu CPU tetap stabil.',
      category: 'Prosesor',
      readTime: '12 Menit Membaca',
      difficulty: 'TINGKAT LANJUT',
      tags: ['Hardware', 'Advanced'],
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      content: (
        <>
          <p style={{ marginBottom: '15px' }}>Menjaga suhu CPU tetap optimal sangat penting untuk mencegah thermal throttling dan memperpanjang umur prosesor Anda. Pasta termal (thermal paste) adalah media penghantar panas antara CPU dan heatsink yang lambat laun bisa mengering.</p>
          <h4>Alat yang dibutuhkan:</h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li>Thermal Paste berkualitas tinggi (MX-4, Noctua NT-H1, dll.)</li>
            <li>Obeng plus (Philips)</li>
            <li>Tisu / kain microfiber dan cairan alkohol pembersih (isopropyl 90%+)</li>
          </ul>
          <h4>Langkah-langkah:</h4>
          <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
            <li style={{ marginBottom: '8px' }}>Matikan PC, cabut kabel daya, dan buka penutup casing samping.</li>
            <li style={{ marginBottom: '8px' }}>Lepas pendingin CPU (heatsink/fan) secara perlahan. Jika lengket, putar sedikit ke kiri dan kanan sebelum menariknya.</li>
            <li style={{ marginBottom: '8px' }}>Bersihkan sisa thermal paste lama di permukaan CPU dan heatsink dengan alkohol dan tisu sampai bersih mengkilap.</li>
            <li style={{ marginBottom: '8px' }}>Teteskan thermal paste baru seukuran biji kacang (atau metode silang X) di tengah CPU.</li>
            <li style={{ marginBottom: '8px' }}>Pasang kembali pendingin dengan mengencangkan sekrup secara silang agar tekanan merata.</li>
          </ol>
        </>
      )
    },
    {
      id: 'debu',
      title: 'Bersihkan Debu Tanpa Bongkar',
      desc: 'Gunakan metode tekanan udara terkendali untuk membersihkan heatsink tanpa membatalkan garansi perangkat.',
      category: 'Kebersihan',
      readTime: '5 Menit Membaca',
      difficulty: 'MUDAH',
      tags: ['Hardware', 'Easy'],
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
        </svg>
      ),
      content: (
        <>
          <p style={{ marginBottom: '15px' }}>Debu yang menumpuk di dalam laptop atau PC dapat menghambat aliran udara, menyebabkan suhu meningkat tajam, dan membuat kipas berputar lebih bising. Anda bisa membersihkannya tanpa harus membongkar casing utama.</p>
          <h4>Alat yang dibutuhkan:</h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li>Compressed Air Can (Udara bertekanan dalam kaleng) atau blower mini</li>
            <li>Kuas kecil berbulu lembut</li>
            <li>Masker (agar tidak menghirup debu)</li>
          </ul>
          <h4>Langkah-langkah:</h4>
          <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
            <li style={{ marginBottom: '8px' }}>Matikan perangkat sepenuhnya dan cabut charger/kabel daya.</li>
            <li style={{ marginBottom: '8px' }}>Cari lubang pembuangan udara (exhaust) dan lubang masuk udara (intake) pada perangkat Anda.</li>
            <li style={{ marginBottom: '8px' }}>Gunakan tusuk gigi secara perlahan untuk menahan bilah kipas agar tidak berputar secara berlebihan saat disemprot angin (putaran berlebih bisa merusak motor kipas).</li>
            <li style={{ marginBottom: '8px' }}>Semprotkan compressed air dengan durasi pendek (1-2 detik) ke lubang ventilasi untuk mengeluarkan debu.</li>
            <li style={{ marginBottom: '8px' }}>Gunakan kuas untuk membersihkan sisa debu yang keluar di sekitar lubang ventilasi.</li>
          </ol>
        </>
      )
    },
    {
      id: 'baterai',
      title: 'Tips Hemat Baterai Laptop',
      desc: 'Kalibrasi siklus pengisian daya dan manajemen voltase latar belakang untuk memperpanjang usia sel lithium-ion.',
      category: 'Baterai',
      readTime: '8 Menit Membaca',
      difficulty: 'OPTIMASI',
      tags: ['Battery', 'Optimization'],
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path>
          <line x1="23" y1="13" x2="23" y2="11"></line>
          <line x1="10" y1="6" x2="10" y2="18"></line>
          <line x1="14" y1="12" x2="6" y2="12"></line>
        </svg>
      ),
      content: (
        <>
          <p style={{ marginBottom: '15px' }}>Kesehatan baterai (battery health) lithium-ion menurun seiring waktu dan jumlah siklus pengisian daya. Namun, dengan beberapa konfigurasi perangkat lunak dan kebiasaan pengisian yang tepat, Anda bisa menjaga kapasitas maksimalnya lebih lama.</p>
          <h4>Langkah & Rekomendasi:</h4>
          <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Atur Batas Pengisian:</strong> Jika laptop Anda mendukung, aktifkan fitur pembatasan pengisian daya hingga 80% (misalnya lewat ASUS Battery Health Charging, Lenovo Vantage, atau HP Power Manager) jika sering dicolok ke listrik.</li>
            <li style={{ marginBottom: '8px' }}><strong>Hindari Suhu Ekstrim:</strong> Jangan gunakan laptop di atas kasur atau permukaan empuk karena menghalangi pembuangan panas. Panas berlebih adalah musuh utama sel baterai.</li>
            <li style={{ marginBottom: '8px' }}><strong>Kalibrasi Baterai Berkala:</strong> Setiap 2-3 bulan, kosongkan baterai hingga 5% lalu charge penuh tanpa gangguan sampai 100% saat laptop mati untuk mereset indikator baterai OS.</li>
            <li style={{ marginBottom: '8px' }}><strong>Kurangi Kecerahan Layar:</strong> Layar adalah komponen paling rakus daya. Kurangi kecerahan ke tingkat yang nyaman dan gunakan mode gelap (Dark Mode).</li>
          </ol>
        </>
      )
    },
    {
      id: 'layar',
      title: 'Panduan Perawatan Layar LCD',
      desc: 'Cara membersihkan noda dan menjaga kualitas warna layar panel IPS, OLED, atau TN Anda agar tetap jernih.',
      category: 'Layar',
      readTime: '6 Menit Membaca',
      difficulty: 'MUDAH',
      tags: ['Screen', 'Maintenance'],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      content: (
        <>
          <p style={{ marginBottom: '15px' }}>Layar monitor atau laptop sangat sensitif terhadap tekanan dan cairan kimia keras. Membersihkan layar dengan cara yang salah bisa mengakibatkan goresan permanen atau kerusakan pada lapisan anti-glare.</p>
          <h4>Alat yang aman digunakan:</h4>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li>Kain microfiber berkualitas tinggi (lembut dan bebas serat)</li>
            <li>Cairan khusus pembersih layar (atau air suling/distilled water)</li>
            <li>TIDAK BOLEH menggunakan alkohol konsentrasi tinggi, aseton, atau pembersih kaca jendela</li>
          </ul>
          <h4>Langkah-langkah:</h4>
          <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
            <li style={{ marginBottom: '8px' }}>Matikan layar dan cabut kabel power. Layar yang gelap mempermudah Anda melihat debu dan noda sidik jari.</li>
            <li style={{ marginBottom: '8px' }}>Seka layar dengan kain microfiber kering secara perlahan dalam gerakan satu arah (jangan memutar atau menekan terlalu keras).</li>
            <li style={{ marginBottom: '8px' }}>Jika noda membandel, semprotkan sedikit cairan pembersih layar ke kain microfiber (JANGAN langsung disemprotkan ke layar).</li>
            <li style={{ marginBottom: '8px' }}>Usap bagian yang bernoda dengan kain lembab tersebut, lalu keringkan dengan bagian kain yang masih kering.</li>
            <li style={{ marginBottom: '8px' }}>Biarkan layar benar-benar kering sebelum dinyalakan kembali.</li>
          </ol>
        </>
      )
    }
  ];

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

  // Filter guides based on search query and active category filter
  const filteredGuides = guidesData.filter((guide) => {
    const matchesCategory = activeFilter === 'Semua' || guide.category === activeFilter;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          guide.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <div className="guide-notif-container" style={{ position: 'relative' }}>
          <button className="btn-icon-guide" onClick={() => setShowNotifications(!showNotifications)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {notifications.some(n => !n.read) && <span className="notification-badge" style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '2px solid var(--white)'
            }} />}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '280px',
              backgroundColor: 'var(--white)',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid var(--border-light)',
              zIndex: 100,
              marginTop: '8px',
              padding: '12px',
              animation: 'slideUp 0.2s ease-out',
              textAlign: 'left'
            }}>
              <div className="notif-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ fontWeight: '800', fontSize: '13px', color: 'var(--text-dark)' }}>Notifikasi</span>
                <button 
                  onClick={() => {
                    setNotifications(notifications.map(n => ({ ...n, read: true })));
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '11px',
                    color: 'var(--accent-blue)',
                    cursor: 'pointer',
                    fontWeight: '700'
                  }}
                >
                  Tandai semua dibaca
                </button>
              </div>
              <div className="notif-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: n.read ? 'transparent' : 'var(--bg-light)',
                    fontSize: '12px',
                    borderLeft: `3px solid ${n.type === 'warning' ? '#f59e0b' : n.type === 'success' ? '#10b981' : '#3b82f6'}`
                  }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-dark)', marginBottom: '2px' }}>{n.title}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '11px', lineHeight: '1.4' }}>{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
        <input 
          type="text" 
          placeholder="Cari panduan teknis..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="guide-filters">
        {filters.map((filter, idx) => (
          <button 
            key={idx} 
            className={`filter-pill-guide ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Cards Container */}
      <div className="guide-cards-container">
        {filteredGuides.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-light)', fontSize: '14px', backgroundColor: 'var(--white)', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            Tidak ada panduan yang sesuai dengan pencarian atau filter Anda.
          </div>
        ) : (
          filteredGuides.map((guide) => {
            // Render featured card if it's marked as featured and we're looking at all or there is a featured one
            if (guide.featured && activeFilter === 'Semua') {
              return (
                <div key={guide.id} className="guide-card featured-card">
                  <div className="featured-image">
                    <img src={guide.image} alt={guide.title} />
                  </div>
                  <div className="featured-content">
                    <div className="tag-advanced">{guide.difficulty}</div>
                    <h4>{guide.title}</h4>
                    <p>{guide.desc}</p>
                    <div className="featured-footer">
                      <span className="read-time">{guide.readTime}</span>
                      <button className="btn-read-more" onClick={() => setSelectedGuide(guide)}>
                        Baca Selengkapnya 
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Render standard card for others
            return (
              <div key={guide.id} className="guide-card standard-card" onClick={() => setSelectedGuide(guide)} style={{ cursor: 'pointer' }}>
                <div className="standard-icon-box">
                  {guide.icon ? guide.icon : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  )}
                </div>
                <h4>{guide.title}</h4>
                <p>{guide.desc}</p>
                <div className="card-tags">
                  {guide.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag">{tag}</span>
                  ))}
                  <span className="tag" style={{ backgroundColor: 'var(--bg-light)', color: 'var(--accent-blue)', fontWeight: 800 }}>{guide.difficulty}</span>
                </div>
              </div>
            );
          })
        )}

        {/* Diagnosis Banner */}
        <div className="diagnosa-banner">
          <h4>Diagnosa Mandiri</h4>
          <p>Butuh bantuan teknis lebih lanjut? Gunakan alat diagnosa otomatis kami.</p>
          <button className="btn-diagnosa" onClick={startHardwareScan}>Mulai Scan Hardware</button>
        </div>

      </div>

      {/* Modal Detail Guide */}
      {selectedGuide && (
        <div className="modal-overlay fade-in" onClick={() => setSelectedGuide(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{selectedGuide.title}</h3>
              <button className="btn-close" onClick={() => setSelectedGuide(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body" style={{ padding: '0 20px 20px', lineHeight: '1.6', maxHeight: '70vh', overflowY: 'auto' }}>
              {selectedGuide.image && (
                <img 
                  src={selectedGuide.image} 
                  alt={selectedGuide.title} 
                  style={{ width: '100%', borderRadius: '8px', marginBottom: '15px', maxHeight: '250px', objectFit: 'cover' }} 
                />
              )}
              <p style={{ marginBottom: '15px', fontWeight: 600, color: 'var(--text-dark)' }}>{selectedGuide.desc}</p>
              {selectedGuide.content}
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
