import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [userData, setUserData] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [fishingData, setFishingData] = useState([]);
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(false);

  const saveUserData = async data => {
    try {
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

  // location data

  const saveLocation = async data => {
    try {
      const jsonValue = await AsyncStorage.getItem('location');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const locations = [...parced, data];
      await AsyncStorage.setItem('location', JSON.stringify(locations));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getLocation = async () => {
    try {
      const savedData = await AsyncStorage.getItem('location');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setLocations(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLocation = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('location');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedId);

    setLocations(filtered);
    await AsyncStorage.setItem('location', JSON.stringify(filtered));

    console.log('remove');
  };

  // fishing data

  const saveFishingData = async data => {
    try {
      const jsonValue = await AsyncStorage.getItem('fishing');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const fishingData = [...parced, data];
      await AsyncStorage.setItem('fishing', JSON.stringify(fishingData));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getFishingData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('fishing');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setFishingData(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFishingData = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('fishing');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedId);

    setFishingData(filtered);
    await AsyncStorage.setItem('fishing', JSON.stringify(filtered));

    console.log('remove');
  };

  const resetApp = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify([]));
      await AsyncStorage.setItem('location', JSON.stringify([]));
      await AsyncStorage.setItem('fishing', JSON.stringify([]));
      await AsyncStorage.setItem('notes', JSON.stringify([]));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const value = {
    saveUserData,
    userData,
    getUserData,
    saveUserNotes,
    getUserNotes,
    userNotes,
    removeUserNote,
    saveLocation,
    getLocation,
    locations,
    currentLocation,
    setCurrentLocation,
    saveFishingData,
    getFishingData,
    fishingData,
    removeFishingData,
    removeLocation,
    isEnabledNotifications,
    setIsEnabledNotifications,
    resetApp,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
