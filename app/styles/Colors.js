import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de paletas de cores
export const Colors = {
    Light: {
        Body_bg: "#0A62AC",
        Body_bg_second: "#ffffff",
        Body_bg_third: "#000000",

        Danger: "#dc3545",

        Text: {
            title: "#0A62AC",
            text: "#FFFFFF",
            dark: "#000000",
            placeHolder: '#adadad',
        },

        Buttons: {
            Primary: {
                color: '#FFFFFF',
                backgroundColor: '#0A62AC',
            },
            Secondary: {
                color: '#FFFFFF',
                backgroundColor: '#FFFFFF',
                borderWidth: 2,
                borderColor: '#0A62AC'
            },
            Light: {
                color: '#000000',
                backgroundColor: '#FFFFFF',

            },
            LightGhost: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
            },
            Dark: {
                color: '#FFFFFF',
                backgroundColor: '#000000',
            },
            DarktGhost: {
                color: '#000000',
                borderColor: '#000000',
            },
        },

        Inputs: {
            PrimaryGhost: {
                borderColor: '#0A62AC',
            },
            Light: {
                color: '#000000',
                backgroundColor: '#FFFFFF',
                placeHolder: '#adadad',
                width: '100%',
            },
            LightGhost: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                placeHolder: '#aaaaaaaa',
                width: '100%',
            },
            Dark: {
                color: '#FFFFFF',
                backgroundColor: '#000000',
                placeHolder: '#adadad',
                width: '100%',
            },
            DarktGhost: {
                color: '#000000',
                borderColor: '#000000',
                placeHolder: '#adadad',
                width: '100%',
            },
        },

        Icons: {
            loader: {
                Light: '#fff',
                Primary: '#0A62AC'
            },
            check: '#198754',
        },

        Switch: {
            ios_backgroundColor: '#FFFFFF',
            thumbColor: {
                true: '#0A62AC',
                false: '#F4F3F4'
            }
        },

        Steps: {
            stepStrokeFinishedColor: '#0A62AC',
            stepIndicatorFinishedColor: '#0A62AC',
            separatorFinishedColor: '#0A62AC',
            stepIndicatorLabelFinishedColor: '#FFFFFF',

            stepStrokeUnFinishedColor: '#AAAAAA',
            separatorUnFinishedColor: '#AAAAAA',
            stepIndicatorUnFinishedColor: '#AAAAAA',
            stepIndicatorLabelUnFinishedColor: '#FFFFFF',

            stepStrokeCurrentColor: '#0A62AC',
            stepIndicatorCurrentColor: '#FFFFFF',
            stepIndicatorLabelCurrentColor: '#0A62AC',

            labelColor: '#999999',
            currentStepLabelColor: '#0A62AC',
        }
    }

};

// Funções utilitárias para gerenciamento de esquemas de cores
export async function getColorScheme() {
    const storedSchema = await AsyncStorage.getItem('colorSchema');
    if (storedSchema && Colors[storedSchema]) {
        return Colors[storedSchema];
    }
    return Colors.Light; // Retorno padrão para evitar undefined
}

export async function setColorScheme(scheme) {
    // Armazena o esquema de cores escolhido
    try {
        await AsyncStorage.setItem('colorSchema', scheme);
    } catch (e) {
        console.error('Erro ao salvar o esquema de cores:', e);
    }
}

export function colorSchemas() {
    // Retorna as chaves dos esquemas de cores disponíveis
    return Object.keys(Colors);
}
