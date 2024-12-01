import React, { useEffect, useRef } from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import {  Text, View } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

export default React.forwardRef(function CustomMapProvider(
    {
        style = {},
        location,
        markers = [],
        children,
        anim = true,
        loading,
        ...props
    },
    ref
) {
    const mapRef = useRef(null);
    const { colorScheme } = useTheme();


    React.useImperativeHandle(ref, () => ({
        focusOnRegion: (latitude, longitude) => {
            if (mapRef.current) {
                mapRef.current.animateToRegion(
                    {
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    },
                    anim ? 1000 : 1
                );
            }
        },
    }));

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

    useEffect(() => {
        focus();
    }, [location]);

    return (
        location?.err ? (
            <View style={[style, { borderWidth: 2, borderColor: 'red' }]}>
                <Text style={{ width: 300, textAlign: 'center', color: colorScheme.Text.text }} >
                    Erro ao carregar mapa {location.err}
                </Text>
            </View>
        ) : (
            <MapView
                onMapLoaded={focus}
                ref={mapRef}
                style={[style]}
                {...props}
            >
                <UrlTile
                    urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    tileSize={256}
                />
                {
                    children
                }
                {
                    markers.map((marker, index) => (
                        (marker && marker.latitude) ? (
                            <Marker
                                key={index}

                                coordinate={{
                                    latitude: parseFloat(marker.latitude),
                                    longitude: parseFloat(marker.longitude)
                                }}

                                title={marker.title ? marker.title : marker.titulo}
                                description={marker.descricao ? marker.descricao : marker.conteudo}
                                onClick={marker.onClick}

                                {...marker.props}
                            />
                        ) : null
                    ))
                }
            </MapView>
        )

    );
});
