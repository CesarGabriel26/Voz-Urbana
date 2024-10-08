import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../utils/ThemeContext';
import { loginUser } from '../utils/Api';

export default function Login({ navigation, route }) {
    const { colorScheme } = useTheme();

    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("")

    const [Erro, setErro] = useState("")

    const [User, setLocalUser] = useState({})

    const checkUser = async () => {
        // await AsyncStorage.removeItem('usuario')
        // await AsyncStorage.setItem('colorSchema', 'MainTheme');

        let User = await AsyncStorage.getItem('usuario') || null
        if (User != null) {
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        if (route.params) {
            setLocalUser(route.params.user)
            setEmail(User.email)
            setSenha(User.senha)
        }

        checkUser()
    })

    const Confirmar = async () => {
        if (Email != "" && Senha != "") {
            let resp = await loginUser(Email, Senha)

            setErro(resp.message)
            await AsyncStorage.setItem('usuario', JSON.stringify(resp.content));

            navigation.navigate('Home');
        } else {
            if (Email == "") {
                setErro("Preencha o Email")
                return
            }

            if (Senha == "") {
                setErro("Preencha a Senha")
                return
            }
        }

        let interval = setInterval(() => {
            setErro("")
            clearInterval(interval)
        }, 1500);
    }

    return (
        <View >
            <ScrollView>

                <View style={[styles.container]}>
                    <View style={{ display: 'flex', alignItems: 'center' }} >
                        <Image source={require('../assets/LogoHightResolution.png')} resizeMode='contain' style={{
                            width: 80,
                            height: 80
                        }} />
                    </View>

                    <View style={{ gap: 25 }} >
                        <View>
                            <Text>E-mail</Text>
                            <TextInput
                                style={[styles.input, { borderColor: colorScheme.buttonPrimary }]} placeholder='Exemplo@exemplo.com'
                                onChangeText={setEmail}
                                value={Email}
                            />
                        </View>

                        <View>
                            <Text>Senha</Text>
                            <TextInput
                                style={[styles.input, { borderColor: colorScheme.buttonPrimary }]} placeholder='Exemplo123'
                                onChangeText={setSenha}
                                value={Senha}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={{ gap: 15 }} >
                        <TouchableOpacity style={[styles.btnL, { borderColor: colorScheme.buttonPrimary }]} >
                            <Text>Login com Google</Text>
                            <Ionicons name='logo-google' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnL, { borderColor: colorScheme.buttonPrimary }]} >
                            <Text>Login com Facebook</Text>
                            <Ionicons name='logo-facebook' size={25} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 15 }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ color: 'red' }} >{Erro}</Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.btnL, styles.btnE, { backgroundColor: colorScheme.buttonPrimary }]}
                            onPress={Confirmar}>
                            <Text style={{ color: colorScheme.textSecondary }} >ENTRA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnL, styles.btnE, { backgroundColor: colorScheme.buttonPrimary }]}
                            onPress={() => {
                                navigation.navigate('Cadastro')
                            }}>
                            <Text style={{ color: colorScheme.textSecondary }} >CADSATRO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 40,
        justifyContent: 'center',
        gap: 25,
        paddingTop: 15
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5
    },
    btnL: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnE: {
        justifyContent: 'center',
        borderWidth: 0
    }
});
