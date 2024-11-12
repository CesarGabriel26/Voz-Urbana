import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView } from 'react-native';
import CustomMap from '../../components/CustomMap';
import { useTheme } from '../../utils/ThemeContext';
import { getUserLocation } from '../../utils/LocationPermition';
import { TouchableOpacity } from 'react-native';

import Dialog from 'react-native-dialog';
import CheckBox from 'react-native-check-box';

export default function CriaPeticao({ navigation }) {
    const { colorScheme } = useTheme();

    const [visible, setVisible] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);

    const [cause, setCause] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState(1000); 
    const [local, setLocal] = useState(''); // Default to 1000 signatures

    const [region, setRegion] = useState({
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });
    const [marker, setMarker] = useState({
        latitude: -23.5505,
        longitude: -46.6333,
    });


    const handleLocationSelect = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarker({ latitude: latitude, longitude: longitude })
    };

    const handleSubmit = () => {
        if (!cause || !description) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };

    const handleOk = async () => {
        setVisible(false)
        Alert.alert('Sucesso', 'Sua petição foi criada com sucesso! Acompanhe o processo de analize em suas petições');
    };

    useEffect(() => {
        (async () => {
            try {
                let { latitude, longitude } = await getUserLocation();
                setRegion((prevValue) => ({ ...prevValue, latitude: latitude, longitude: longitude }));
                setMarker({ latitude: latitude, longitude: longitude })
            } catch (error) {
                console.error("Erro ao obter localização:", error);
            }
        })()
    }, [])

    return (
        <ScrollView>
            <View style={[styles.container, { backgroundColor: colorScheme.background.default }]}>
                <Text style={[styles.title, { color: colorScheme.text.primary }]}>Monte sua petição!</Text>

                <Text style={{ fontWeight: 800, color: colorScheme.text.primary }} >Causa:</Text>
                <TextInput
                    style={[styles.input, { borderColor: colorScheme.button.primary, color: colorScheme.text.dark }]}
                    placeholderTextColor={colorScheme.text.placeholder}
                    placeholder="Digite a causa"
                    value={cause}
                    onChangeText={setCause}
                />

                <Text style={{ fontWeight: 800, color: colorScheme.text.primary }}>Explique sua petição:</Text>
                <TextInput
                    style={[styles.input, { height: 100, borderColor: colorScheme.button.primary, color: colorScheme.text.dark }]}
                    placeholderTextColor={colorScheme.text.placeholder}
                    multiline
                    placeholder="Descreva o problema ou motivo"
                    value={description}
                    onChangeText={setDescription}
                />

                <Text style={{ fontWeight: 800, color: colorScheme.text.primary }}>Meta (assinaturas):</Text>
                <TextInput
                    style={[styles.input, { borderColor: colorScheme.button.primary, color: colorScheme.text.dark }]}
                    placeholderTextColor={colorScheme.text.placeholder}
                    keyboardType="numeric"
                    placeholder="Ex: 1000"
                    value={String(goal)}
                    onChangeText={(value) => setGoal(Number(value))}
                />

                <Text style={{ fontWeight: 800, color: colorScheme.text.primary }}>Informe um local:</Text>

                <CustomMap
                    initialRegion={region}
                    style={styles.map}
                    onPress={handleLocationSelect}
                    markers={[
                        {
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }
                    ]}
                />

                {/* <Text style={{ color: colorScheme.text.dark, marginBottom: 15 }} >Coordenadas selecionadas: {`${marker.latitude.toFixed(2)} x ${marker.longitude.toFixed(2)}`}</Text> */}

                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: colorScheme.button.primary }]}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: colorScheme.text.secondary }}>
                        Enviar Petição
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.footerText, { color: colorScheme.text.dark }]}>(As suas petições serão públicas!)</Text>

            </View>


            <Dialog.Container visible={visible}>
                <Dialog.Title>Atenção</Dialog.Title>
                <Dialog.Description>
                    Ao clicar em Continuar vc estara concordando com os termos e politicas estabelecidos por sua região.
                </Dialog.Description>
                <Dialog.Description>
                    A politica para abaixo-assinados e petições variam entre cada estado, procure se informar sobre como funciona em sua região antes de publicar uma.
                </Dialog.Description>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <CheckBox
                        isChecked={isAccepted}
                        onClick={() => setIsAccepted(!isAccepted)}
                    />
                    <Text style={{ marginLeft: 10 }}>Estou ciente de como esse processo funciona</Text>
                </View>
                <Dialog.Button
                    color={colorScheme.text.primary}
                    label="Cancel"
                    onPress={handleCancel}
                />
                <Dialog.Button
                    color={!isAccepted ? colorScheme.text.placeholder : colorScheme.text.primary}
                    disabled={!isAccepted}
                    label="Continuar"
                    onPress={() => {
                        if (isAccepted) {
                            handleOk()
                        }
                    }} />
            </Dialog.Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
    },
    map: {
        width: '100%',
        height: 150,
        marginVertical: 10,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#666',
    },
    btn: {
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
