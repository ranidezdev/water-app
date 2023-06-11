import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function AnimatedWaterGlass({ fluidAmount, fluidAmountGoal, inputBarFocused }) {
    const fillAnimation = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(fillAnimation, {
        toValue: fluidAmount,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, [fluidAmount]);
  
    return (
      <View style={styles.container}>
        <View style={inputBarFocused ? styles.glassWhileInputOpen : styles.glassNormal} >
          <View style={styles.border}>
            <View style={styles.empty} />
            <Animated.View
              style={[
                styles.fill,
                {
                  height: fillAnimation.interpolate({
                    inputRange: [0, fluidAmountGoal],
                    outputRange: ['0%', '95%'],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    glassNormal: {
    width: 150,
    height: 275,
    backgroundColor: '#b3d9ff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    
    shadowOpacity: 0.3,
    shadowRadius: 4,
    },
    glassWhileInputOpen: {
      position: 'absolute',
      width: 150,
      height: 275,
      backgroundColor: '#b3d9ff',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      
      shadowOpacity: 0.3,
      shadowRadius: 4,
      },
    border: {
      flex: 1,
      borderWidth: 9,
      borderColor: '#e0f5ff',
      borderTopWidth: 0,
    },
    empty: {
      flex: 1,
      backgroundColor: '#b3d9ff',
    },
    fill: {
      backgroundColor: '#437dd9',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
});
  
