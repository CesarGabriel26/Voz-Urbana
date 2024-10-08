import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';

export default function Home({ navigation }) {
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

    useEffect(() => {
        getLocation();
    }, []);  // Adicione um array vazio para executar o `useEffect` apenas uma vez


    return (
        <View style={[styles.container, {}]}>
            <ScrollView >
                <View style={
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '100%',
                        flexWrap: 'wrap',
                        gap: 20,
                        marginTop: 30,
                        paddingHorizontal: 30
                    }
                }>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Reportar')
                        }}
                        style={[styles.btnSqr, { backgroundColor: colorScheme.buttonPrimary }]}
                    >
                        <Image source={require('../assets/Exclama.png')} resizeMode='cover' />
                        <Text style={styles.text}>Nova</Text>
                        <Text style={styles.text}>reclamação</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Petições')
                        }}
                        style={[styles.btnSqr, { backgroundColor: colorScheme.buttonPrimary }]}
                    >
                        <Image source={require('../assets/Lapis.png')} resizeMode='cover' />
                        <Text style={styles.text}>Abaixo</Text>
                        <Text style={styles.text}>assinados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnSqr, { backgroundColor: colorScheme.buttonPrimary }]}
                        onPress={() => {
                            navigation.navigate('Suas Reclamações')
                        }}>
                        <Image source={require('../assets/Megafone.png')} resizeMode='cover' />
                        <Text style={styles.text}>Suas</Text>
                        <Text style={styles.text}>reclamações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnSqr, { backgroundColor: colorScheme.buttonPrimary }]}
                        onPress={() => {
                            navigation.navigate('Configuraçoes')
                        }}
                    >
                        <Image source={require('../assets/Engrenagem.png')} resizeMode='cover' />
                        <Text style={[styles.text, { marginTop: 10 }]}>Configurações</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 2, width: '80%', backgroundColor: colorScheme.panelBackground, margin: 20 }}></View>

                    <Text style={{ color: colorScheme.title, fontWeight: '800', fontSize: 20, marginBottom: 20 }}>
                        Reclamações na sua área
                    </Text>

                    <Pressable
                        style={{ height: 200, width: 300, marginBottom: 35, backgroundColor: 'red' }}
                        onPress={() => {
                            navigation.navigate('Mapa')
                        }}  
                    >
                        {
                            location ? (
                                (<MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }}
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                >
                                    {complaints.map((complaint, index) => (
                                        <Marker
                                            key={index}
                                            coordinate={complaint.location}
                                            title={complaint.text}
                                            description="Reclamação registrada"
                                            onPress={() => navigation.navigate('ComplaintDetails', { complaint })}
                                        />
                                    ))}
                                </MapView>)
                            ) : <View style={styles.container} ><Text>Carregando mapa</Text></View>
                        }
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btnSqr: {
        width: 140,
        height: 140,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }
});
