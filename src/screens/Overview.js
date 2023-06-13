import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import WeightInputBar from '../components/WeightInputBar';
import AnimatedWaterGlass from '../components/AnimatedWaterGlass';
import OverviewButtonLayout from '../components/OverviewButtonLayout';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Overview({ fluidAmount, weight, fluidAmountGoal, overviewDate, onFluidAmountChange, onWeightChange }) {
  const [overviewFluidAmount, setOverviewFluidAmount] = useState(fluidAmount);
  const [overviewWeight, setOverviewWeight] = useState(weight);
  const [showButtons, setShowButtons] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFluidAmountChange = (newFluidAmount) => {
    onFluidAmountChange(overviewDate, newFluidAmount);
    setOverviewFluidAmount(newFluidAmount);
  }

  const handleWeightChange = (newWeight) => {
    onWeightChange(newWeight);
    setOverviewWeight(newWeight);
  }

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }

  const handleFocusChange = (isFocused) => {
    setIsFocused(isFocused);
  }

  return (
    <View style={styles.container}>

      {!showSettings ? (
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={toggleSettings}
        >
          <MaterialCommunityIcons 
            name="cog" 
            size={34} 
            color="#ebf9ff" 
          />

        </TouchableOpacity>
      ) : (
        <WeightInputBar 
          onPress={toggleSettings}
          placeholderWeight={overviewWeight}
          weightChange={handleWeightChange}
          focusChange={handleFocusChange}
        />
      )}

      <Text style={styles.text}>{overviewFluidAmount} ml</Text>
      
      <AnimatedWaterGlass 
        fluidAmount={overviewFluidAmount} 
        fluidAmountGoal={fluidAmountGoal} 
        inputBarFocused={isFocused} 
      />

      {!showButtons ? (
        <TouchableOpacity
          style={styles.addFluidButton}
          onPress={toggleButtons}
        >
          <FontAwesome5 name="plus" size={40} color="#ebf9ff" solid />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <OverviewButtonLayout 
            buttonFluidAmount={overviewFluidAmount}
            onPress={toggleButtons} 
            fluidAmountChange={handleFluidAmountChange} 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3d9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    top: 70,
    fontSize: 50,
    color: '#ebf9ff',
  },
  addFluidButton: {
    position: 'absolute',
    top: 515,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 515,
    left: 0,
  },
  settingsButton: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
});