import * as Location from 'expo-location';
const KEY = "vee8Vj_O-V2a0lC-tvyPrmj4GNO8MOamr9h4bi_HqwI"

export async function getUserLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Permissão de localização negada!');
    return null;
  }
  
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}

export async function getLatLongFromAddress(rua, numero, cidade, estado, pais) {
    const endereco = `${rua}${numero ? `, ${numero}` : ''}, ${cidade}, ${estado}, ${pais}`;

    const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(endereco)}&apiKey=${KEY}`);
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
        const location = data.items[0].position; // Retorna a primeira localização
        return { latitude: location.lat, longitude: location.lng };
    } else {
        throw new Error('Endereço não encontrado');
    }
}