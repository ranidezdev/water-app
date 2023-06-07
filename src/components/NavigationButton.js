import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function NavigationButton({ icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <AntDesign name={icon} size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
