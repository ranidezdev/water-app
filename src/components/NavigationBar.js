import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavigationButton from './NavigationButton';

export default function NavigationBar({ onOverviewPress, onCalendarPress }) {

  const handleOverviewPress = () => {
    onOverviewPress();
  };

  const handleCalendarPress = () => {
    onCalendarPress();
  };


  return (
    <View style={styles.container}>
      <NavigationButton
        icon="home"
        onPress={handleOverviewPress}
      />
      <NavigationButton
        icon="calendar"
        onPress={handleCalendarPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#AAAAAA',
    backgroundColor: '#748da6'
  },
});