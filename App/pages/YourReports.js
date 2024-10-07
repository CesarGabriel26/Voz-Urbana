import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
import { getUserLocation } from '../utils/LocationPermition';
import { useTheme } from '../utils/ThemeContext';

export default function Yours({ navigation }) {
    const [complaints, setComplaints] = useState([
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },
        {
            id: 0,
            data: '00/00/00',
            content: 'Mim não gostar mimsnwejfn ksviwnfn mim ser cliente e querer coisas mim ser aunfeouowjefown mim querer algo aqui eá uma reelcameçaõ aidn uaia',
            status: 'Sua requisição ainda não foi respondida!'
        },

    ]);
    const [location, setLocation] = useState(null);

    const { colorScheme } = useTheme();

    return (
        <View style={[styles.container]}>
            <Text style={{ color: colorScheme.title, fontWeight: '800', fontSize: 20, margin: 20 }}>
                Suas Reclamações
            </Text>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {complaints.map((complaint, index) => (
                    <View index={index} style={[styles.card, { backgroundColor: colorScheme.panelBackground }]}>
                        <Text style={[styles.cardText, { color: colorScheme.textSecondary, marginTop: 0 }]}> {complaint.data}</Text>
                        <View style={[styles.cardBody, { backgroundColor: colorScheme.background }]}>
                            <Text>
                                {complaint.content}
                            </Text>
                        </View>
                        <Text style={[styles.cardText, { color: colorScheme.textSecondary }]} >{complaint.status}</Text>
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
