import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { getPetitionById, getRemainingTimeForPetition, getUserById } from '../../utils/Api';
import { formatDate } from '../../utils/Parser';
import Avatar from '../../components/UserAvatar';
import { loadCurrentUserData } from '../../managers/userController';
import SupportersList from '../../components/Peticoes/SuportersList';
import * as Progress from 'react-native-progress';
import MainContainer from '../../components/MainContainer';
import Separator from '../../components/Separator';

export default function VerPeticaoApp({ route }) {

    const [petition, setPetition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [theme, setTheme] = useState("light");

    const loadPetitionDetails = async () => {
        try {
            const id = route.params?.id;
            if (id) {
                setLoading(true);

                const petitionDetails = await getPetitionById(id);
                const remainingTime = await getRemainingTimeForPetition(id);

                if (petitionDetails.content) {
                    setPetition({ ...petitionDetails.content, ...remainingTime });

                    const userData = await getUserById(petitionDetails.content.user_id);
                    setUser(userData.content);
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

    useEffect(() => {
        loadPetitionDetails();
    }, []);

    const textColor = theme === "light" ? styles.textDark : styles.textLight;
    const backgroundColor = theme === "light" ? styles.bgLight : styles.bgDark;

    const randomPhoto = () => {
        const pfps = [
            "https://www.blookup.com/static/images/single/profile-1.edaddfbacb02.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vfeVHe1s6k-TnUkqzEjzkWNKzcXjcUWKz3E1XxM7svVTYmzAstIhhZaw1EAwKzBoeaw&usqp=CAU",
        ];

        return pfps[Math.floor(Math.random() * pfps.length)];
    };

    return (
        <MainContainer>
            {loading ? (
                null
            ) : petition ? (
                <View style={styles.panel}>
                    {/* User Information */}
                    <View style={styles.flexRow}>
                        <Avatar
                            uri={user.anonimo ? randomPhoto() : user.pfp}
                            size='xl'
                            shape='square'
                        />
                        <View style={styles.flexText}>
                            <Text style={[textColor, styles.text]}>
                                Petição criada por: <Text style={styles.bold}>{user.anonimo ? "XXXXXXXX" : user.nome}</Text>
                            </Text>
                            <Text style={[textColor, styles.text]}>
                                Em: {formatDate(petition.data, true)}
                            </Text>
                        </View>
                    </View>

                    {/* Petition Details */}
                    <Text style={[textColor, styles.title]}>{petition.titulo || 'Título da Petição'}</Text>
                    <Text style={[textColor, styles.description]}>{petition.content || 'Descrição da causa.'}</Text>

                    {/* Status */}
                    <Text style={[textColor, styles.sectionTitle]}>Status da Petição</Text>
                    <Text style={[textColor, styles.text]}>
                        {petition.signatures} de {petition.required_signatures} assinaturas
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <Progress.Bar
                            style={{ flexGrow: 1 }}
                            progress={petition.signatures / petition.required_signatures}
                            color="#4caf50"
                            borderRadius={10}
                            height={20}
                        />
                    </View>
                    <Text style={[textColor, styles.text]}>
                        <Text style={styles.bold}>Tempo Restante:</Text>{' '}
                        {petition.tempo_restante.dias_restantes} dias,{' '}
                        {petition.tempo_restante.horas_restantes} horas,{' '}
                        {petition.tempo_restante.minutos_restantes} minutos
                    </Text>

                    {/* Additional Info */}
                    <Separator texto='Informações Adicionais' style={{ marginVertical: 20 }} />
                    <Text style={[textColor, styles.text]}>
                        <Text style={styles.bold}>Data Limite:</Text> {formatDate(petition.data_limite, true)}
                    </Text>
                    <SupportersList petition={petition} theme={theme} />
                </View>
            ) : (
                <Text style={[textColor, styles.error]}>Não foi possível carregar os detalhes da petição.</Text>
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
