import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReportsByUser } from '../utils/Api';

import IonicIcons from '@expo/vector-icons/Ionicons'
import { formatDate } from '../utils/Parser';

export default function Yours({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [loaded, setloaded] = useState(false);

    const { colorScheme } = useTheme();
    
    const loadList = async () => {
        setloaded(false)
        let userString = await AsyncStorage.getItem('usuario')
        let userJson = await JSON.parse(userString)
        let rest = await getReportsByUser(userJson.id)

        if (rest.content) {
            setComplaints(rest.content)
            setloaded(true)
        }
    }

    useEffect(() => {
        loadList()
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            <Text style={{ color: colorScheme.Text.title, fontWeight: '800', fontSize: 20, margin: 20 }}>
                Suas Reclamações
            </Text>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {
                    loaded ? (
                        complaints.map((complaint, index) => (
                            <View key={index} style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                                <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary, marginTop: 0 }]}> {formatDate(complaint.data, true)}</Text>
                                <View style={[styles.cardBody, { backgroundColor: colorScheme.Screen.background }]}>
                                    <Text>
                                        {complaint.conteudo}
                                    </Text>
                                </View>
                                {
                                    complaint.aceito ? (
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                            <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]} >
                                                Sua requisição foi respondida!
                                            </Text>
                                            <IonicIcons name="checkmark-done-circle-outline" size={30} color="#25B92F" />
                                        </View>
                                    ) : (
                                        <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]} >
                                            Sua requisição ainda não foi respondida!
                                        </Text>
                                    )
                                }

                            </View>
                        ))
                    ) : <ActivityIndicator size="large" color={colorScheme.Button.buttonPrimary} />
                }
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
