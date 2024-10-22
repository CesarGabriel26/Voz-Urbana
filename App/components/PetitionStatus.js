import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useTheme } from '../utils/ThemeContext';

export default function PetitionStatus({ status }) {
    const { colorScheme } = useTheme();

    const finalSteps = {
        6: 'Rejeitada',
        7: 'Expirada'
    }

    let steps = [
        'Criada',
        'Aguardando aprovação',
        'Aprovada',
        'Em análise',
        'Em progresso',
        finalSteps[status] != null? finalSteps[status] : 'Concluída'
    ];


    const customStyles = colorScheme.PetitionStatus

    return (
        <View>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={status}
                labels={steps}
                stepCount={steps.length}
            />
        </View>
    );
};