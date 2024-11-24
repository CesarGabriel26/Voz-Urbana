import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ModalDropDown = ({
    visible,
    setVisible,
    items,
    value,
    onChange, // Use onChange diretamente para atualizar o valor do formulário
    placeholder,
    title,
}) => {
    const [open, setOpen] = useState(false); // Controla o estado interno do dropdown

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setVisible(false)} // Fecha o modal ao pressionar o botão de voltar
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {title && <Text style={styles.title}>{title}</Text>}

                    <DropDownPicker
                        searchable={true}
                        searchPlaceholder='Pesquise o nome do pais'
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={onChange}
                        placeholder={placeholder}
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownBox}
                        onChangeValue={(val) => {
                            onChange(val); // Atualiza o formulário
                            setVisible(false); // Fecha o modal após a seleção
                        }}
                    />

                    <TouchableOpacity
                        style={styles.closeModalButton}
                        onPress={() => setVisible(false)} // Fecha o modal
                    >
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay escuro
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    dropdown: {
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    dropdownBox: {
        borderColor: '#ccc',
    },
    closeModalButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#DC3545',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ModalDropDown;
