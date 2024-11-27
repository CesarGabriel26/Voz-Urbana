import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import CustomMapProvider from '../../components/CustomMap';

import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer'
import { InputStyles } from '../../styles/Inputs';
import { ButtonsStyles } from '../../styles/Buttons';
import Separator from '../../components/Separator';
import AddressInput from '../../components/AdressModel';
import FormInput from '../../components/forms/input';
import TakePhotoOrChooseFromGallery from '../../components/forms/imagePicker';
import { loadCurrentUserData } from '../../managers/userController';
import LoadingModal from '../../components/LoadingModal';
import { createReport } from '../../utils/Api';
import { categories } from '../../utils/Constantes';

export default function NovaReclamacao({ navigation }) {
    const { colorScheme } = useTheme();
    
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState(null);

    // Para o formulário de endereço
    const [AdressModalVisible, setAdressModalVisible] = useState(false);
    const [AdressData, setAdressData] = useState(null);

    // Para obter a imagem
    const [selectedImage, setSelectedImage] = useState("https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder.png?ssl=1")
    const [imageModalVisible, setImageModalVisible] = useState(false);

    // Para obter a categoria
    const [selectedCategory, setSelectedCategory] = useState('Não Especificada');


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
        let currentUserData = await loadCurrentUserData()
        
        let complaintData = {
            user_id: currentUserData[0].id,
            latitude: location.latitude,
            longitude: location.longitude,
            titulo: data.titulo, // Mantendo conforme seu projeto
            conteudo: data.conteudo, // Descrição ou conteúdo
            imagem: selectedImage.uri? selectedImage.uri: selectedImage, // Acesso ao URI da imagem
            data: new Date().toISOString(), // Formato ISO para a data
            adress: AdressData? `${AdressData.number} ${AdressData.street}, ${AdressData.city}, ${AdressData.state}, ${AdressData.zipCode}, ${AdressData.country}` : 'Não especificado',
            prioridade: 0, // Setando prioridade como no exemplo
            categoria: selectedCategory,
        };

        let resp = await createReport(complaintData);

        if (resp && resp.message) {
            setLoading(false);
            navigation.goBack();
        } else {
            console.log(resp.error);
        }
    }

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <MainContainer>
            <SafeAreaView>
                <Text style={{ color: colorScheme.Text.title, fontWeight: '700', fontSize: 20, marginVertical: 20, textAlign: 'center' }}>
                    Crie uma nova reclamação
                </Text>
                <View style={{ gap: 5 }} >
                    <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                        Título
                    </Text>
                    <FormInput
                        control={complaintControl}
                        errors={complaintErrors}
                        name="titulo"
                        defaultValue=""
                        style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                        placeholder="Digite o titulo da sua reclamação"
                        placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                        rules={{ required: 'o titulo é obrigatorio' }}
                    />
                </View>

                <View style={{ gap: 5 }} >
                    <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                        Informe seu problema
                    </Text>
                    <FormInput
                        control={complaintControl}
                        errors={complaintErrors}
                        name="conteudo"
                        defaultValue=""
                        style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost]}
                        placeholder="Descreva o seu problema"
                        placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                        numberOfLines={10}
                        multiline={true}
                        rules={{ required: 'o conteudo é obrigatorio' }}
                    />
                </View>

                <View style={{ gap: 5 }}>
                    <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                        Escolha uma Categoria
                    </Text>
                    <View style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost, { padding: 0 }]}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            style={{ width: '100%', height: 50, padding: 0, overflow: 'hidden' }} // Garante que o Picker ocupe todo o espaço da View
                            dropdownIconColor={colorScheme.Text.title}
                        >
                            {categories.map((category) => (
                                <Picker.Item key={category} label={category} value={category} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ gap: 5 }} >
                    <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20, marginTop: 20 }}>
                        Carregue uma imagem do local e/ou problema
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setImageModalVisible(true)
                        }}
                        style={[InputStyles.inputTall, colorScheme.Inputs.PrimaryGhost, { padding: 0, overflow: 'hidden' }]}
                    >
                        <Image
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            source={{
                                uri: selectedImage
                            }}
                        />
                    </TouchableOpacity>
                </View>

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

            <TakePhotoOrChooseFromGallery
                setImage={setSelectedImage}
                modalVisible={imageModalVisible}
                setModalVisible={setImageModalVisible}
            />
            <LoadingModal visible={loading} />
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

