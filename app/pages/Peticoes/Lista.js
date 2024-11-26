import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { listPetitions, listReports } from '../../utils/Api';
import MainContainer from '../../components/MainContainer'
import PriorityCard from '../../components/PriorityCard';
import { Dropdown } from 'react-native-element-dropdown';
import { priorities } from '../../utils/Constantes';

export default function Lista({ navigation }) {
    const { colorScheme } = useTheme();
    const [Petitions, setPetitions] = useState([]);
    const [filteredPetitions, setFilteredPetitions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterOption, setFilterOption] = useState('Data ▲');
    const [filterPriorityOption, setFilterPriorityOption] = useState(0);

    const loadList = async () => {
        let resp = await listPetitions();
        if (resp.content) {
            setPetitions(resp.content);
            setFilteredPetitions(resp.content);
        }
    };

    useEffect(() => {
        loadList()
    }, []);

    const applyFilters = () => {
        let filtered = [...Petitions];

        // Filtro de texto
        if (searchText.trim()) {
            filtered = filtered.filter(petition =>
                petition.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
                petition.content.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Filtro por prioridade(><) ou data
        if (filterOption) {
            switch (filterOption) {
                case 'novo':
                    filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
                    break;
                case 'antigo':
                    filtered.sort((a, b) => new Date(a.data) - new Date(b.data));
                    break;
                case 'prioridade_alta':
                    filtered.sort((a, b) => b.prioridade - a.prioridade);
                    break;
                case 'prioridade_baixa':
                    filtered.sort((a, b) => a.prioridade - b.prioridade);
                    break;
                default:
                    break;
            }
        }

        // Filtro por prioridade 0 a 10
        if (filterPriorityOption) {
            
        }

        setFilteredPetitions(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [searchText, filterOption]);

    return (
        <MainContainer  >
            <View style={{ marginVertical: 20 }} >
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: colorScheme.Body_bg,
                        padding: 10,
                        borderRadius: 8,
                        marginVertical: 10,
                        color: colorScheme.Text.primary
                    }}
                    placeholder="Buscar por título ou conteúdo"
                    placeholderTextColor={colorScheme.Text.secondary}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Dropdown
                    data={[
                        "Data ▼",
                        "Data ▲",
                        "Prioridade ▼",
                        "Prioridade ▲",
                    ].map((theme) => ({ label: theme, value: theme }))}
                    labelField="label"
                    valueField="value"
                    value={filterOption}
                    placeholder="Selecione um tema"
                    placeholderStyle={{ color: colorScheme.Text.dark }}
                    selectedTextStyle={{ color: colorScheme.Text.dark }}
                    onChange={setFilterOption}
                />
                <Dropdown
                    data={priorities.map((Item) => ({ label: `prioridade ${Item.level}`, value: Item.level }))}
                    labelField="label"
                    valueField="value"
                    value={filterPriorityOption}
                    placeholder=""
                    placeholderStyle={{ color: colorScheme.Text.dark }}
                    selectedTextStyle={{ color: colorScheme.Text.dark }}
                    onChange={setFilterPriorityOption}
                />
            </View>

            {
                filteredPetitions.map((petition, i) => (
                    <PriorityCard
                        key={i}
                        prioridade={petition.prioridade}
                        tittle={petition.titulo}
                        date={petition.data}
                        content={petition.content}
                        onPress={() => {
                            navigation.navigate("Detalhes Da Petição", { id: petition.id })
                        }}
                        pressableText="ver main"
                        style={{ marginTop: i == 0 ? 20 : 0 }}
                    />
                ))
            }
        </MainContainer>
    );
}



