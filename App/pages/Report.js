import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';
import * as ImagePicker from 'expo-image-picker'; // Importar o expo-image-picker
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReport } from '../utils/Api';

export default function Report() {
    const [location, setLocation] = useState(null);
    const [img, setImg] = useState('');
    const { colorScheme } = useTheme();


    const [Titulo, setTitulo] = useState('');
    const [Descricao, setDescricao] = useState('');

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Precisamos de permissão para acessar a câmera!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log();  // Adicione isso para ver o que está sendo retornado

        if (!result.canceled) {
            setImg({ uri: result.assets[0].uri });  // Atualiza a imagem
            saveImageReference(result.assets[0].uri); // Salva a referência da imagem
        } else {
            console.log("Captura da imagem cancelada.");
        }
    };

    const saveImageReference = (uri) => {
        console.log("Imagem salva no banco: ", uri);
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
            'imagem': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s',
            'data': new Date().toISOString()
        }
        let resp = await createReport(report)
        console.log(resp);
        
    }

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation();
            setLocation(loc);
        })();
    }, [colorScheme]);

    return (
        <View style={[styles.container, { backgroundColor: 'red', width: '100%', padding: 20 }]}>
            <ScrollView style={{width: '100%', backgroundColor: 'green'}} >

                <View style={[styles.card, { marginTop: 10, height: 200 }]}>
                    <Text style={{
                        color: colorScheme.textSecondary,
                        fontWeight: 'bold',
                        fontSize: 17,
                        marginBottom: 10
                    }}> Informe o local do seu problema</Text>
                    <View style={{ width: '100%', overflow: 'hidden', borderRadius: 15, }}>
                        {
                            location ? (
                                <MapView
                                    key={colorScheme.background}
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
                                        key={colorScheme.buttonSecondary}
                                        title='Esse será o local'
                                        coordinate={{
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }}
                                        pinColor={colorScheme.buttonSecondary}
                                    />
                                </MapView>
                            ) : <View style={styles.container} ><Text>Carregando mapa</Text></View>
                        }
                    </View>

                </View>

                <View style={styles.containerBody}>
                    <View style={styles.card}>
                        <Text style={{
                            color: colorScheme.textSecondary,
                            fontWeight: 'bold',
                            fontSize: 17,
                            marginBottom: 10
                        }}> Adicione uma imagem do problema</Text>
                        <TouchableOpacity onPress={takePhoto} style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={img != '' ? img : require('../assets/placeHolder.png')} style={{ width: 300, height: 200, borderRadius: 15 }} resizeMode='contain' />

                        </TouchableOpacity>
                    </View>

                    <TextInput style={[
                        styles.input,
                        { borderColor: colorScheme.buttonPrimary }]}
                        placeholder='Título'
                        value={Titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput style={[
                        styles.input,
                        { borderColor: colorScheme.buttonPrimary, minHeight: 150 }]}
                        placeholder='Descrição do problema'
                        multiline={true}
                        value={Descricao}
                        onChangeText={setDescricao}
                    />

                    <View style={{  alignItems: 'center', margin: 20, width: '100%' }}>
                        <TouchableOpacity
                            style={[styles.btnL, styles.btnE, { backgroundColor: colorScheme.buttonPrimary, width: '100%', marginBottom: 50 }]}
                            onPress={enviar}
                        >
                            <Text style={{ color: colorScheme.textSecondary, width: '100%', textAlign: 'center' }} >Enviar reclamação</Text>
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
    },
    map: {
        width: '100%',
        height: 200,

    },
    containerHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        marginTop: 10,
        backgroundColor: '#0A62AC',
        padding: 10,
        borderRadius: 18,

    },
    containerBody: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#0A62AC'
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 5,
        width: '100%',
        marginVertical: 7
    },
    btnL: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnE: {
        justifyContent: 'center',
        borderWidth: 0
    },

});
