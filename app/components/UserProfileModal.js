import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Switch, ActivityIndicator } from 'react-native'
import { useTheme } from '../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import Icon from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'
import Dialog from 'react-native-dialog';

import decodeUserToken from '../utils/JWT';
import { checkUserPassword, deleteImage, updateUser, uploadImage } from '../utils/Api';

export default function UserProfile({ setModalVisible, modalVisible }) {
    const { colorScheme } = useTheme();

    const [isEnabled, setIsEnabled] = useState(false);
    const [visible, setVisible] = useState(false);
    const [canEdit, setCanEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const [User, setUser] = useState({})
    const [NewUserData, setNewUserData] = useState({})

    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const [newFieldValue, setNewFieldValue] = useState("")
    const [newField, setNewField] = useState("")

    useEffect(() => {
        (async () => {
            try {
                let User = await AsyncStorage.getItem('usuario');
                if (User) {
                    let decodedUser = decodeUserToken(User);
                    setUser(decodedUser);
                    setNewUserData(decodedUser);
                } else {
                    console.log("Nenhum token encontrado.");
                }
            } catch (error) {
                console.error("Erro ao obter o usuário do AsyncStorage:", error);
            }
        })();
    }, [])

    useEffect(() => {
        const updateUserData = async () => {
            if (shouldUpdate) {
                await UpdateUserData();
                setShouldUpdate(false); // Reinicializa para evitar chamadas repetidas
            }
        };

        updateUserData();
    }, [shouldUpdate]);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleCancel = (dialogo) => {
        switch (dialogo) {
            case "PedindoSenha":
                setCanEdit(false);
                setSenha("");
                break;
            default:
                break;
        }

        setVisible(false);
    };

    const handleOk = async (dialogo) => {
        setErro("");

        switch (dialogo) {
            case "PedindoSenha":
                setLoading(true);
                const resp = await checkUserPassword(User.id, senha);
                setLoading(false);

                if (!resp.error) {
                    setCanEdit(true);
                } else {
                    setLoading(false);
                    setErro(resp.error ? resp.error : resp.message);
                }
                break;

            case "Editor":
                setLoading(true);
                if (newField === "pfp") {
                    if (newFieldValue !== User.pfp) {
                        if (User.pfp != 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s') {
                            let resp = await deleteImage(User.pfp);
                            // Verifique se a resposta foi bem-sucedida, não se há erro
                            if (!resp.success) {
                                console.log("Erro ao deletar imagem antiga");
                                return;  // Aqui você pode decidir como lidar com o erro
                            }
                        }

                        let resp = await uploadImage(newFieldValue, User.nome);
                        if (resp.error) {
                            console.log(resp.error);
                            return;
                        }

                        let url = resp.content["url"];
                        setNewUserData((prevUser) => ({ ...prevUser, pfp: url }));
                        setShouldUpdate(true); // Indica que deve atualizar os dados
                    }
                } else if (newField === "nome") {
                    setNewUserData((prevUser) => ({ ...prevUser, nome: newFieldValue }));
                    setShouldUpdate(true);
                } else if (newField === "email") {
                    setNewUserData((prevUser) => ({ ...prevUser, email: newFieldValue }));
                    setShouldUpdate(true);
                } else if (newField === "senha") {
                    setNewUserData((prevUser) => ({ ...prevUser, senha: newFieldValue }));
                    setShouldUpdate(true);
                }

                setVisible(false);
                break;

            default:
                break;
        }
    };

    const UpdateUserData = async () => {
        setLoading(true)
        let resposta = await updateUser(User.id, NewUserData)
        if (resposta.error) {
            console.log(resposta.error);
            setLoading(false)
            return
        }

        await AsyncStorage.setItem('usuario', resposta.content);

        let us = decodeUserToken(resposta.content)
        setUser(us)

        setLoading(false)
    }

    const selectProfilePhoto = async () => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            Alert.alert('Permissão necessária', 'Permissão para acessar a galeria é necessária!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setNewFieldValue(pickerResult.assets[0].uri);
        }
    };

    const edit = (field) => {
        setVisible(true);
        setNewField(field)

        switch (field) {
            case "pfp":
                setNewFieldValue(User.pfp);
                break;
            case "nome":
                setNewFieldValue(User.nome);
                break;
            case "email":
                setNewFieldValue(User.email);
                break;

            default:
                setNewFieldValue(senha);
                break;
        }
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
                    <TouchableOpacity
                        onPress={() => {
                            edit('pfp')
                        }}
                        style={{
                            height: 140,
                            width: 140,
                            borderRadius: 100,
                            borderWidth: 2,
                            borderColor: colorScheme.Body_bg,
                            overflow: 'hidden'
                        }}
                    >
                        <Image source={{ uri: User.pfp === NewUserData.pfp ? User.pfp : NewUserData.pfp }} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>

                    <View style={{ gap: 20, width: '100%' }} >
                        <TouchableOpacity
                            style={[styles.input, styles.editavel, { borderColor: colorScheme.Body_bg }]}
                            onPress={() => {
                                edit('nome')
                            }}
                        >
                            <Text style={{ fontSize: 20 }} >Nome : {User.nome}</Text>
                            <Feather name='edit-2' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.input, styles.editavel, { borderColor: colorScheme.Body_bg }]}
                            onPress={() => {
                                edit('email')
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
                                edit('senha')
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
                            style={isEnabled ? { borderWidth: 2, borderColor: colorScheme.Body_bg, } : { borderWidth: 2, borderColor: 'lightgray' }}

                        />
                    </View>
                </View>
            </View>

            {/* Aqui ficaram os dialogos de confirmação */}
            <>
                <Dialog.Container visible={visible}>
                    {canEdit ? (
                        <>
                            <Dialog.Title>
                                Atualizar
                                {
                                    newField === "pfp" ? " Foto" :
                                        newField === "nome" ? " Nome" :
                                            newField === "email" ? " Email" : " Senha"
                                }
                            </Dialog.Title>
                            {newField === "pfp" ? (
                                <>
                                    <TouchableOpacity onPress={selectProfilePhoto}>
                                        <Text>Selecionar nova foto</Text>
                                        {newFieldValue && (
                                            <Image source={{ uri: newFieldValue }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }} />
                                        )}
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <Dialog.Input
                                    placeholder={
                                        newField === "nome" ? "Nome" :
                                            newField === "email" ? "Email" : "Senha"
                                    }
                                    onChangeText={setNewFieldValue}
                                    value={newFieldValue}
                                />
                            )}
                            <Dialog.Description style={{ color: 'red' }}>
                                {loading ? (
                                    <ActivityIndicator size="large" color={colorScheme.Buttons.Primary} />
                                ) : erro}
                            </Dialog.Description>
                        </>
                    ) : (
                        <>
                            <Dialog.Title>Autenticação</Dialog.Title>
                            <Dialog.Description>Digite sua senha atual</Dialog.Description>
                            <Dialog.Description style={{ color: 'red' }}>
                                {loading ? (
                                    <ActivityIndicator size="large" color={colorScheme.Buttons.Primary} />
                                ) : erro}
                            </Dialog.Description>
                            <Dialog.Input
                                secureTextEntry
                                placeholder="Senha"
                                onChangeText={setSenha}
                                value={senha}
                            />
                        </>
                    )}

                    <Dialog.Button label="Cancel" onPress={() => handleCancel(canEdit ? "Editor" : "PedindoSenha")} />
                    <Dialog.Button label="OK" onPress={() => handleOk(canEdit ? "Editor" : "PedindoSenha")} />
                </Dialog.Container>
            </>
        </Modal >
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
