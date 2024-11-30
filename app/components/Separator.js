import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../utils/ThemeContext";

export default function Separator({style, textStyle, color = "#0ff", texto = ""}) {
    const { colorScheme } = useTheme();

    return (
        <View style={[style, { display: 'flex', flexDirection: 'row', alignItems: 'center' }]} >
            <View style={{ flex: 1, backgroundColor: color, padding: 1 }} />
            {
                texto != "" ? <Text style={[textStyle, { marginHorizontal: 5, color: colorScheme.Text.text }]} >{texto}</Text> : null
            }
            <View style={{ flex: 1, backgroundColor: color, padding: 1 }} />
        </View>
    )
}
