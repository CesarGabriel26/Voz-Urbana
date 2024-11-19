import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../utils/ThemeContext';
import MainContainer from '../../components/MainContainer'


export default function Configuracoes({ navigation }) {
    const {colorScheme } = useTheme();
    
    return (
        <MainContainer>
           
        </MainContainer>
    );
}

const styles = StyleSheet.create({

});
