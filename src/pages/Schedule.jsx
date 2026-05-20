import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDetail from './TaskDetail';
import '../styles/Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedFullDate, setSelectedFullDate] = useState(new Date(2024, 2, 13)); // Maret = Bulan ke-2 di JS (0-indexed)
  const [activeDate, setActiveDate] = useState(13);
  
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Ganti Thermal Paste',
      badgeText: 'DEADLINE: 15 MAR',
      type: 'warning',
      desc: 'Performa CPU mulai menurun pada suhu tinggi.',
      date: 15,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 2 4 4"/>
          <path d="m17 7 3-3"/>
          <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/>
          <path d="m9 11 4 4"/>
          <path d="m5 19-3 3"/>
          <path d="m14 4 6 6"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Pembersihan Debu Fan',
      badgeText: 'SELESAI',
      type: 'success',
      desc: 'Sirkulasi udara optimal kembali.',
      date: 13,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Cek Kesehatan Baterai',
      badgeText: 'TERJADWAL: 20 APR',
      type: 'primary',
      desc: 'Kalibrasi rutin siklus pengisian daya.',
      date: 13,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="4" width="10" height="16" rx="2" ry="2"></rect>
          <line x1="10" y1="2" x2="14" y2="2"></line>
          <line x1="12" y1="9" x2="12" y2="15"></line>
          <line x1="9" y1="12" x2="15" y2="12"></line>
        </svg>
      )
    }
  ]);

  // Format bulan untuk header (contoh: "Maret 2024")
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const displayMonth = `${monthNames[selectedFullDate.getMonth()]} ${selectedFullDate.getFullYear()}`;

  // Generate 7 days centered around selectedFullDate
  const generateDates = () => {
    const days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
    let result = [];
    for (let i = -3; i <= 3; i++) {
      let d = new Date(selectedFullDate);
      d.setDate(d.getDate() + i);
      
      // Deteksi hari yang punya event dari task
      // Simplified: event true if any task date matching d.getDate() and we're in the same general month
      const hasEvent = tasks.some(t => t.date === d.getDate() && selectedFullDate.getMonth() === 2); // 2 is March
      
      result.push({
        day: days[d.getDay()],
        date: d.getDate(),
        fullDateObj: d,
        hasEvent: hasEvent
      });
    }
    return result;
  };
  
  const dates = generateDates();

  const handleDateChange = (e) => {
    const d = new Date(e.target.value);
    if (!isNaN(d.getTime())) {
      setSelectedFullDate(d);
      setActiveDate(d.getDate());
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState({ title: '', desc: '' });
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTaskInput({ title: '', desc: '' });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskInput.title) return;

    const newTask = {
      id: Date.now(),
      title: newTaskInput.title,
      badgeText: 'BARU DITAMBAHKAN',
      type: 'primary',
      desc: newTaskInput.desc || 'Tugas pemeliharaan tambahan.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    };
    
    // Add to the beginning of the list
    setTasks([{...newTask, date: activeDate}, ...tasks]);
    handleCloseModal();
  };

  // Filter tasks based on selected date
  const filteredTasks = tasks.filter(task => task.date === activeDate);

  return (
    <div className="schedule-container fade-in">
      {/* Header */}
      <div className="schedule-header">
        <div className="schedule-title-area">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
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
          <h2>Jadwal Perawatan</h2>
        </div>
        <button className="btn-icon-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
      </div>

      {/* Calendar Section */}
      <div className="calendar-section">
        <div className="calendar-header">
          <h3>{displayMonth}</h3>
          
          {/* Calendar Picker Native Input */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" style={{ pointerEvents: 'none' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <input 
              type="date" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
              onChange={handleDateChange}
            />
          </div>
        </div>
        
        <div className="date-scroller">
          {dates.map((item, idx) => (
            <div 
              key={idx} 
              className={`date-item ${activeDate === item.date ? 'active' : ''} ${item.hasEvent ? 'has-event' : ''}`}
              onClick={() => {
                setActiveDate(item.date);
                setSelectedFullDate(item.fullDateObj);
              }}
            >
              <span className="day">{item.day}</span>
              <span className="date">{item.date}</span>
              {item.hasEvent && <span className="event-dot"></span>}
            </div>
          ))}
        </div>
      </div>

      {/* Agenda Section */}
      <div className="agenda-section">
        <div className="agenda-header">
          <div>
            <div className="agenda-subtitle">AGENDA MENDATANG</div>
            <h3 className="agenda-title">Daftar Tugas</h3>
          </div>
          <button className="btn-add-task" onClick={handleOpenModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Tugas
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div style={{textAlign: 'center', padding: '20px', color: '#6c757d', fontSize: '14px'}}>
              Tidak ada agenda di tanggal ini.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-card task-${task.type} fade-in`}
                onClick={() => setSelectedTask(task)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`task-icon-box box-${task.type}`}>
                  {task.icon}
                </div>
                <div className="task-content">
                  <div className="task-title-row">
                    <h4>{task.title}</h4>
                    <span className={`task-badge badge-${task.type}`}>{task.badgeText}</span>
                  </div>
                  <p>{task.desc}</p>
                </div>
                <div className="task-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tips Card */}
        <div className="tips-card">
          <div className="tips-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="9" y1="18" x2="15" y2="18"></line>
              <line x1="10" y1="22" x2="14" y2="22"></line>
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.84 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path>
            </svg>
            TIPS PERAWATAN
          </div>
          <h3>Bersihkan kipas minimal setiap 6 bulan untuk mencegah overheating.</h3>
          <button className="btn-tips" onClick={() => navigate('/guide')}>Pelajari Selengkapnya</button>
          
          <svg className="tips-bg-icon" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0 2c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" opacity="0.1"/>
            <path d="M10.88 4.79C10.5 3.32 9.09 2.5 7.63 2.87c-1.46.38-2.26 1.78-1.89 3.25L7.26 12l-.9.24C4.89 12.63 4.09 14.03 4.47 15.49c.38 1.46 1.79 2.27 3.26 1.89l1.52-.41L10.88 4.79zm5.35-1.07l-1.52.41 1.63 12.18c.38 1.47 1.79 2.28 3.26 1.89 1.46-.38 2.27-1.79 1.89-3.26l-1.52-.4-1.63-12.19c-.37-1.46-1.78-2.27-3.24-1.89-1.47.38-2.27 1.79-1.89 3.26z" opacity="0.1"/>
          </svg>
        </div>
      </div>

      {/* Modal Tambah Tugas */}
      {isModalOpen && (
        <div className="modal-overlay fade-in" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Tugas Baru</h3>
              <button className="btn-close" onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddTask} className="modal-form">
              <div className="form-group">
                <label className="form-label">Nama Tugas</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Contoh: Ganti RAM" 
                  value={newTaskInput.title}
                  onChange={(e) => setNewTaskInput({...newTaskInput, title: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Deskripsi Tambahan</label>
                <textarea 
                  className="input-field" 
                  rows="3" 
                  placeholder="Keterangan tugas..."
                  value={newTaskInput.desc}
                  onChange={(e) => setNewTaskInput({...newTaskInput, desc: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">Simpan Tugas</button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Tugas Overlay */}
      {selectedTask && (
        <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default Schedule;
