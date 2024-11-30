import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getPetitionById, getRemainingTimeForPetition, getUserById } from '../../utils/Api';
import { formatDate } from '../../utils/Parser';
import Avatar from '../../components/UserAvatar';
import { loadCurrentUserData } from '../../managers/userController';
import SupportersList from '../../components/Peticoes/SuportersList';
import { ProgressBar } from 'react-native-paper'; // Biblioteca alternativa
import MainContainer from '../../components/MainContainer';
import Separator from '../../components/Separator';
import { useTheme } from '../../utils/ThemeContext';
import StepIndicator from 'react-native-step-indicator';
import { ButtonsStyles } from '../../styles/Buttons';
import CustomButton from '../../components/forms/button';
import { ADMIN_USER_TYPE, priorities } from '../../utils/Constantes';
import { updateComplaintStatus } from '../../managers/complaintController';
import { deletePetitionControl, updatePetitionSignatures, updatePetitionStatus } from '../../managers/petitionController';

export default function VerPeticaoApp({ navigation, route }) {
    const { colorScheme } = useTheme();
    let prioridades = [...priorities]
    prioridades.shift()

    const [customSteps, setCustomSteps] = useState(null);
    const [petition, setPetition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(null);

    const loadPetitionDetails = async () => {
        try {
            const id = route.params?.id;
            if (id) {
                setLoading(true);

                const petitionDetails = await getPetitionById(id);
                const remainingTime = await getRemainingTimeForPetition(id);

                if (petitionDetails.content) {
                    let petitionContent = { ...petitionDetails.content, ...remainingTime }

                    const userData = await getUserById(petitionContent.user_id);

                    setCustomSteps({
                        ...colorScheme.Steps,
                        stepStrokeFinishedColor: prioridades[petitionContent.prioridade].color,
                        stepIndicatorFinishedColor: prioridades[petitionContent.prioridade].color,
                        separatorFinishedColor: prioridades[petitionContent.prioridade].color,
                        stepStrokeCurrentColor: prioridades[petitionContent.prioridade].color,
                    })

                    setUser(userData.content);
                    setPetition(petitionContent);
                }
            }

            const data = await loadCurrentUserData();
            setCurrentUser(data[1] ? data[0] : null);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error loading petition details:', error);
        }
    };

    const randomPhoto = () => {
        const pfps = [
            "https://www.blookup.com/static/images/single/profile-1.edaddfbacb02.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vfeVHe1s6k-TnUkqzEjzkWNKzcXjcUWKz3E1XxM7svVTYmzAstIhhZaw1EAwKzBoeaw&usqp=CAU",
        ];

        return pfps[Math.floor(Math.random() * pfps.length)];
    };

    useEffect(() => {
        loadPetitionDetails();
    }, []);


    const handleApprove = async () => {
        await updatePetitionStatus(petition, 1, true, loadPetitionDetails);
    };

    const handleReprove = async () => {
        await updatePetitionStatus(petition, -1, true, loadPetitionDetails);
    };

    const handleRevoke = async () => {
        await updatePetitionStatus(petition, 0, false, loadPetitionDetails);
    };

    const handleEnd = async () => {
        await updatePetitionStatus(petition, 0, false, loadPetitionDetails);
    };

    const handleDelete = async () => {
        await deletePetitionControl(petition, () => {
            navigation.navigate('Petições');
        });
    };

    const handlesign = async () => {
        await updatePetitionSignatures(petition, loadPetitionDetails, currentUser);
    };

    const buttonDisabled = () => {
        return (petition.apoiadores && petition.apoiadores.includes(currentUser.id)) || currentUser.id === petition.user_id
    }

    return (
        <MainContainer>
            {loading ? (
                null
            ) : petition && customSteps ? (
                <View style={styles.panel}>
                    <>
                            {/* User Information */}
                            <View style={styles.flexRow}>
                                <Avatar
                                    uri={user.anonimo ? randomPhoto() : user.pfp}
                                    size='xl'
                                    shape='square'
                                />
                                <View style={styles.flexText}>
                                    <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                        Petição criada por: <Text style={styles.bold}>{user.anonimo ? "XXXXXXXX" : user.nome}</Text>
                                    </Text>
                                    <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                        Em: {formatDate(petition.data, true)}
                                    </Text>
                                </View>
                            </View>

                            {/* Petition Details */}
                            <Text style={[{ color: colorScheme.Text.text }, styles.title]}>{petition.titulo || 'Título da Petição'}</Text>
                            <Text style={[{ color: colorScheme.Text.text }, styles.description]}>{petition.content || 'Descrição da causa.'}</Text>

                            {/* Status */}
                            <Separator textStyle={{ fontSize: 20 }} texto='Status da Petição' color={prioridades[petition.prioridade].color} style={{ marginVertical: 20 }} />

                            <View style={{
                                display: 'flex',
                                width: '100%',
                            }} >
                                <View style={{
                                    backgroundColor: prioridades[petition.prioridade].color,
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
                                        Prioridade : {prioridades[petition.prioridade].title}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: 20 }} >
                                <StepIndicator
                                    currentPosition={petition.status < 0 ? 3 : petition.status}
                                    labels={
                                        petition.status < 0 ?
                                            ['Aguardando Aprovação', 'Coleta de assinaturas', 'Cancelada']
                                            :
                                            ['Aguardando Aprovação', 'Coleta de assinaturas', 'Encerrada']
                                    }
                                    stepCount={3}
                                    customStyles={customSteps}
                                />
                            </View>

                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                {petition.signatures} de {petition.required_signatures} assinaturas
                            </Text>
                            <ProgressBar
                                progress={(petition.signatures / petition.required_signatures < 0.01) ? 0 : petition.signatures / petition.required_signatures}
                                color={prioridades[petition.prioridade].color}
                                style={styles.progressBar}
                            />
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                <Text style={styles.bold}>Tempo Restante:</Text>{' '}
                                {petition.tempo_restante.dias_restantes} dias,{' '}
                                {petition.tempo_restante.horas_restantes} horas,{' '}
                                {petition.tempo_restante.minutos_restantes} minutos
                            </Text>

                            {/* Additional Info */}
                            <Separator textStyle={{ fontSize: 20 }} texto='Informações Adicionais' color={prioridades[petition.prioridade].color} style={{ marginVertical: 20 }} />

                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                <Text style={styles.bold}>Data Limite:</Text> {formatDate(petition.data_limite)}
                            </Text>
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                <Text style={styles.bold}>Atualizado em:</Text> {formatDate(petition.data_ultima_atualizacao)}
                            </Text>
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                <Text style={styles.bold}>Data de Conclusão:</Text> {petition.data_conclusao ? formatDate(petition.data_limite) : "Em andamento"}
                            </Text>
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                <Text style={styles.bold}>Data Limite:</Text> {petition.Categoria ? petition.Categoria : 'Não especificada'}
                            </Text>
                            <Text style={[{ color: colorScheme.Text.text }, styles.text]}>
                                <Text style={styles.bold}>Local:</Text> {petition.local}
                            </Text>
                        <SupportersList petition={petition} />
                    </>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 10
                        }}
                    >
                        {
                            petition.aberto ? (
                                <>
                                    <CustomButton
                                        text="Assinar"
                                        textColor={colorScheme.Buttons.BootstrapPrimary.color}
                                        bgColor={colorScheme.Buttons.BootstrapPrimary.backgroundColor}
                                        buttonStyle={ButtonsStyles.default}
                                        style={{
                                            opacity: buttonDisabled() ? .5 : 1,
                                            width: '100%'
                                        }}
                                        onPress={handlesign}
                                        disabled={
                                            buttonDisabled()
                                        }
                                    />

                                    {
                                        currentUser.type == ADMIN_USER_TYPE ? (
                                            <>
                                                <CustomButton
                                                    text="Encerrar"
                                                    textColor={colorScheme.Buttons.BootstrapSecondary.color}
                                                    bgColor={colorScheme.Buttons.BootstrapSecondary.backgroundColor}
                                                    buttonStyle={ButtonsStyles.default}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                    onPress={handleEnd}
                                                />
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
                                        ) : null
                                    }
                                </>

                            ) : (
                                currentUser.type == ADMIN_USER_TYPE ? (
                                    <>
                                        <CustomButton
                                            text="Reprovar"
                                            textColor={colorScheme.Buttons.BootstrapDanger.color}
                                            bgColor={colorScheme.Buttons.BootstrapDanger.backgroundColor}
                                            buttonStyle={ButtonsStyles.default}
                                            style={{
                                                width: '100%'
                                            }}
                                            onPress={handleReprove}
                                        />
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
                                    </>
                                ) : null
                            )
                        }
                        {
                            currentUser.type == ADMIN_USER_TYPE ? (
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
                            ) : null
                        }
                    </View>

                </View>
            ) : (
                <Text style={[{ color: colorScheme.Text.text }, styles.error]}>Não foi possível carregar os detalhes da petição.</Text>
            )}
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    panel: { padding: 10 },
    flexRow: { flexDirection: 'row', marginBottom: 20 },
    flexText: { flex: 1, marginLeft: 10 },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    text: { fontSize: 16 },
    bold: { fontWeight: 'bold' },
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    description: { textAlign: 'justify', marginBottom: 20 },
    progressBar: { height: 10, borderRadius: 5, marginVertical: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    textDark: { color: '#000' },
    textLight: { color: '#fff' },
    bgLight: { backgroundColor: '#fff' },
    bgDark: { backgroundColor: '#333' },
    error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
