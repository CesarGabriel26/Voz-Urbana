import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';
import { listReports } from '../utils/Api';

export default function Map({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation()
            setLocation(loc)

            let resp = await listReports()
            setComplaints(resp.content)
        })()
    }, []);

    if (location) {
        return (
            <View style={styles.container}>
                <MapView
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
                            coordinate={{
                                latitude: parseFloat(complaint.latitude),
                                longitude: parseFloat(complaint.longitude)
                            }}
                            title={complaint.titulo}
                            description={complaint.conteudo}
                            //onPress={() => navigation.navigate('ComplaintDetails', { comp : complaint })}
                        />
                    ))}
                </MapView>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colorScheme.Button.buttonPrimary} />
            </View>
        )
    }
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
});
