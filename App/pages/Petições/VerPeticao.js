import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import * as Progress from 'react-native-progress';
import { getPetitionById, getRemainingTimeForPetition } from '../../utils/Api';
import { formatDate } from '../../utils/Parser';
import LoadingModal from '../../components/LoadingModal';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Para ícones
import StatusSteps from '../../components/Steps';

export default function VerPeticao({ navigation, route }) {
    const [Loading, setLoading] = useState(false);
    const [petition, setPetition] = useState(null);
    const { colorScheme } = useTheme();

    const statusSteps = [
        'Coleta',
        'Aprovação',
        'Conclusão'
    ];

    const loadPetitionDetails = async () => {
        try {
            setLoading(true);
            let id = route.params.id;
            let petitionDetails = await getPetitionById(id);
            let remainingTime = await getRemainingTimeForPetition(id);
            setLoading(false);

            if (petitionDetails.content) {
                setPetition({ ...petitionDetails.content, ...remainingTime });
            } else {
                console.error('No content found in the response');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Não foi possível carregar os detalhes da petição.');
            console.error('Error loading petition details:', error);
        }
    };

    useEffect(() => {
        loadPetitionDetails();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Screen.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {petition ? (
                    <View style={[styles.petitionContainer, { borderColor: colorScheme.Screen.panelBackground }]}>
                        <View style={{ marginBottom: 25 }} >
                            <StatusSteps steps={statusSteps} currentStep={petition.status} />
                        </View>

                        <Text style={[styles.title, { color: colorScheme.Text.textPrimary }]}>
                            {petition.causa || 'Título da Petição'}
                        </Text>

                        <Text style={[styles.description, { color: colorScheme.Text.textPrimary }]}>
                            {petition.content || 'Descrição da causa.'}
                        </Text>

                        <View style={styles.dateContainer}>
                            <Icon name="calendar-today" size={20} color={colorScheme.Text.textTertiary} />
                            <Text style={[styles.date, { color: colorScheme.Text.textTertiary }]}>
                                Criada em: {formatDate(petition.data)}
                            </Text>
                        </View>

                        <View style={styles.dateContainer}>
                            <Icon name="calendar-today" size={20} color={colorScheme.Text.textTertiary} />
                            <Text style={[styles.date, { color: colorScheme.Text.textTertiary }]}>
                                Data limite: {formatDate(petition.data_limite)}
                            </Text>
                        </View>

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

                        <View style={styles.timeContainer}>
                            <Text style={[styles.timeText, { color: colorScheme.Text.textPrimary }]}>
                                Tempo restante:
                            </Text>
                            <Text style={[styles.timeValue, { color: colorScheme.Text.textHighlight }]}>
                                {petition.dias_restantes}d {petition.horas_restantes}h {petition.minutos_restantes}m
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: colorScheme.Button.buttonPrimary }]}
                            onPress={() => {
                                Alert.alert('Assinatura realizada com sucesso!');
                            }}
                        >
                            <Text style={{ color: colorScheme.Text.textSecondary }}>Assinar Petição</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </ScrollView>
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
    scrollContainer: {
        paddingBottom: 20,
    },
    petitionContainer: {
        flex: 1,
        width: '100%',
        borderWidth: 2,
        padding: 15,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    date: {
        marginLeft: 5,
        fontSize: 14,
    },
    progressContainer: {
        marginVertical: 15,
    },
    progressText: {
        marginBottom: 5,
        fontSize: 14,
    },
    timeContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
    },
    timeValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    btn: {
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
