import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createUser } from '../../utils/Api';
import { useTheme } from '../../utils/ThemeContext';
import { ButtonsStyles } from '../../styles/Buttons';
import LoadingModal from '../../components/LoadingModal';

export default function SingUp({ navigation, setUser }) {
    const { colorScheme } = useTheme();
    const [Erro, setErro] = useState("")
    const [Loading, setLoading] = useState(false);

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
                setLoading(true)
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
            setLoading(false)
        }

        let interval = setInterval(() => {
            setErro("")
            clearInterval(interval)
        }, 1500);
    }

    return (
        <ScrollView style={{ backgroundColor: colorScheme.Body_bg }} contentContainerStyle={styles.scrollViewContent}>
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ gap: 25, width: '100%' }}>
                    <View style={{ display: 'flex', alignItems: 'center' }} >
                        <Image source={require('../../assets/LogoOutile.png')} resizeMode='contain' style={{
                            width: 80,
                            height: 80
                        }} />
                    </View>

                    <View style={{ gap: 25 }} >
                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>Nome</Text>
                            <TextInput
                                placeholder='Carlão'
                                onChangeText={setNome}
                                value={Nome}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            />
                        </View>
                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>E-mail</Text>
                            <TextInput
                                placeholder='Exemplo@exemplo.com'
                                onChangeText={setEmail}
                                value={Email}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            />
                        </View>
                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>Cpf</Text>
                            <TextInput
                                placeholder='000.000.000-00'
                                onChangeText={setCpf}
                                value={Cpf}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            />
                        </View>
                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>Senha</Text>
                            <TextInput
                                placeholder='jorge12320'
                                onChangeText={setSenha}
                                value={Senha}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            />
                        </View>
                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>Corfirmar senha</Text>
                            <TextInput
                                placeholder='jorge12320'
                                onChangeText={setConfirmarSenha}
                                value={ConfirmarSenha}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            />
                        </View>
                    </View>

                    <View style={{ gap: 10 }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: colorScheme.Danger, fontWeight: 'bold' }}>{Erro}</Text>
                            <LoadingModal visible={Loading} />
                        </View>
                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={Confirmar}
                        >
                            <Text style={colorScheme.Buttons.Light}>singUp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={()=>{
                                navigation.goBack()
                            }}
                        >
                            <Text style={colorScheme.Buttons.Light}>voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>

    );
}


const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1, // Permite que o conteúdo ocupe todo o espaço disponível
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        paddingHorizontal: 40, // Ajusta a margem interna
        paddingVertical: 15, // Caso você precise de um espaço adicional superior/inferior
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
    }
});
