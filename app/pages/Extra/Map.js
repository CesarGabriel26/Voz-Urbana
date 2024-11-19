import React, { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import CustomMapProvider from '../../components/CustomMap';
import { getUserLocation } from '../../utils/permissions/LocationPermtion';

export default function Map() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let loc = await getUserLocation()
            setLocation(loc)

            let resp = await listReports()
            setComplaints(resp.content)
        })()
    }, []);


    return (
        <View style={styles.container}>
            <CustomMapProvider
                style={styles.map}
                location={location}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

});
