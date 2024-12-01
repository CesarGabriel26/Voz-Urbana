import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { listReports } from '../../utils/Api';
import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import CustomMapProvider from '../../components/CustomMap';
import MainContainer from '../../components/MainContainer'
import Separator from '../../components/Separator';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    const getLocation = async () => {
        try {
            let loc = await getUserLocation();
            setLocation(loc);
        } catch (error) {
            // console.error("Erro ao obter localização:", error);
            setLocation({
                err: "Verifique se a localização esta ativada"
            })
        }
    };

    const loadList = async () => {
        setLoading(true)
        let resp = await listReports()
        if (resp.content) {
            setComplaints(resp.content)
        }
        await getLocation();
        setLoading(false)
    }

    useEffect(() => {
        loadList()
    }, []);

    return (
        <MainContainer >
            <View style={[styles.containerHome, { marginTop: 20 }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Nova Reclamaçao')
                    }}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Icon
                        name="alert"
                        size={60}
                        color={colorScheme.Buttons.Primary.color}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, { color: colorScheme.Buttons.Primary.color }]}>Nova{"\n"}reclamação</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Nova Petiçao')
                    }}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Icon
                        name="pen"
                        size={60}
                        color={colorScheme.Buttons.Primary.color}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, { color: colorScheme.Buttons.Primary.color }]}>Nova{"\n"}Petição</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Reclamações')
                    }}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Icon
                        name="format-list-text"
                        size={60}
                        color={colorScheme.Buttons.Primary.color}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, { color: colorScheme.Buttons.Primary.color }]}>Reclamações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Petições')}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Icon
                        name="format-line-style"
                        size={60}
                        color={colorScheme.Buttons.Primary.color}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, { color: colorScheme.Buttons.Primary.color }]}>
                        Petições
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Reclamações')
                    }}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Icon
                        name="format-list-text"
                        size={60}
                        color={colorScheme.Buttons.Primary.color}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, { color: colorScheme.Buttons.Primary.color }]}>
                        Minhas
                        {"\n"}
                        Reclamações
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('Minhas Petições')}
                    style={[styles.btnSqr, colorScheme.Buttons.Primary]}
                >
                    <Icon
                        name="format-line-style"
                        size={60}
                        color={colorScheme.Buttons.Primary.color}
                        style={styles.icon}
                    />
                    <Text style={[styles.text, { color: colorScheme.Buttons.Primary.color }]}>
                        Minhas
                        {"\n"}
                        Petições
                    </Text>
                </TouchableOpacity>

            </View>

            <Separator color={colorScheme.Text.title} style={{ marginVertical: 20 }} />

            <View style={{ display: 'flex', alignItems: 'center', flex: 1, height: 300 }}>
                <Text style={{ color: colorScheme.Text.title, fontWeight: '800', fontSize: 20, marginBottom: 20 }}>
                    Reclamações na sua área
                </Text>

                <Pressable
                    style={{ width: '100%', flex: 1, marginBottom: 20 }}
                    onPress={() => {
                        navigation.navigate('Mapa')
                    }}
                    disabled={location ? false : true}
                >
                    {
                        loading ? (
                            <ActivityIndicator size="large" color={colorScheme.Icons.loader.light} />
                        ) : (
                            <CustomMapProvider
                                style={styles.map}
                                location={location}
                                markers={complaints}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                loading={loading}
                            />
                        )
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
    icon: {
        marginBottom: 0,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: 16,
        textAlign: 'center'
    }
});
