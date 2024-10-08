import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput, Switch } from 'react-native'
import { useTheme } from '../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'

export default function UserProfile({ setModalVisible, modalVisible }) {
    const { colorScheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [User, setUser] = useState({})
    const [Foto, setFoto] = useState("")
    const [Nome, setNome] = useState("")
    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("")

    const checkUser = async () => {
        let User = await AsyncStorage.getItem('usuario') || null
        let json = JSON.parse(User)
        setUser(json)

        setNome(json.nome)
        setFoto(json.pfp)
        setEmail(json.email)
        setSenha(json.senha)
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <View style={[styles.container, {}]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.modalView, { backgroundColor: colorScheme.background }]}>
                    <View style={[styles.header, { backgroundColor: colorScheme.background, justifyContent: 'center' }]}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}><Icon name='arrow-back' size={25} color={colorScheme.textPrimary} /></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.body, { backgroundColor: colorScheme.background }]}>
                        <TouchableOpacity>
                            <Image source={{ uri: Foto }}
                                style={{
                                    height: 140,
                                    width: 140,
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: colorScheme.panelBackground,
                                }}
                            />
                        </TouchableOpacity>

                        <View style={{ gap: 20, width: '100%' }} >
                            <TouchableOpacity style={[styles.input, styles.editavel, { borderColor: colorScheme.panelBackground }]} >
                                <Text style={{ fontSize: 20 }} >Nome : {Nome}</Text>
                                <Feather name='edit-2' size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.input, styles.editavel, { borderColor: colorScheme.panelBackground }]} >
                                <Text style={{ fontSize: 20 }} >Email : {Email}</Text>
                                <Feather name='edit-2' size={20} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ gap: 25, width: '100%' }} >
                            <TouchableOpacity style={styles.editavel} >
                                <Text style={{ fontSize: 15, marginRight: 5 }} >Alterar minha senha</Text>
                                <Feather name='edit-2' size={20} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 17
                            }}>Manter conta anônima</Text>

                            <Switch
                                trackColor={{ false: 'gray', true: 'gray' }}
                                thumbColor={isEnabled ? colorScheme.panelBackground : '#f4f3f4'}
                                ios_backgroundColor="#FFFFFF"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={isEnabled ? { borderWidth: 2, borderColor: colorScheme.panelBackground, } : { borderWidth: 2, borderColor: 'lightgray' }}

                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    modalView: {
        width: '100%',
        flex: 1,
        padding: 10,
    },
    header: {
        paddingTop: 17,
        paddingLeft: 4,
        paddingBottom: 17
    },
    body: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 25
    },
    input: {
        height: 40,
        borderWidth: 0,
        borderBottomWidth: 2,
        padding: 5,
        width: '100%',
    },
    editavel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
