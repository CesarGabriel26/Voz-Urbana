import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { listPetitions } from '../../utils/Api';
import CardPeticao from '../../components/CardPeticao';
import LoadingModal from '../../components/LoadingModal';

export default function Peticoes({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [Loading, setLoading] = useState(false);

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
            setLoading(true)
            let resp = await listPetitions();
            setLoading(false)
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
                Petições Recentes
            </Text>

            <TouchableOpacity
                style={{ marginBottom: 20, marginTop: 15 }}
                onPress={() => {
                    navigation.navigate('Suas Petições')
                }}
            >
                <Text style={{ color: colorScheme.Text.title, fontWeight: '400', fontSize: 15 }}>
                    Ver minhas Petições
                </Text>
            </TouchableOpacity>

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {complaints.map((complaint, index) => (
                    <CardPeticao key={index} complaint={complaint} ExibirPeticao navigation={navigation}/>
                ))}
            </ScrollView>
            
            <LoadingModal visible={Loading} />
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
    }
});
