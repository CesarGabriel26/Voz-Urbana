import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReportsByUser } from '../../utils/Api';

import IonicIcons from '@expo/vector-icons/Ionicons'
import { formatDate } from '../../utils/Parser';
import decodeUserToken from '../../utils/JWT';

export default function ReportesDoUsuario({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [loaded, setloaded] = useState(false);

    const { colorScheme } = useTheme();
    

    const loadList = async () => {
        setloaded(false)

        let userToken = await AsyncStorage.getItem('usuario')
        let userJson = decodeUserToken(userToken)
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
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background, paddingTop: 35 }]}>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {
                    loaded ? (
                        complaints.map((complaint, index) => (
                            <View key={index} style={[styles.card, { backgroundColor: colorScheme.Screen.panelBackground }]}>
                                <View style={{ display: "flex", justifyContent: 'space-between', flexDirection: 'row' }} >
                                    <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary, marginTop: 0 }]}> {formatDate(complaint.data, true)}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Detalhes", { complaintId: complaint.id });
                                        }}
                                    >
                                        <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary, marginTop: 0 }]}> Detalhes {">"} </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.cardBody, { backgroundColor: colorScheme.Screen.background }]}>
                                    <Text style={{ color: colorScheme.Text.textPrimary }} >
                                        {complaint.conteudo}
                                    </Text>
                                </View>
                                {
                                    complaint.aceito ? (
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                            <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary }]} >
                                                Sua requisição foi respondida!
                                            </Text>
                                            <IonicIcons name="checkmark-done-circle-outline" size={30} color={colorScheme.Icons.check} />
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
