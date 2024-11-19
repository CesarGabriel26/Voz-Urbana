import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de paletas de cores
export const Colors = {
    Light: {
        Body_bg: "#0A62AC",
        Body_bg_light: "#ffffff",
        Body_bg_dark: "#000000",
        Danger: "#ff9393",

        Text: {
            title: "#0A62AC",
            text: "#FFFFFF"
        },

        Buttons: {
            Primary: {
                color: '#FFFFFF',
                backgroundColor: '#0A62AC',
            },
            Light: {
                color: '#000000',
                textTransform: "uppercase",
                backgroundColor: '#FFFFFF',
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: 10,
            },
            LightGhost: {
                color: '#FFFFFF',
                textTransform: "uppercase",
                borderColor: '#FFFFFF',
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: 10,
            },
            Dark: {
                color: '#FFFFFF',
                textTransform: "uppercase",
                backgroundColor: '#000000',
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: 10,
            },
            DarktGhost: {
                color: '#000000',
                textTransform: "uppercase",
                borderColor: '#000000',
                width: '100%',
                textAlign: 'center',
                paddingHorizontal: 10,
            },
        },

        Inputs: {
            Light: {
                color: '#000000',
                backgroundColor: '#FFFFFF',
                width: '100%',
                placeHolder: '#adadad'
            },
            LightGhost: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                width: '100%',
                placeHolder: '#adadad'
            },
            Dark: {
                color: '#FFFFFF',
                backgroundColor: '#000000',
                width: '100%',
                placeHolder: '#adadad'
            },
            DarktGhost: {
                color: '#000000',
                borderColor: '#000000',
                width: '100%',
                placeHolder: '#adadad'
            },
        },

        Icons: {
            loader: '#fff',
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
