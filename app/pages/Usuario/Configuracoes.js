import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, ScrollView, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer';
import { updateUser, checkUserPassword } from '../../utils/Api';
import decodeUserToken from '../../utils/JWT';
import { colorSchemas } from '../../styles/Colors';
import Separator from '../../components/Separator';
import { ButtonsStyles } from '../../styles/Buttons';
import Avatar from '../../components/UserAvatar';

export default function Perfil({ navigation }) {
    const { changeTheme, colorScheme } = useTheme();

    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('');
    const [editing, setEditing] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);

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

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <MainContainer>
            <ScrollView style={styles.container}>
                {/* Informações do Usuário */}
                <View style={styles.profileHeader}>
                    <Avatar
                        uri = {userData.pfp}
                        text={userData.nome + " profile pcture"}
                        size="md"
                        shape="square"
                    />

                    <View>
                        <Text style={[styles.userName, {color: colorScheme.Text.text}]}>{userData.nome}</Text>
                        <Text style={[styles.userEmail, {color: colorScheme.Text.placeHolder}]}>{userData.email}</Text>
                    </View>
                </View>


                <Separator texto='Informações do Usuário' color={colorScheme.Text.placeHolder} />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ maxWidth: 100, color: colorScheme.Text.text }}>CPF: </Text>
                    <Text style={{ maxWidth: 100, color: colorScheme.Text.text }}>{userData.cpf}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ maxWidth: 100, color: colorScheme.Text.text }}>Tipo: </Text>
                    <Text style={{ maxWidth: 100, color: colorScheme.Text.text }}>{userData.type === 1 ? "Admin" : "User"}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ maxWidth: 200, color: colorScheme.Text.text }}>Última Atualização: </Text>
                    <Text style={{ maxWidth: 100, color: colorScheme.Text.text }}>{new Date(userData.updated_at).toLocaleDateString()}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ maxWidth: 200, color: colorScheme.Text.text }}>Data de Criação: </Text>
                    <Text style={{ maxWidth: 100, color: colorScheme.Text.text }}>{new Date(userData.created_at).toLocaleDateString()}</Text>
                </View>

                <Separator texto='Configurações' color={colorScheme.Text.placeHolder} />

                {/* Configurações */}
                <View style={{ gap: 10 }} >
                    <View>
                        <Text style={[styles.label, {color: colorScheme.Text.text}]}>Tema:</Text>
                        <Dropdown
                            data={themes.map((theme) => ({ label: theme, value: theme }))}
                            labelField="label"
                            valueField="value"
                            value={theme}
                            placeholder="Selecione um tema" 
                            placeholderStyle={{ color: colorScheme.DropDown.color }}
                            selectedTextStyle={{ color: colorScheme.DropDown.color }}
                            onChange={(item) => {
                                setTheme(item.value);
                                changeTheme(item.value);
                            }}
                            style={styles.dropdown}
                        />
                    </View>
                    <View>
                        <Text style={[styles.label, {color: colorScheme.Text.text}]}>Lingua:</Text>
                        <Dropdown
                            data={[
                                "Portugues",
                                "Ingles",
                                "Espanhol"
                            ].map((theme) => ({ label: theme, value: theme }))}
                            labelField="label"
                            valueField="value"
                            value={"Portugues"}
                            placeholder="Selecione uma linguagem"
                            placeholderStyle={{ color: colorScheme.DropDown.color }}
                            selectedTextStyle={{ color: colorScheme.DropDown.color }}
                            onChange={(item) => {
                                console.log(item);
                            }}
                            style={styles.dropdown}
                        />
                    </View>
                    <View>
                        <View style={[styles.dropdown, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                            <Text style={[styles.label, { maxWidth: 150, color: colorScheme.Text.text }]}>Usuario Anonimo:</Text>
                            <Switch
                                trackColor={{ false: 'gray', true: 'gray' }}
                                thumbColor={colorScheme.Switch.thumbColor[isEnabled]}
                                ios_backgroundColor={colorScheme.Switch.ios_backgroundColor}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={{
                                    margin: 0,
                                    width: 50,
                                    height: 20,
                                }}
                            />
                        </View>
                    </View>
                </View>

                <Separator color={colorScheme.Text.placeHolder} style={{ marginVertical: 20 }} />

                {/* Botões de ação */}
                <View style={styles.actions}>
                    <TouchableOpacity

                        onPress={toggleEditing}
                        style={[
                            ButtonsStyles.default,
                            colorScheme.Buttons.Primary,
                            { backgroundColor: "#0d6efd" }
                        ]}
                    >
                        <Text
                            style={{ color: 'white' }}
                        >
                            {editing ? 'Cancelar' : 'Editar Perfil'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={logOut}
                        style={[
                            ButtonsStyles.default,
                            { backgroundColor: colorScheme.Danger }
                        ]}
                    >
                        <Text
                            style={{ color: 'white' }}
                        >
                            Sair
                        </Text>
                    </TouchableOpacity>
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
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
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
        gap: 10,
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
