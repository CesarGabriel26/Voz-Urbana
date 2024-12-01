import React, { useEffect, useState } from "react"
import { useTheme } from "../../utils/ThemeContext";
import { View, TextInput, TouchableOpacity, Modal, StyleSheet, Text } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { ADMIN_USER_TYPE, categories, FILTROS, priorities } from '../../utils/Constantes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InputStyles } from "../../styles/Inputs";
import { ButtonsStyles } from "../../styles/Buttons";
import { loadCurrentUserData } from "../../managers/userController";

export default function FilterForm({
    style,
    searchText,
    setSearchText,
    filterOption,
    setFilterOption,
    filterPriorityOption,
    setFilterPriorityOption,
    filterCategoryOption,
    setFilterCategoryOption,
    navigation,
    loadOption,
    setLoadOption,
    filterActiveOption,
    setFilterActiveOption
}) {
    const { colorScheme } = useTheme();
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const load = async () => {
            let us = await loadCurrentUserData()
            setUser(us[0])
        }

        load()
    }, [])

    return (
        <View style={style} >
            <View style={{ display: 'flex', flexDirection: 'row' }} >
                <TextInput
                    style={[
                        colorScheme.Inputs.PrimaryGhost,
                        {
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 8,
                            marginVertical: 10,
                            flex: 6
                        }
                    ]}
                    placeholder="Buscar por título ou conteúdo"
                    placeholderTextColor={colorScheme.Inputs.PrimaryGhost.placeHolder}
                    value={searchText}
                    onChangeText={setSearchText}
                />

                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}
                    onPress={() => {
                        setVisible(true)
                    }}
                >
                    <Icon name="filter-variant" size={30} color={colorScheme.Icons.filter} />
                </TouchableOpacity>
            </View>

            <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setVisible(false)} // Fecha o modal ao pressionar o botão de voltar
            >
                <View style={[styles.modalOverlay, { backgroundColor: colorScheme.Body_bg }]}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: colorScheme.Text.text }} >
                            Filtros
                        </Text>

                        {
                            loadOption ? (
                                <View style={{ gap: 5 }} >
                                    <Text style={{ fontSize: 15, color: colorScheme.Text.text }} >
                                        Listar
                                    </Text>
                                    <Dropdown
                                        data={[
                                            {
                                                label: "Locais",
                                                value: "all",
                                            },
                                            {
                                                label: "Minhas",
                                                value: "user",
                                            }
                                        ].map((f) => ({ label: f.label, value: f.value }))}
                                        labelField="label"
                                        valueField="value"
                                        value={loadOption}
                                        placeholder="Selecione um tema"
                                        placeholderStyle={{ color: colorScheme.Text.placeHolder }}
                                        selectedTextStyle={{ color: colorScheme.Text.text }}x
                                        onChange={(item) => { setLoadOption(item.value) }}
                                        style={[InputStyles.input, { borderColor: colorScheme.Text.text }]}
                                    />
                                </View>
                            ) : null
                        }

                        <View style={{ gap: 5 }} >
                            <Text style={{ fontSize: 15, color: colorScheme.Text.text }} >
                                Organizar por
                            </Text>
                            <Dropdown
                                data={FILTROS.map((f) => ({ label: f.label, value: f.value }))}
                                labelField="label"
                                valueField="value"
                                value={filterOption}
                                placeholder="Selecione um tema"
                                placeholderStyle={{ color: colorScheme.Text.placeHolder }}
                                selectedTextStyle={{ color: colorScheme.Text.text }}
                                onChange={(item) => { setFilterOption(item.value) }}
                                style={[InputStyles.input, { borderColor: colorScheme.Text.text }]}
                            />
                        </View>

                        <View style={{ gap: 5 }} >
                            <Text style={{ fontSize: 15, color: colorScheme.Text.text }} >
                                Prioridade
                            </Text>
                            <Dropdown
                                data={priorities.map((Item) => ({ label: `${Item.level}`, value: Item.level }))}
                                labelField="label"
                                valueField="value"
                                value={filterPriorityOption}
                                placeholder=""
                                placeholderStyle={{ color: colorScheme.Text.placeHolder }}
                                selectedTextStyle={{ color: colorScheme.Text.text }}
                                onChange={(item) => { setFilterPriorityOption(item.value) }}
                                style={[InputStyles.input, { borderColor: colorScheme.Text.text }]}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setVisible(false)
                                    navigation.navigate('Escala de Prioridades')
                                }}
                            >
                                <Text style={{ fontSize: 15, color: colorScheme.Text.text }} >O que são as prioridades ?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ gap: 5 }} >
                            <Text style={{ fontSize: 15, color: colorScheme.Text.text }} >
                                Categoria
                            </Text>
                            <Dropdown
                                data={categories.map((Item) => ({ label: Item, value: Item }))}
                                labelField="label"
                                valueField="value"
                                value={filterCategoryOption}
                                placeholder=""
                                placeholderStyle={{ color: colorScheme.Text.placeHolder }}
                                selectedTextStyle={{ color: colorScheme.Text.text }}
                                onChange={(item) => { setFilterCategoryOption(item.value) }}
                                style={[InputStyles.input, { borderColor: colorScheme.Text.text }]}
                            />
                        </View>

                        {
                            user?.type === ADMIN_USER_TYPE ? (
                                <View style={{ gap: 5 }} >
                                    <Text style={{ fontSize: 15, color: colorScheme.Text.text }} >
                                        Listar
                                    </Text>
                                    <Dropdown
                                        data={[
                                            {
                                                label: "Somente petições abertas",
                                                value: true
                                            },
                                            {
                                                label: "Somente petições a abirir",
                                                value: false
                                            }
                                        ].map((Item) => ({ label: Item.label, value: Item.value }))}
                                        labelField="label"
                                        valueField="value"
                                        value={filterActiveOption}
                                        placeholder=""
                                        placeholderStyle={{ color: colorScheme.Text.placeHolder }}
                                        selectedTextStyle={{ color: colorScheme.Text.text }}
                                        onChange={(item) => { setFilterActiveOption(item.value) }}
                                        style={[InputStyles.input, { borderColor: colorScheme.Text.text }]}
                                    />
                                </View>
                            ) : null
                        }

                        <View style={{ gap: 5 }} >
                            <TouchableOpacity
                                onPress={() => setVisible(false)}
                                style={
                                    [
                                        ButtonsStyles.btn, ButtonsStyles.default, colorScheme.Buttons.Primary,
                                    ]
                                }
                            >
                                <Text
                                    style={
                                        [
                                            colorScheme.Buttons.Primary,
                                            {
                                                textAlign: 'center',
                                                fontSize: 15
                                            }
                                        ]
                                    }
                                >
                                    Aplicar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setVisible(false)}
                                style={
                                    [
                                        ButtonsStyles.btn, ButtonsStyles.default, colorScheme.Buttons.BootstrapDanger,
                                    ]
                                }
                            >
                                <Text
                                    style={
                                        [
                                            colorScheme.Buttons.BootstrapDanger,
                                            {
                                                textAlign: 'center',
                                                fontSize: 15
                                            }
                                        ]
                                    }
                                >
                                    Cancelar
                                </Text>
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
        borderRadius: 8,
        padding: 20,
        gap: 20
    },
})

