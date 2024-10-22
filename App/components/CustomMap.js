import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function CustomMap({
    initialRegion = {},
    markers = [], // array de marcadores
    mapLib = 'react-native-maps', // Defina a biblioteca de mapa padrão
    style = {},
    onRegionChangeComplete,
    onPress,
}) {


    if (mapLib === 'react-native-maps') {
        return (
            // <MapView
            //     style={styles.map}
            //     region={region}
            //     onPress={handleLocationSelect}
            //     onRegionChangeComplete={setRegion}
            // >
            //     <Marker coordinate={location} />
            // </MapView>

            (
                initialRegion ? (
                    <MapView
                        style={style}
                        region={initialRegion}
                        onPress={onPress}
                        onRegionChangeComplete={onRegionChangeComplete}
                    >
                        {
                            markers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude,
                                    }}
                                    title={marker.title?marker.title : ""}
                                    description={marker.description?marker.description : ""}
                                />
                            ))
                        }
                    </MapView>
                ) : null
            )
        );
    }
    return <View><Text>Mapa não disponível</Text></View>;
}
