import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Switch, Alert } from 'react-native'
import { useTheme } from '../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'
import Dialog from 'react-native-dialog';
import Decode from '../utils/JWT';

export default function UserProfile({ setModalVisible, modalVisible }) {
    const { colorScheme } = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);

    const [User, setUser] = useState({})
    const [NewUserData, setNewUserData] = useState({})

    const [senha, setSenha] = useState("")
    const [canEdit, setCanEdit] = useState("")

    useEffect(() => {
        (async () => {
            try {
                let User = await AsyncStorage.getItem('usuario');
                if (User) {
                    let decodedUser = Decode(User);
                    setUser(decodedUser);
                } else {
                    console.log("Nenhum token encontrado.");
                }
            } catch (error) {
                console.error("Erro ao obter o usuário do AsyncStorage:", error);
            }
        })();
    }, [])

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const getPermisionToEdit = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        setVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={[styles.modalView, { backgroundColor: colorScheme.Screen.background }]}>
                <View style={[styles.header, { backgroundColor: colorScheme.Screen.background, justifyContent: 'center' }]}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}><Icon name='arrow-back' size={25} color={colorScheme.Text.textPrimary} /></Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.body, { backgroundColor: colorScheme.Screen.background }]}>
                    <TouchableOpacity>
                        <Image source={{ uri: User.pfp }}
                            style={{
                                height: 140,
                                width: 140,
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor: colorScheme.Screen.panelBackground,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ gap: 20, width: '100%' }} >
                        <TouchableOpacity
                            style={[styles.input, styles.editavel, { borderColor: colorScheme.Screen.panelBackground }]}
                            onPress={() => {
                                getPermisionToEdit()
                            }}
                        >
                            <Text style={{ fontSize: 20 }} >Nome : {User.nome}</Text>
                            <Feather name='edit-2' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.input, styles.editavel, { borderColor: colorScheme.Screen.panelBackground }]}
                            onPress={() => {
                                getPermisionToEdit()
                            }}
                        >
                            <Text style={{ fontSize: 20 }} >Email : {User.email}</Text>
                            <Feather name='edit-2' size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 25, width: '100%' }} >
                        <TouchableOpacity
                            style={styles.editavel}
                            onPress={() => {
                                getPermisionToEdit()
                            }}
                        >
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
                            thumbColor={colorScheme.Switch.thumbColor[isEnabled]}
                            ios_backgroundColor={colorScheme.Switch.ios_backgroundColor}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={isEnabled ? { borderWidth: 2, borderColor: colorScheme.Screen.panelBackground, } : { borderWidth: 2, borderColor: 'lightgray' }}

                        />
                    </View>
                </View>
            </View>

            {/* Aqui ficaram os dialogos de confirmação */}
            <>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Enter password</Dialog.Title>
                    <Dialog.Description>
                        Digite sua senha atual
                    </Dialog.Description>
                    <Dialog.Input
                        secureTextEntry
                        placeholder="Password"
                        onChangeText={setSenha}
                        value={senha}
                    />
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="OK" onPress={handleOk} />
                </Dialog.Container>
            </>
        </Modal>
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
