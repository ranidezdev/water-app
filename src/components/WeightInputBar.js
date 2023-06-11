import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default function WeightInputBar({ onPress, placeholderWeight, weightChange, focusChange }) {
    const [inputWeight, setInputWeight] = useState(placeholderWeight);

    const handleWeightInputChange = (newWeight) => {
        setInputWeight(newWeight);
    }

    const handleFocus = () => {
        focusChange(true);
    };

    const handleBlur = () => {
        focusChange(false);
    };

    const handleSubmit = () => {
        // Prüfe ob String valider input ist
        const regex = /^[\d.,]+$/;
        if(regex.test(inputWeight)) {
            weightChange(formatInput(inputWeight));
        }
        
        focusChange(false);
        onPress();
    }

    // Ersetze , mit . und runde zahl ab falls zu viele Nachkommastellen
    function formatInput(inputString) {
        const converted = inputString.replace(',', '.');
        const rounded = Number(converted).toFixed(2);
        return rounded;
    }

    let inputPlaceholder = "your body weight is currently set to "
    inputPlaceholder += placeholderWeight;

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={inputPlaceholder}
                placeholderTextColor="#ebf9ff"
                onChangeText={handleWeightInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <AntDesign name="check" size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: '#ebf9ff',
        borderWidth: 3,
        borderRadius: 15,
        flexDirection: 'row',
        marginHorizontal: 50,
        position: 'absolute',
        top: 29,
        right: 0,
    },
    input: {
        flex: 1,
        color: '#ebf9ff',
        marginLeft: 10,
    },
    button: {
        backgroundColor: 'transparent',
        paddingRight: 5
    }
});