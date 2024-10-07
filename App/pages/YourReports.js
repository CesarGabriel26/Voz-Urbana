import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';

export default function Yours({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    return (
        <View style={[styles.container, {marginBottom: 25 }]}>
            <ScrollView>
            <Text style={{ color: colorScheme.title, fontWeight: '800', fontSize: 20, margin: 20 }}>
                Suas Reclamações
            </Text>
            <View style={{ width: '80%' }}>
                <Text style={{ marginStart: 5 }}>00/00/0000</Text>
                <View style={{
                    backgroundColor: colorScheme.panelBackground,
                    height: 150,
                    borderRadius: 15,
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 3,
                    marginBottom: 15
                }}>
                    <View style={{
                        backgroundColor: colorScheme.background,
                        height: 100,
                        borderRadius: 13,
                        width: '98%',
                        padding: 7
                    }}>
                        <Text style={{ color: colorScheme.textPrimary, textAlign: 'justify' }}>
                            mim nao gostar mimimi reclamação pipipi popopo
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: colorScheme.textSecondary, fontWeight: '700', fontSize: 14, marginTop: 12 }}>Sua requisição ainda não foi respondida!</Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '80%' }}>
                <Text style={{ marginStart: 5,  }}>00/00/0000</Text>
                <View style={{
                    backgroundColor: colorScheme.panelBackground,
                    height: 150,
                    borderRadius: 15,
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 3,
                    marginBottom: 15
                }}>
                    <View style={{
                        backgroundColor: colorScheme.background,
                        height: 100,
                        borderRadius: 13,
                        width: '98%',
                        padding: 7
                    }}>
                        <Text style={{ color: colorScheme.textPrimary, textAlign: 'justify' }}>
                            mim nao gostar mimimi reclamação pipipi popopo
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: colorScheme.textSecondary, fontWeight: '700', fontSize: 14, marginTop: 12 }}>Sua requisição ainda não foi respondida!</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        </View>
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
    },
});
