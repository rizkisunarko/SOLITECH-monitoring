import React from 'react';
import '../styles/TaskDetail.css';

const TaskDetail = ({ task, onBack }) => {
  // Fallback for missing task prop
  if (!task) return null;

  // Data dinamis berdasarkan ID tugas
  const getTaskData = (id) => {
    switch(id) {
      case 1: // Thermal Paste
        return {
          priorityBadge: "PRIORITAS SEDANG",
          subtitle: "Server Node: SRV-PRX-04",
          stat1Label: "TERAKHIR DIGANTI",
          stat1Value: "18 Bulan Lalu",
          stat2Label: "SUHU SAAT INI",
          stat2Value: "84°C (Puncak)",
          stat2Class: "text-warning",
          desc: "Peningkatan suhu pada CPU Core 1-4 menunjukkan degradasi konduktivitas termal. Disarankan untuk melakukan pembersihan total dan aplikasi ulang material antarmuka termal guna mencegah thermal throttling pada beban kerja tinggi.",
          steps: [
            { id: 1, title: "Shutdown & Disconnect", desc: "Matikan daya total dan cabut kabel power.", status: "active" },
            { id: 2, title: "Pembersihan Heatsink", desc: "Gunakan Isopropyl Alcohol 90%+ dan kain microfiber.", status: "active" },
            { id: 3, title: "Aplikasi Thermal Paste", desc: "Gunakan metode 'Pea-size' di tengah IHS.", status: "inactive" }
          ],
          materials: [
            { 
              title: "Noctua NT-H2", 
              desc: "Performa Premium", 
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31"></path><path d="M14 9.3V1.99"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path>
                </svg>
              )
            },
            { 
              title: "Arctic MX-6", 
              desc: "Daya Tahan Tinggi", 
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path><path d="m4.93 10.93 14.14 2.14"></path><path d="m4.93 13.07 14.14-2.14"></path><path d="m7.76 4.76 8.48 14.48"></path><path d="m7.76 19.24 8.48-14.48"></path>
                </svg>
              )
            }
          ]
        };
      case 2: // Debu Fan
        return {
          priorityBadge: "SELESAI",
          subtitle: "Rak Server: Rack-A 02",
          stat1Label: "JADWAL BERIKUTNYA",
          stat1Value: "3 Bulan Lagi",
          stat2Label: "STATUS",
          stat2Value: "Optimal",
          stat2Class: "text-success",
          desc: "Sirkulasi udara sempat terhambat oleh penumpukan debu pada kipas asupan udara. Pembersihan telah mengembalikan aliran udara ke tingkat optimal sehingga temperatur stabil.",
          steps: [
            { id: 1, title: "Inspeksi Kipas", desc: "Periksa tingkat debu pada bilah kipas dan ventilasi.", status: "active" },
            { id: 2, title: "Vakum & Sikat", desc: "Gunakan sikat anti-statis dan vakum mini dengan hati-hati.", status: "active" },
            { id: 3, title: "Uji Putaran", desc: "Nyalakan daya dan pastikan kipas berputar tanpa hambatan atau suara bising.", status: "active" }
          ],
          materials: []
        };
      case 3: // Cek Baterai
        return {
          priorityBadge: "TERJADWAL",
          subtitle: "UPS Unit: UPS-Lt3-Main",
          stat1Label: "KAPASITAS SISA",
          stat1Value: "82%",
          stat2Label: "KONDISI",
          stat2Value: "Baik (Good)",
          stat2Class: "text-primary",
          desc: "Baterai UPS telah melewati siklus 500 kali pengisian daya. Perlu dilakukan kalibrasi ulang untuk memastikan persentase yang ditampilkan pada layar manajemen sesuai dengan kapasitas aktual sel baterai.",
          steps: [
            { id: 1, title: "Discharge Penuh", desc: "Biarkan UPS menyuplai daya ke beban uji hingga 10%.", status: "inactive" },
            { id: 2, title: "Charge Penuh 100%", desc: "Isi kembali tanpa henti selama 12 jam berturut-turut.", status: "inactive" },
            { id: 3, title: "Reset Indikator BMS", desc: "Jalankan perintah kalibrasi via perangkat lunak manajemen jarak jauh.", status: "inactive" }
          ],
          materials: []
        };
      default: // Tugas Baru / Lainnya
        return {
          priorityBadge: task.badgeText || "TUGAS BARU",
          subtitle: "Sistem Umum",
          stat1Label: "DITAMBAHKAN PADA",
          stat1Value: "Hari Ini",
          stat2Label: "STATUS",
          stat2Value: "Menunggu",
          stat2Class: "text-primary",
          desc: task.desc || "Tugas ini ditambahkan secara manual oleh pengguna. Belum ada deskripsi analisis mendalam yang diunggah oleh sistem.",
          steps: [
            { id: 1, title: "Tinjau Tugas", desc: "Pelajari rincian tugas yang diperlukan.", status: "inactive" },
            { id: 2, title: "Eksekusi", desc: "Jalankan langkah perbaikan atau pemeliharaan.", status: "inactive" }
          ],
          materials: []
        };
    }
  };

  const initialData = getTaskData(task.id);
  const [localSteps, setLocalSteps] = React.useState(initialData.steps);

  const handleStepClick = (stepId) => {
    setLocalSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId 
          ? { ...step, status: step.status === 'active' ? 'inactive' : 'active' }
          : step
      )
    );
  };

  const data = { ...initialData, steps: localSteps };

  return (
    <div className="task-detail-container slide-in-right">
      {/* App Bar */}
      <div className="task-detail-header">
        <button className="btn-icon-transparent" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h2>Detail Tugas</h2>
        <button className="btn-icon-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>

      <div className="task-detail-content">
        {/* Main Info Card */}
        <div className="detail-main-card">
          <div className="detail-card-top">
            <div className="detail-title-area">
              <span className="badge-priority">{data.priorityBadge}</span>
              <h1 className="detail-title">{task.title}</h1>
              <p className="detail-subtitle">{data.subtitle}</p>
            </div>
            <div className="detail-icon-bg">
              <div className="detail-icon-box">
                {task.icon ? task.icon : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 8 6 11 10 6"></polyline>
                    <line x1="14" y1="8" x2="21" y2="8"></line>
                    <polyline points="3 16 6 19 10 14"></polyline>
                    <line x1="14" y1="16" x2="21" y2="16"></line>
                  </svg>
                )}
              </div>
            </div>
          </div>
          
          <div className="detail-stats-row">
            <div className="detail-stat-box">
              <span className="stat-label">{data.stat1Label}</span>
              <span className="stat-value">{data.stat1Value}</span>
            </div>
            <div className="detail-stat-box">
              <span className="stat-label">{data.stat2Label}</span>
              <span className={`stat-value ${data.stat2Class}`}>{data.stat2Value}</span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="section-container">
          <h3 className="section-title">DESKRIPSI & ANALISIS</h3>
          <div className="desc-box">
            <p>{data.desc}</p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="section-container">
          <h3 className="section-title">LANGKAH PENGERJAAN</h3>
          <div className="steps-list">
            {data.steps.map((step) => (
              <div 
                key={step.id} 
                className="step-item" 
                onClick={() => handleStepClick(step.id)}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div className={`step-number ${step.status}`}>{step.id}</div>
                <div className="step-content">
                  <h4 className={step.status === 'inactive' ? 'text-inactive' : ''} style={{ transition: 'color 0.2s' }}>{step.title}</h4>
                  <p className={step.status === 'inactive' ? 'text-inactive' : ''} style={{ transition: 'color 0.2s' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Section (Only if available) */}
        {data.materials && data.materials.length > 0 && (
          <div className="section-container">
            <h3 className="section-title">REKOMENDASI MATERIAL</h3>
            <div className="materials-scroller">
              {data.materials.map((mat, index) => (
                <div key={index} className="material-card">
                  <div className="material-icon">
                    {mat.icon}
                  </div>
                  <div className="material-info">
                    <h4>{mat.title}</h4>
                    <p>{mat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action */}
      <div className="task-detail-bottom">
        <button className="btn-complete-task">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Selesaikan Tugas
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
