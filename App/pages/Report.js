import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';
import * as ImagePicker from 'expo-image-picker'; // Importar o expo-image-picker

export default function Report() {
    const [location, setLocation] = useState(null);
    const [img, setImg] = useState('');
    const { colorScheme } = useTheme();

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

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation();
            setLocation(loc);
        })();
    }, [colorScheme]);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.background }]}>
            <View style={[styles.containerHeader, { borderBottomColor: colorScheme.buttonSecondary }]}>
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

            <View style={styles.containerBody}>
                <TouchableOpacity onPress={takePhoto} style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={img != '' ? img : require('../assets/placeHolder.png')} style={{ width: 300, height: 200 }} resizeMode='contain' />
                    {img != '' ? null : <Text style={{ position: 'absolute' }}>Inserir Foto Do Local</Text>}
                </TouchableOpacity>
                <TextInput
                    placeholder='Titulo'
                    placeholderTextColor={colorScheme.textPrimary}
                    style={[styles.inputText, {
                        color: colorScheme.textPrimary,
                        borderColor: colorScheme.buttonSecondary,
                    }]}
                />
                <TextInput
                    placeholder='Descrição do problema'
                    placeholderTextColor={colorScheme.textPrimary}
                    style={[styles.inputText, {
                        color: colorScheme.textPrimary,
                        borderColor: colorScheme.buttonSecondary,
                    }]}
                />
                <Button title='Submit' />
            </View>
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
        marginVertical: 20,
        width: '80%'
    },
    containerBody: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    inputText: {
        marginVertical: 10,
        width: '100%',
        borderWidth: 1,
        paddingLeft: 5,
    },
});
