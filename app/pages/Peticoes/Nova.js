import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

import MainContainer from '../../components/MainContainer';
import FormInput from '../../components/forms/input';
import { useTheme } from '../../utils/ThemeContext';
import { ButtonsStyles } from '../../styles/Buttons';
import { InputStyles } from '../../styles/Inputs';
import LoadingModal from '../../components/LoadingModal';
import { loadCurrentUserData } from '../../managers/userController';
import { createPetition } from '../../utils/Api';

export default function NovaPeticao({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { colorScheme } = useTheme();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true)

        try {
            let User = await loadCurrentUserData()

            const formToSend = {
                'user_id': User[0].id,
                'titulo': data.titulo,
                'content': data.conteudo,
                'required_signatures': data.assinaturas,
                'local': data.local,
            };

            let resp = await createPetition(formToSend)
            if (resp.error) {
                console.log(resp.error);
            } else {
                navigation.goBack()
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    };

    return (
        <MainContainer>
            <Text style={[styles.title, { color: colorScheme.Text.title }]}>Causa/Petição</Text>
            <FormInput
                control={control}
                errors={errors}
                name="titulo"
                defaultValue=""
                style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                placeholder="Digite o título da petição"
                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                rules={{ required: 'O título é obrigatório' }}
            />

            <Text style={[styles.title, { color: colorScheme.Text.title }]}>Local</Text>
            <FormInput
                control={control}
                errors={errors}
                name="local"
                defaultValue=""
                style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                placeholder="Informe o local"
                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                rules={{ required: 'O local é obrigatório' }}
            />

            <Text style={[styles.title, { color: colorScheme.Text.title }]}>Assinaturas Necessárias</Text>
            <FormInput
                control={control}
                errors={errors}
                name="assinaturas"
                defaultValue="1000"
                style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                placeholder="Número de assinaturas"
                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                keyboardType="numeric"
                rules={
                    {
                        required: 'O número de assinaturas é obrigatório',
                        min: {
                            value: 1000,
                            message: "dever ser maior ou igual a 1000"
                        },
                    }
                }
            />

            <Text style={[styles.title, { color: colorScheme.Text.title }]}>Explique o motivo detalhadamente</Text>
            <FormInput
                control={control}
                errors={errors}
                name="conteudo"
                defaultValue=""
                style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                placeholder="Descreva o seu problema"
                placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                multiline
                numberOfLines={6}
                rules={{ required: 'A descrição é obrigatória' }}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[ButtonsStyles.default, colorScheme.Buttons.Primary, styles.button]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={colorScheme.Buttons.Primary}>Enviar</Text>
                </TouchableOpacity>
            </View>

            <LoadingModal visible={loading} />
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
