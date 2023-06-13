import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Overview from './Overview';
import CalenderView from './CalenderView';
import NavigationBar from '../components/NavigationBar';
import StorageManager from '../utils/StorageManager';

export default function HomeScreen() {
  const [currentView, setCurrentView] = useState('overview');
  const [fluidAmount, setFluidAmount] = useState(0);
  const [fluidAmountGoal, setFluidAmountGoal] = useState(0);
  const [weight, setWeight] = useState('');
  const [usedDate, setUsedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dateEntries, setDateEntries] = useState([]);

  useEffect(() => {
    // Initial check for entries in local storage
    StorageManager.checkAndCreateEntries();
    StorageManager.checkForWeightEntry();

    // Set fluidAmount
    const currentDate = new Date().toLocaleDateString('de-DE');
    StorageManager.getFluidAmount(currentDate).then((returnedAmount) => {
      setFluidAmount(returnedAmount);
    });

    StorageManager.getCalenderDays().then((returnedDates) => {
      setDateEntries(returnedDates);
    });

    // Set weight and fluidAmountGoal
    StorageManager.getWeight()
      .then((returnedAmount) => {
        setWeight(returnedAmount);
        setFluidAmountGoal(returnedAmount * 40);
        setUsedDate(currentDate);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // changes view to overview
  const handleOverviewPress = () => {
    setCurrentView('overview');
  };

  // changes view to calendar
  const handleCalendarPress = () => {
    setCurrentView('calendar');
  };

  // changes value of fluidAmount
  const handleFluidAmountChange = (date, newFluidAmount) => {
    StorageManager.setFluidAmount(date, newFluidAmount);
    setFluidAmount(newFluidAmount);
  }

  // changes value of weight
  const handleWeightChange = (newWeight) => {
    StorageManager.setWeight(newWeight);
    setWeight(newWeight);
    setFluidAmountGoal(newWeight * 40);
  }

  const handleDateChange = (newDate) => {
    StorageManager.getFluidAmount(newDate).then((returnedAmount) => {
      setFluidAmount(returnedAmount);
      setUsedDate(newDate);
      handleOverviewPress();
    });
  }
  
  return (
    <View style={styles.container}>
      {isLoading ? ( 
        <View style={{ flex: 0.9, backgroundColor: '#b3d9ff', justifyContent: 'center', alignItems: 'center', }}></View>
      ) : (
        <>
          {currentView === 'overview' ? (
            <Overview fluidAmount={fluidAmount} weight={weight} fluidAmountGoal={fluidAmountGoal} overviewDate={usedDate} onFluidAmountChange={handleFluidAmountChange} onWeightChange={handleWeightChange} />
          ) : (
            <CalenderView calendarDays={dateEntries} onDaySelect={handleDateChange} />
          )}
        </>
      )}
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