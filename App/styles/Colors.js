import AsyncStorage from '@react-native-async-storage/async-storage';

export const Colors = {
    // Paleta Neutra e Elegante
    MainTheme: {
        Text: {
            textPrimary: '#000000',
            textSecondary: '#FFFFFF',
            textPlaceHolder: '#acacac',

            title: '#0A62AC',
        },

        Screen: {
            background: '#FFFFFF',
            backgroundInverse: '#000000',
            panelBackground: '#0A62AC',
        },

        Button: {
            buttonPrimary: '#0A62AC',
            buttonSecondary: '#FFFFFF',
        },

        Switch: {
            ios_backgroundColor: '#FFFFFF',
            thumbColor: {
                true: '#0A62AC',
                false: '#f4f3f4'
            }
        }

    },

    DarkMode: {
        Text: {
            textPrimary: '#FFFFFF',
            textSecondary: '#B0B0B0',
            textPlaceHolder: '#c9c9c9',

            title: '#0A62AC',
        },

        Screen: {
            background: '#000000',
            backgroundInverse: '#FFFFFF',
            panelBackground: '#1A1A1A',
        },

        Button: {
            buttonPrimary: '#0A62AC',
            buttonSecondary: '#FFFFFF',
        },

        Switch: {
            ios_backgroundColor: '#1A1A1A',
            thumbColor: {
                true: '#0A62AC',
                false: '#444444'
            }
        }
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