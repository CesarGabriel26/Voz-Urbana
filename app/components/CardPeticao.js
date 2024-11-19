import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { formatDate } from '../utils/Parser';
import { useTheme } from '../utils/ThemeContext';

export default function CardPeticao({ complaint, AlertaDeConfirmacao, ExibirPeticao, navigation }) {
    const { colorScheme } = useTheme();

    return (
        <View style={[styles.card, { backgroundColor: colorScheme.Body_bg }]}>
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} >
                <Image source={require('../assets/merp.gif')} style={{ width: 50, height: 50, borderRadius: 200 }} resizeMode="contain" />
                <Text style={[styles.cardText, { color: colorScheme.Text.textSecondary, marginTop: 0 }]}>
                    {formatDate(complaint.data)}
                </Text>
            </View>
            <View style={[styles.cardBody, { backgroundColor: colorScheme.Screen.background }]}>
                <Text numberOfLines={1} style={{ height: 25 }}>
                    {complaint.causa}
                </Text>
                <View style={{ height: 2, width: '100%', backgroundColor: colorScheme.Body_bg, marginVertical: 5 }}></View>
                <Text numberOfLines={5} style={{ maxHeight: 150, minHeight: 50 }} >
                    {complaint.content}
                </Text>
                <View style={{ height: 2, width: '100%', backgroundColor: colorScheme.Body_bg, marginVertical: 10 }}></View>
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }} >
                    <Text >
                        {complaint.signatures}
                    </Text>
                    <Progress.Bar progress={complaint.signatures / complaint.required_signatures} width={200} height={15} borderRadius={20} color={colorScheme.Body_bg} animationType='decay' />
                    <Text >
                        {complaint.required_signatures}
                    </Text>
                </View>
                {
                    AlertaDeConfirmacao ? (
                        <TouchableOpacity
                            style={
                                [
                                    { marginBottom: 5, padding: 10, borderRadius: 5, },
                                    { backgroundColor: colorScheme.Body_bg }
                                ]
                            }
                            onPress={AlertaDeConfirmacao}
                        >
                            <Text style={{ textAlign: 'center', color: colorScheme.Text.textSecondary }} >Assinar petição</Text>
                        </TouchableOpacity>
                    ) : null
                }
                {
                    ExibirPeticao ? (
                        <TouchableOpacity
                            style={
                                [
                                    { marginBottom: 5, padding: 10, borderRadius: 5, },
                                    { backgroundColor: colorScheme.Body_bg }
                                ]
                            }
                            onPress={() => {
                                navigation.navigate(
                                    "Detalhes Da Petição",
                                    { id : complaint.id }
                                )
                            }}
                        >
                            <Text style={{ textAlign: 'center', color: colorScheme.Text.textSecondary }} >Exibir</Text>
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    cardBody: {
        minHeight: 100,
        width: '100%',
        padding: 5,
        borderRadius: 10
    },
    cardText: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10
    }
});