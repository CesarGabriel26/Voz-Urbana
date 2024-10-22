import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import * as Progress from 'react-native-progress';
import { getPetitionById, getRemainingTimeForPetition } from '../../utils/Api';
import { formatDate } from '../../utils/Parser';
import LoadingModal from '../../components/LoadingModal';

export default function VerPeticao({ navigation, route }) {
    const [Loading, setLoading] = useState(false);
    const [petition, setPetition] = useState(null);
    const { colorScheme } = useTheme();

    const loadPetitionDetails = async () => {
        try {
            setLoading(true)
            let id = route.params.id;

            // Faz a requisição para obter os detalhes da petição e o tempo restante
            let petitionDetails = await getPetitionById(id);
            let remainingTime = await getRemainingTimeForPetition(id);
            setLoading(false)

            // Atualiza o estado combinando os detalhes da petição com o tempo restante
            if (petitionDetails.content) {
                setPetition({ ...petitionDetails.content, ...remainingTime });
            } else {
                console.error('No content found in the response');
            }
        } catch (error) {
            console.error('Error loading petition details:', error);
        }
    };

    useEffect(() => {
        loadPetitionDetails();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            {
                petition ? (
                    <View style={{ flex:1, width: '100%', borderWidth: 2, padding: 15, borderRadius: 5, borderColor: colorScheme.Screen.panelBackground}}>
                        {/* Título da petição */}
                        <Text style={[styles.title, { color: colorScheme.Text.textPrimary }]}>
                            {petition.causa || 'Título da Petição'}
                        </Text>

                        {/* Causa da petição */}
                        <Text style={[styles.description, { color: colorScheme.Text.textPrimary }]}>
                            {petition.content || 'Descrição da causa.'}
                        </Text>

                        {/* Data de criação */}
                        <Text style={[styles.date, { color: colorScheme.Text.textTertiary }]}>
                            Criada em: {formatDate(petition.data)}
                        </Text>

                        {/* Data limite */}
                        <Text style={[styles.date, { color: colorScheme.Text.textTertiary }]}>
                            Data limite: {formatDate(petition.data_limite)}
                        </Text>

                        {/* Barra de progresso de assinaturas */}
                        <View style={styles.progressContainer}>
                            <Text style={[styles.progressText, { color: colorScheme.Text.textPrimary }]}>
                                {petition.signatures} de {petition.required_signatures} assinaturas
                            </Text>
                            <Progress.Bar
                                progress={petition.signatures / petition.required_signatures}
                                color={colorScheme.Screen.panelBackground}
                                unfilledColor={colorScheme.Text.textPlaceHolder}
                                borderRadius={10}
                                height={20}
                            />
                        </View>

                        {/* Tempo restante */}
                        <View style={styles.timeContainer}>
                            <Text style={[styles.timeText, { color: colorScheme.Text.textPrimary }]}>
                                Tempo restante:
                            </Text>
                            <Text style={[styles.timeValue, { color: colorScheme.Text.textHighlight }]}>
                                {petition.dias_restantes}d {petition.horas_restantes}h {petition.minutos_restantes}m
                            </Text>
                        </View>

                        {/* Botão para assinar a petição */}
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                            onPress={() => Alert.alert('Assinatura realizada com sucesso!')}
                        >
                            <Text style={{ color: colorScheme.Text.textSecondary }}>Assinar Petição</Text>
                        </TouchableOpacity>
                    </View>
                ) : null
            }
            <LoadingModal visible={Loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    btn: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
});
