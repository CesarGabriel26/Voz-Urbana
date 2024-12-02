import { Controller } from 'react-hook-form';
import { InputStyles } from '../../styles/Inputs';
import { Text, TextInput } from 'react-native';
import { View } from 'react-native';

export default function FormInput({
    control,
    errors,
    name,
    defaultValue,
    placeholder,
    style = [InputStyles.input],
    errorTextColor = 'red',
    placeholderTextColor,
    keyboardType = "defaults",
    numberOfLines=1,
    multiline=false,
    secureTextEntry,
    rules
}) {
    return (
        <View style={{ gap: 0 }}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        style={[style]}
                        placeholderTextColor={placeholderTextColor}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        numberOfLines={numberOfLines}
                        multiline={multiline}
                    />
                )}
            />
            <Text style={{ color: errorTextColor }}>{errors[name]?.message}</Text>
        </View>
    )
}
