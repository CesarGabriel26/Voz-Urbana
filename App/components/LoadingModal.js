import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

const LoadingModal = ({ visible }) => {
    const { colorScheme } = useTheme();

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
        >
            <View style={[styles.container, {backgroundColor: colorScheme.Screen.backgroundInverse}]}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color={colorScheme.Icons.loader}/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .5
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});

export default LoadingModal;
