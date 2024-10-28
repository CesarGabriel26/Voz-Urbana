import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const StatusSteps = ({ steps, currentStep }) => {
    return (
        <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                    <View
                        style={[
                            styles.stepCircle,
                            index <= currentStep ? styles.activeStep : styles.inactiveStep,
                        ]}
                    >
                        <Text style={styles.stepText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepLabel}>{step}</Text>
                    {index < steps.length && (
                        <View style={[styles.stepLine, index <= currentStep ? styles.activeLine : styles.inactiveLine]} />
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stepContainer: {
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeStep: {
        backgroundColor: '#4CAF50', // Cor para o passo ativo
    },
    inactiveStep: {
        backgroundColor: '#ccc', // Cor para passos inativos
    },
    stepText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    stepLabel: {
        marginTop: 5,
        textAlign: 'center',
    },
    stepLine: {
        position: 'absolute',
        height: 2,
        width: '100%',
        top: 15,
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: -1
    },
    activeLine: {
        backgroundColor: '#4CAF50', // Cor para a linha ativa
    },
    inactiveLine: {
        backgroundColor: '#ccc', // Cor para a linha inativa
    },
});

export default StatusSteps;
