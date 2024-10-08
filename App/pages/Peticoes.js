import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import * as Progress from 'react-native-progress';
import { listPetitions } from '../utils/Api';

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

            if (resp.content) {
                setComplaints(resp.content); // Atualiza o estado se o conteúdo for encontrado
            } else {
                console.error('No content found in the response');
            }
        } catch (error) {
            console.error('Error loading petitions:', error);
        }
    }
    function formatDate(dateString) {
        const date = new Date(dateString); // Converte a string para objeto Date
        const day = String(date.getDate()).padStart(2, '0'); // Extrai o dia e adiciona zero à esquerda se necessário
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Extrai o mês (adiciona +1 porque os meses começam em 0)
        const year = date.getFullYear(); // Extrai o ano
        
        return `${day}/${month}/${year}`; // Retorna no formato dia/mês/ano
    }
    

    useEffect(() => {
        loadPetitions()
    }, [])

    return (
        <View style={[styles.container]}>
            <Text style={{ color: colorScheme.title, fontWeight: '800', fontSize: 20, margin: 20 }}>
                Abaixo-assinados
            </Text>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {complaints.map((complaint, index) => (
                    <View key={index} style={[styles.card, { backgroundColor: colorScheme.panelBackground }]}>
                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                            <Image source={require('../assets/merp.gif')} style={{ width: 50, height: 50, borderRadius: 200 }} resizeMode="contain" />
                            <Text style={[styles.cardText, { color: colorScheme.textSecondary, marginTop: 0 }]}>
                                {formatDate(complaint.data)}
                            </Text>
                        </View>
                        <View style={[styles.cardBody, { backgroundColor: colorScheme.background }]}>
                            <Text numberOfLines={5} >
                                {complaint.content}
                            </Text>
                            <View style={{ height: 2, width: '100%', backgroundColor: colorScheme.panelBackground, marginVertical: 10 }}></View>

                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                <Text >
                                    {complaint.signatures}
                                </Text>
                                <Progress.Bar progress={complaint.signatures / complaint.required_signatures} width={200} height={15} borderRadius={20} color={colorScheme.panelBackground} animationType='decay' />
                                <Text >
                                    {complaint.required_signatures}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={
                                    [
                                        { marginTop: 10, marginBottom: 5, padding: 10, borderRadius: 5, },
                                        { backgroundColor: colorScheme.panelBackground }
                                    ]
                                }
                                onPress={AlertaDeConfirmacao}
                            >
                                <Text style={{ textAlign: 'center', color: colorScheme.textSecondary }} >Assinar petição</Text>
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
