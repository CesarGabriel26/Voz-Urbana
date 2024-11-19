import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

export default function LoadingModal ({ visible }) {
    const { colorScheme } = useTheme();

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
        >
            <View style={[styles.container, {backgroundColor: colorScheme.Body_bg_dark}]}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color={colorScheme.Icons.loader.Light}/>
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
