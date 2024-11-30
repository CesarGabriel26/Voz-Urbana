import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import Avatar from '../UserAvatar';
import { getUserById } from '../../utils/Api';
import { useTheme } from '../../utils/ThemeContext';

export default function SupportersList({ petition, theme }) {
    const { colorScheme } = useTheme();

    const [supporters, setSupporters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [limit, setLimit] = useState(20);

    // Calcular número de páginas
    const numberOfPages = Math.ceil(supporters.length / limit);

    // Determinar limite com base no tamanho da tela
    useEffect(() => {
        const screenWidth = Dimensions.get('window').width;
        setLimit(screenWidth < 768 ? 2 : 44);
    }, []);

    // Buscar apoiadores
    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                const promises = petition.apoiadores.map(id => getUserById(id));
                const fetchedSupporters = await Promise.all(promises);

                setSupporters(fetchedSupporters);

                setCurrentPage(0); // Reseta para a primeira página
            } catch (error) {
                console.error('Erro ao buscar apoiadores:', error);
            }
        };

        if (petition.apoiadores.length > 0) {
            fetchSupporters();
        }
    }, [petition.apoiadores]);

    // Obtém a lista de apoiadores da página atual
    const getCurrentSupportersList = () => {
        const startIndex = currentPage * limit;
        const endIndex = startIndex + limit;
        return supporters.slice(startIndex, endIndex);
    };

    const listItemStyle = {
        ...styles.listItem,
        backgroundColor: colorScheme.list_item_bg
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colorScheme.Text.text }]}>
                Apoiadores:
            </Text>

            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                {supporters.length > 0 ? (
                    getCurrentSupportersList().map((item, i) => (
                        <View key={i} style={listItemStyle}>
                            <Avatar
                                uri={item.content.pfp}
                                size={60}
                                style={styles.avatar}
                            />
                            <Text style={[styles.supporterName, { color: colorScheme.Text.text }, { fontWeight: 'bold' }]}>
                                {item.content.nome}
                            </Text>
                            <Text style={[styles.supporterEmail, { color: colorScheme.Text.text }]}>
                                {item.content.email}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={[styles.noSupportersText, { color: colorScheme.Text.text }]}>
                        Ninguém apoiou ainda
                    </Text>
                )}
            </View>

            <PagerView
                style={styles.pagination}
                initialPage={0}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
                {
                    Array.from({ length: numberOfPages }).map((_, index) => (
                        <View key={index} style={styles.pageIndicator}>
                            <Text
                                style={[
                                    styles.pageNumber,
                                    currentPage === index && styles.activePage,
                                    { color: colorScheme.Text.text },
                                ]}
                            >
                                {index + 1}
                            </Text>
                        </View>
                    ))
                }
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    listItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    avatar: {
        marginBottom: 10,
    },
    supporterName: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    supporterEmail: {
        textAlign: 'center',
    },
    noSupportersText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    pagination: {
        height: 50,
        marginTop: 10,
    },
    pageIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageNumber: {
        fontSize: 16,
    },
    activePage: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
