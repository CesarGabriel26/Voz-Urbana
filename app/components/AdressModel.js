import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { useTheme } from '../utils/ThemeContext';
import { getLatLongFromAddress } from '../utils/permissions/LocationPermtion';
import MainContainer from './MainContainer';
import ModalDropDown from './ModalDropDown';
import { onAddressSubmit } from '../managers/NovaReclamacao';
import { InputStyles } from '../styles/Inputs';
import { ButtonsStyles } from '../styles/Buttons';
import { getCities, getCountries, getStates } from '../utils/permissions/LocationSearch';

export default function AddressInput({ setModalVisible, modalVisible, setAdress, setLocation }) {
    const { colorScheme } = useTheme();
    const [loading, setLoading] = useState(false);

    const [paisesSelectModalVisible, setPaisesSelectModalVisible] = useState(false);
    const [paisSelecionado, setPaisSelecionado] = useState("BR");
    const [paises, setPaises] = useState([]);

    const [estadosSelectModalVisible, setEstadosSelectModalVisible] = useState(false);
    const [estadoSelecionado, setEstadoSelecionado] = useState("SP");
    const [estados, setEstados] = useState([]);

    const [cidasdeSelectModalVisible, setCidasdeSelectModalVisible] = useState(false);
    const [cidadeSelecionada, setCidadeSelecionada] = useState("Andradina");
    const [cidades, setCidades] = useState([]);

    const getLocation = async () => {
        setLoading(true)
        await loadCountries()
        await  loadStates()
        await  loadCities()
        setLoading(false)
    };

    const loadCountries = async() => {
        try {
            const _countries = await getCountries();
            setPaises(_countries)
        } catch (error) {
            console.error("Erro ao obter paises:", error);
        }
    }
    const loadStates = async() => {
        try {
            const _states = await getStates();
            setEstados(_states)
        } catch (error) {
            console.error("Erro ao obter estados", error);
        }
    }
    const loadCities = async() => {
        try {
            const _cities = await getCities(estadoSelecionado);
            setCidades(_cities)
        } catch (error) {
            console.error("Erro ao obter cidades:", error);
        }
    }

    const onSubmit = async (data) => {
        setLoading(true);

        const { NumeroDoLocal, Rua, CEP, Cidade, Estado, Pais } = data;

        try {
            const location = await getLatLongFromAddress(Rua, NumeroDoLocal, Cidade, Estado, Pais);
            setLocation(location);

            // Aqui, você pode usar `setAdress` para armazenar o endereço formatado
            setAdress(JSON.stringify({
                street: Rua,
                number: NumeroDoLocal,
                city: Cidade,
                state: Estado,
                country: Pais,
                zipCode: CEP,
            }));

            setModalVisible(false);
        } catch (error) {
            console.error("Erro ao processar o endereço:", error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getLocation()
    }, [paisSelecionado, estadoSelecionado])

    const {
        control: addressControl,
        handleSubmit: handleAddressSubmit,
        formState: { errors: addressErrors }
    } = useForm();


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <MainContainer>
                <View style={styles.body} >
                    <View style={{ gap: 5 }} >
                        <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                            Número do local
                        </Text>
                        <Controller
                            control={addressControl}
                            name="NumeroDoLocal"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Informe o número do local"
                                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType='number-pad'
                                />
                            )}
                        />
                        {addressErrors.NumeroDoLocal && (
                            <Text style={{ color: "red" }}>{addressErrors.NumeroDoLocal.message}</Text>
                        )}
                    </View>

                    <View style={{ gap: 5 }} >
                        <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                            Rua *
                        </Text>
                        <Controller
                            control={addressControl}
                            name="Rua"
                            defaultValue=""
                            rules={{
                                required: "A Rua do local é obrigatória.",
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder='Informe a Rua'
                                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {addressErrors.Rua && (
                            <Text style={{ color: "red" }}>{addressErrors.Rua.message}</Text>
                        )}
                    </View>

                    <View style={{ gap: 5 }} >
                        <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                            CEP
                        </Text>
                        <Controller
                            control={addressControl}
                            name="CEP"
                            defaultValue=""
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Informe o CEP do local"
                                    style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]}
                                    placeholderTextColor={colorScheme.Inputs.LightGhost.placeHolder}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType='number-pad'
                                />
                            )}
                        />
                        {addressErrors.CEP && (
                            <Text style={{ color: "red" }}>{addressErrors.CEP.message}</Text>
                        )}
                    </View>

                    <View style={{ gap: 5 }} >
                        <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                            Cidade *
                        </Text>
                        <TouchableOpacity
                            disabled={loading}
                            style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]} // Cor do borda para indicar seleção
                            onPress={() => setCidasdeSelectModalVisible(true)} // Abre o modal quando pressionado
                        >
                            <Text style={styles.placeholderText}>
                                {cidadeSelecionada ? `Cidade Selecionado: ${cidadeSelecionada}` : 'Selecione uma Cidade'}
                            </Text>
                        </TouchableOpacity>
                        <Controller
                            control={addressControl}
                            name="Cidade"
                            defaultValue="Andradina"
                            rules={{
                                required: "A Cidade é obrigatória.",
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <ModalDropDown
                                        visible={cidasdeSelectModalVisible}
                                        setVisible={setCidasdeSelectModalVisible}
                                        items={cidades.map((cidade) => ({ label: cidade, value: cidade }))}
                                        value={value}
                                        onChange={(val) => {
                                            onChange(val)
                                            setCidadeSelecionada(val)
                                        }}
                                        placeholder="Selecione uma Cidade"
                                        title="Selecione a cidade onde você está"
                                    />
                                </>
                            )}
                        />
                        {addressErrors.Cidade && (
                            <Text style={{ color: "red" }}>{addressErrors.Cidade.message}</Text>
                        )}
                    </View>

                    <View style={{ gap: 5 }} >
                        <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                            Estado *
                        </Text>
                        <TouchableOpacity
                            disabled={loading}
                            style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]} // Cor do borda para indicar seleção
                            onPress={() => setEstadosSelectModalVisible(true)} // Abre o modal quando pressionado
                        >
                            <Text style={styles.placeholderText}>
                                {estadoSelecionado ? `Estado Selecionado: ${estadoSelecionado}` : 'Selecione um Estado'}
                            </Text>
                        </TouchableOpacity>
                        <Controller
                            control={addressControl}
                            name="Estado"
                            defaultValue="SP"
                            rules={{
                                required: "Estado é obrigatório.",
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <ModalDropDown
                                        visible={estadosSelectModalVisible}
                                        setVisible={setEstadosSelectModalVisible}
                                        items={estados.map((estado) => ({ label: estado.name, value: estado.code }))}
                                        value={value}
                                        onChange={(val) => {
                                            onChange(val)
                                            setEstadoSelecionado(val)
                                        }}
                                        placeholder="Selecione um Estado"
                                        title="Selecione o estado onde você está"
                                    />
                                </>
                            )}
                        />
                        {addressErrors.Estado && (
                            <Text style={{ color: "red" }}>{addressErrors.Estado.message}</Text>
                        )}
                    </View>

                    <View style={{ gap: 5 }} >
                        <Text style={{ color: colorScheme.Text.title, fontWeight: '600', fontSize: 20 }}>
                            País *
                        </Text>
                        <TouchableOpacity
                            disabled={loading}
                            style={[InputStyles.input, colorScheme.Inputs.PrimaryGhost]} // Cor do borda para indicar seleção
                            onPress={() => setPaisesSelectModalVisible(true)} // Abre o modal quando pressionado
                        >
                            <Text style={styles.placeholderText}>
                                {paisSelecionado ? `País Selecionado: ${paisSelecionado}` : 'Selecione um País'}
                            </Text>
                        </TouchableOpacity>


                        <Controller
                            control={addressControl}
                            name="Pais"
                            defaultValue="BR"
                            rules={{ required: 'O país é obrigatório.' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <ModalDropDown
                                        visible={paisesSelectModalVisible}
                                        setVisible={setPaisesSelectModalVisible}
                                        items={paises.map((paise) => ({ label: paise.name, value: paise.code }))}
                                        value={value}
                                        onChange={(val) => {
                                            onChange(val)
                                            setPaisSelecionado(val)
                                        }}
                                        placeholder="Selecione um País"
                                        title="Selecione o país onde você está"
                                    />
                                </>
                            )}
                        />
                        {addressErrors.Pais && <Text style={{ color: 'red' }}>{addressErrors.Pais.message}</Text>}
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}
                    >
                        <TouchableOpacity
                            style={[ButtonsStyles.default, colorScheme.Buttons.Primary]}
                            onPress={handleAddressSubmit(onSubmit)}
                        >
                            <Text style={{ color: 'white' }}> Checar Endereço </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </MainContainer>
        </Modal>
    );
}

const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
});
