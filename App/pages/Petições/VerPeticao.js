import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import * as Progress from 'react-native-progress';
import { getPetitionById, getRemainingTimeForPetition, getUserById } from '../../utils/Api';
import { formatDate } from '../../utils/Parser';
import LoadingModal from '../../components/LoadingModal';
import StepIndicator from 'react-native-step-indicator';
import Separator from '../../components/Separator'

export default function VerPeticao({ navigation, route }) {
    const { colorScheme } = useTheme();

    const [Loading, setLoading] = useState(false);
    const [petition, setPetition] = useState(null);
    const [userData, setUserData] = useState({})

    const statusSteps = ['Aguardando Aprovação', 'Coleta de assinaturas', 'Encerrada'];

    const loadPetitionDetails = async () => {
        try {
            setLoading(true);
            let id = route.params.id

            let petitionDetails = await getPetitionById(id);
            let remainingTime = await getRemainingTimeForPetition(id);
            let pUserData = await getUserById(petitionDetails.content.user_id)

            setLoading(false);

            if (petitionDetails.content) {
                setPetition({ ...petitionDetails.content, ...remainingTime.tempo_restante });
                setUserData(pUserData.content)
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
        <View style={[styles.container, { backgroundColor: colorScheme.background.default }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {petition ? (
                    <View style={[styles.petitionContainer, { borderColor: colorScheme.background.panel }]}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image
                                source={{ uri: userData?.pfp }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={[styles.userName, { color: colorScheme.text.dark }]}>
                                    Criada por: {userData?.nome}
                                </Text>
                                <Text style={[styles.date, { color: colorScheme.text.dark }]}>
                                    Em: {formatDate(petition.data, true)}
                                </Text>
                            </View>
                        </View>

                        <Separator />

                        <Text style={[styles.title, { color: colorScheme.text.dark }]}>
                            {petition.titulo || 'Título da Petição'}
                        </Text>

                        <Text style={[styles.description, { color: colorScheme.text.dark }]}>
                            {petition.content || 'Descrição da causa.'}
                        </Text>

                        <Separator />
                        <Text style={[styles.title, { color: colorScheme.text.dark }]}>
                            Status da Petição
                        </Text>

                        <StepIndicator
                            // customStyles={customStyles}
                            currentPosition={petition.status}
                            labels={statusSteps}
                            stepCount={statusSteps.length}
                            customStyles={colorScheme.stepper}
                        />

                        <View style={styles.progressContainer}>
                            <Text style={[styles.progressText, { color: colorScheme.text.dark }]}>
                                {petition.signatures} de {petition.required_signatures} assinaturas
                            </Text>
                            <Progress.Bar
                                progress={petition.signatures / petition.required_signatures}
                                color={colorScheme.background.panel}
                                unfilledColor={colorScheme.text.placeholder}
                                style={{ width: "100%" }}
                                borderRadius={10}
                                height={20}
                            />
                        </View>

                        <View style={styles.timeContainer}>
                            <Text style={[styles.timeText, { color: colorScheme.text.dark }]}>
                                Tempo restante:
                            </Text>
                            <Text style={[styles.timeValue, { color: colorScheme.text.highlight}]}>
                                {petition.dias_restantes}d {petition.horas_restantes}h {petition.minutos_restantes}m
                            </Text>
                        </View>

                        <Separator />
                        <Text style={[styles.title, { color: colorScheme.text.dark }]}>
                            Informações Adicionais
                        </Text>

                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.infoText} >Data Limite: {petition.data_limite ? formatDate(petition.data_limite, true) : 'Não especificada'}</Text>
                            <Text style={styles.infoText} >Atualizado em: {petition.data_ultima_atualizacao ? formatDate(petition.data_ultima_atualizacao, true) : 'Data não encontrada'}</Text>
                            <Text style={styles.infoText} >Data de Conclusão: {petition.data_conclusao ? formatDate(petition.data_conclusao, true) : 'Em andamento'}</Text>
                            <Text style={styles.infoText} >Categoria: {petition.categoria || 'Não especificada'}</Text>
                            <Text style={styles.infoText} >Local: {petition.local || 'Não informado'}</Text>
                            {petition.motivo_encerramento && (
                                <Text style={styles.infoText}>Motivo de Encerramento: {petition.motivo_encerramento}</Text>
                            )}
                            {/* <SupportersList petition={petition} theme={theme} /> */}
                        </View>

                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: colorScheme.button.primary }]}
                            onPress={() => {
                                Alert.alert('Assinatura realizada com sucesso!');
                            }}
                        >
                            <Text style={{ color: colorScheme.text.secondary }}>Assinar Petição</Text>
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
    infoText : {
        fontWeight: 'bold'
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
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
    },
    userName: {
        fontSize: 14,
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
    date: {
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
        fontSize: 14,
    },
    timeValue: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    btn: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
});
