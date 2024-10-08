import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createUser } from '../utils/Api';
import { useTheme } from '../utils/ThemeContext';

export default function CadUser({ navigation, setUser }) {
    const { colorScheme } = useTheme();
    const [Erro, setErro] = useState("")

    const [Nome, setNome] = useState("")
    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("")
    const [ConfirmarSenha, setConfirmarSenha] = useState("")
    const [Cpf, setCpf] = useState("")

    const checkData = () => {
        if (Nome == "") {
            setErro("Preencha o Nome")
            return false
        } else if (Email == "") {
            setErro("Preencha o Email")
            return false
        } else if (Cpf == "") {
            setErro("Preencha o Cpf")
            return false
        } else if (Senha == "") {
            setErro("Preencha a Senha")
            return false
        } else if (ConfirmarSenha == "") {
            setErro("Preencha o ConfirmarSenha")
            return false
        } else if (Senha != ConfirmarSenha) {
            setErro("Senhas devem ser Iguais")
            return false
        }
        return true
    }

    const Confirmar = async () => {

        if (checkData()) {

            try {
                let User = {
                    'nome': Nome,
                    'email': Email,
                    'senha': Senha,
                    'pfp': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s',
                    'cpf': Cpf,
                }

                let resp = await createUser(User)
                setErro(resp.message)

                navigation.navigate('Login', { user: resp.content });

            } catch (error) {
                setErro(error)
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
                            <Text>Nome</Text>
                            <TextInput
                                style={styles.input} placeholder='Carlão'
                                onChangeText={setNome}
                                value={Nome}
                            />
                        </View>
                        <View>
                            <Text>E-mail</Text>
                            <TextInput
                                style={styles.input} placeholder='Exemplo@exemplo.com'
                                onChangeText={setEmail}
                                value={Email}
                            />
                        </View>
                        <View>
                            <Text>Cpf</Text>
                            <TextInput
                                style={styles.input} placeholder='000.000.000-00'
                                onChangeText={setCpf}
                                value={Cpf}
                            />
                        </View>
                        <View>
                            <Text>Senha</Text>
                            <TextInput
                                style={styles.input} placeholder='jorge12320'
                                onChangeText={setSenha}
                                value={Senha}
                            />
                        </View>
                        <View>
                            <Text>Corfirmar senha</Text>
                            <TextInput
                                style={styles.input} placeholder='jorge12320'
                                onChangeText={setConfirmarSenha}
                                value={ConfirmarSenha}
                            />
                        </View>
                    </View>

                    <View style={{ gap: 10 }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ color: 'red' }} >{Erro}</Text>
                        </View>
                        <TouchableOpacity
                            style={
                                [
                                    { marginTop: 10, marginBottom: 5, padding: 10, borderRadius: 5, },
                                    { backgroundColor: colorScheme.panelBackground }
                                ]
                            }
                            onPress={Confirmar}
                        >
                            <Text style={{ textAlign: 'center', color: colorScheme.textSecondary }} >Criar usuario</Text>
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
