import React, { useState } from "react"
import { useTheme } from "../../utils/ThemeContext";
import { View, TextInput, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { FILTROS, priorities } from '../../utils/Constantes';
import Icon from '@expo/vector-icons/Entypo';
import { InputStyles } from "../../styles/Inputs";

export default function FilterForm({
    style,
    searchText,
    setSearchText,
    filterOption,
    setFilterOption,
    filterPriorityOption,
    setFilterPriorityOption,
    navigation,
    loadOption,
    setLoadOption
}) {
    const { colorScheme } = useTheme();
    const [visible, setVisible] = useState(false);

    return (
        <View style={style} >
            <View style={{ display: 'flex', flexDirection: 'row' }} >
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: colorScheme.Body_bg,
                        padding: 10,
                        borderRadius: 8,
                        marginVertical: 10,
                        color: colorScheme.Text.primary,
                        flex: 6
                    }}
                    placeholder="Buscar por título ou conteúdo"
                    placeholderTextColor={colorScheme.Text.secondary}
                    value={searchText}
                    onChangeText={setSearchText}
                />

                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}
                    onPress={() => {
                        setVisible(true)
                    }}
                >
                    <Icon name="list" size={30} color={colorScheme.Body_bg} />
                </TouchableOpacity>
            </View>

            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setVisible(false)} // Fecha o modal ao pressionar o botão de voltar
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }} >
                            Filtros
                        </Text>

                        <Dropdown
                            data={[
                                {
                                    label: "Listar petições locais",
                                    value: "all",
                                },
                                {
                                    label: "Listar somente as minhas",
                                    value: "user",
                                }
                            ].map((f) => ({ label: f.label, value: f.value }))}
                            labelField="label"
                            valueField="value"
                            value={loadOption}
                            placeholder="Selecione um tema"
                            placeholderStyle={{ color: colorScheme.Text.dark }}
                            selectedTextStyle={{ color: colorScheme.Text.dark }}
                            onChange={(item) => { setLoadOption(item.value) }}
                            style={InputStyles.input}
                        />
                        <Dropdown
                            data={FILTROS.map((f) => ({ label: f.label, value: f.value }))}
                            labelField="label"
                            valueField="value"
                            value={filterOption}
                            placeholder="Selecione um tema"
                            placeholderStyle={{ color: colorScheme.Text.dark }}
                            selectedTextStyle={{ color: colorScheme.Text.dark }}
                            onChange={(item) => { setFilterOption(item.value) }}
                            style={InputStyles.input}
                        />
                        <View style={{ gap: 5 }} >
                            <Dropdown
                                data={priorities.map((Item) => ({ label: `prioridade: ${Item.level}`, value: Item.level }))}
                                labelField="label"
                                valueField="value"
                                value={filterPriorityOption}
                                placeholder=""
                                placeholderStyle={{ color: colorScheme.Text.dark }}
                                selectedTextStyle={{ color: colorScheme.Text.dark }}
                                onChange={(item) => { setFilterPriorityOption(item.value) }}
                                style={InputStyles.input}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setVisible(false)
                                    navigation.navigate('Escala de Prioridades')
                                }}
                            >
                                <Text>O que são as prioridades ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
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
        gap: 20
    },
})

