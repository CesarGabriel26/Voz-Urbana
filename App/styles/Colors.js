import AsyncStorage from '@react-native-async-storage/async-storage';

export const Colors = {
    // Paleta Neutra e Elegante
    MainTheme: {
        textPrimary: '#000000',
        textSecondary: '#FFFFFF',

        title: '#0A62AC',

        background: '#FFFFFF',
        backgroundInverse: '#000000',
        panelBackground: '#0A62AC',
        
        buttonPrimary: '#0A62AC',
        buttonSecondary: '#FFFFFF',
    },

    // Paleta Escura e Minimalista
    DarkMode: {
        textPrimary: '#FFFFFF',
        textSecondary: '#000000',
        
        title: '#0A62AC',

        background: '#000000',
        backgroundInverse: '#FFFFFF',

        panelBackground: '#0A62AC',
        buttonPrimary: '#BB86FC',
        buttonSecondary: '#03DAC6',
    },
};

export async function getColorScheme() {
    let StoredSchema = await AsyncStorage.getItem('colorSchema')
    let Scheme = StoredSchema ? Colors[StoredSchema] : Colors.DarkMinimal
    return Scheme
}

export async function setColorScheme(scheme) {
    try {
        await AsyncStorage.setItem('colorSchema', scheme);
    } catch (e) {
        console.log(e);
    }
}

export function colorSchemas() {
    return Object.keys(Colors)
}