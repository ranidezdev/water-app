import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const CalendarView = ({ calendarDays, onDaySelect }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    onDaySelect(day);
  };

  const transformDay = (dayString) => {
    const parts = dayString.split('/');
    const year = parts[2];
    const month = parts[0];
    const day = parts[1];

    const formattedDate = day + (".") + month + (".20") + year;
    
    return formattedDate;
  }

  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <View style={styles.container}>
      <View style={styles.weekdayContainer}>
        {weekdays.map((weekday) => (
            <View key={weekday} style={styles.weekday}>
              <Text style={styles.weekdayText}>{weekday}</Text>
            </View>
          ))}
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          {calendarDays.map((day, index) => (
            <TouchableOpacity
              key={day.date}
              onPress={() => handleDaySelect(day.date)}
              style={[
                styles.dayButton,
                selectedDay === day && styles.selectedDayButton,
                index % 7 === 6 && styles.lastDayButton,
              ]}
            >
              <Text style={styles.dayText}>{transformDay(day.date)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf9ff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    flexBasis: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#b3d9ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ebf9ff',
    borderRightWidth: 1,
    borderRightColor: '#ebf9ff',
  },
  lastDayButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebf9ff',
    borderRightWidth: 0,
  },
  selectedDayButton: {
    backgroundColor: '#b3d9ff',
    borderBottomColor: '#ffffff',
  },
  dayText: {
    fontSize: 18,
    color: '#ebf9ff'
  },
  fluidAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#748da6',
  },
  weekday: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ebf9ff',
  },
});

export default CalendarView;
