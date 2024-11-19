import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { listReports } from '../../utils/Api';
import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import CustomMapProvider from '../../components/CustomMap';
import MainContainer from '../../components/MainContainer'

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
        <MainContainer>
            <View style={[styles.containerHome, {marginTop: 20}]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('NovaReclamacao')
                    }}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Image source={require('../../assets/Exclama.png')} resizeMode='cover' />
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}>Nova</Text>
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}>reclamação</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                    onPress={() => {
                        navigation.navigate('NovaPeticao')
                    }}>
                    <Image source={require('../../assets/Megafone.png')} resizeMode='cover' />
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}>Nova</Text>
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}>Petição</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                    onPress={() => {
                        navigation.navigate('Reclamações')
                    }}>
                    <Image source={require('../../assets/Megafone.png')} resizeMode='cover' />
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}> </Text>
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}>Reclamações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Petições')
                    }}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Image source={require('../../assets/Lapis.png')} resizeMode='cover' />
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}> </Text>
                    <Text style={[styles.text, colorScheme.Buttons.Primary]}>Petições</Text>
                </TouchableOpacity>
            </View>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 2, width: '80%', backgroundColor: colorScheme.Body_bg, margin: 20 }}></View>

                <Text style={{ color: colorScheme.Text.title, fontWeight: '800', fontSize: 20, marginBottom: 20 }}>
                    Reclamações na sua área
                </Text>

                <Pressable
                    style={{ height: 200, width: 300, marginBottom: 35 }}
                    onPress={() => {
                        navigation.navigate('Mapa')
                    }}
                    disabled={location ? false : true}
                >
                    {
                        location ? (
                            <View>
                                <CustomMapProvider
                                    style={styles.map}
                                    location={location}
                                    markers={complaints}
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                />
                            </View>
                        ) : <View style={styles.container} ><ActivityIndicator size="large" color={colorScheme.Icons.loader.Primary} />
                        </View>
                    }
                </Pressable>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    containerHome: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        flexWrap: 'wrap',
        gap: 20,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden'
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
        fontWeight: '700',
        fontSize: 16
    }
});
