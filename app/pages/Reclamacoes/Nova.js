import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';

import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import CustomMapProvider from '../../components/CustomMap';

import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer'
import { InputStyles } from '../../styles/Inputs';
import { ButtonsStyles } from '../../styles/Buttons';
import Separator from '../../components/Separator';


export default function NovaReclamacao({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    const getLocation = async () => {
        try {
            let loc = await getUserLocation();
            setLocation(loc);
        } catch (error) {
            console.error("Erro ao obter localização:", error);
        }
    };

    const loadList = async () => {
        let resp = await listReports()
        if (resp.content) {
            setComplaints(resp.content)
        }
    }

    useEffect(() => {
        loadList()
        getLocation();
    }, []);

    return (
        <MainContainer>
            <View>
                <Text style={{ color: colorScheme.Text.title, fontWeight: '700', fontSize: 24, margin: 20 }}>
                    Crie uma nova reclamação
                </Text>
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                    Título
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Informe seu problema
                </Text>
                <TextInput
                    placeholder=''
                    style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Carregue uma imagem do local e/ou problema
                </Text>
                <TextInput
                    placeholder='INSIRA COMPONENTE DE FOTO AQUI'
                    style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <Separator
                    style={{ 
                        marginVertical: 20 
                    }}
                    textStyle={{
                        fontWeight: '600',
                        textTransform: 'captalize',
                        fontSize: 20,
                        color: colorScheme.Text.title
                    }}
                    color={colorScheme.Text.title}
                    texto='Informações do local'
                />

                <TextInput
                    placeholder='INSIRA COMPONENTE DE MAPA AQUI'
                    style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Número do local
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Rua *
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    CEP
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Cidade *
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    Estado *
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />
                <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                    País *
                </Text>
                <TextInput
                    placeholder='Uma descrição curta sobre o problema'
                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={[ButtonsStyles.default, colorScheme.Buttons.Primary, { marginVertical: 15, width: '45%' }]}
                    >
                        <Text style={{ color: 'white' }}> Enviar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[ButtonsStyles.default, colorScheme.Buttons.Secondary, { marginVertical: 15, width: '45%' }]}
                    >
                        <Text style={{ color: 'black' }}> Verificar endereço </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({

});
