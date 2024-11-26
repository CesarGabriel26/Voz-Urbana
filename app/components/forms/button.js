import React from "react"
import { TouchableOpacity, Text} from "react-native"
import { ButtonsStyles } from "../../styles/Buttons"

export default function CustomButton({ style, buttonStyle, text, bgColor, textColor, onPress, disabled}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[ButtonsStyles.btn, buttonStyle, style, { backgroundColor: bgColor }]}
        >
            <Text style={{ color: textColor }} >
                {text}
            </Text>
        </TouchableOpacity>
    )
}