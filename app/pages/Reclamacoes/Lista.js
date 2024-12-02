import React, { useState, useEffect } from 'react';
import { listReports } from '../../utils/Api';
import MainContainer from '../../components/MainContainer'
import PriorityCard from '../../components/PriorityCard';
import FilterForm from '../../components/forms/FilterForm';
import { loadCurrentUserData } from '../../managers/userController';
import { ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';


export default function Lista({ navigation }) {
    const { colorScheme } = useTheme();

    const [Reports, setReports] = useState([]);
    const [filteredReports, setFilteredPetitions] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [filterOption, setFilterOption] = useState('Data-menor-maior');
    const [loadOption, setLoadOption] = useState('all');
    const [filterPriorityOption, setFilterPriorityOption] = useState("Todas");
    const [filterCategoryOption, setFilterCategoryOption] = useState('Não Especificada');
    const [filterActiveOption, setFilterActiveOption] = useState(true);

    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    const loadList = async () => {
        setLoading(true)
        setErro('')
        try {
            // throw new Error("Erro simulado para testes, remover na segunda feira");
            let resp = await listReports()
            if (resp.content) {
                setReports(resp.content);
                setFilteredPetitions(resp.content);
            }
        } catch (error) {
            setErro(error.message)
        }
        setLoading(false)
    };

    const applyFilters = () => {
        let filtered = [...Reports];

        // Filtro de texto
        if (searchText.trim()) {
            filtered = filtered.filter(petition =>
                petition.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
                petition.content.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (filterPriorityOption !== null && filterPriorityOption !== undefined) {
            if (filterPriorityOption != "Todas") {
                filtered = filtered.filter(petition => petition.prioridade === filterPriorityOption);
            }
        }

        if (filterCategoryOption !== null && filterCategoryOption !== "Não Especificada") {
            filtered = filtered.filter(petition => petition.categoria === filterCategoryOption);
        }


        // Filtro por prioridade(><) ou data
        if (filterOption) {
            switch (filterOption) {
                case 'Data-menor-maior':
                    filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
                    break;
                case 'Data-maior-menor':
                    filtered.sort((a, b) => new Date(a.data) - new Date(b.data));
                    break;
                case 'Prioridade-maior-menor':
                    filtered.sort((a, b) => b.prioridade - a.prioridade);
                    break;
                case 'Prioridade-menor-maior':
                    filtered.sort((a, b) => a.prioridade - b.prioridade);
                    break;
                default:
                    break;
            }
        }

        setFilteredPetitions(filtered);
    };

    useEffect(() => {
        loadList()
    }, [loadOption]);

    useEffect(() => {
        applyFilters();
    }, [searchText, filterOption, filterPriorityOption, filterCategoryOption]);

    return (
        <MainContainer  >
            <FilterForm
                style={{ marginVertical: 20 }}
                searchText={searchText}
                setSearchText={setSearchText}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                filterPriorityOption={filterPriorityOption}
                setFilterPriorityOption={setFilterPriorityOption}
                navigation={navigation}
                loadOption={loadOption}
                setLoadOption={setLoadOption}
                filterCategoryOption={filterCategoryOption}
                setFilterCategoryOption={setFilterCategoryOption}
                filterActiveOption={filterActiveOption}
                setFilterActiveOption={setFilterActiveOption}
            />
            {
                loading ? (
                    <ActivityIndicator size="large" color={colorScheme.Icons.loader.Primary} />
                ) : (
                    erro != '' ? (
                        <>
                            <Text style={{ color: colorScheme.Danger, textAlign: 'center', marginBottom: 20 }} >
                                Ocorreu um erro ao carregar as reclamações. Por favor, tente novamente mais tarde.
                            </Text>
                            <Text style={{ color: colorScheme.Danger, textAlign: 'center' }} >
                                {erro}
                            </Text>
                        </>
                    ) : (
                        filteredReports.map((reports, i) => (
                            reports.aceito === filterActiveOption ? (
                                <PriorityCard
                                    key={i}
                                    prioridade={reports.prioridade}
                                    tittle={reports.titulo}
                                    date={reports.data}
                                    content={reports.content}
                                    onPress={() => {
                                        navigation.navigate("Detalhes Da Reclamação", { id: reports.id })
                                    }}
                                    pressableText="ver main"
                                    style={{ marginTop: i == 0 ? 20 : 0 }}
                                />
                            ) : null
                        ))
                    )
                )
            }
        </MainContainer>
    );
}
