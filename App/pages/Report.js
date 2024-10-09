import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReport, uploadImage } from '../utils/Api';

export default function Report() {
    const [location, setLocation] = useState(null);
    const [img, setImg] = useState('');
    const { colorScheme } = useTheme();
    const [Titulo, setTitulo] = useState('');
    const [Descricao, setDescricao] = useState('');

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        let User = await AsyncStorage.getItem('usuario')
        let jsonUser = JSON.parse(User)

        if (status !== 'granted') {
            alert('Precisamos de permissão para acessar a câmera!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri; // URI da imagem
            const resp = await uploadImage(uri, jsonUser.nome);

            if (resp.error) {
                console.log(resp.error);
                return
            }

            let data = resp.content["url"]

            setImg({ uri: data });
        } else {
            console.log("Captura da imagem cancelada.");
        }
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
            'aceito': false
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
                horizontal={false} // Garante rolagem apenas vertical
                showsVerticalScrollIndicator={false} // Opcional, oculta a barra de rolagem
            >
                <View style={{ marginTop: 20, }} >
                    <View style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                        <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]}>
                            Informe o local do seu problema
                        </Text>

                        <View style={{flex:1, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                            {
                                location ? (
                                    <MapView
                                        key={colorScheme.Screen.background}
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: location.latitude,
                                            longitude: location.longitude,
                                            latitudeDelta: 0.001,
                                            longitudeDelta: 0.001,
                                        }}
                                        scrollEnabled={false}
                                        zoomEnabled={false}
                                    >
                                        <Marker
                                            key={colorScheme.Button.buttonSecondary}
                                            title='Esse será o local'
                                            coordinate={{
                                                latitude: location.latitude,
                                                longitude: location.longitude
                                            }}
                                            pinColor={colorScheme.Button.buttonSecondary}
                                        />
                                    </MapView>
                                ) : (
                                    <ActivityIndicator size="large" color={colorScheme.Button.buttonSecondary} />
                                )
                            }
                        </View>
                    </View>

                    <View style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                        <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]}>
                            Adicione uma imagem do problema
                        </Text>

                        <TouchableOpacity onPress={takePhoto} style={styles.imageContainer}>
                            <Image
                                source={img != '' ? img : require('../assets/placeHolder.png')}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>

                    <TextInput style={[
                        styles.input,
                        { borderColor: colorScheme.Button.buttonPrimary }]}
                        placeholder='Título'
                        value={Titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            {
                                borderColor: colorScheme.Button.buttonPrimary,
                                minHeight: 150,
                                textAlignVertical: 'top',
                                padding: 10
                            }
                        ]}
                        placeholder='Descrição do problema'
                        multiline={true}
                        value={Descricao}
                        onChangeText={setDescricao}
                    />
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity
                            style={[styles.btnL, { backgroundColor: colorScheme.Button.buttonPrimary, width: '100%', marginBottom: 50 }]}
                            onPress={enviar}
                        >
                            <Text style={{ color: colorScheme.Text.textSecondary, width: '100%', textAlign: 'center' }} >Enviar reclamação</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
