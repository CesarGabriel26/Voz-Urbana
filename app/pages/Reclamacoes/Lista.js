import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { listPetitions } from '../../utils/Api';
import MainContainer from '../../components/MainContainer'
import { formatDate } from '../../utils/Parser';
import { PrioritiesColors } from "../../utils/Constantes";
import { CardStyles } from '../../styles/CardStyles';

export default function ListaReclamacao({ navigation }) {
    const { colorScheme } = useTheme();

    const [Petitions, setPetitions] = useState([]);

    const loadList = async () => {
        let resp = await lista()
        if (resp.content) {
            let a = []

            for (let index = 0; index < 10; index++) {
                a = [...a, ...resp.content]
            }

            setPetitions(a)
        }
    }

    useEffect(() => {
        loadList()
    }, []);


    return (
        <MainContainer  >
            {
                Petitions.map((petition, i) => (
                    <View
                        key={i}
                        style={[CardStyles.card, { borderColor: PrioritiesColors[petition.prioridade], marginTop: i == 0 ? 20 : 0 }]}
                    >
                        <View
                            style={[CardStyles.colorIndicator, { backgroundColor: PrioritiesColors[petition.prioridade] }]}
                        />
                        <Text style={CardStyles.level}>{petition.titulo}</Text>
                        <Text numberOfLines={3} style={CardStyles.description}>{petition.content}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={[CardStyles.example, { flex: 1, }]}>{formatDate(petition.data)}</Text>

                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate("Detalhes Da Petição", { id: petition.id })
                                }}
                            >
                                <Text style={{ flex: 1, textAlign: 'right' }}>ver mais</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
        </MainContainer>
    );
}



