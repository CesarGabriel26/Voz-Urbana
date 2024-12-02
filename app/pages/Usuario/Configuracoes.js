import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
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
import LoadingModal from '../../components/LoadingModal';
import FormInput from '../../components/forms/input';
import { useForm } from 'react-hook-form';

export default function Perfil({ navigation }) {
    const { changeTheme, colorScheme } = useTheme();
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    const [themes, setThemes] = useState([]);
    const [theme, setTheme] = useState('light');
    const [editing, setEditing] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        pfp: '',
    });

    useEffect(() => {
        setThemes(colorSchemas());
        (async () => {
            setLoading(true)
            try {
                let currentTheme = await AsyncStorage.getItem('colorSchema') || 'Light';
                setTheme(currentTheme);

                const user = decodeUserToken(await AsyncStorage.getItem('usuario')) || {};
                setUserData(user);

                setValue('nome', user.nome || '');
                setValue('email', user.email || '');
                setValue('pfp', user.pfp || '');
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        })();
    }, []);

    const toggleEditing = () => {
        setEditing(!editing);
        setCanEdit(false);
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('usuario');
        changeTheme('light')
        navigation.navigate('Login');
    };

    const toggleSwitch = async (v) => {
        setLoading(true)
        try {
            let dt = {
                nome: userData.nome,
                email: userData.email,
                cpf: userData.cpf,
                pfp: userData.pfp,
                anonimo: v
            }

            const response = await updateUser(userData.id, dt);
            if (response.error) {
                Alert.alert('Erro', response.error);
                return;
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
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

    const onSubmit = async (data) => {
        if (canEdit) {
            // const response = await updateUser(userData.id, {
            //     ...data,
            //     novaSenha: data.novaSenha || null,
            // });

            // if (response.error) {
            //     Alert.alert('Erro', response.error);
            //     return;
            // }

            // const newToken = response.content;
            // if (newToken) {
            //     await AsyncStorage.setItem('usuario', newToken);
            //     const user = decodeUserToken(newToken);
            //     setUserData(user);
            //     setValue('nome', user.nome);
            //     setValue('email', user.email);
            //     setValue('pfp', user.pfp);
            // }
            console.log(data);

            toggleEditing();
        } else {
            const isPasswordValid = await checkUserPassword(userData.id, data.senhaAtual);
            if (isPasswordValid) {
                setCanEdit(true);
            } else {
                Alert.alert('Erro', 'Senha atual incorreta.');
            }
        }
    };

    return (
        <MainContainer style={styles.container} >
            <>
                {/* Informações do Usuário */}
                <View style={styles.profileHeader}>
                    <Avatar
                        uri={userData.pfp}
                        text={userData.nome + " profile pcture"}
                        size="md"
                        shape="square"
                    />

                    <View>
                        <Text style={[styles.userName, { color: colorScheme.Text.text }]}>{userData.nome}</Text>
                        <Text style={[styles.userEmail, { color: colorScheme.Text.placeHolder }]}>{userData.email}</Text>
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
                    <Dropdown
                        data={themes.map((theme) => ({ label: `Tema: ${theme}`, value: theme }))}
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
                    <Dropdown
                        data={[
                            "Portugues",
                            "Ingles",
                            "Espanhol"
                        ].map((theme) => ({ label: `Lingua: ${theme}`, value: theme }))}
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
                    <View style={[styles.dropdown, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                        <Text style={[styles.label, { maxWidth: 150, color: colorScheme.Text.text }]}>Usuario Anonimo:</Text>
                        <Switch
                            trackColor={{ false: 'gray', true: 'gray' }}
                            thumbColor={colorScheme.Switch.thumbColor[isEnabled]}
                            ios_backgroundColor={colorScheme.Switch.ios_backgroundColor}
                            onValueChange={(value) => {
                                setIsEnabled(value);
                                toggleSwitch(value)
                            }}
                            value={isEnabled}
                            style={{
                                margin: 0,
                                width: 50,
                                height: 20,
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Ajuda')
                        }}
                        style={[styles.dropdown]}
                    >
                        <Text style={[styles.label, { color: colorScheme.Text.text, fontSize: 15 }]}>
                            Ajuda / Perguntas frequentes
                        </Text>
                    </TouchableOpacity>
                </View>

                <Separator color={colorScheme.Text.placeHolder} style={{ marginVertical: 20 }} />

                {/* Botões de ação */}
                <View style={styles.actions}>
                    <TouchableOpacity

                        onPress={toggleEditing}
                        style={[
                            ButtonsStyles.default,
                            colorScheme.Buttons.Primary,
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
            </>


            {/* Edição de Perfil */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editing}
                onRequestClose={() => setEditing(false)}
            >
                <MainContainer>
                    <Text style={{ color: colorScheme.Text.text, fontSize: 20, textAlign: 'center', fontWeight: 'bold' }} >Edição De Perfil</Text>
                    <View style={[styles.editForm, { gap: 5 }]}>
                        {
                            canEdit ? (
                                <View style={{ gap: 5 }}>
                                    <View style={{ gap: 5 }} >
                                        <Text style={{ color: colorScheme.Text.text }} >Nome</Text>
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="nome"
                                            placeholder="Nome"
                                            placeholderTextColor={colorScheme.Inputs.DarkGhost.placeHolder}
                                            style={[styles.input, colorScheme.Inputs.DarkGhost]}
                                            rules={{ required: 'Preencha o Nome' }}
                                        />
                                    </View>
                                    <View style={{ gap: 5 }} >
                                        <Text style={{ color: colorScheme.Text.text }} >E-mail</Text>
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="email"
                                            placeholder="Email"
                                            placeholderTextColor={colorScheme.Inputs.DarkGhost.placeHolder}
                                            style={[styles.input, colorScheme.Inputs.DarkGhost]}
                                            rules={{ required: 'Preencha o Email' }}
                                        />
                                    </View>
                                    <View style={{ gap: 5 }} >
                                        <Text style={{ color: colorScheme.Text.text }} >Url pfp (caso não queira fazer upload)</Text>
                                        <View>
                                            <FormInput
                                                control={control}
                                                errors={errors}
                                                name="pfp"
                                                placeholder="URL da Foto de Perfil"
                                                placeholderTextColor={colorScheme.Inputs.DarkGhost.placeHolder}
                                                style={[styles.input, colorScheme.Inputs.DarkGhost]}
                                            />
                                            <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }} >
                                                <Image
                                                    source={{
                                                        uri: watch('pfp')
                                                    }}
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        margin: 0
                                                    }}
                                                />
                                                <View style={{ flex: 1, justifyContent: 'space-around' }} >
                                                    <TouchableOpacity
                                                        onPress={() => setEditing(false)}
                                                        style={[
                                                            ButtonsStyles.default,
                                                            colorScheme.Buttons.BootstrapDanger
                                                        ]}
                                                    >
                                                        <Text style={{ color: colorScheme.Buttons.BootstrapDanger.color }}>Remover</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => setEditing(false)}
                                                        style={[
                                                            ButtonsStyles.default,
                                                            colorScheme.Buttons.Primary
                                                        ]}
                                                    >
                                                        <Text style={{ color: colorScheme.Buttons.Primary.color }}>Carregar</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ gap: 5 }} >
                                        <Text style={{ color: colorScheme.Text.text }} >Nova senha</Text>
                                        <FormInput
                                            control={control}
                                            errors={errors}
                                            name="novaSenha"
                                            placeholder="Nova Senha"
                                            placeholderTextColor={colorScheme.Inputs.DarkGhost.placeHolder}
                                            secureTextEntry
                                            style={[styles.input, colorScheme.Inputs.DarkGhost]}
                                        />
                                    </View>
                                </View>
                            ) : (
                                <View style={{ gap: 5 }}>
                                    <Text style={{ color: colorScheme.Text.text }} >Insira a senha atual</Text>
                                    <FormInput
                                        control={control}
                                        errors={errors}
                                        name="senhaAtual"
                                        placeholder="Senha Atual"
                                        placeholderTextColor={colorScheme.Inputs.DarkGhost.placeHolder}
                                        secureTextEntry
                                        style={[styles.input, colorScheme.Inputs.DarkGhost]}
                                        rules={{ required: 'Preencha a Senha Atual' }}
                                    />
                                </View>
                            )}

                        <View style={{ gap: 20 }}>
                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                style={[
                                    ButtonsStyles.default,
                                    colorScheme.Buttons.Primary
                                ]}
                            >
                                <Text style={{ color: colorScheme.Buttons.Primary.color }}> Salvar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setEditing(false)}
                                style={[
                                    ButtonsStyles.default,
                                    colorScheme.Buttons.Primary
                                ]}
                            >
                                <Text style={{ color: colorScheme.Buttons.Primary.color }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </MainContainer>
            </Modal>

            <LoadingModal visible={loading} />
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
        paddingVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
