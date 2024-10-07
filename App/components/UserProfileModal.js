import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { useTheme } from '../utils/ThemeContext';

import Icon from '@expo/vector-icons/Ionicons'

export default function UserProfile({ setModalVisible, modalVisible }) {
    const { colorScheme } = useTheme();

    return (
        <View style={[styles.container, {}]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}><Icon name='arrow-back' size={25} color={colorScheme.textSecondary}/></Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    modalView : {
        backgroundColor: 'red',
        width: '100%',
        flex: 1,
        padding: 10,
        paddingTop: 20
    }
});
