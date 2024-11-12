import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de paletas de cores
export const Colors = {
    // Tema Claro
    MainTheme: {
        // Cores principais
        primary: '#0A62AC',
        secondary: '#FFFFFF',
        success: '#25B92F',
        warning: '#FFB400',
        danger: '#FF4949',
        info: '#2b83cc',

        // Texto
        text: {
            primary: '#0A62AC',
            secondary: '#FFFFFF',
            success: '#25B92F',
            warning: '#FFB400',
            danger: '#FF4949',
            info: '#2b83cc',
            placeholder: '#ACACAC',
            // Texto em tom suave
            muted: '#6C757D',
            light: '#FFFFFF',
            dark: '#000000',
            highlight: '#000000'
        },

        // Fundo
        background: {
            default: '#FFFFFF',
            inverse: '#000000',
            panel: '#0A62AC',
            card: '#FFFFFF'
        },

        // Borda
        border: {
            default: '#D3D3D3',
            light: '#EAEAEA',
            dark: '#CED4DA',
            accent: '#0A62AC'
        },

        // Botão
        button: {
            primary: '#0A62AC',
            secondary: '#FFFFFF',
            success: '#25B92F',
            danger: '#FF4949'
        },

        switch: {
            ios_backgroundColor: '#FFFFFF',    // Fundo do switch no iOS
            thumbColor: {
                true: '#0A62AC',               // Cor da "bolinha" do switch (ativo)
                false: '#F4F3F4'               // Cor da "bolinha" do switch (inativo)
            }
        },

        // Ícones
        icon: {
            loader: '#0A62AC',
            check: '#25B92F'
        },

        // Stepper Status
        stepper: {
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
    },

    // Tema Escuro
    DarkMode: {
        primary: '#0A62AC',
        secondary: '#FFFFFF',
        success: '#3DFF4A',
        warning: '#FFB400',
        danger: '#FF4949',
        info: '#1A73E8',

        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
            placeholder: '#C9C9C9',
            muted: '#A1A1A1',
            title: '#0A8CAC',
            error: '#FF4949'
        },

        background: {
            default: '#000000',
            inverse: '#FFFFFF',
            panel: '#1A1A1A',
            card: '#0A62AC'
        },

        border: {
            default: '#444444',
            light: '#555555',
            dark: '#333333',
            accent: '#0A62AC'
        },

        button: {
            primary: '#0A62AC',
            secondary: '#FFFFFF',
            success: '#3DFF4A',
            danger: '#FF4949'
        },

        icon: {
            loader: '#0A62AC',
            check: '#3DFF4A'
        },

        stepper: {
            finished: {
                stroke: '#0A62AC',
                label: '#FFFFFF',
                background: '#0A62AC'
            },
            unfinished: {
                stroke: '#AAAAAA',
                label: '#FFFFFF',
                background: '#AAAAAA'
            },
            current: {
                stroke: '#0A62AC',
                label: '#0A62AC',
                background: '#FFFFFF'
            },
            labelColor: '#999999',
            currentStepLabelColor: '#0A62AC'
        }
    }
};

// Funções utilitárias para gerenciamento de esquemas de cores
export async function getColorScheme() {
    // Obtém o esquema de cores armazenado
    let StoredSchema = await AsyncStorage.getItem('colorSchema');
    return StoredSchema ? Colors[StoredSchema] : Colors.MainTheme;
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
