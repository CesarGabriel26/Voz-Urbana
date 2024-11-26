import React, { useState, useEffect } from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { getPetitionsByUser, listPetitions, listReports } from '../../utils/Api';
import MainContainer from '../../components/MainContainer'
import PriorityCard from '../../components/PriorityCard';
import { loadCurrentUserData } from '../../managers/userController';

export default function ListaDoUsuario({ navigation }) {
    const { colorScheme } = useTheme();

    const [Petitions, setPetitions] = useState([]);

    const loadList = async () => {
        const data = await loadCurrentUserData();

        let resp = await getPetitionsByUser(data.id)
        if (resp.content) {
            setPetitions(resp.content)
        }
    }

    useEffect(() => {
        loadList()
    }, []);


    return (
        <MainContainer  >
            {
                Petitions.map((petition, i) => (
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



