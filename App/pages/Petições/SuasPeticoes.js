import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { getPetitionsByUser } from '../../utils/Api';
import decodeUserToken from '../../utils/JWT';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardPeticao from '../../components/CardPeticao';
import LoadingModal from '../../components/LoadingModal';

export default function PeticoesDoUsuario({ navigation }) {
    const [complaints, setComplaints] = useState([]);
    const [Loading, setLoading] = useState(false);

    const { colorScheme } = useTheme();

    const loadPetitions = async () => {
        try {
            setLoading(true)
            const UserToken = await AsyncStorage.getItem('usuario');
            let User = decodeUserToken(UserToken)

            let resp = await getPetitionsByUser(User.id);
            setLoading(false)

            if (resp.content) {
                setComplaints(resp.content)
            } else {
                if (resp.error) {
                    console.error(resp.error)
                } else {
                    console.log(resp.message);
                }
            }
        } catch (error) {
            console.error('Error loading petitions:', error);
        }
    }

    useEffect(() => {
        loadPetitions()
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.background.default }]}>
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
        paddingHorizontal: 20,
        paddingTop: 20
    }
});
