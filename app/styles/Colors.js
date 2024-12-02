import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de paletas de cores
export const Colors = {
    Light: {
        Header_bg: "#0A62AC",
        Body_bg: "#0A62AC",
        Body_bg_RGB: "10, 98, 172",
        Body_bg_second: "#ffffff",
        Body_bg_third: "#000000",
        list_item_bg: "#fff", //"#333",

        Danger: "#dc3545",
        DangerLight: "#ff8c83",  // Vermelho intenso para erros

        Text: {
            headerTittle: '#ffffff',
            title: "#0A62AC",
            text: "#000000",
            dark: "#000000",
            light: "#FFFFFF",  
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
                color: '#000000',
                borderColor: '#000000',
            },
            Dark: {
                color: '#FFFFFF',
                backgroundColor: '#000000',
            },
            DarkGhost: {
                color: '#000000',
                borderColor: '#000000',
            },
            BootstrapPrimary: {
                color: '#FFFFFF',
                backgroundColor: '#007bff',
            },
            BootstrapSecondary: {
                color: '#FFFFFF',
                backgroundColor: '#6c757d',
            },
            BootstrapSuccess: {
                color: '#FFFFFF',
                backgroundColor: '#28a745',
            },
            BootstrapDanger: {
                color: '#FFFFFF',
                backgroundColor: '#dc3545',
            },
            BootstrapWarning: {
                color: '#000000',
                backgroundColor: '#ffc107',
            },
            BootstrapInfo: {
                color: '#FFFFFF',
                backgroundColor: '#17a2b8',
            },
            BootstrapLight: {
                color: '#000000',
                backgroundColor: '#f8f9fa',
            },
            BootstrapDark: {
                color: '#FFFFFF',
                backgroundColor: '#343a40',
            },
        },

        DropDown: {
            color: '#000000',
            itemColor: '#000000',
        },

        Inputs: {
            PrimaryGhost: {
                borderColor: '#0A62AC',
                color: '#000000'
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
            DarkGhost: {
                color: '#000000',
                borderColor: '#000000',
                placeHolder: '#adadad',
                width: '100%',
            },
        },

        Icons: {
            loader: {
                light: '#fff',
                Primary: '#0A62AC'
            },
            check: '#198754',
            filter: '#0A62AC'
        },

        Switch: {
            ios_backgroundColor: '#FFFFFF',
            thumbColor: {
                true: '#0A62AC',
                false: '#F4F3F4'
            }
        },

        Steps: {
            currentStepLabelColor: '#000000',
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
            stepIndicatorLabelCurrentColor: '#000000',

            labelColor: '#999999',
        }
    },
    Dark: {
        Header_bg: "#121212",
        Body_bg_RGB: "18, 18, 18",
        Body_bg: "#121212",  // Fundo principal mais escuro
        Body_bg_second: "#1E1E1E",  // Fundo secundário para painéis
        Body_bg_third: "#333333",  // Fundo terciário para contrastes
        list_item_bg: "#1E1E1E",

        Danger: "#F44336",  // Vermelho intenso para erros
        DangerLight: "#ff8c83",  // Vermelho intenso para erros

        Text: {
            headerTittle: '#ffffff',
            title: "#0159a2",  // Roxo para títulos
            text: "#FFFFFF",  // Texto principal em branco
            dark: "#444444",  // Tons claros para textos secundários
            light: "#FFFFFF",  
            placeHolder: '#B0B0B0',
        },

        Buttons: {
            Primary: {
                color: '#FFFFFF',
                backgroundColor: '#034d89',  // Roxo claro
            },
            Secondary: {
                color: '#FFFFFF',
                backgroundColor: '#1E1E1E',
                borderWidth: 2,
                borderColor: '#034d89'
            },
            Light: {
                color: '#333333',
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
            DarkGhost: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
            },
            BootstrapPrimary: {
                color: '#FFFFFF',
                backgroundColor: '#007bff',
            },
            BootstrapSecondary: {
                color: '#FFFFFF',
                backgroundColor: '#6c757d',
            },
            BootstrapSuccess: {
                color: '#FFFFFF',
                backgroundColor: '#28a745',
            },
            BootstrapDanger: {
                color: '#FFFFFF',
                backgroundColor: '#F44336',
            },
            BootstrapWarning: {
                color: '#000000',
                backgroundColor: '#FFC107',
            },
            BootstrapInfo: {
                color: '#FFFFFF',
                backgroundColor: '#17A2B8',
            },
            BootstrapLight: {
                color: '#000000',
                backgroundColor: '#444444',
            },
            BootstrapDark: {
                color: '#FFFFFF',
                backgroundColor: '#121212',
            },
        },

        DropDown: { 
            color: '#FFFFFF', 
            itemColor: '#000000', 
        },

        Inputs: {
            PrimaryGhost: {
                borderColor: '#034d89',
                color: '#FFFFFF',
                placeHolder: '#B0B0B0',
            },
            Light: {
                color: '#FFFFFF',
                backgroundColor: '#333333',
                placeHolder: '#B0B0B0',
                width: '100%',
            },
            LightGhost: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                placeHolder: '#aaaaaa',
                width: '100%',
            },
            Dark: {
                color: '#FFFFFF',
                backgroundColor: '#1E1E1E',
                placeHolder: '#B0B0B0',
                width: '100%',
            },
            DarkGhost: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF',
                placeHolder: '#B0B0B0',
                width: '100%',
            },
        },

        Icons: {
            loader: {
                light: '#FFFFFF',
                Primary: '#034d89'
            },
            check: '#198754',  // Verde de sucesso
            filter: '#034d89'
        },

        Switch: {
            ios_backgroundColor: '#333333',
            thumbColor: {
                true: '#034d89',
                false: '#B0B0B0'
            }
        },

        Steps: {
            currentStepLabelColor: '#FFFFFF',
            stepStrokeFinishedColor: '#034d89',
            stepIndicatorFinishedColor: '#034d89',
            separatorFinishedColor: '#034d89',
            stepIndicatorLabelFinishedColor: '#FFFFFF',

            stepStrokeUnFinishedColor: '#555555',
            separatorUnFinishedColor: '#555555',
            stepIndicatorUnFinishedColor: '#555555',
            stepIndicatorLabelUnFinishedColor: '#FFFFFF',

            stepStrokeCurrentColor: '#034d89',
            stepIndicatorCurrentColor: '#1E1E1E',
            stepIndicatorLabelCurrentColor: '#FFFFFF',

            labelColor: '#B0B0B0',
        }
    }
};

// Funções utilitárias para gerenciamento de esquemas de cores
export async function getColorScheme() {
    const storedSchema = await AsyncStorage.getItem('colorSchema') || "Light";
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
