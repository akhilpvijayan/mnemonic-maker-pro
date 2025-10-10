import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { getUserMnemonics, deleteMnemonic, toggleFavorite, SavedMnemonic } from '../services/mnemonicService';
import { Trash2, Star, RefreshCw, AlertCircle, Heart, Calendar, Copy, Check, Search, ArrowLeft } from 'lucide-react';

const SavedMnemonics: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  const [mnemonics, setMnemonics] = useState<SavedMnemonic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);

  useEffect(() => {
    if (user) {
      loadMnemonics();
    } else {
      setLoading(false);
      setError('Please log in to view your mnemonics');
    }
  }, [user]);

  const loadMnemonics = async () => {
    if (!user) {
      setError('No user logged in');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await getUserMnemonics(user.uid);
      setMnemonics(data);
    } catch (error: any) {
      console.error('Error loading mnemonics:', error);
      setError(error.message || 'Failed to load mnemonics');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this mnemonic?')) return;
    
    try {
      await deleteMnemonic(id);
      setMnemonics(mnemonics.filter(m => m.id !== id));
    } catch (error: any) {
      console.error('Delete error:', error);
      alert('Failed to delete: ' + error.message);
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      await toggleFavorite(id, currentFavorite);
      setMnemonics(mnemonics.map(m => 
        m.id === id ? { ...m, favorite: !currentFavorite } : m
      ));
    } catch (error: any) {
      console.error('Toggle favorite error:', error);
      alert('Failed to update: ' + error.message);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredMnemonics = mnemonics.filter(m => {
    const matchesSearch = m.input.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.result.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorite = !filterFavorites || m.favorite;
    return matchesSearch && matchesFavorite;
  });

  if (loading) {
    return (
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <div className="saved-mnemonics-page">
          <div className="saved-loading-container">
            <div className="saved-loading-spinner"></div>
            <p className="saved-loading-text">Loading your mnemonics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <div className="saved-mnemonics-page">
          <div className="saved-error-container">
            <div className="saved-error-card">
              <AlertCircle size={48} className="saved-error-icon" />
              <h3 className="saved-error-title">Error Loading Mnemonics</h3>
              <p className="saved-error-message">{error}</p>
              <button onClick={loadMnemonics} className="saved-error-retry-btn">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="saved-mnemonics-page">
        <header className="saved-mnemonics-header">
          <div className="saved-header-content">
            <div className="saved-header-left">
              <button onClick={() => window.history.back()} className="saved-back-btn">
                <ArrowLeft size={20} />
              </button>
              <div className="saved-header-title">
                <h1>My Mnemonics</h1>
                <p className="saved-count">
                  {filteredMnemonics.length} {filteredMnemonics.length === 1 ? 'mnemonic' : 'mnemonics'} 
                  {searchTerm || filterFavorites ? ' found' : ' saved'}
                </p>
              </div>
            </div>
            <div className="saved-header-right">
              <button onClick={loadMnemonics} className="saved-refresh-btn">
                <RefreshCw size={18} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </header>

        <main className="saved-mnemonics-content">
          <div className="saved-filters-section">
            <div className="saved-search-bar">
              <div className="saved-search-wrapper">
                <Search size={20} className="saved-search-icon" />
                <input
                  type="text"
                  placeholder="Search mnemonics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="saved-search-input"
                />
              </div>
              <div className="saved-filter-buttons">
                <button
                  onClick={() => setFilterFavorites(!filterFavorites)}
                  className={`saved-filter-btn ${filterFavorites ? 'active' : ''}`}
                >
                  <Star size={18} fill={filterFavorites ? 'currentColor' : 'none'} />
                  <span>Favorites</span>
                </button>
              </div>
            </div>
          </div>

          {filteredMnemonics.length === 0 ? (
            <div className="saved-empty-container">
              <div className="saved-empty-card">
                <div className="saved-empty-icon-wrapper">
                  <Heart size={48} className="saved-empty-icon" />
                </div>
                <h3 className="saved-empty-title">
                  {searchTerm || filterFavorites ? 'No matches found' : 'No mnemonics yet'}
                </h3>
                <p className="saved-empty-text">
                  {searchTerm || filterFavorites 
                    ? 'Try adjusting your search or filters' 
                    : 'Start creating mnemonics to build your collection'}
                </p>
              </div>
            </div>
          ) : (
            <div className="saved-mnemonics-grid">
              {filteredMnemonics.map((mnemonic) => (
                <div key={mnemonic.id} className="saved-mnemonic-card">
                  <div className="saved-card-header">
                    <span className={`saved-mode-badge ${mnemonic.mode.toLowerCase()}`}>
                      {mnemonic.mode}
                    </span>
                    <div className="saved-card-actions">
                      <button
                        onClick={() => handleToggleFavorite(mnemonic.id!, mnemonic.favorite)}
                        className={`saved-action-btn saved-favorite-btn ${mnemonic.favorite ? 'active' : ''}`}
                        title={mnemonic.favorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star size={20} fill={mnemonic.favorite ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => handleCopy(mnemonic.result, mnemonic.id!)}
                        className={`saved-action-btn saved-copy-btn ${copiedId === mnemonic.id ? 'copied' : ''}`}
                        title="Copy mnemonic"
                      >
                        {copiedId === mnemonic.id ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                      <button
                        onClick={() => handleDelete(mnemonic.id!)}
                        className="saved-action-btn saved-delete-btn"
                        title="Delete mnemonic"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="saved-card-content">
                    <div className="saved-content-section">
                      <p className="saved-content-label">Input</p>
                      <div className="saved-content-text saved-input-text">
                        {mnemonic.input}
                      </div>
                    </div>
                    <div className="saved-content-section">
                      <p className="saved-content-label">Mnemonic</p>
                      <div className="saved-content-text saved-result-text">
                        {mnemonic.result}
                      </div>
                    </div>
                  </div>

                  <div className="saved-card-footer">
                    <Calendar size={14} />
                    <span>{formatDate(mnemonic.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SavedMnemonics;
