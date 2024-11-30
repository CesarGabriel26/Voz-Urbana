import React from "react"
import { TouchableOpacity, Text} from "react-native"
import { ButtonsStyles } from "../../styles/Buttons"

export default function CustomButton({ style, buttonStyle = ButtonsStyles.default, text, bgColor, textColor, onPress, disabled, textStyle}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[style, buttonStyle, { backgroundColor: bgColor }]}
        >
            <Text style={[{ color: textColor }, textStyle]} >
                {text}
            </Text>
        </TouchableOpacity>
    )
}