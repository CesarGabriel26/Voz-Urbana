import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { getReportById, getUserById } from '../../utils/Api';
import { formatDate } from '../../utils/Parser';
import Avatar from '../../components/UserAvatar';
import { loadCurrentUserData } from '../../managers/userController';
import MainContainer from '../../components/MainContainer';
import Separator from '../../components/Separator';
import { useTheme } from '../../utils/ThemeContext';
import CustomButton from '../../components/forms/button';
import { ADMIN_USER_TYPE, priorities } from '../../utils/Constantes';
import { deleteComplaintControl, updateComplaintStatus } from '../../managers/complaintController';
import StepIndicator from 'react-native-step-indicator';
import { ButtonsStyles } from '../../styles/Buttons';

export default function VerReclamacao({ navigation, route }) {
    const { colorScheme } = useTheme();
    let prioridades = [...priorities]
    prioridades.shift()
    const [customSteps, setCustomSteps] = useState(null);

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(null);

    const loadReportDetails = async () => {
        try {
            const id = route.params?.id;
            if (id) {
                setLoading(true);

                const reportDetails = await getReportById(id);
                if (reportDetails.content) {
                    let reportContent = reportDetails.content
                    setReport(reportContent)

                    setCustomSteps({
                        ...colorScheme.Steps,
                        stepStrokeFinishedColor: prioridades[reportContent.prioridade].color,
                        stepIndicatorFinishedColor: prioridades[reportContent.prioridade].color,
                        separatorFinishedColor: prioridades[reportContent.prioridade].color,
                        stepStrokeCurrentColor: prioridades[reportContent.prioridade].color,
                    })

                    const userData = await getUserById(reportContent.user_id);
                    setUser(userData.content);
                }
            }

            const data = await loadCurrentUserData();
            setCurrentUser(data[1] ? data[0] : null);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error loading report details:', error);
        }
    };

    useEffect(() => {
        loadReportDetails();
    }, []);

    const handleDelete = async () => {
        await deleteComplaintControl(report, () => {
            navigation.navigate('Reclamações');
        });
    };

    const handleApprove = async () => {
        await updateComplaintStatus(report, 1, true, loadReportDetails);
    };

    const handleRevoke = async () => {
        await updateComplaintStatus(report, 0, false, loadReportDetails);
    };

    return (
        <MainContainer>
            {loading ? (
                <ActivityIndicator size="large" color={colorScheme.Icons.loader.Primary} />
            ) : report ? (
                <View style={styles.panel}>
                    <View style={styles.flexRow}>
                        <Avatar
                            uri={user.anonimo ? "https://via.placeholder.com/100" : user.pfp}
                            size='xl'
                            shape='square'
                        />
                        <View style={styles.flexText}>
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                Reclamação criada por: <Text style={styles.bold}>{user.anonimo ? "Anônimo" : user.nome}</Text>
                            </Text>
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                Em: {formatDate(report.data, true)}
                            </Text>
                        </View>
                    </View>

                    <Text style={[{ color: colorScheme.Text.text }, styles.title]}>{report.titulo || 'Título da Reclamação'}</Text>
                    <Text style={[{ color: colorScheme.Text.text }, styles.description]}>{report.conteudo || 'Descrição não fornecida.'}</Text>

                    <Separator texto='Status da Reclamação' color={prioridades[report.prioridade].color} style={{ marginVertical: 20 }} />

                    <View style={{
                        display: 'flex',
                        width: '100%',
                    }} >
                        <View style={{
                            backgroundColor: prioridades[report.prioridade].color,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 20, // Faz com que a tag tenha bordas arredondadas
                            alignSelf: 'center', // Ajusta a altura da tag de acordo com o conteúdo
                            marginBottom: 20,
                        }}>
                            <Text style={[
                                styles.text,
                                {
                                    textAlign: 'center',
                                }
                            ]}>
                                Prioridade {report.prioridade}
                            </Text>
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }} >
                        <StepIndicator
                            currentPosition={report.status < 0 ? 3 : report.status}
                            labels={
                                report.status < 0 ?
                                    ['Aguardando Aprovação', 'Coleta de assinaturas', 'Cancelada']
                                    :
                                    ['Aguardando Aprovação', 'Coleta de assinaturas', 'Encerrada']
                            }
                            stepCount={3}
                            customStyles={customSteps}
                        />
                    </View>

                    <Separator texto='Detalhes da Reclamação' color={prioridades[report.prioridade].color} style={{ marginVertical: 20 }} />

                    <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                        <Text style={styles.bold}>Categoria:</Text> {report.categoria || 'Não especificada'}
                    </Text>
                    <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                        <Text style={styles.bold}>Prioridade:</Text> {report.prioridade || 'Normal'}
                    </Text>
                    <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                        <Text style={styles.bold}>Endereço:</Text> {report.adress || 'Não informado'}
                    </Text>

                    {report.imagem && (
                        <Image source={{ uri: report.imagem }} style={styles.image} />
                    )}

                    <View style={{ gap: 20 }} >
                        {
                            (currentUser?.type === ADMIN_USER_TYPE && !report.aceito) ?
                                <CustomButton
                                    text="Aprovar"
                                    textColor={colorScheme.Buttons.BootstrapSuccess.color}
                                    bgColor={colorScheme.Buttons.BootstrapSuccess.backgroundColor}
                                    buttonStyle={ButtonsStyles.default}
                                    style={{
                                        width: '100%'
                                    }}
                                    onPress={handleApprove}
                                />
                                : null
                        }
                        {
                            currentUser?.type === ADMIN_USER_TYPE && report.aceito ?
                                <>
                                    <CustomButton
                                        text="Revogar"
                                        textColor={colorScheme.Buttons.BootstrapWarning.color}
                                        bgColor={colorScheme.Buttons.BootstrapWarning.backgroundColor}
                                        buttonStyle={ButtonsStyles.default}
                                        style={{
                                            width: '100%'
                                        }}
                                        onPress={handleRevoke}
                                    />
                                </>
                                : null
                        }
                        {
                            currentUser?.type === ADMIN_USER_TYPE ?
                                <>
                                    <CustomButton
                                        text="Apagar"
                                        textColor={colorScheme.Buttons.BootstrapDanger.color}
                                        bgColor={colorScheme.Buttons.BootstrapDanger.backgroundColor}
                                        buttonStyle={ButtonsStyles.default}
                                        style={{
                                            width: '100%'
                                        }}
                                        onPress={handleDelete}
                                    />
                                </>
                                : null
                        }
                    </View>
                </View>
            ) : (
                <Text style={[{ color: colorScheme.Text.dark }, styles.error]}>Não foi possível carregar os detalhes da reclamação.</Text>
            )}
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    panel: { padding: 10 },
    flexRow: { flexDirection: 'row', marginBottom: 20 },
    flexText: { flex: 1, marginLeft: 10 },
    text: { fontSize: 16 },
    bold: { fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    description: { textAlign: 'justify', marginBottom: 20 },
    image: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
    error: { color: 'red', textAlign: 'center', marginTop: 20 },
    loadingText: { textAlign: 'center', marginTop: 20, fontSize: 18 },
    button: { marginHorizontal: 10 },
});
