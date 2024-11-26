import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { CardStyles } from "../styles/CardStyles"
import { PrioritiesColors } from "../utils/Constantes"
import { formatDate } from "../utils/Parser"

export default function PriorityCard({ tittle = "", content = "", date ="", prioridade = 0, onPress, pressableText = "Text", style}) {
    return (
        <View
            style={[CardStyles.card, { borderColor: PrioritiesColors[prioridade], style}]}
        >
            <View
                style={[CardStyles.colorIndicator, { backgroundColor: PrioritiesColors[prioridade] }]}
            />
            <Text style={CardStyles.level}>{tittle}</Text>
            <Text numberOfLines={3} style={CardStyles.description}>{content}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                <Text style={[CardStyles.example, { flex: 1, }]}>{formatDate(date)}</Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ flex: 1, textAlign: 'right' }}>{pressableText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}