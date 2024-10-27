import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { getUserLocation } from '../../utils/LocationPermition';
import { useTheme } from '../../utils/ThemeContext';
import { listReports } from '../../utils/Api';
import OpenStreetMapComponent from '../../components/Maps';

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
                <OpenStreetMapComponent
                    style={styles.map}
                    location={location}
                    markers={complaints}
                />
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
