import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../utils/ThemeContext';
import Icon from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { getLatLongFromAddress } from '../utils/LocationPermition';

export default function AddressInput({ setModalVisible, modalVisible, setAdress, setLocation }) {
    const { colorScheme } = useTheme();

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [state, setState] = useState('São Paulo');
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [Complemento, setComplemento] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Lista de estados e cidades
    const states = [
        { label: 'São Paulo', value: 'São Paulo' },
        { label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
        { label: 'Minas Gerais', value: 'Minas Gerais' },
        { label: 'Espírito Santo', value: 'Espírito Santo' },
    ];

    const citiesByState = {
        'São Paulo': ["São Paulo", "Campinas", "Santos", "Sorocaba", "Andradina"],
        'Rio de Janeiro': ["Rio de Janeiro", "Niterói", "Petrópolis", "Volta Redonda"],
        'Minas Gerais': ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
        'Espírito Santo': ["Vitória", "Vila Velha", "Serra", "Cariacica"]
    };

    const handleSubmit = async () => {
        setLoading(true);

        let location = await getLatLongFromAddress(street, number, city, state, "Brasil")
        setLocation(location)

        await setAdress(
            JSON.stringify(
                {
                    "street": street,
                    "number": number,
                    "city": city,
                    "state": state,
                    "Country": "Brasil",
                    "zipCode": zipCode,
                    "complemento": Complemento
                }
            )
        )
        setLoading(false);
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalView, { backgroundColor: colorScheme.Screen.background }]}>
                    <View style={[styles.header]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Icon name='arrow-back' size={25} color={colorScheme.Text.textPrimary} />
                            </TouchableOpacity>
                            <Text style={[styles.title, { color: colorScheme.Text.textPrimary }]}>Endereço</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={[{ color: colorScheme.Text.textPlaceHolder }]}>todos os campos com</Text>
                            <Text style={[{ color: "orange" }]}> * </Text>
                            <Text style={[{ color: colorScheme.Text.textPlaceHolder }]}>são obrigatorios</Text>
                        </View>
                    </View>

                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputContainer}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={[styles.label, { color: colorScheme.Text.textPrimary }]}>Rua</Text>
                                <Text style={[{ color: "orange" }]}> * </Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderBottomColor: colorScheme.Screen.panelBackground, color: colorScheme.Text.textPrimary }]}
                                value={street}
                                onChangeText={setStreet}
                                placeholder="Rua Exemplo"
                                placeholderTextColor={colorScheme.Text.textPlaceHolder}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colorScheme.Text.textPrimary }]}>Número</Text>
                            <TextInput
                                style={[styles.input, { borderBottomColor: colorScheme.Screen.panelBackground, color: colorScheme.Text.textPrimary }]}
                                value={number}
                                onChangeText={setNumber}
                                placeholder="123"
                                keyboardType="numeric"
                                placeholderTextColor={colorScheme.Text.textPlaceHolder}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colorScheme.Text.textPrimary }]}>CEP</Text>
                            <TextInput
                                style={[styles.input, { borderBottomColor: colorScheme.Screen.panelBackground, color: colorScheme.Text.textPrimary }]}
                                value={zipCode}
                                onChangeText={setZipCode}
                                placeholder="00000-000"
                                keyboardType="numeric"
                                placeholderTextColor={colorScheme.Text.textPlaceHolder}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={[styles.label, { color: colorScheme.Text.textPrimary }]}>Estado</Text>
                                <Text style={[{ color: "orange" }]}> * </Text>
                            </View>
                            <Picker
                                selectedValue={state}
                                onValueChange={(value) => {
                                    setState(value);
                                    setCity("");  // Reseta a cidade ao mudar o estado
                                }}
                                style={[styles.picker, { color: colorScheme.Text.textPrimary }]}
                            >
                                {states.sort().map((state) => (
                                    <Picker.Item key={state.value} label={state.label} value={state.value} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={[styles.label, { color: colorScheme.Text.textPrimary }]}>Cidade</Text>
                                <Text style={[{ color: "orange" }]}> * </Text>
                            </View>
                            <Picker
                                selectedValue={city}
                                onValueChange={(value) => setCity(value)}
                                style={[styles.picker, { color: colorScheme.Text.textPrimary }]}
                            >
                                <Picker.Item label="Selecione a cidade" value="" />
                                {citiesByState[state]?.sort().map((city) => (
                                    <Picker.Item key={city} label={city} value={city} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: colorScheme.Text.textPrimary }]}>Complemento</Text>
                            <TextInput
                                style={[styles.input, { borderBottomColor: colorScheme.Screen.panelBackground, color: colorScheme.Text.textPrimary }]}
                                placeholder='Em frente a [...], proximo de [...]'
                                placeholderTextColor={colorScheme.Text.textPlaceHolder}
                                value={Complemento}
                                onChangeText={setComplemento}
                            />
                        </View>

                        {loading && <ActivityIndicator size="small" color={colorScheme.Screen.panelBackground} style={styles.loadingIndicator} />}
                        {error ? <Text style={[styles.errorText, { color: colorScheme.Text.error }]}>{error}</Text> : null}
                    </ScrollView>

                    <TouchableOpacity
                        style={[styles.confirmButton, { backgroundColor: colorScheme.Button.primary }]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={[styles.buttonText, { color: colorScheme.Text.onPrimary }]}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingBottom: 12,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    body: {
        width: '100%',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1.5,
        fontSize: 16,
        paddingHorizontal: 8,
    },
    picker: {
        height: 40,
        width: '100%',
    },
    loadingIndicator: {
        marginTop: 10,
    },
    errorText: {
        fontSize: 14,
        marginTop: 5,
    },
    confirmButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
