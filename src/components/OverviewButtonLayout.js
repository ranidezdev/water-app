import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function OverviewButtonLayout({ buttonFluidAmount, onPress, fluidAmountChange }) {
  const [showButtons, setShowButtons] = useState(false);
  const [arithmeticOperatrion, setArithmeticOperatrion] = useState('');

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleAddButton = () => {
    setArithmeticOperatrion('add');
    toggleButtons();
  };

  const handleSubButton = () => {
    setArithmeticOperatrion('sub');
    toggleButtons();
  };

  const onFluidUpdate = (fluidAmount) => {
    if(arithmeticOperatrion == 'add') {      
      fluidAmountChange(buttonFluidAmount + fluidAmount);
    } else if (arithmeticOperatrion == 'sub') {
      let newFluidAmount = buttonFluidAmount - fluidAmount;
      if(newFluidAmount <= 0) {
        fluidAmountChange(0);
      } else {
        fluidAmountChange(newFluidAmount);
      }
    }
    toggleButtons();
  };
  

  return (
    <View>
      {!showButtons ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddButton} style={styles.button}>
            <AntDesign name="plus" size={44} color="white" />      
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubButton} style={styles.button}>
            <AntDesign name="minus" size={44} color="white" />      
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <AntDesign name="check" size={44} color="white" />      
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.fluidLayoutContainer}>
          <TouchableOpacity onPress={() => onFluidUpdate(50)}>
            <View style={styles.fluidButtonContainer}>
              <Text style={styles.fluidButtonText}> 50 ml </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFluidUpdate(100)}>
            <View style={styles.fluidButtonContainer}>
              <Text style={styles.fluidButtonText}>100 ml</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onFluidUpdate(250)}>
            <View style={styles.fluidButtonContainer}>
              <Text style={styles.fluidButtonText}>250 ml</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 136,
  },
  button: {
    width: 40,
    height: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    margin : 3,
  },
  fluidLayoutContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 72,
  },
  fluidButtonContainer: {
    borderColor: '#ebf9ff',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin : 5,
  },
  fluidButtonText: {
    flex: 1,
    color: '#ebf9ff',
    fontSize: 22,
    margin : 3,
  }
});