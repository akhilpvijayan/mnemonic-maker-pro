import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserMnemonics, deleteMnemonic, toggleFavorite, SavedMnemonic } from '../services/mnemonicService';
import { Trash2, Star } from 'lucide-react';

const SavedMnemonics: React.FC = () => {
  const { user } = useAuth();
  const [mnemonics, setMnemonics] = useState<SavedMnemonic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMnemonics();
  }, [user]);

  const loadMnemonics = async () => {
    if (!user) return;
    
    try {
      const data = await getUserMnemonics(user.uid);
      setMnemonics(data);
    } catch (error) {
      console.error('Error loading mnemonics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this mnemonic?')) return;
    
    try {
      await deleteMnemonic(id);
      setMnemonics(mnemonics.filter(m => m.id !== id));
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      await toggleFavorite(id, currentFavorite);
      setMnemonics(mnemonics.map(m => 
        m.id === id ? { ...m, favorite: !currentFavorite } : m
      ));
    } catch (error) {
      alert('Failed to update');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="saved-mnemonics">
      <h2>Your Saved Mnemonics</h2>
      
      {mnemonics.length === 0 ? (
        <p>No saved mnemonics yet. Start creating!</p>
      ) : (
        <div className="mnemonics-grid">
          {mnemonics.map(mnemonic => (
            <div key={mnemonic.id} className="mnemonic-card">
              <div className="mnemonic-header">
                <span className="mnemonic-input">{mnemonic.input}</span>
                <span className="mnemonic-mode">{mnemonic.mode}</span>
              </div>
              
              <p className="mnemonic-result">{mnemonic.result}</p>
              
              <div className="mnemonic-actions">
                <button 
                  onClick={() => handleToggleFavorite(mnemonic.id!, mnemonic.favorite)}
                  className={mnemonic.favorite ? 'favorite-active' : ''}
                >
                  <Star size={16} />
                </button>
                
                <button onClick={() => handleDelete(mnemonic.id!)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMnemonics;