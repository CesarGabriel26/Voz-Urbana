
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { colorSchemas } from '../styles/Colors';
import { useTheme } from '../utils/ThemeContext';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import UserProfile from '../components/UserProfileModal';
import { TouchableOpacity } from 'react-native';

export default function Settings() {
    const { changeTheme, colorScheme } = useTheme();
    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setThemes(colorSchemas());
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colorScheme.backgroundInverse,
                overflow: 'hidden',
                backgroundColor: colorScheme.background,
                minHeight: 50,
                padding: 5
            }} >
                <View style={styles.Icon}>
                    <Ionicons name="color-palette" size={40} color={colorScheme.textPrimary} />
                </View>

                <View style={styles.dropdownContainer}>
                    <Dropdown
                        data={themes.map(theme => ({ label: theme, value: theme }))}
                        labelField="label"
                        valueField="value"
                        value={theme}
                        placeholder="Selecione um tema"
                        placeholderStyle={{ color: colorScheme.textPrimary }}
                        selectedTextStyle={{ color: colorScheme.textPrimary }}
                        onChange={item => {
                            setTheme(item.value);
                            changeTheme(item.value);
                        }}
                        style={[styles.dropdown, { backgroundColor: colorScheme.background }]}
                    />
                </View>
            </View>

            <TouchableOpacity style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colorScheme.backgroundInverse,
                overflow: 'hidden',
                backgroundColor: colorScheme.background,
                minHeight: 60,
                padding: 5
            }}
                onPress={() => { setModalVisible(true) }}
            >
                <View style={styles.Icon}>
                    <FontAwesome6 name="circle-user" size={40} color={colorScheme.textPrimary} />
                </View>
                <Text style={{ color: colorScheme.textPrimary }} >Informações do usuario</Text>
            </TouchableOpacity>

            <View>
                <Text>Ainda estamos trabalhando nisso</Text>
                <Image source={require('../assets/merp.png')} />
            </View>

            <UserProfile setModalVisible={setModalVisible} modalVisible={modalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },

    Icon: {
        alignItems: 'center',
        marginRight: 15,
    },
    dropdownContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    dropdown: {
        height: 50,
        width: '100%',
        paddingHorizontal: 8,
    },
});
