import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import CustomMapProvider from '../../components/CustomMap';

import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer'
import { InputStyles } from '../../styles/Inputs';
import { ButtonsStyles } from '../../styles/Buttons';
import Separator from '../../components/Separator';
import AddressInput from '../../components/AdressModel';
import FormInput from '../../components/forms/input';


export default function NovaReclamacao({ navigation }) {
    const { colorScheme } = useTheme();
    const [loading, setLoading] = useState(false);

    const [complaint, setComplaint] = useState({});
    const [location, setLocation] = useState(null);

    // Para o formulário de endereço
    const [AdressModalVisible, setAdressModalVisible] = useState(false);
    const [AdressData, setAdressData] = useState(null);

    // Para o formulário de reclamação
    const {
        control: complaintControl,
        handleSubmit: handleComplaintSubmit,
        formState: { errors: complaintErrors }
    } = useForm();

    const getLocation = async () => {
        setLoading(true)
        try {
            let loc = await getUserLocation();
            setLocation(loc)
        } catch (error) {
            console.error("Erro ao obter localização:", error);
        }
        setLoading(false)
    };

    const onSubmit = async (data) => {
        setLoading(true);

        setLoading(false);
    }

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <MainContainer>
            <SafeAreaView>
                <Text style={{ color: colorScheme.Text.title, fontWeight: '700', fontSize: 24, margin: 20 }}>
                    Crie uma nova reclamação
                </Text>
                <View style={{ gap: 5 }} >
                    <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                        Título
                    </Text>
                    <FormInput
                        control={complaintControl}
                        errors={complaintErrors}
                        name="Titulo"
                        defaultValue=""
                        style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                        placeholder="Digite o titulo da sua reclamação"
                        placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                    />
                </View>

                <View style={{ gap: 5 }} >
                    <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                        Informe seu problema
                    </Text>
                    <FormInput
                        control={complaintControl}
                        errors={complaintErrors}
                        name="Conteudo"
                        defaultValue=""
                        style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                        placeholder="Descreva o seu problema"
                        placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                    />
                </View>

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

                <View style={{ gap: 15 }} >
                    <View style={{ height: 200 }}>
                        <CustomMapProvider
                            location={location}
                            style={styles.map}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            markers={
                                [
                                    {
                                        latitude: location ? location.latitude : null,
                                        longitude: location ? location.longitude : null,
                                        title: "Esse será o local",
                                        descricao: "Sua reclamação sera registrada aqui",
                                        props: {
                                            pinColor: colorScheme.Danger
                                        }
                                    }
                                ]
                            }
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
                    >
                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Primary]}
                            onPress={handleComplaintSubmit(onSubmit)}
                        >
                            <Text style={{ color: 'white' }}> Enviar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Secondary]}
                            onPress={() => { setAdressModalVisible(true) }}
                        >
                            <Text style={{ color: 'black' }}> Inserir Endereço </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <AddressInput
                    setModalVisible={setAdressModalVisible}
                    modalVisible={AdressModalVisible}
                    setAdress={setAdressData}
                    setLocation={setLocation}
                />
            </SafeAreaView>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden'
    },
});

