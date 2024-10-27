import React, { useRef, useEffect } from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { ActivityIndicator, View } from 'react-native';

const OpenStreetMapComponent = (
    {
        style = {},
        location = {
            latitude: 0,
            longitude: 0
        },
        markers = [],
        children,
        anim = true,
        ...props
    }
) => {
    const mapRef = useRef(null);

    const focus = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, anim ? 1000 : 1);
        }
    }

    return (
        location ? (
            <MapView
                onMapLoaded={focus}
                ref={mapRef}
                style={style}
                {...props}
            >
                <UrlTile
                    urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    tileSize={256}
                />
                {
                    children ? children : markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)
                            }}
                            title={marker.title ? marker.title : marker.text}
                            description={marker.descricao ? marker.descricao : "Reclamação registrada"}
                        />
                    ))
                }
            </MapView>
        ) : (
            <View style={style}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    );
};

export default OpenStreetMapComponent;
