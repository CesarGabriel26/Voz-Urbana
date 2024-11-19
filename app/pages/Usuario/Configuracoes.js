import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer';
import { updateUser, checkUserPassword } from '../../utils/Api';
import decodeUserToken from '../../utils/JWT';
import { colorSchemas } from '../../styles/Colors';

export default function Perfil({ navigation }) {
    const { changeTheme, colorScheme } = useTheme();
    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('');
    const [editing, setEditing] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        pfp: '',
        senhaAtual: '',
        novaSenha: '',
    });
    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        pfp: '',
    });

    useEffect(() => {
        setThemes(colorSchemas());
        (async () => {
            let currentTheme = await AsyncStorage.getItem('colorSchema') || 'Light';
            setTheme(currentTheme);

            const user = decodeUserToken(await AsyncStorage.getItem('usuario')) || {};

            setUserData(user);
            setFormData({
                nome: user.nome || '',
                email: user.email || '',
                pfp: user.pfp || '',
                senhaAtual: '',
                novaSenha: '',
            });
        })();
    }, []);

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const toggleEditing = () => {
        setEditing(!editing);
        setCanEdit(false);
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('usuario');
        navigation.navigate('Login');
    };

    const handleSave = async () => {
        if (canEdit) {
            delete formData.senhaAtual;

            if (!formData.novaSenha) {
                formData.novaSenha = null;
            }

            const response = await updateUser(userData.id, formData);
            if (response.error) {
                Alert.alert('Erro', response.error);
                return;
            }

            const newToken = response.content;
            if (newToken) {
                await AsyncStorage.setItem('usuario', newToken);

                const user = decodeUserToken(newToken);

                setUserData(user);
                setFormData({
                    nome: user.nome,
                    email: user.email,
                    pfp: user.pfp,
                    senhaAtual: '',
                    novaSenha: '',
                });
            }

            toggleEditing();
        } else {
            const isPasswordValid = await checkUserPassword(userData.id, formData.senhaAtual);
            if (isPasswordValid) {
                setCanEdit(true);
            } else {
                Alert.alert('Erro', 'Senha atual incorreta.');
            }
        }
    };

    return (
        <MainContainer>
            <ScrollView style={styles.container}>
                {/* Informações do Usuário */}
                <View style={styles.profileHeader}>
                    <Image
                        source={userData.pfp ? { uri: userData.pfp } : require('../../assets/LogoHightResolution.png')}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.userName}>{userData.nome}</Text>
                        <Text style={styles.userEmail}>{userData.email}</Text>
                    </View>
                </View>

                <View>
                    <View />
                </View>

                {/* Configurações */}
                <View style={styles.options}>
                    <Text style={styles.label}>Tema:</Text>
                    <Dropdown
                        data={themes.map((theme) => ({ label: theme, value: theme }))}
                        labelField="label"
                        valueField="value"
                        value={theme}
                        placeholder="Selecione um tema"
                        placeholderStyle={{ color: colorScheme.Text.dark }}
                        selectedTextStyle={{ color: colorScheme.Text.dark }}
                        onChange={(item) => {
                            setTheme(item.value);
                            changeTheme(item.value);
                        }}
                        style={styles.dropdown}
                    />
                </View>

                {/* Botões de ação */}
                <View style={styles.actions}>
                    <Button
                        title={editing ? 'Cancelar' : 'Editar Perfil'}
                        onPress={toggleEditing}
                        color={editing ? 'red' : 'blue'}
                    />
                    <Button title="Sair" onPress={logOut} color="gray" />
                </View>

                {/* Edição de Perfil */}
                {editing && (
                    <View style={styles.editForm}>
                        {canEdit ? (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    value={formData.nome}
                                    onChangeText={(text) => handleInputChange('nome', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={formData.email}
                                    onChangeText={(text) => handleInputChange('email', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="URL da Foto de Perfil"
                                    value={formData.pfp}
                                    onChangeText={(text) => handleInputChange('pfp', text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nova Senha"
                                    secureTextEntry
                                    value={formData.novaSenha}
                                    onChangeText={(text) => handleInputChange('novaSenha', text)}
                                />
                            </>
                        ) : (
                            <TextInput
                                style={styles.input}
                                placeholder="Senha Atual"
                                secureTextEntry
                                value={formData.senhaAtual}
                                onChangeText={(text) => handleInputChange('senhaAtual', text)}
                            />
                        )}
                        <Button title="Salvar" onPress={handleSave} />
                    </View>
                )}
            </ScrollView>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 15
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
    },
    options: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    editForm: {
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
