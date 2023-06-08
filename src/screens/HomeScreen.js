import React, { useState, useEffect } from 'react';
import { View, StyleSheet  } from 'react-native';
import Overview from './Overview';
import CalenderView from './CalenderView';
import NavigationBar from '../components/NavigationBar';
import StorageManager from '../utils/StorageManager';

export default function HomeScreen() {
  const [currentView, setCurrentView] = useState('overview');

  useEffect(() => {
    StorageManager.checkAndCreateEntries();

    // console.log("FluidAmount for 06/08/23: ");
    // StorageManager.getFluidAmount("06/08/23").then(fluidAmount => {
    //   console.log(fluidAmount); 
    // });
  }, []);

  const handleOverviewPress = () => {
    setCurrentView('overview');
  };

  const handleCalendarPress = () => {
    setCurrentView('calendar');
  };

  return (
    <View style={styles.container}>
      {currentView === 'overview' ? <Overview /> : <CalenderView />}
      <NavigationBar
        onOverviewPress={handleOverviewPress}
        onCalendarPress={handleCalendarPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});