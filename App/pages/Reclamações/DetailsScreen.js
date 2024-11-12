import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import IonicIcons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../utils/ThemeContext';
import { formatDate } from '../../utils/Parser';

export default function DetalhesReclamacoes({ navigation, route }) {
    const [complaint, setComplaint] = useState({});
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);

    const { colorScheme } = useTheme();

    const loadList = async () => {
        setLoaded(false);
        let rest = {
            content: {
                "aceito": false,
                "adress": "",
                "conteudo": "A imagem é enviada pro meu banco de imagens blob no vercel",
                "data": "Wed, 09 Oct 2024 15:24:53 GMT",
                "id": 8,
                "imagem": "https://ke5smiflveglftos.public.blob.vercel-storage.com/Admin_2024-10-09T15-24-27.713Z-WZnS0TcdwVkfKxgRzyeXMxAaI6KsZl.jpg",
                "latitude": "-20.904991",
                "longitude": "-51.382208",
                "titulo": "Teto muito foda",
                "user_id": 2
            }
        };

        if (rest.content) {
            let content = rest.content;
            let userRes = {
                "content": {
                    "cpf": "71137562048",
                    "email": "Admin",
                    "id": 2,
                    "nome": "Administrador",
                    "pfp": "https://ke5smiflveglftos.public.blob.vercel-storage.com/Admin_2024-10-13T05-13-24.602Z-vBCXRYSS6nBa9VO9SML5lWk52Foe05.jpg",
                    "senha": "$2b$12$gt28H1Ot5ZOyXRKT64Ayde1AEJEpF1Knn2W.mxcpeW8mU0ovyAmrm"
                },
                "message": "Found"
            };

            setComplaint(content);
            setUser(userRes.content);
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadList();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.background.default, paddingTop: 35 }]}>
            {loaded ? (
                <ScrollView style={{ flex: 1, width: '100%', display: 'flex'}}>
                    <View style={{ backgroundColor: colorScheme.Card.cardBackground, padding: 15, borderRadius: 20}} >
                        <View style={styles.header}>
                            <Image source={{ uri: user.pfp }} style={styles.profilePic} />
                            <View style={styles.headerInfo}>
                                <Text style={[styles.dateText, { color: colorScheme.text.secondary }]}>
                                    {formatDate(complaint.data, true)}
                                </Text>
                                <Text style={[styles.userName, { color: colorScheme.text.secondary }]}>por {user.nome}</Text>
                            </View>
                        </View>

                        <View style={[styles.card, { backgroundColor: colorScheme.Card.cardLight }]}>
                            <Text style={[styles.title, { color: colorScheme.text.dark }]}>{complaint.titulo}</Text>
                            <Text style={[styles.description, { color: colorScheme.text.dark }]}>{complaint.conteudo}</Text>
                        </View>

                        <TouchableOpacity style={{ borderWidth: 2, borderColor: colorScheme.Card.cardLight, borderRadius: 10, overflow: 'hidden'}} >
                            <Image source={{ uri: complaint.imagem }} style={styles.complaintImage} />
                        </TouchableOpacity>
                        

                        <View style={styles.statusContainer}>
                            {complaint.aceito ? (
                                <View style={styles.statusApproved}>
                                    <Text style={[styles.statusText, { color: colorScheme.text.secondary }]}>
                                        Sua requisição foi respondida!
                                    </Text>
                                    <IonicIcons name="checkmark-done-circle-outline" size={30} color={colorScheme.Icons.check} />
                                </View>
                            ) : (
                                <Text style={[styles.statusText, { color: colorScheme.text.secondary }]}>
                                    Sua requisição ainda não foi respondida!
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <ActivityIndicator size="large" color={colorScheme.button.primary} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    headerInfo: {
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 14
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    description: {
        fontSize: 15,
        lineHeight: 22
    },
    complaintImage: {
        width: '100%',
        height: 200,
    },
    statusContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    statusApproved: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText: {
        fontSize: 16,
    }
});
