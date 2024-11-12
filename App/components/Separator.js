import React from "react";
import { View } from "react-native";
import { useTheme } from '../utils/ThemeContext';


export default function Separator() {
    const { colorScheme } = useTheme();

    return (
        <View style={{ backgroundColor: colorScheme.background.panel, height: 1, marginVertical: 15}} ></View>
    )
}