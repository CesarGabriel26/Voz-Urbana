import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../utils/Api';
import { ButtonsStyles } from '../../styles/Buttons';
import { useTheme } from '../../utils/ThemeContext';
import LoadingModal from '../../components/LoadingModal';

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
    }, [route.params]);

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
        <ScrollView style={{ backgroundColor: colorScheme.Body_bg }} contentContainerStyle={styles.scrollViewContent}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ gap: 25, width: '100%' }}>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/LogoOutile.png')}
                            resizeMode='contain'
                            style={{
                                width: 80,
                                height: 80,
                            }}
                            onError={(error) => console.error('Image Error:', error.nativeEvent)}
                        />
                    </View>

                    <View style={{ gap: 25 }}>
                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>E-mail</Text>
                            <TextInput
                                placeholder='Exemplo@exemplo.com'
                                onChangeText={setEmail}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                value={Email}
                            />
                        </View>

                        <View>
                            <Text style={colorScheme.Inputs.LightGhost}>Senha</Text>
                            <TextInput
                                placeholder='Exemplo123'
                                onChangeText={setSenha}
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                value={Senha}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={{ gap: 15, display: 'flex', alignItems: 'center' }}>
                        <TouchableOpacity style={[ButtonsStyles.j_betwen, colorScheme.Buttons.Light]}>
                            <Text>Login com Google</Text>
                            <Ionicons name='logo-google' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[ButtonsStyles.j_betwen, colorScheme.Buttons.Light]}>
                            <Text>Login com Facebook</Text>
                            <Ionicons name='logo-facebook' size={25} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 15 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: colorScheme.Danger, fontWeight: 'bold' }}>{Erro}</Text>
                            <LoadingModal visible={Loading} />
                        </View>

                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={Confirmar}>
                            <Text style={colorScheme.Buttons.Light}>entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={() => {
                                navigation.navigate('SingUp');
                            }}>
                            <Text style={colorScheme.Buttons.Light}>cadastro</Text>
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
