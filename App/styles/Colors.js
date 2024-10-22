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
        },

        Icons: {
            loader: '0A62AC',
            check: '#25B92F'
        },

        PetitionStatus: {
            stepStrokeFinishedColor: '#0A62AC',
            stepIndicatorFinishedColor: '#0A62AC',
            separatorFinishedColor: '#0A62AC',
            stepIndicatorLabelFinishedColor: '#ffffff',

            stepStrokeUnFinishedColor: '#aaaaaa',
            separatorUnFinishedColor: '#aaaaaa',
            stepIndicatorUnFinishedColor: '#aaaaaa',
            stepIndicatorLabelUnFinishedColor: '#ffffff',

            stepStrokeCurrentColor: '#0A62AC',
            stepIndicatorCurrentColor: '#ffffff',
            stepIndicatorLabelCurrentColor: '#0A62AC',

            labelColor: '#999999',
            currentStepLabelColor: '#0A62AC',
        }

    },

    DarkMode: {
        Text: {
            textPrimary: '#FFFFFF',
            textSecondary: '#ffffff',
            textPlaceHolder: '#c9c9c9',

            title: '#0a8cac',
        },

        Screen: {
            background: '#000000',
            backgroundInverse: '#FFFFFF',
            panelBackground: '#1A1A1A',
        },

        Button: {
            buttonPrimary: '#0a8cac',
            buttonSecondary: '#FFFFFF',
        },

        Switch: {
            ios_backgroundColor: '#1A1A1A',
            thumbColor: {
                true: '#0a8cac',
                false: '#444444'
            }
        },

        Icons: {
            check: '#3dff4a'
        },

        PetitionStatus: {
            stepStrokeFinishedColor: '#0A62AC',
            stepIndicatorFinishedColor: '#0A62AC',
            separatorFinishedColor: '#0A62AC',
            stepIndicatorLabelFinishedColor: '#ffffff',

            stepStrokeUnFinishedColor: '#aaaaaa',
            separatorUnFinishedColor: '#aaaaaa',
            stepIndicatorUnFinishedColor: '#aaaaaa',
            stepIndicatorLabelUnFinishedColor: '#ffffff',

            stepStrokeCurrentColor: '#0A62AC',
            stepIndicatorCurrentColor: '#ffffff',
            stepIndicatorLabelCurrentColor: '#0A62AC',

            labelColor: '#999999',
            currentStepLabelColor: '#0A62AC',
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