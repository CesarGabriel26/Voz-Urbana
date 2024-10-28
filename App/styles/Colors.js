import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição de paletas de cores
export const Colors = {
    // Tema Claro
    MainTheme: {
        Text: {
            textPrimary: '#000000',           // Texto principal
            textSecondary: '#FFFFFF',          // Texto secundário
            textPlaceHolder: '#ACACAC',        // Texto de placeholder
            title: '#0A62AC',                  // Título destacado
            error: '#FF4949'                   // Texto de erro
        },

        Screen: {
            background: '#FFFFFF',             // Fundo principal
            backgroundInverse: '#000000',      // Fundo inverso (ex.: modo escuro)
            panelBackground: '#0A62AC',        // Fundo de painéis
        },

        Card: {
            cardBackground: '#0A62AC',         // Fundo dos cartões
            cardBorder: '#D3D3D3',             // Borda dos cartões
            cardLight: '#ffffff',
            cardShadow: '#2b83cc',             // Sombra dos cartões
        },

        Button: {
            buttonPrimary: '#0A62AC',          // Botão principal
            buttonSecondary: '#FFFFFF',        // Botão secundário
        },

        Switch: {
            ios_backgroundColor: '#FFFFFF',    // Fundo do switch no iOS
            thumbColor: {
                true: '#0A62AC',               // Cor da "bolinha" do switch (ativo)
                false: '#F4F3F4'               // Cor da "bolinha" do switch (inativo)
            }
        },

        Icons: {
            loader: '#0A62AC',                 // Cor do ícone de carregamento
            check: '#25B92F'                   // Cor do ícone de verificação
        },

        PetitionStatus: {
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
        Text: {
            textPrimary: '#FFFFFF',            // Texto principal
            textSecondary: '#FFFFFF',          // Texto secundário
            textPlaceHolder: '#C9C9C9',        // Texto de placeholder
            title: '#0A8CAC',                  // Título destacado
            error: '#FF4949'                   // Texto de erro (presente no MainTheme)
        },

        Screen: {
            background: '#000000',             // Fundo principal
            backgroundInverse: '#FFFFFF',      // Fundo inverso (ex.: modo claro)
            panelBackground: '#1A1A1A',        // Fundo de painéis
        },

        Card: {
            cardBackground: '#0A62AC',         // Fundo dos cartões
            cardBorder: '#444444',             // Borda dos cartões
            cardShadow: '#222222',             // Sombra dos cartões
        },

        Button: {
            buttonPrimary: '#0A62AC',          // Botão principal
            buttonSecondary: '#FFFFFF',        // Botão secundário
        },

        Switch: {
            ios_backgroundColor: '#1A1A1A',    // Fundo do switch no iOS
            thumbColor: {
                true: '#0A62AC',               // Cor da "bolinha" do switch (ativo)
                false: '#444444'               // Cor da "bolinha" do switch (inativo)
            }
        },

        Icons: {
            loader: '#0A62AC',                 // Cor do ícone de carregamento
            check: '#3DFF4A'                   // Cor do ícone de verificação
        },

        PetitionStatus: {
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
