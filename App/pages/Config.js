import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colorSchemas } from '../styles/Colors';
import { useTheme } from '../utils/ThemeContext';

export default function Settings() {
    const { changeTheme, colorScheme } = useTheme();
    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('');

    useEffect(() => {
        setThemes(colorSchemas());
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
            <Text style={{ ...styles.label, color: colorScheme.textPrimary }}>Escolha o tema:</Text>
            <View style={[styles.pickerContainer, { backgroundColor: 'white' }]}>
                <Picker
                    selectedValue={theme}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setTheme(itemValue);
                        changeTheme(itemValue);
                    }}
                >
                    {themes.map((_theme, index) => (
                        <Picker.Item key={index} label={_theme} value={_theme} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});
