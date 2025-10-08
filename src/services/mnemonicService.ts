import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    orderBy,
    Timestamp
  } from 'firebase/firestore';
  import { db } from '../config/firebase';
  
  export interface SavedMnemonic {
    id?: string;
    userId: string;
    input: string;
    mode: string;
    result: string;
    favorite: boolean;
    createdAt: Timestamp;
  }
  
  // Save a new mnemonic
  export const saveMnemonic = async (
    userId: string,
    input: string,
    mode: string,
    result: string
  ): Promise<void> => {
    try {
      await addDoc(collection(db, 'mnemonics'), {
        userId,
        input,
        mode,
        result,
        favorite: false,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error saving mnemonic:', error);
      throw error;
    }
  };
  
  // Get user's mnemonics
  export const getUserMnemonics = async (userId: string): Promise<SavedMnemonic[]> => {
    try {
      const q = query(
        collection(db, 'mnemonics'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SavedMnemonic));
    } catch (error) {
      console.error('Error getting mnemonics:', error);
      throw error;
    }
  };
  
  // Delete a mnemonic
  export const deleteMnemonic = async (mnemonicId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'mnemonics', mnemonicId));
    } catch (error) {
      console.error('Error deleting mnemonic:', error);
      throw error;
    }
  };
  
  // Toggle favorite
  export const toggleFavorite = async (
    mnemonicId: string,
    currentFavorite: boolean
  ): Promise<void> => {
    try {
      await updateDoc(doc(db, 'mnemonics', mnemonicId), {
        favorite: !currentFavorite
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };