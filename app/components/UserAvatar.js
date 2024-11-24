import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Avatar({ 
    uri, 
    text, 
    size = 'md', 
    shape = 'circle', 
    style = {} 
}) {
    const sizes = {
        xs: 24,
        sm: 40,
        md: 64,
        lg: 96,
    };

    
    const avatarSize = typeof size === 'number' ? size : sizes[size] || sizes.md;

    
    const dynamicStyles = {
        width: avatarSize,
        height: avatarSize,
        borderRadius: shape === 'circle' ? avatarSize / 2 : 8,
    };

    return (
        <View style={[styles.container, dynamicStyles, style]}>
            {uri ? (
                <Image
                    source={{ uri }}
                    style={[styles.image, dynamicStyles]}
                />
            ) : (
                <Text style={[styles.text, { fontSize: avatarSize / 2.5 }]}>
                    {text ? text[0].toUpperCase() : '?'}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'cover',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
