import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [userNotes, setUserNotes] = useState([]);

  const saveUserData = async data => {
    try {
      //   const jsonValue = await AsyncStorage.getItem('userData');
      //   let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      //   const userData = [...parced, data];
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setUserData(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeChicken = async selectedChicken => {
    const jsonValue = await AsyncStorage.getItem('formData');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedChicken);

    setFormData(filtered);
    await AsyncStorage.setItem('formData', JSON.stringify(filtered));

    console.log('remove');
  };

  // User Notes

  const saveUserNotes = async data => {
    try {
      const jsonValue = await AsyncStorage.getItem('notes');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const userNotes = [...parced, data];
      await AsyncStorage.setItem('notes', JSON.stringify(userNotes));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getUserNotes = async () => {
    try {
      const savedData = await AsyncStorage.getItem('notes');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setUserNotes(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserNote = async selectedNote => {
    const jsonValue = await AsyncStorage.getItem('notes');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedNote);

    setUserNotes(filtered);
    await AsyncStorage.setItem('notes', JSON.stringify(filtered));

    console.log('remove');
  };

  const value = {
    saveUserData,
    userData,
    getUserData,
    saveUserNotes,
    getUserNotes,
    userNotes,
    removeUserNote,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
