import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';

export default function Map() {
    const [complaints, setComplaints] = useState([]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation()
            setLocation(loc)
        })();
    }, []);

    return (
        <>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 25 }}>
                <View style={{ backgroundColor: '#0A62AC', padding: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Image source={require('../assets/Logo.png')}/>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300, flexWrap: 'wrap', gap: 20, marginTop: 30 }}>
                    <View style={styles.btnSqr}>
                        <Image source={require('../assets/Exclama.png')} resizeMode='cover' />
                        <Text style={styles.text}>Nova</Text>
                        <Text style={styles.text}>reclamação</Text>
                    </View>
                    <View style={styles.btnSqr}>
                        <Image source={require('../assets/Lapis.png')} resizeMode='cover' />
                        <Text style={styles.text}>Abaixo</Text>
                        <Text style={styles.text}>assinados</Text>
                    </View>
                    <View style={styles.btnSqr}>
                        <Image source={require('../assets/Megafone.png')} resizeMode='cover' />
                        <Text style={styles.text}>Suas</Text>
                        <Text style={styles.text}>reclamações</Text>
                    </View>
                    <View style={styles.btnSqr}>
                        <Image source={require('../assets/Engrenagem.png')} resizeMode='cover' />
                        <Text style={[styles.text, { marginTop: 10 }]}>Configurações</Text>
                    </View>
                </View>

                <View style={{ height: 2, width: 300, backgroundColor: '#0A62AC', margin: 20 }}></View>

                <View style={{ height: 300, width: 300 }}>
                    <Image source={require('../assets/image.png')} style={[styles.map, { borderRadius: 10 }]} resizeMode='cover' />
                </View>
            </View>


            {/* <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
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
            </MapView> */}
        </>
    );
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btnSqr: {
        width: 140,
        height: 140,
        backgroundColor: '#0A62AC',
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
