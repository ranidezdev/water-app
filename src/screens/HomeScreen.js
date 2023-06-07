import React, { useState } from 'react';
import { View, StyleSheet  } from 'react-native';
import Overview from './Overview';
import CalenderView from './CalenderView';
import NavigationBar from '../components/NavigationBar';

export default function HomeScreen() {
  const [currentView, setCurrentView] = useState('overview');

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

