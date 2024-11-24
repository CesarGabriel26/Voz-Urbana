import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MainContainer from "../../components/MainContainer";
import { useTheme } from "../../utils/ThemeContext";

export default function EscalaDePrioridade() {
    const { colorScheme } = useTheme();

    const priorities = [
        {
            level: 10,
            color: "#FF0000",
            description: "Situações extremamente perigosas ou críticas.",
            example: "Rua completamente alagada, bloqueando acesso a residências.",
        },
        {
            level: 9,
            color: "#FF3300",
            description: "Situações muito graves, próximas de urgência máxima.",
            example: "Cabo elétrico rompido solto no meio da estrada.",
        },
        {
            level: 8,
            color: "#FF6600",
            description: "Problemas graves que precisam de atenção rápida.",
            example: "Buraco grande na via principal, risco de acidentes.",
        },
        {
            level: 7,
            color: "#FF9900",
            description: "Problemas consideráveis, mas sem risco imediato grave.",
            example: "Poste de luz piscando próximo de uma área movimentada.",
        },
        {
            level: 6,
            color: "#FFCC00",
            description: "Moderadamente importante, exige atenção em breve.",
            example: "Sinais de trânsito apagados em cruzamentos menos movimentados.",
        },
        {
            level: 5,
            color: "#FFD700",
            description: "Questões importantes, mas sem risco imediato.",
            example: "Semáforo intermitente em um cruzamento.",
        },
        {
            level: 4,
            color: "#CCE700",
            description: "Problemas menores, mas que podem causar desconforto.",
            example: "Calçada quebrada em frente a uma escola.",
        },
        {
            level: 3,
            color: "#99FF33",
            description: "Problemas pouco significativos, mas visíveis.",
            example: "Lâmpada queimada em uma praça pública.",
        },
        {
            level: 2,
            color: "#66FF66",
            description: "Problemas menores que afetam pouquíssimas pessoas.",
            example: "Rachadura superficial em um banco público.",
        },
        {
            level: 1,
            color: "#33FF99",
            description: "Problemas de baixa relevância ou somente estéticos.",
            example: "Pequenas manchas de ferrugem em uma grade.",
        },
        {
            level: 0,
            color: "#00FFFF",
            description: "Questões insignificantes ou meramente informativas.",
            example: "Grafite em uma parede pública sem impacto no ambiente.",
        },
    ];

    return (
        <MainContainer style={{ paddingTop: 20 }} >
            <Text style={{ color: colorScheme.Text.title, fontWeight: '700', fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
                Sistema de Prioridade
            </Text>
            {priorities.map((priority) => (
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