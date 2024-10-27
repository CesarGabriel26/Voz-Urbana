import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Marker } from 'react-native-maps';
import { useTheme } from '../../utils/ThemeContext';
import { listReports } from '../../utils/Api';
import { getUserLocation } from '../../utils/LocationPermition';
import OpenStreetMapComponent from '../../components/Maps';

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
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            <ScrollView >
                <View style={styles.containerHome}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Reportar')
                        }}
                        style={[styles.btnSqr, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                    >
                        <Image source={require('../../assets/Exclama.png')} resizeMode='cover' />
                        <Text style={styles.text}>Nova</Text>
                        <Text style={styles.text}>reclamação</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.btnSqr, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                        onPress={() => {
                            navigation.navigate('Criar Petição')
                        }}>
                        <Image source={require('../../assets/Megafone.png')} resizeMode='cover' />
                        <Text style={styles.text}>Nova</Text>
                        <Text style={styles.text}>Petição</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnSqr, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                        onPress={() => {
                            navigation.navigate('Reclamações')
                        }}>
                        <Image source={require('../../assets/Megafone.png')} resizeMode='cover' />
                        <Text style={styles.text}> </Text>
                        <Text style={styles.text}>Reclamações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Petições')
                        }}
                        style={[styles.btnSqr, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                    >
                        <Image source={require('../../assets/Lapis.png')} resizeMode='cover' />
                        <Text style={styles.text}> </Text>
                        <Text style={styles.text}>Petições</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 2, width: '80%', backgroundColor: colorScheme.Screen.panelBackground, margin: 20 }}></View>

                    <Text style={{ color: colorScheme.Text.title, fontWeight: '800', fontSize: 20, marginBottom: 20 }}>
                        Reclamações na sua área
                    </Text>

                    <Pressable
                        style={{ height: 200, width: 300, marginBottom: 35 }}
                        onPress={() => {
                            navigation.navigate('Mapa')
                        }}
                    >
                        {
                            location ? (
                                <OpenStreetMapComponent
                                    style={styles.map}
                                    location={location}
                                    markers={complaints}
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                />
                            ) : <View style={styles.container} ><ActivityIndicator size="large" color={colorScheme.Button.buttonPrimary} />
                            </View>
                        }
                    </Pressable>
                </View>
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    containerHome: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 30,
        paddingHorizontal: 30
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
