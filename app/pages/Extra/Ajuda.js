import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MainContainer from "../../components/MainContainer";
import { useTheme } from "../../utils/ThemeContext";

export default function Ajuda({ navigation }) {
    const { colorScheme } = useTheme();

    return (
        <MainContainer style={{ paddingTop: 20 }} >
            <Text style={{ color: colorScheme.Text.title, fontWeight: '700', fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
                Ajuda e Perguntas frequentes
            </Text>

            <>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Escala de Prioridades')
                    }}
                    style={[styles.option]}
                >
                    <Text style={[styles.label, { color: colorScheme.Text.text, fontSize: 15 }]}>
                        O que são prioridades?
                    </Text>
                </TouchableOpacity>
            </>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    option: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
});