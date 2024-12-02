import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import CustomMapProvider from '../../components/CustomMap';
import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import { listReports } from '../../utils/Api';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../utils/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterForm from '../../components/forms/FilterForm';

export default function Mapa({ navigation }) {
    const { colorScheme } = useTheme();
    const mapRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [location, setLocation] = useState(null);

    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);

    // Filtros
    const [priorityFilter, setPriorityFilter] = useState('Todas');
    const [countryFilter, setCountryFilter] = useState('all');

    // Carregar dados iniciais
    const loadData = async () => {
        try {
            let loc = await getUserLocation();
            if (!loc) return console.error('Location not found');
            setLocation(loc);

            let resp = await listReports();
            if (!resp || !resp.content) return console.error('No complaints found');

            let dt = [
                {
                    passFilter : true,
                    latitude: parseFloat(loc.latitude),
                    longitude: parseFloat(loc.longitude),
                    titulo: "Você está aqui",
                    props: {
                        pinColor: colorScheme.Body_bg
                    }
                },
                ...resp.content
            ]

            setComplaints(dt);
            setFilteredComplaints(dt);
        } catch (error) {
            console.error('Error in loadData:', error);
        }
    };

    // Aplicar filtros
    const applyFilters = () => {
        let filtered = complaints;

        if (priorityFilter !== 'Todas') {
            filtered = filtered.filter((c) => c.prioridade === priorityFilter || c.passFilter);
        }

        if (countryFilter != 'all') {
            filtered = filtered.filter((c) => {
                const partes = c.adress.split(',').map((part) => part.trim());
                const pais = partes[4]; // Posição do país no endereço
                return pais === countryFilter || c.passFilter;
            });
        }

        setFilteredComplaints(filtered);
        setCurrentIndex(0); // Resetar para o início após filtros
    };

    // Focar em uma reclamação específica
    const focusOnComplaint = (index) => {
        if (filteredComplaints[index] && mapRef.current) {
            const { latitude, longitude } = filteredComplaints[index];
            mapRef.current.focusOnRegion(parseFloat(latitude), parseFloat(longitude));
        }
    };

    // Avançar para a próxima reclamação
    const handleNext = () => {
        if (currentIndex < filteredComplaints.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentIndex(0)
        }
    };

    // Voltar para a reclamação anterior
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentIndex(filteredComplaints.length - 1)
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [countryFilter, priorityFilter]);

    useEffect(() => {
        if (filteredComplaints.length > 0) {
            focusOnComplaint(currentIndex);
        }
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            {
                location && (filteredComplaints.length > 0) ? (
                    <CustomMapProvider
                        ref={mapRef}
                        style={styles.map}
                        location={location}
                        markers={filteredComplaints}
                    />
                ) : null
            }

            <View style={[styles.controls, styles.controlTopRight, { backgroundColor: `rgba(${colorScheme.Body_bg_RGB}, 1)`, width: 40, height: 40 }]}>
                <FilterForm
                    style={{
                        iconColor: colorScheme.Text.light,
                        iconSize: 20,
                    }}

                    filterPriorityOption={priorityFilter}
                    setFilterPriorityOption={setPriorityFilter}
                    filterCountryOption={countryFilter}
                    setFilterCountryOption={setCountryFilter}
                    navigation={navigation}
                />
            </View>

            <View style={[styles.controls, , styles.controlsBottom, { backgroundColor: `rgba(${colorScheme.Body_bg_RGB}, 1)`, }]}>
                <TouchableOpacity onPress={handlePrevious}>
                    <Text style={[styles.arrow, { color: colorScheme.Text.light }]}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={[styles.complaintTitle, { color: colorScheme.Text.light }]}>
                    {filteredComplaints[currentIndex]?.titulo || 'Nenhuma reclamação'}
                </Text>
                <TouchableOpacity onPress={handleNext}>
                    <Text
                        style={[styles.arrow, { color: colorScheme.Text.light }]}
                    >
                        {'>'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    controls: {
        display: 'flex',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    controlsBottom: {
        bottom: 20,
        width: '90%',
        padding: 10,
        justifyContent: 'space-between',
    },
    controlTopRight: {
        top: 20,
        right: 20,
        justifyContent: 'center',
    },
    arrow: { fontSize: 24, fontWeight: 'bold', padding: 10 },
    complaintTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
});
