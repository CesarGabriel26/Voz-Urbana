import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

import IonicIcons from '@expo/vector-icons/Ionicons'

export default function Yours({ navigation }) {
    const [complaints, setComplaints] = useState([
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            aberto: true
        },
    ]);

    const { colorScheme } = useTheme();

    return (
        <View style={[styles.container]}>
            <Text style={{ color: colorScheme.title, fontWeight: '800', fontSize: 20, margin: 20 }}>
                Suas Reclamações
            </Text>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {complaints.map((complaint, index) => (
                    <View key={index} style={[styles.card, { backgroundColor: colorScheme.panelBackground }]}>
                        <Text style={[styles.cardText, { color: colorScheme.textSecondary, marginTop: 0 }]}> {complaint.data}</Text>
                        <View style={[styles.cardBody, { backgroundColor: colorScheme.background }]}>
                            <Text>
                                {complaint.content}
                            </Text>
                        </View>
                        {
                            complaint.aberto ? (
                                <Text style={[styles.cardText, { color: colorScheme.textSecondary }]} >
                                    Sua requisição ainda não foi respondida!
                                </Text>
                            ) : (
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                    <Text style={[styles.cardText, { color: colorScheme.textSecondary }]} >
                                        Sua requisição foi respondida!
                                    </Text>
                                    <IonicIcons name="checkmark-done-circle-outline" size={30} color="#25B92F" />
                                </View>
                            )
                        }

                    </View>
                ))}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    card: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    cardBody: {
        minHeight: 100,
        width: '100%',
        padding: 5,
        borderRadius: 10
    },
    cardText: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10
    }
});
