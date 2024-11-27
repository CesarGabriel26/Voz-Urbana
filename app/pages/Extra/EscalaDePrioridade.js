import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MainContainer from "../../components/MainContainer";
import { useTheme } from "../../utils/ThemeContext";
import { priorities } from "../../utils/Constantes";

export default function EscalaDePrioridade() {
    const { colorScheme } = useTheme();
    let prioridades = [...priorities]
    prioridades.shift()

    return (
        <MainContainer style={{ paddingTop: 20 }} >
            <Text style={{ color: colorScheme.Text.title, fontWeight: '700', fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
                Sistema de Prioridade
            </Text>
            {prioridades.map((priority) => (
                <View
                    key={priority.level}
                    style={[styles.card, { borderColor: priority.color }]}
                >
                    <View
                        style={[styles.colorIndicator, { backgroundColor: priority.color }]}
                    />
                    <Text style={styles.level}>Prioridade {priority.level}</Text>
                    <Text style={styles.description}>{priority.description}</Text>
                    <Text style={styles.example}>Exemplo: {priority.example}</Text>
                </View>
            ))}
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        borderWidth: 2,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    colorIndicator: {
        height: 10,
        width: "100%",
        marginBottom: 8,
    },
    level: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    example: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#555",
    },
});