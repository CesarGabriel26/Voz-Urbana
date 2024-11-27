import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../utils/Api';
import { loadCurrentUserData } from '../../managers/userController';

export default function TakePhotoOrChooseFromGallery({ setImage, modalVisible = false, setModalVisible }) {
    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted' || mediaLibraryStatus !== 'granted') {
            alert('Precisamos de permissão para acessar a câmera e a galeria!');
            return false;
        }
        return true;
    };

    const openPicker = async (type) => {
        if (!requestPermissions()){
            return
        }
        
        let result;
        if (type === 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (!result.canceled) {
            uploadImageResult(result.assets[0].uri);
        }
        setModalVisible(false);
    };

    const uploadImageResult = async(uri) => {
        let currentUserData = await loadCurrentUserData()

        let result = await uploadImage(uri, currentUserData[0].nome)
        if (!result.error) {
            setImage(result.content.uri);
        }
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Escolha uma opção</Text>
                    <TouchableOpacity
                        onPress={() => openPicker('gallery')}
                        style={styles.modalButton}
                    >
                        <Text style={styles.modalButtonText}>Galeria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => openPicker('camera')}
                        style={styles.modalButton}
                    >
                        <Text style={styles.modalButtonText}>Câmera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={[styles.modalButton, styles.cancelButton]}
                    >
                        <Text style={styles.modalButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    modalButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 150,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
    },
});
