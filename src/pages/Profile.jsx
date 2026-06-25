import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Profile.css';

const Profile = ({ user, onUpdateProfile, onSettingsClick }) => {
  const { t, language } = useLanguage();
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Budi',
    email: user?.email || 'budi@solitech.com',
    avatar: user?.avatar || 'https://i.pinimg.com/736x/85/38/f4/8538f477fbcdd04031bbcdd7f3dba6be.jpg'
  });

  const [showDevicesModal, setShowDevicesModal] = useState(false);
  const [tempUnit, setTempUnit] = useState(localStorage.getItem('tempUnit') || 'C');

  // Dynamic Connected Devices State
  const [devices, setDevices] = useState([
    { id: 1, name: 'Workstation-XP1', type: 'pc', status: 'connected', ip: '192.168.1.10', location: 'Jakarta', time: 'Active' },
    { id: 2, name: 'MacBook-Pro-Adit', type: 'mac', status: 'offline', ip: '192.168.1.15', location: 'Bandung', time: '2 ' + t('profile.ago') },
    { id: 3, name: 'iPhone-15-Budi', type: 'mobile', status: 'connected', ip: '192.168.1.12', location: 'Jakarta', time: 'Active' },
    { id: 4, name: 'iPad-Air-Design', type: 'tablet', status: 'offline', ip: '192.168.1.18', location: 'Singapore', time: '1 ' + (language === 'id' ? 'Hari ' : 'Day ') + t('profile.ago') },
    { id: 5, name: 'Ubuntu-Server-DB', type: 'server', status: 'connected', ip: '10.0.2.14', location: 'Jakarta Cloud', time: 'Active' }
  ]);

  // Modal and Form States
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [newDeviceForm, setNewDeviceForm] = useState({
    name: '',
    type: 'pc',
    ip: '',
    location: '',
    status: 'connected'
  });

  const [selectedDeviceForSettings, setSelectedDeviceForSettings] = useState(null);
  const [deviceSettingsForm, setDeviceSettingsForm] = useState({
    realtime: true,
    alerts: true,
    interval: '2'
  });

  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showNotifPrefModal, setShowNotifPrefModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Profil Diperbarui', message: 'Informasi profil Anda berhasil diperbarui.', type: 'success', read: false },
    { id: 2, title: 'Perangkat Baru', message: 'iPhone-15-Budi telah terhubung ke jaringan.', type: 'info', read: false },
    { id: 3, title: 'Keamanan Akun', message: 'Otentikasi dua faktor (2FA) aktif.', type: 'success', read: true }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    encryptLogs: true,
    shareData: false
  });

  const [notifSettings, setNotifSettings] = useState({
    tempAlert: true,
    maintAlert: true,
    monthlyReport: false
  });

  useEffect(() => {
    const handleTempChange = () => {
      setTempUnit(localStorage.getItem('tempUnit') || 'C');
    };
    window.addEventListener('tempUnitChanged', handleTempChange);
    return () => window.removeEventListener('tempUnitChanged', handleTempChange);
  }, []);

  const baseAvgTemp = 42;
  const displayAvgTemp = tempUnit === 'F' ? Math.round(baseAvgTemp * 9 / 5 + 32) : baseAvgTemp;

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  const handleEditClick = () => {
    setEditForm(profileData);
    setIsEditing(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData(editForm);
    setIsEditing(false);
    if (onUpdateProfile) {
      onUpdateProfile(editForm);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Device Action Handlers
  const handleAddDeviceSubmit = (e) => {
    e.preventDefault();
    const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
    const newDevice = {
      id: newId,
      name: newDeviceForm.name,
      type: newDeviceForm.type,
      status: newDeviceForm.status,
      ip: newDeviceForm.ip,
      location: newDeviceForm.location,
      time: newDeviceForm.status === 'connected' ? 'Active' : 'Just now'
    };
    setDevices([...devices, newDevice]);
    setShowAddDeviceModal(false);
    setNewDeviceForm({
      name: '',
      type: 'pc',
      ip: '',
      location: '',
      status: 'connected'
    });
  };

  const handleSaveDeviceSettings = (e) => {
    e.preventDefault();
    setSelectedDeviceForSettings(null);
  };

  const handleDisconnectDevice = (deviceId) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    setSelectedDeviceForSettings(null);
  };

  const handleDownloadLog = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Tanggal,Aktivitas,Perangkat,Status\n"
      + "2026-06-25 10:45,Pembaruan Firmware Berhasil,Workstation-XP1,Sukses\n"
      + "2026-06-24 16:30,Peringatan Suhu Tinggi (82°C),Workstation-XP1,Peringatan\n"
      + "2026-06-23 09:15,Koneksi Perangkat Baru,iPhone-15-Budi,Sukses\n"
      + "2026-06-22 14:00,Kalibrasi Baterai Selesai,MacBook-Pro-Adit,Sukses\n";
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "solitech_activity_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="profile-container fade-in">

      {/* ========================================== */}
      {/* EDIT PROFILE MODAL */}
      {/* ========================================== */}
      {isEditing && (
        <div className="profile-edit-modal-overlay">
          <div className="profile-edit-modal fade-in">
            <h3>{t('profile.modalEditTitle')}</h3>
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label>{t('profile.modalName')}</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('profile.modalEmail')}</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('profile.modalAvatar')}</label>
                <div className="avatar-upload-container">
                  <div className="avatar-preview-wrapper">
                    <img src={editForm.avatar} alt="Avatar Preview" className="avatar-preview-img" />
                  </div>
                  <label htmlFor="avatar-file-input" className="avatar-upload-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>{t('profile.uploadBtn')}</span>
                  </label>
                  <input
                    id="avatar-file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditForm({ ...editForm, avatar: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCancelEdit}>{t('profile.modalCancel')}</button>
                <button type="submit" className="btn-save">{t('profile.modalSave')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* CONNECTED DEVICES DETAIL MODAL */}
      {/* ========================================== */}
      {showDevicesModal && (
        <div className="profile-edit-modal-overlay" onClick={() => setShowDevicesModal(false)}>
          <div className="devices-detail-modal fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="devices-modal-header">
              <div className="header-text">
                <h3>{t('profile.devicesModalTitle')}</h3>
                <p>{t('profile.devicesModalDesc')}</p>
              </div>
              <button className="btn-close-devices" onClick={() => setShowDevicesModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="devices-modal-list">
              {devices.map(dev => (
                <div key={dev.id} className={`device-detail-card border-${dev.status === 'connected' ? 'green' : 'gray'}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="device-detail-main">
                    <div className="device-detail-icon-wrapper">
                      {dev.type === 'pc' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                      )}
                      {dev.type === 'mac' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="12" rx="2" ry="2"></rect><path d="M2 16h20"></path><path d="M6 20h12"></path></svg>
                      )}
                      {dev.type === 'mobile' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      )}
                      {dev.type === 'tablet' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      )}
                      {dev.type === 'server' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                      )}
                    </div>
                    <div className="device-detail-info">
                      <h4>{dev.name}</h4>
                      <div className="device-meta-row">
                        <span className="device-ip">{dev.ip}</span>
                        <span className="device-divider">•</span>
                        <span className="device-location">{dev.location}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="device-detail-status">
                      <span className={`status-pill ${dev.status}`}>
                        <span className={`status-dot-blink ${dev.status}`}></span>
                        {dev.status === 'connected' ? t('profile.connected') : t('profile.offline')}
                      </span>
                      <span className="sync-time-text">{dev.status === 'connected' ? (language === 'id' ? 'Aktif' : 'Active') : `${t('profile.syncTime')}: ${dev.time}`}</span>
                    </div>
                    <button 
                      className="btn-device-settings" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDeviceForSettings(dev);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-light)',
                        padding: '6px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--bg-light)'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="devices-modal-footer">
              <button className="btn-primary-devices" onClick={() => setShowDevicesModal(false)}>{language === 'id' ? 'Selesai' : 'Done'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MOBILE VIEW */}
      {/* ========================================== */}
      <div className="profile-mobile-view">
        {/* Header */}
        <div className="profile-header-top">
          <div className="profile-header-left">
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
            <h2 className="profile-main-title">Monitoring<br />Hardware</h2>
          </div>
          <div className="profile-header-actions">
            <button className="btn-icon-profile" onClick={onSettingsClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            <div className="profile-notif-container" style={{ position: 'relative' }}>
              <button className="btn-icon-profile" onClick={() => setShowNotifications(!showNotifications)}>
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
        </div>

        <div className="profile-main-area-mobile">
          {/* Profile Info Section */}
          <div className="profile-info-section">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                <img src={profileData.avatar} alt="Profile" className="avatar-img" />
              </div>
              <button className="btn-edit-avatar" onClick={handleEditClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </div>
            <h2 className="profile-name">{profileData.name}</h2>
            <p className="profile-email">{profileData.email}</p>
            <button className="btn-edit-profile" onClick={handleEditClick}>{t('profile.editProfile')}</button>
          </div>

          {/* Ringkasan Kesehatan */}
          <div className="profile-section">
            <div className="section-header">
              <span className="section-label">{t('profile.healthSummary')}</span>
              <a href="#live-update" className="section-link">{t('profile.liveUpdate')}</a>
            </div>

            <div className="health-cards-row">
              <div className="health-card green-border">
                <span className="health-label">RATA-RATA<br />SUHU</span>
                <div className="health-value">
                  <strong>{displayAvgTemp}°{tempUnit}</strong>
                  <span className="health-badge optimal">OPTIMAL</span>
                </div>
              </div>
              <div className="health-card orange-border">
                <span className="health-label">PENGGUNAAN<br />RAM</span>
                <div className="health-value">
                  <strong>78%</strong>
                  <span className="health-badge tinggi">TINGGI</span>
                </div>
              </div>
            </div>

            <div className="uptime-card">
              <div className="uptime-left">
                <div className="uptime-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><line x1="12" y1="12" x2="16" y2="8"></line></svg>
                </div>
                <div className="uptime-text">
                  <span className="health-label">UPTIME SISTEM</span>
                  <strong>14 Hari 2 Jam</strong>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>

          {/* Perangkat Terhubung */}
          <div className="profile-section">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="section-label" style={{ margin: 0 }}>{t('profile.connectedDevices')}</span>
              <button onClick={() => setShowDevicesModal(true)} className="section-link-btn">{t('profile.seeAll')}</button>
            </div>

            <div className="device-list">
              {devices.slice(0, 3).map(dev => (
                <div key={dev.id} className="device-card">
                  <div className="device-icon">
                    {dev.type === 'pc' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    )}
                    {dev.type === 'mac' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="12" rx="2" ry="2"></rect><path d="M2 16h20"></path><path d="M6 20h12"></path></svg>
                    )}
                    {dev.type === 'mobile' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    )}
                    {dev.type === 'tablet' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                    )}
                    {dev.type === 'server' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                    )}
                  </div>
                  <div className="device-info">
                    <h4>{dev.name}</h4>
                    <p>
                      <span className={`dot dot-${dev.status === 'connected' ? 'green' : 'gray'}`}></span> 
                      {dev.status === 'connected' ? t('profile.connected') : t('profile.offline')} • {dev.location}
                    </p>
                  </div>
                  <button className="btn-device-settings" onClick={() => setSelectedDeviceForSettings(dev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  </button>
                </div>
              ))}

              <button className="btn-add-device" onClick={() => setShowAddDeviceModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                Tambah Perangkat
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="profile-bottom-actions">
            <button className="action-row" onClick={() => setShowSecurityModal(true)}>
              <div className="action-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>{t('profile.security')}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <button className="action-row action-logout" onClick={() => window.location.href = '/'}>
              <div className="action-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>{t('profile.logoutSess')}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* DESKTOP VIEW */}
      {/* ========================================== */}
      <div className="profile-desktop-view">
        <div className="d-profile-header">
          <h2>{t('profile.title')}</h2>
          <div className="d-header-actions">
            <button className="d-btn-icon" onClick={onSettingsClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
            <div className="profile-notif-container" style={{ position: 'relative' }}>
              <button className="d-btn-icon" onClick={() => setShowNotifications(!showNotifications)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <img src={profileData.avatar} alt="Avatar" className="d-mini-avatar" />
          </div>
        </div>

        <div className="d-profile-grid">
          {/* LEFT COLUMN */}
          <div className="d-grid-left">

            {/* Info Card */}
            <div className="d-info-card">
              <div className="d-info-avatar-col">
                <img src={profileData.avatar} alt="Profile" className="d-avatar-large" />
                <button className="d-btn-edit-profile" onClick={handleEditClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  {t('profile.editProfile')}
                </button>
              </div>
              <div className="d-info-details-col">
                <h1>{profileData.name}</h1>
                <p className="d-email">{profileData.email}</p>
                <div className="d-badges-row">
                  <span className="d-badge-platinum">{t('profile.platinum')}</span>
                  <span className="d-badge-verified">{t('profile.verified')}</span>
                </div>
              </div>
            </div>

            {/* Devices Section */}
            <div className="d-section-header">
              <h3>{t('profile.connectedDevices')}</h3>
              <button onClick={() => setShowDevicesModal(true)} className="d-see-all-btn">{t('profile.seeAll')}</button>
            </div>

            <div className="d-devices-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {devices.slice(0, 3).map(dev => (
                <div key={dev.id} className={`d-device-card border-${dev.status === 'connected' ? 'green' : 'gray'}`} style={{ flex: '1 1 180px', minWidth: '180px' }}>
                  <div className="d-device-card-inner">
                    <div className="d-device-icon">
                      {dev.type === 'pc' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                      )}
                      {dev.type === 'mac' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="12" rx="2" ry="2"></rect><path d="M2 16h20"></path><path d="M6 20h12"></path></svg>
                      )}
                      {dev.type === 'mobile' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      )}
                      {dev.type === 'tablet' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                      )}
                      {dev.type === 'server' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                      )}
                    </div>
                    <button className="d-device-settings" onClick={() => setSelectedDeviceForSettings(dev)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                  </div>
                  <div className="d-device-info">
                    <h4>{dev.name}</h4>
                    <p><span className={`dot dot-${dev.status === 'connected' ? 'green' : 'gray'}`}></span> {dev.status === 'connected' ? t('profile.connected') : t('profile.offline')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Card */}
            <div className="d-activity-card">
              <div className="d-activity-header">
                <div className="d-activity-title">
                  <h3>Aktivitas Terakhir</h3>
                  <p>Log aktivitas pemantauan perangkat Anda</p>
                </div>
                <button className="d-btn-download" onClick={handleDownloadLog}>Unduh Log (.csv)</button>
              </div>
              <div className="d-activity-list">
                <div className="d-activity-item">
                  <div className="d-activity-icon green-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="d-activity-text">
                    <h4>Pembaruan Firmware Berhasil</h4>
                    <p>Workstation-XP1 diperbarui ke v2.4.1</p>
                  </div>
                  <div className="d-activity-time">10:45 AM</div>
                </div>
                <div className="d-activity-item">
                  <div className="d-activity-icon orange-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  </div>
                  <div className="d-activity-text">
                    <h4>Peringatan Suhu Tinggi</h4>
                    <p>Sensor GPU Workstation-XP1 mencapai 82°C</p>
                  </div>
                  <div className="d-activity-time">Kemarin</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="d-grid-right">

            {/* Health Cards */}
            <div className="d-health-card">
              <div className="d-health-icon green-text"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg></div>
              <div className="d-health-data">
                <span className="d-health-label">SUHU RATA-RATA</span>
                <div className="d-health-val">
                  <strong>{displayAvgTemp}°{tempUnit}</strong>
                  <span className="d-health-badge optimal">OPTIMAL</span>
                </div>
              </div>
            </div>

            <div className="d-health-card">
              <div className="d-health-icon orange-text"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
              <div className="d-health-data">
                <span className="d-health-label">PENGGUNAAN RAM</span>
                <div className="d-health-val">
                  <strong>78%</strong>
                  <span className="d-health-badge tinggi">TINGGI</span>
                </div>
              </div>
            </div>

            <div className="d-health-card">
              <div className="d-health-icon blue-text"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
              <div className="d-health-data">
                <span className="d-health-label">WAKTU AKTIF SISTEM</span>
                <div className="d-health-val">
                  <strong>14 Hari 2 Jam</strong>
                </div>
              </div>
            </div>

            {/* Add Device */}
            <div className="d-add-device-card" onClick={() => setShowAddDeviceModal(true)} style={{ cursor: 'pointer' }}>
              <div className="d-add-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <p>Tambah Perangkat Baru</p>
            </div>

            {/* Quick Settings */}
            <div className="d-quick-settings">
              <span className="d-settings-label">PENGATURAN CEPAT</span>
              <div className="d-settings-list">
                <button className="d-setting-item" onClick={() => setShowSecurityModal(true)}>
                  <div className="d-setting-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <span>Keamanan & Privasi</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className="d-setting-item" onClick={() => setShowNotifPrefModal(true)}>
                  <div className="d-setting-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    <span>Preferensi Notifikasi</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <button className="d-setting-item" onClick={() => setShowSupportModal(true)}>
                  <div className="d-setting-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <span>Bantuan & Dukungan</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* ADD DEVICE MODAL */}
      {/* ========================================== */}
      {showAddDeviceModal && (
        <div className="profile-edit-modal-overlay" onClick={() => setShowAddDeviceModal(false)}>
          <div className="profile-edit-modal fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Tambah Perangkat Baru</h3>
              <button 
                onClick={() => setShowAddDeviceModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-lighter)', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleAddDeviceSubmit}>
              <div className="form-group">
                <label>Nama Perangkat</label>
                <input
                  type="text"
                  placeholder="Contoh: PC-Gaming-Ryzen"
                  value={newDeviceForm.name}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tipe Perangkat</label>
                <select
                  value={newDeviceForm.type}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-light)',
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--text-dark)',
                    outline: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <option value="pc">PC / Desktop</option>
                  <option value="mac">MacBook / Apple</option>
                  <option value="mobile">Smartphone / Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="server">Server</option>
                </select>
              </div>
              <div className="form-group">
                <label>Alamat IP</label>
                <input
                  type="text"
                  placeholder="Contoh: 192.168.1.100"
                  value={newDeviceForm.ip}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, ip: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Lokasi</label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta"
                  value={newDeviceForm.location}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newDeviceForm.status}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-light)',
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--text-dark)',
                    outline: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <option value="connected">Terhubung (Online)</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="modal-actions" style={{ marginTop: '20px' }}>
                <button type="button" className="btn-cancel" onClick={() => setShowAddDeviceModal(false)}>{t('profile.modalCancel')}</button>
                <button type="submit" className="btn-save" style={{ backgroundColor: 'var(--accent-blue)' }}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* DEVICE CONFIGURATION MODAL */}
      {/* ========================================== */}
      {selectedDeviceForSettings && (
        <div className="profile-edit-modal-overlay" onClick={() => setSelectedDeviceForSettings(null)}>
          <div className="profile-edit-modal fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Pengaturan Perangkat</h3>
              <button 
                onClick={() => setSelectedDeviceForSettings(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-lighter)', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-dark)' }}>{selectedDeviceForSettings.name}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)' }}>IP: {selectedDeviceForSettings.ip} • {selectedDeviceForSettings.location}</p>
            </div>
            
            <form onSubmit={handleSaveDeviceSettings}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontWeight: 700 }}>Monitor Real-Time</label>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-lighter)' }}>Pantau performa perangkat secara terus-menerus.</p>
                </div>
                <div className={`toggle-switch ${deviceSettingsForm.realtime ? 'active' : ''}`} onClick={() => setDeviceSettingsForm({...deviceSettingsForm, realtime: !deviceSettingsForm.realtime})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>
              
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontWeight: 700 }}>Kirim Peringatan</label>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-lighter)' }}>Beri tahu jika suhu atau memori kritis.</p>
                </div>
                <div className={`toggle-switch ${deviceSettingsForm.alerts ? 'active' : ''}`} onClick={() => setDeviceSettingsForm({...deviceSettingsForm, alerts: !deviceSettingsForm.alerts})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Interval Pemindaian (Detik)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={deviceSettingsForm.interval}
                  onChange={(e) => setDeviceSettingsForm({...deviceSettingsForm, interval: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-light)',
                    backgroundColor: 'var(--bg-light)',
                    color: 'var(--text-dark)',
                    outline: 'none',
                    fontWeight: 600
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button type="submit" className="btn-save" style={{ width: '100%' }}>Simpan Pengaturan</button>
                <button 
                  type="button" 
                  onClick={() => handleDisconnectDevice(selectedDeviceForSettings.id)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid #ef4444',
                    backgroundColor: 'transparent',
                    color: '#ef4444',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Putuskan Koneksi Perangkat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* KEAMANAN & PRIVASI MODAL */}
      {/* ========================================== */}
      {showSecurityModal && (
        <div className="profile-edit-modal-overlay" onClick={() => setShowSecurityModal(false)}>
          <div className="profile-edit-modal fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Keamanan & Privasi</h3>
              <button 
                onClick={() => setShowSecurityModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-lighter)', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-dark)' }}>Autentikasi Dua Faktor (2FA)</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Gunakan verifikasi tambahan saat login.</p>
                </div>
                <div className={`toggle-switch ${securitySettings.twoFactor ? 'active' : ''}`} onClick={() => setSecuritySettings({...securitySettings, twoFactor: !securitySettings.twoFactor})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-dark)' }}>Enkripsi Log Performa</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Enkripsi log performa lokal secara otomatis.</p>
                </div>
                <div className={`toggle-switch ${securitySettings.encryptLogs ? 'active' : ''}`} onClick={() => setSecuritySettings({...securitySettings, encryptLogs: !securitySettings.encryptLogs})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-dark)' }}>Berbagi Data Diagnostik</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Kirim data diagnostik anonim untuk pengembangan.</p>
                </div>
                <div className={`toggle-switch ${securitySettings.shareData ? 'active' : ''}`} onClick={() => setSecuritySettings({...securitySettings, shareData: !securitySettings.shareData})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowSecurityModal(false)}
              className="btn-save"
              style={{ width: '100%', marginTop: '24px' }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* NOTIFICATION PREFERENCES MODAL */}
      {/* ========================================== */}
      {showNotifPrefModal && (
        <div className="profile-edit-modal-overlay" onClick={() => setShowNotifPrefModal(false)}>
          <div className="profile-edit-modal fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Preferensi Notifikasi</h3>
              <button 
                onClick={() => setShowNotifPrefModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-lighter)', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-dark)' }}>Peringatan Suhu Tinggi</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Notifikasi saat suhu CPU melebihi batas wajar.</p>
                </div>
                <div className={`toggle-switch ${notifSettings.tempAlert ? 'active' : ''}`} onClick={() => setNotifSettings({...notifSettings, tempAlert: !notifSettings.tempAlert})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-dark)' }}>Pengingat Perawat Jaringan</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Kirim pengingat untuk jadwal pemeliharaan.</p>
                </div>
                <div className={`toggle-switch ${notifSettings.maintAlert ? 'active' : ''}`} onClick={() => setNotifSettings({...notifSettings, maintAlert: !notifSettings.maintAlert})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-dark)' }}>Laporan Bulanan</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)' }}>Kirim laporan ringkasan bulanan via email.</p>
                </div>
                <div className={`toggle-switch ${notifSettings.monthlyReport ? 'active' : ''}`} onClick={() => setNotifSettings({...notifSettings, monthlyReport: !notifSettings.monthlyReport})}>
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowNotifPrefModal(false)}
              className="btn-save"
              style={{ width: '100%', marginTop: '24px' }}
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* HELP AND SUPPORT MODAL */}
      {/* ========================================== */}
      {showSupportModal && (
        <div className="profile-edit-modal-overlay" onClick={() => setShowSupportModal(false)}>
          <div className="profile-edit-modal fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Bantuan & Dukungan</h3>
              <button 
                onClick={() => setShowSupportModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-lighter)', cursor: 'pointer' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
              <div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', color: 'var(--text-dark)', fontWeight: 800 }}>Tanya Jawab (FAQ)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)' }}>Bagaimana cara menghubungkan perangkat baru?</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', lineHeight: 1.4 }}>Klik tombol "Tambah Perangkat Baru" di atas, lalu masukkan detail nama, tipe perangkat, alamat IP lokal, dan lokasi perangkat Anda.</p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)' }}>Mengapa sensor suhu CPU tidak terbaca?</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', lineHeight: 1.4 }}>Pastikan modul sensor background SOLITECH berjalan di latar belakang perangkat target Anda dan firewall mengizinkan koneksi.</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)' }}>Bagaimana cara mengubah satuan temperatur?</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', lineHeight: 1.4 }}>Buka menu Pengaturan (ikon gir di kanan atas), lalu cari pilihan Satuan Suhu untuk beralih antara Celsius (°C) dan Fahrenheit (°F).</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--bg-light)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '12px', color: 'var(--text-dark)', fontWeight: 800 }}>Hubungi Tim Dukungan</h4>
                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: 'var(--text-light)' }}>Ada kendala teknis lainnya? Silakan hubungi kami:</p>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)' }}>Email: support@solitech.monitoring.id</p>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)' }}>Hotline: 0800-1-SOLITECH (Bebas Pulsa)</p>
              </div>
            </div>

            <button 
              onClick={() => setShowSupportModal(false)}
              className="btn-save"
              style={{ width: '100%', marginTop: '20px' }}
            >
              Tutup Bantuan
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
