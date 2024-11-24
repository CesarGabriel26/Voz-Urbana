import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import CustomMapProvider from '../../components/CustomMap';
import { getUserLocation } from '../../utils/permissions/LocationPermtion';
import { listReports } from '../../utils/Api';
import { Picker } from '@react-native-picker/picker';
import { Marker } from 'react-native-maps';

export default function Mapa() {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [location, setLocation] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);

    // Filtros
    const [priorityFilter, setPriorityFilter] = useState(null);
    const [countryFilter, setCountryFilter] = useState(null);

    // Carregar dados iniciais
    const loadData = async () => {
        try {
            let loc = await getUserLocation();
            if (!loc) return console.error('Location not found');
            setLocation(loc);

            let resp = await listReports();
            if (!resp || !resp.content) return console.error('No complaints found');

            setComplaints(resp.content);
            setFilteredComplaints(resp.content);
        } catch (error) {
            console.error('Error in loadData:', error);
        }
    };

    // Aplicar filtros
    const applyFilters = () => {
        let filtered = complaints;

        if (priorityFilter !== null) {
            filtered = filtered.filter((c) => c.prioridade === priorityFilter);
        }

        if (countryFilter) {
            filtered = filtered.filter((c) => {
                const partes = c.adress.split(',').map((part) => part.trim());
                const pais = partes[4]; // Posição do país no endereço
                return pais === countryFilter;
            });
        }

        setFilteredComplaints(filtered);
        setCurrentIndex(0); // Resetar para o início após filtros
        setModalVisible(false); // Fechar o modal
    };

    // Focar em uma reclamação específica
    const focusOnComplaint = (index) => {
        console.log(latitude, longitude);
        if (filteredComplaints[index]) {
            console.log(filteredComplaints[index]);
            const latitude  = filteredComplaints[index].latitude;
            const longitude  = filteredComplaints[index].longitude;

            mapRef.current.animateToRegion({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    };

    // Avançar para a próxima reclamação
    const handleNext = () => {
        if (currentIndex < filteredComplaints.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    // Voltar para a reclamação anterior
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (filteredComplaints.length > 0) {
            focusOnComplaint(currentIndex);
        }
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            <CustomMapProvider style={styles.map} location={location} markers={filteredComplaints}>
                {location && (
                    <Marker
                        coordinate={{
                            latitude: parseFloat(location.latitude),
                            longitude: parseFloat(location.longitude),
                        }}
                        pinColor="#f000ff"
                        title="Você está aqui"
                    />
                )}
            </CustomMapProvider>

            <View style={styles.controls}>
                <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0}>
                    <Text style={[styles.arrow, currentIndex === 0 && styles.disabledArrow]}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.complaintTitle}>
                    {filteredComplaints[currentIndex]?.title || 'Nenhuma reclamação'}
                </Text>
                <TouchableOpacity
                    onPress={handleNext}
                    disabled={currentIndex === filteredComplaints.length - 1}
                >
                    <Text
                        style={[
                            styles.arrow,
                            currentIndex === filteredComplaints.length - 1 && styles.disabledArrow,
                        ]}
                    >
                        {'>'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal para filtros */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text>Filtrar por Prioridade:</Text>
                    <Picker
                        selectedValue={priorityFilter}
                        onValueChange={(value) => setPriorityFilter(value)}
                    >
                        <Picker.Item label="Todos" value={null} />
                        {[...Array(11).keys()].map((level) => (
                            <Picker.Item key={level} label={`Prioridade ${level}`} value={level} />
                        ))}
                    </Picker>

                    <Text>Filtrar por País:</Text>
                    <Picker
                        selectedValue={countryFilter}
                        onValueChange={(value) => setCountryFilter(value)}
                    >
                        <Picker.Item label="Todos" value={null} />
                        <Picker.Item label="Brasil" value="Brasil" />
                        <Picker.Item label="EUA" value="EUA" />
                        <Picker.Item label="Outro" value="Outro" />
                    </Picker>

                    <Button title="Aplicar Filtros" onPress={applyFilters} />
                    <Button title="Fechar" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>

            <Button title="Filtrar" onPress={() => setModalVisible(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    controls: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 10,
    },
    arrow: { fontSize: 24, fontWeight: 'bold', padding: 10 },
    disabledArrow: { color: 'gray' },
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
