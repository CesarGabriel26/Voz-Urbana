import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../utils/Api';
import { ButtonsStyles } from '../../styles/Buttons';
import { useTheme } from '../../utils/ThemeContext';
import LoadingModal from '../../components/LoadingModal';
import FormInput from '../../components/forms/input';

export default function Login({ navigation, route }) {
    const { colorScheme } = useTheme();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const checkUser = async () => {
        let User = await AsyncStorage.getItem('usuario');
        if (User != null) {
            route.params.initializeUser();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    };

    useEffect(() => {
        if (route.params && route.params.user) {
            const { email, senha } = route.params.user;
            setValue('email', email);
            setValue('senha', senha);
        }

        checkUser();
    }, [route.params]);

    const Confirmar = async (data) => {
        const { email, senha } = data;
        setLoading(true);
        let resp = await loginUser(email, senha);
        setLoading(false);

        if (resp.error) {
            setErro(resp.error);
        } else {
            await AsyncStorage.setItem('usuario', JSON.stringify(resp.content));
            route.params.initializeUser();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
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
                            style={{ width: 80, height: 80 }}
                            onError={(error) => console.error('Image Error:', error.nativeEvent)}
                        />
                    </View>

                    <View style={{ gap: 25 }}>
                        <View>
                            <FormInput
                                control={control}
                                errors={errors}
                                name="email"
                                defaultValue=""
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholder="Exemplo@exemplo.com"
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                rules={{ required: 'Preencha o Email' }}
                                errorTextColor={colorScheme.DangerLight}
                            />
                        </View>

                        <View>
                            <FormInput
                                control={control}
                                errors={errors}
                                name="senha"
                                defaultValue=""
                                style={[styles.input, colorScheme.Inputs.LightGhost]}
                                placeholder="Exemplo123"
                                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                secureTextEntry
                                rules={{ required: 'Preencha a Senha' }}
                                errorTextColor={colorScheme.DangerLight}
                            />
                        </View>
                    </View>

                    <View style={{ gap: 15, display: 'flex', alignItems: 'center' }}>
                        <TouchableOpacity style={[ButtonsStyles.btn, ButtonsStyles.j_betwen, colorScheme.Buttons.Light]}>
                            <Text>Login com Google</Text>
                            <Ionicons name='logo-google' size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[ButtonsStyles.btn, ButtonsStyles.j_betwen, colorScheme.Buttons.Light]}>
                            <Text>Login com Facebook</Text>
                            <Ionicons name='logo-facebook' size={25} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 15 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: colorScheme.Danger, fontWeight: 'bold' }}>{erro}</Text>
                            <LoadingModal visible={loading} />
                        </View>

                        <TouchableOpacity
                            style={[ButtonsStyles.btn, ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={handleSubmit(Confirmar)}
                        >
                            <Text style={colorScheme.Buttons.Light}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ButtonsStyles.btn, ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={() => navigation.navigate('SingUp')}
                        >
                            <Text style={colorScheme.Buttons.Light}>Cadastro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 15,
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
    },
});
