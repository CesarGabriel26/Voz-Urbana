import * as Location from 'expo-location';
import { ADRESS_API_KEY } from '@env';

const apiKey = ADRESS_API_KEY;

export async function getUserLocation() {
    let location = null
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return;
    }

    let userLocation = await Location.getCurrentPositionAsync({}) || null;
    location = userLocation ? userLocation.coords : null
    

    return location
}

export async function getLatLongFromAddress( rua, numero, cidade, estado, pais ) {
    // Constrói o endereço de forma flexível, ignorando o número se ele não foi preenchido
    const endereco = `${rua}${numero ? `, ${numero}` : ''}, ${cidade}, ${estado}, ${pais}`;

    // const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(endereco)}&apiKey=${apiKey}`);
    // console.log(response);
    
    // const data = await response.json();
    // console.log(data);
    
    // if (data.items && data.items.length > 0) {
    //     const location = data.items[0].position; // Retorna a primeira localização
    //     return { latitude: location.lat, longitude: location.lng };
    // } else {
    //     throw new Error('Endereço não encontrado');
    // }

    return {latitude: -20.9049778, longitude: -51.3822349}
}