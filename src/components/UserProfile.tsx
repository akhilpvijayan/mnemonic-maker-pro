import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, BookMarked, Star, TrendingUp, 
  Settings, LogOut, ArrowLeft, Edit2, Save, X, Shield, Bell 
} from 'lucide-react';
import { LogoutModal } from '../components/LogoutModal';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || user?.email?.split('@')[0] || 'User');

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  // Mock stats - replace with real data from your database
  const stats = {
    totalMnemonics: 42,
    favorites: 12,
    streak: 7,
    joinDate: user?.metadata?.creationTime || new Date().toISOString()
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="profile-page">
        <div className="profile-container">
          {/* Header */}
          <div className="profile-header">
            <button onClick={() => navigate(-1)} className="profile-back-btn">
              <ArrowLeft size={20} />
            </button>
            <h1 className="profile-header-title">My Profile</h1>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            {/* Profile Card */}
            <div className="profile-main-card">
              {/* Avatar Section */}
              <div className="profile-avatar-section">
                <div className="profile-avatar-wrapper">
                  <div className="profile-avatar">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" />
                    ) : (
                      <User size={48} />
                    )}
                  </div>
                  <div className="profile-status-badge">
                    <div className="status-dot"></div>
                  </div>
                </div>

                <div className="profile-info">
                  {isEditing ? (
                    <div className="profile-edit-input">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="profile-name-input"
                        placeholder="Your name"
                      />
                    </div>
                  ) : (
                    <h2 className="profile-name">{displayName}</h2>
                  )}
                  <p className="profile-email">
                    <Mail size={16} />
                    {user?.email}
                  </p>
                  <p className="profile-join-date">
                    <Calendar size={16} />
                    Joined {formatDate(stats.joinDate)}
                  </p>
                </div>

                <div className="profile-edit-actions">
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveProfile} className="profile-save-btn">
                        <Save size={18} />
                        Save
                      </button>
                      <button onClick={() => setIsEditing(false)} className="profile-cancel-btn">
                        <X size={18} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="profile-edit-btn">
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="profile-stats-grid">
                <div className="profile-stat-card">
                  <div className="stat-icon-wrapper stat-blue">
                    <BookMarked size={24} />
                  </div>
                  <div className="stat-info">
                    <p className="stat-value">{stats.totalMnemonics}</p>
                    <p className="stat-label">Total Mnemonics</p>
                  </div>
                </div>

                <div className="profile-stat-card">
                  <div className="stat-icon-wrapper stat-yellow">
                    <Star size={24} />
                  </div>
                  <div className="stat-info">
                    <p className="stat-value">{stats.favorites}</p>
                    <p className="stat-label">Favorites</p>
                  </div>
                </div>

                <div className="profile-stat-card">
                  <div className="stat-icon-wrapper stat-green">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stat-info">
                    <p className="stat-value">{stats.streak} days</p>
                    <p className="stat-label">Current Streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="profile-actions-card">
              <h3 className="card-title">Quick Actions</h3>
              <div className="action-buttons-grid">
                <button 
                  onClick={() => navigate('/saved')} 
                  className="action-btn action-primary"
                >
                  <BookMarked size={20} />
                  <span>View Saved Mnemonics</span>
                </button>

                <button 
                  onClick={() => navigate('/')} 
                  className="action-btn action-secondary"
                >
                  <TrendingUp size={20} />
                  <span>Create New Mnemonic</span>
                </button>
              </div>
            </div>

            {/* Settings Card */}
            <div className="profile-settings-card">
              <h3 className="card-title">Settings</h3>
              <div className="settings-list">
                <button className="setting-item">
                  <div className="setting-left">
                    <Shield size={20} />
                    <span>Privacy & Security</span>
                  </div>
                  <span className="setting-arrow">›</span>
                </button>

                <button className="setting-item">
                  <div className="setting-left">
                    <Bell size={20} />
                    <span>Notifications</span>
                  </div>
                  <span className="setting-arrow">›</span>
                </button>

                <button className="setting-item">
                  <div className="setting-left">
                    <Settings size={20} />
                    <span>Account Settings</span>
                  </div>
                  <span className="setting-arrow">›</span>
                </button>

                <button onClick={handleLogout} className="setting-item setting-danger">
                  <div className="setting-left">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </div>
                  <span className="setting-arrow">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      </div>
    </div>
  );
};

export default UserProfile;
