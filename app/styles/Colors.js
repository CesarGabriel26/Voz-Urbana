import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de paletas de cores
export const Colors = {
    Light: {
        Header_bg: "#0A62AC",
        Body_bg: "#0A62AC",
        Body_bg_second: "#ffffff",
        Body_bg_third: "#000000",
        list_item_bg: "#fff", //"#333",

        Danger: "#dc3545",

        Text: {
            headerTittle: '#ffffff',
            title: "#0A62AC",
            text: "#000000",
            dark: "#ffffff",
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
            DarktGhost: {
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
            currentStepLabelColor: '#000000',
        }
    },
    Dark: {
        Header_bg: "#121212",
        Body_bg: "#121212",  // Fundo principal mais escuro
        Body_bg_second: "#1E1E1E",  // Fundo secundário para painéis
        Body_bg_third: "#333333",  // Fundo terciário para contrastes
        list_item_bg: "#1E1E1E",

        Danger: "#F44336",  // Vermelho intenso para erros

        Text: {
            headerTittle: '#ffffff',
            title: "#BB86FC",  // Roxo para títulos
            text: "#FFFFFF",  // Texto principal em branco
            dark: "#E0E0E0",  // Tons claros para textos secundários
            placeHolder: '#B0B0B0',
        },

        Buttons: {
            Primary: {
                color: '#FFFFFF',
                backgroundColor: '#BB86FC',  // Roxo claro
            },
            Secondary: {
                color: '#FFFFFF',
                backgroundColor: '#1E1E1E',
                borderWidth: 2,
                borderColor: '#BB86FC'
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
                borderColor: '#BB86FC',
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
                color: '#BB86FC',
                borderColor: '#BB86FC',
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
                Primary: '#BB86FC'
            },
            check: '#198754',  // Verde de sucesso
            filter: '#BB86FC'
        },

        Switch: {
            ios_backgroundColor: '#333333',
            thumbColor: {
                true: '#BB86FC',
                false: '#B0B0B0'
            }
        },

        Steps: {
            stepStrokeFinishedColor: '#BB86FC',
            stepIndicatorFinishedColor: '#BB86FC',
            separatorFinishedColor: '#BB86FC',
            stepIndicatorLabelFinishedColor: '#FFFFFF',

            stepStrokeUnFinishedColor: '#555555',
            separatorUnFinishedColor: '#555555',
            stepIndicatorUnFinishedColor: '#555555',
            stepIndicatorLabelUnFinishedColor: '#FFFFFF',

            stepStrokeCurrentColor: '#BB86FC',
            stepIndicatorCurrentColor: '#1E1E1E',
            stepIndicatorLabelCurrentColor: '#FFFFFF',

            labelColor: '#B0B0B0',
            currentStepLabelColor: '#FFFFFF',
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
