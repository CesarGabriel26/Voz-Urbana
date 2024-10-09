import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import * as Progress from 'react-native-progress';
import { listPetitions } from '../utils/Api';
import { formatDate } from '../utils/Parser';

export default function Peticoes({ navigation }) {
    const [complaints, setComplaints] = useState([]);

    const { colorScheme } = useTheme();

    const AlertaDeConfirmacao = () => {
        Alert.alert('', 'Deseja mesmo assinar essa petição ?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }

    const loadPetitions = async () => {
        try {
            let resp = await listPetitions();
            console.log(resp);
            
            if (resp.content) {
                setComplaints(resp.content); // Atualiza o estado se o conteúdo for encontrado
            } else {
                console.error('No content found in the response');
            }
        } catch (error) {
            console.error('Error loading petitions:', error);
        }
    }

    useEffect(() => {
        loadPetitions()
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            <Text style={{ color: colorScheme.Text.title, fontWeight: '800', fontSize: 20, margin: 20 }}>
                Abaixo-assinados
            </Text>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {complaints.map((complaint, index) => (
                    <View key={index} style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                            <Image source={require('../assets/merp.gif')} style={{ width: 50, height: 50, borderRadius: 200 }} resizeMode="contain" />
                            <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary, marginTop: 0 }]}>
                                {formatDate(complaint.data)}
                            </Text>
                        </View>
                        <View style={[styles.cardBody, { backgroundColor: colorScheme.Screen.background }]}>
                            <Text numberOfLines={5} >
                                {complaint.content}
                            </Text>
                            <View style={{ height: 2, width: '100%', backgroundColor: colorScheme.Screen.panelBackground, marginVertical: 10 }}></View>

                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                <Text >
                                    {complaint.signatures}
                                </Text>
                                <Progress.Bar progress={complaint.signatures / complaint.required_signatures} width={200} height={15} borderRadius={20} color={colorScheme.Screen.panelBackground} animationType='decay' />
                                <Text >
                                    {complaint.required_signatures}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={
                                    [
                                        { marginTop: 10, marginBottom: 5, padding: 10, borderRadius: 5, },
                                        { backgroundColor: colorScheme.Screen.panelBackground }
                                    ]
                                }
                                onPress={AlertaDeConfirmacao}
                            >
                                <Text style={{ textAlign: 'center', color: colorScheme.Text.textSecondary }} >Assinar petição</Text>
                            </TouchableOpacity>
                        </View>
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
