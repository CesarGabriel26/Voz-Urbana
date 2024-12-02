import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../utils/ThemeContext';
import { ButtonsStyles } from '../../styles/Buttons';
import FormInput from '../../components/forms/input'; // Importando o FormInput
import LoadingModal from '../../components/LoadingModal';
import { createUser } from '../../utils/Api';
import MainContainer from '../../components/MainContainer';

export default function SignUp({ navigation }) {
    const { colorScheme } = useTheme();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const [Erro, setErro] = useState("");
    const [Loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const { nome, email, cpf, senha, confirmarSenha } = data;

        if (senha !== confirmarSenha) {
            setErro("As senhas devem ser iguais");
            return;
        }

        try {
            setLoading(true);
            const user = { nome, email, cpf, senha, pfp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s' };
            const resp = await createUser(user);
            setErro(resp.message);

            if (!resp.error) {
                navigation.navigate('Login', { user: resp.content });
            }
        } catch (error) {
            setErro(error.message || "Erro ao criar usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer bodyBg={colorScheme.Body_bg} style={{ paddingTop: 20 }} >
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 25, flex: 1 }}>
                <Image source={require('../../assets/LogoOutile.png')} resizeMode='contain' style={{ width: 80, height: 80 }} />

                <View style={{ width: '100%', gap: 20 }}>
                    <View>
                        <FormInput
                            control={control}
                            errors={errors}
                            name="nome"
                            defaultValue=""
                            style={[styles.input, colorScheme.Inputs.LightGhost]}
                            placeholder="Nome"
                            placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            rules={{
                                required: 'Preencha o Nome',
                            }}
                            errorTextColor={colorScheme.DangerLight}
                        />
                    </View>
                    <View>
                        <FormInput
                            control={control}
                            errors={errors}
                            name="email"
                            defaultValue=""
                            style={[styles.input, colorScheme.Inputs.LightGhost]}
                            placeholder="E-mail"
                            placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            rules={{
                                required: 'Preencha o Email',
                                pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' },
                            }}
                            errorTextColor={colorScheme.DangerLight}
                        />
                    </View>

                    <View>
                        <FormInput
                            control={control}
                            errors={errors}
                            name="cpf"
                            defaultValue=""
                            style={[styles.input, colorScheme.Inputs.LightGhost]}
                            placeholder="CPF"
                            placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            rules={{ required: 'Preencha o CPF' }}
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
                            placeholder="Senha"
                            placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            secureTextEntry
                            rules={{ required: 'Preencha a Senha' }}
                            errorTextColor={colorScheme.DangerLight}
                        />
                    </View>

                    <View>
                        <FormInput
                            control={control}
                            errors={errors}
                            name="confirmarSenha"
                            defaultValue=""
                            style={[styles.input, colorScheme.Inputs.LightGhost]}
                            placeholder="Confirmar Senha"
                            placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                            secureTextEntry
                            rules={{ required: 'Confirme a Senha' }}
                            errorTextColor={colorScheme.DangerLight}
                        />
                    </View>

                    <Text style={{ color: colorScheme.DangerLight, fontWeight: 'bold' }}>{Erro}</Text>

                    <View style={{ gap: 20, width: '100%' }} >
                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={colorScheme.Buttons.Light}>Cadastrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Light]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={colorScheme.Buttons.Light}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <LoadingModal visible={Loading} />
            </View>
        </MainContainer>
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
