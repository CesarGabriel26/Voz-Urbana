import AsyncStorage from '@react-native-async-storage/async-storage';

export const Colors = {
    // Paleta Neutra e Elegante
    NeutralElegant: {
        textPrimary: '#2D2D2D',      // Cinza Escuro
        textSecondary: '#7A7A7A',    // Cinza Médio
        background: '#F5F5F5',       // Cinza Claro
        panelBackground: '#FFFFFF',  // Branco
        buttonPrimary: '#4CAF50',    // Verde
        buttonSecondary: '#FF5722',  // Laranja
    },

    // Paleta Moderna e Vibrante
    ModernVibrant: {
        textPrimary: '#263238',      // Azul Escuro
        textSecondary: '#90A4AE',    // Cinza Azulado
        background: '#ECEFF1',       // Cinza Bem Claro
        panelBackground: '#FFFFFF',  // Branco
        buttonPrimary: '#FF6F00',    // Laranja Forte
        buttonSecondary: '#0288D1',  // Azul
    },

    // Paleta Suave e Acessível
    SoftAccessible: {
        textPrimary: '#1C1C1E',      // Preto Suave
        textSecondary: '#8E8E93',    // Cinza Suave
        background: '#F2F2F7',       // Cinza Bem Claro
        panelBackground: '#FFFFFF',  // Branco
        buttonPrimary: '#007AFF',    // Azul Intenso
        buttonSecondary: '#FF9500',  // Laranja Intenso
    },

    // Paleta Escura e Minimalista
    DarkMode: {
        textPrimary: '#EAEAEA',      // Cinza Claro
        textSecondary: '#B3B3B3',    // Cinza Médio
        background: '#121212',       // Preto Profundo
        panelBackground: '#1E1E1E',  // Cinza Escuro
        buttonPrimary: '#BB86FC',    // Roxo Vibrante
        buttonSecondary: '#03DAC6',  // Verde Aqua
    },

    DarkMinimal: {
        textPrimary: '#E0E0E0',      // Cinza Claro
        textSecondary: '#B0BEC5',    // Cinza
        background: '#263238',       // Azul Escuro
        panelBackground: '#37474F',  // Cinza Escuro
        buttonPrimary: '#FFD600',    // Amarelo
        buttonSecondary: '#D32F2F',  // Vermelho
    },

    // Paleta de Alto Contraste
    HighContrast: {
        textPrimary: '#FFD700',      // Preto Absoluto
        textSecondary: '#2443f1',    // Branco Puro
        background: '#000000',       // Fundo Branco
        panelBackground: '#000000',  // Painel Preto
        buttonPrimary: '#9cf124',    // Amarelo Brilhante
        buttonSecondary: '#FF0000',  // Vermelho Intenso
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