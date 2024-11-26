import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import * as Network from 'expo-network';

export default function NetworkCheck({ children }) {
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const checkNetwork = async () => {
            try {
                const networkState = await Network.getNetworkStateAsync();
                setIsConnected(true);
            } catch (error) {
                console.error("Erro ao verificar a conexão de rede:", error);
            }
        };

        checkNetwork();
    }, []);

    return (
        <>
            { 
                isConnected === null ? <Text>Verificando conexão...</Text> : isConnected ? children : (
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: '#0A62AC', fontSize: 20 }} >Sem conexão com a rede</Text>
                        <View style={{ borderBottomColor: '#0A62AC', borderBottomWidth: 3, marginVertical: 10 }}>
                            <Image
                                source={require('../assets/NoConnection.png')}
                                style={{ width: 300, height: 300 }}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={{ color: '#0A62AC', fontSize: 20 }} >Verifique seu wifi e tente novamente</Text>
                    </View>
                )
            }
        </>
    );
}
