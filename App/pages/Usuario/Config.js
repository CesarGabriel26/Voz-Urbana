
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { colorSchemas } from '../../styles/Colors';
import { useTheme } from '../../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import UserProfile from '../../components/UserProfileModal';

import { TouchableOpacity } from 'react-native';

export default function Settings({ navigation }) {
    const { changeTheme, colorScheme } = useTheme();
    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setThemes(colorSchemas());

        (
            async () => {
                let currentTheme = await AsyncStorage.getItem('colorSchema')
                setTheme(currentTheme)
            }
        )()

    }, []);

    const logOut = async () => {
        await AsyncStorage.removeItem('usuario')
        navigation.navigate('Login')
    }

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.background.default }]}>
            <View style={[styles.option, { borderColor: colorScheme.background.inverse, backgroundColor: colorScheme.background.default }]}>
                <View style={styles.Icon}>
                    <Ionicons name="color-palette" size={40} color={colorScheme.text.dark} />
                </View>

                <View style={styles.dropdownContainer}>
                    <Dropdown
                        data={themes.map(theme => ({ label: theme, value: theme }))}
                        labelField="label"
                        valueField="value"
                        value={theme}
                        placeholder="Selecione um tema"
                        placeholderStyle={{ color: colorScheme.text.dark }}
                        selectedTextStyle={{ color: colorScheme.text.dark }}
                        onChange={item => {
                            setTheme(item.value);
                            changeTheme(item.value);
                        }}
                        style={[styles.dropdown, { backgroundColor: colorScheme.background.default }]}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.option, { borderColor: colorScheme.background.inverse, backgroundColor: colorScheme.background.default }]}
                onPress={() => { setModalVisible(true) }}
            >
                <View style={styles.Icon}>
                    <FontAwesome6 name="circle-user" size={40} color={colorScheme.text.dark} />
                </View>
                <Text style={{ color: colorScheme.text.dark }} >Informações do usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.option, { borderColor: colorScheme.background.inverse, backgroundColor: colorScheme.background.default }]}
                onPress={logOut}
            >
                <View style={styles.Icon}>
                    <MaterialIcons name="logout" size={40} color={colorScheme.text.dark} />
                </View>
                <Text style={{ color: colorScheme.text.dark }} >Sair</Text>
            </TouchableOpacity>

            {/* <View>
                <Text style={{ color: colorScheme.text.dark }} >Ainda estamos trabalhando nisso</Text>
                <Image source={require('../assets/merp.gif')} style={{ width: '100%', height: 200 }} resizeMode="contain" />
            </View> */}

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
    option: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        minHeight: 60,
        padding: 5
    }
});
