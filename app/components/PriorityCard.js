import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { CardStyles } from "../styles/CardStyles"
import { PrioritiesColors } from "../utils/Constantes"
import { formatDate } from "../utils/Parser"
import { useTheme } from "../utils/ThemeContext"

export default function PriorityCard({ tittle = "", content = "", date = "", prioridade = 0, onPress, pressableText = "Text", style }) {
    const { colorScheme } = useTheme();

    return (
        <View
            style={[CardStyles.card, { borderColor: PrioritiesColors[prioridade], style }]}
        >
            <View
                style={[CardStyles.colorIndicator, { backgroundColor: PrioritiesColors[prioridade] }]}
            />
            <Text style={[
                CardStyles.level,
                {
                    color: colorScheme.Text.text
                }
            ]}>
                {tittle}
            </Text>
            <Text
                numberOfLines={3}
                style={
                    [
                        CardStyles.description,
                        {
                            color: colorScheme.Text.text
                        }
                    ]
                }
            >
                {content}
            </Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }} >
                {
                    date != "" ? (
                        <Text style={[CardStyles.example, {
                            flex: 1,
                            color: colorScheme.Text.text
                        }]}>
                            {formatDate(date)}
                        </Text>
                    ) : null
                }
                {
                    onPress ? (
                        <TouchableOpacity
                            onPress={onPress}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'right',
                                    color: colorScheme.Text.text
                                }}
                            >
                                {pressableText}
                            </Text>
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        </View>
    )
}