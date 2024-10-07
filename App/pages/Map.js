import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';

export default function Home() {
    const [complaints, setComplaints] = useState([]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation()
            setLocation(loc)
        })();
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
                            coordinate={complaint.location}
                            title={complaint.text}
                            description="Reclamação registrada"
                            onPress={() => navigation.navigate('ComplaintDetails', { complaint })}
                        />
                    ))}
                </MapView>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Verifique se a localização esta ativada</Text>
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
