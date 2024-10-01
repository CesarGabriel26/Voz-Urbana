import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

    if (!location) {
        return (
            <View style={styles.container}>
                <Text> Sem localização</Text>
            </View>
        )
    } else {
        return (
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
        );
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
