import { Controller } from 'react-hook-form';
import { InputStyles } from '../../styles/Inputs';
import { Text, TextInput } from 'react-native';

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
    rules
}) {
    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        style={style}
                        placeholderTextColor={placeholderTextColor}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType={keyboardType}
                        numberOfLines={numberOfLines}
                        multiline={multiline}
                    />
                )}
            />
            {
                errors && errors[name] ? (
                    <Text style={{ color: errorTextColor }}>{errors[name].message}</Text>
                ) : null
            }
        </>
    )
}
