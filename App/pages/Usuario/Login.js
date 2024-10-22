import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../utils/ThemeContext';
import { loginUser } from '../../utils/Api';

export default function Login({ navigation, route }) {
    const { colorScheme } = useTheme();
    const [Loading, setLoading] = useState(false);

    const [Email, setEmail] = useState("");
    const [Senha, setSenha] = useState("");

    const [Erro, setErro] = useState("");

    const checkUser = async () => {
        let User = await AsyncStorage.getItem('usuario');
        if (User != null) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    };

    useEffect(() => {
        if (route.params && route.params.user) {
            const { email, senha } = route.params.user;
            setEmail(email);
            setSenha(senha);
        }

        checkUser();
    }, [route.params]); // Adiciona dependências para executar corretamente

    const Confirmar = async () => {
        if (Email !== "" && Senha !== "") {
            setLoading(true)
            let resp = await loginUser(Email, Senha);
            setLoading(false)

            if (resp.error) {
                setErro(resp.error);
            } else {
                await AsyncStorage.setItem('usuario', JSON.stringify(resp.content));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        } else {
            setErro(Email === "" ? "Preencha o Email" : "Preencha a Senha");
        }

        setTimeout(() => {
            setErro("");
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            <ScrollView>
                <View style={{ gap: 25 }}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/LogoHightResolution.png')}
                            resizeMode='contain'
                            style={{
                                width: 80,
                                height: 80,
                            }}
                        />
                    </View>

                    <View style={{ gap: 25 }}>
                        <View>
                            <Text>E-mail</Text>
                            <TextInput
                                placeholder='Exemplo@exemplo.com'
                                onChangeText={setEmail}
                                style={[styles.input, { borderColor: colorScheme.Button.buttonPrimary, color: colorScheme.Text.textPrimary }]}
                                placeholderTextColor={colorScheme.Text.textPlaceHolder}
                                value={Email}
                            />
                        </View>

                        <View>
                            <Text>Senha</Text>
                            <TextInput
                                style={[styles.input, { borderColor: colorScheme.Button.buttonPrimary, color: colorScheme.Text.textPrimary }]}
                                placeholder='Exemplo123'
                                onChangeText={setSenha}
                                placeholderTextColor={colorScheme.Text.textPlaceHolder}
                                value={Senha}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={{ gap: 15 }}>
                        <TouchableOpacity style={[styles.btnL, { borderColor: colorScheme.Button.buttonPrimary }]}>
                            <Text style={{ color: colorScheme.Text.textPrimary }}>Login com Google</Text>
                            <Ionicons name='logo-google' size={25} color={colorScheme.Text.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnL, { borderColor: colorScheme.Button.buttonPrimary }]}>
                            <Text style={{ color: colorScheme.Text.textPrimary }}>Login com Facebook</Text>
                            <Ionicons name='logo-facebook' size={25} color={colorScheme.Text.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 15 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {
                                Loading ? (
                                    <ActivityIndicator size="large" color={colorScheme.Button.buttonPrimary} />
                                ) : (
                                    <Text style={{ color: 'red' }}>{Erro}</Text>
                                )
                            }
                        </View>

                        <TouchableOpacity
                            style={[styles.btnL, styles.btnE, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                            onPress={Confirmar}>
                            <Text style={{ color: colorScheme.Text.textSecondary }}>ENTRAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnL, styles.btnE, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                            onPress={() => {
                                navigation.navigate('Cadastro');
                            }}>
                            <Text style={{ color: colorScheme.Text.textSecondary }}>CADASTRO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 40,
        justifyContent: 'center',
        paddingTop: 15,
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
    },
    btnL: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnE: {
        justifyContent: 'center',
        borderWidth: 0,
    },
});
