import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Marker } from 'react-native-maps';
import { getUserLocation } from '../../utils/LocationPermition';
import { useTheme } from '../../utils/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReport, uploadImage } from '../../utils/Api';
import decodeUserToken from '../../utils/JWT';
import OpenStreetMapComponent from '../../components/Maps';

import Feather from '@expo/vector-icons/Feather';
import AdressInput from '../../components/AdressModel';

export default function CriarReport() {
    const [location, setLocation] = useState(null);
    const [Markerlocation, setMarkerlocation] = useState(null);
    const [img, setImg] = useState('');
    const { colorScheme } = useTheme();
    const [Titulo, setTitulo] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [adress, setAdress] = useState('')

    const [modalVisible, setModalVisible] = useState(false);

    const takePhotoOrChooseFromGallery = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted' || mediaLibraryStatus !== 'granted') {
            alert('Precisamos de permissão para acessar a câmera e a galeria!');
            return;
        }

        // Pergunta ao usuário se ele quer abrir a câmera ou escolher da galeria
        Alert.alert(
            "Escolha uma opção",
            "Deseja capturar uma nova foto ou escolher da galeria?",
            [
                {
                    text: "Galeria",
                    onPress: async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setImg(result["assets"][0]);
                        }

                    }
                },
                {
                    text: "Câmera",
                    onPress: async () => {
                        let result = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setImg(result["assets"][0]);
                        }
                    }
                },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const enviar = async () => {
        let User = await AsyncStorage.getItem('usuario') || null
        let Userjson = JSON.parse(User)

        let report = {
            'user_id': Userjson.id,
            'latitude': location.latitude,
            'longitude': location.longitude,
            'titulo': Titulo,
            'conteudo': Descricao,
            'imagem': img["uri"],
            'data': new Date().toISOString(),
            'adress': `${adress.number} ${adress.street}, ${adress.city}, ${adress.state}, ${adress.zipCode}, ${adress.Country}`,
            'prioridade': 5,
        };

        let resp = await createReport(report)
        if (resp && resp.message) {
            navigation.goBack();
        }
    }

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation();
            setLocation(loc);
        })();
    }, [colorScheme]);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginTop: 20, }} >
                    <View style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]}>
                                Informe o local do seu problema
                            </Text>
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    "Info",
                                    "Selecione no mapa o local do problema, ou informe o endereço em 'informar endereço' ",
                                )
                            }} >
                                <Feather name='info' size={17} color={colorScheme.Text.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                <OpenStreetMapComponent
                                    style={styles.map}
                                    location={location}
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                    anim={false}
                                    markers={
                                        [
                                            {
                                                latitude: Markerlocation ? Markerlocation.latitude : null,
                                                longitude: Markerlocation ? Markerlocation.longitude : null,
                                                title: "Esse será o local",
                                                descricao: "Sua reclamação sera registrada aqui",
                                                props: {
                                                    pinColor: colorScheme.Button.buttonSecondary
                                                }
                                            }
                                        ]
                                    }
                                />
                            }
                        </View>

                        <TouchableOpacity
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
                            onPress={() => { setModalVisible(true) }}
                        >
                            <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary, fontSize: 12, marginTop: 10, textAlign: 'right' }]}>
                                informar endereço
                            </Text>
                            <Feather name='chevron-right' size={12} color={colorScheme.Text.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                        <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]}>
                            Adicione uma imagem do problema
                        </Text>

                        <TouchableOpacity onPress={takePhotoOrChooseFromGallery} style={styles.imageContainer}>
                            <Image
                                source={img != '' ? img : require('../../assets/placeHolder.png')}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>

                    <TextInput style={
                        [
                            styles.input,
                            { borderColor: colorScheme.Button.buttonPrimary, color: colorScheme.Text.textPrimary }
                        ]
                    }
                        placeholder='Título'
                        placeholderTextColor={colorScheme.Text.textPlaceHolder}
                        value={Titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colorScheme.Button.buttonPrimary,
                                color: colorScheme.Text.textPrimary,
                                minHeight: 150,
                                textAlignVertical: 'top',
                                padding: 10
                            }
                        ]}
                        placeholder='Descrição do problema'
                        placeholderTextColor={colorScheme.Text.textPlaceHolder}
                        multiline={true}
                        value={Descricao}
                        onChangeText={setDescricao}
                    />
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity
                            style={[styles.btnL, { backgroundColor: colorScheme.Button.buttonPrimary, width: '100%', marginBottom: 50 }]}
                            onPress={enviar}
                        >
                            <Text style={{ width: '100%', textAlign: 'center', color: colorScheme.Text.textSecondary }} >Enviar reclamação</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <AdressInput modalVisible={modalVisible} setModalVisible={setModalVisible} setAdress={setAdress} setLocation={setMarkerlocation} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    map: {
        width: '100%',
        height: 200,
    },
    inputText: {
        marginVertical: 10,
        width: '100%',
        borderWidth: 1,
        paddingLeft: 5,
    },
    card: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        minHeight: 200,
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 10
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
        marginVertical: 7,
        maxWidth: '100%'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
    btnL: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
