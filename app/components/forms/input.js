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
    placeholderTextColor,
    keyboardType = "defaults",
}) {
    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        style={style}
                        placeholderTextColor={placeholderTextColor}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType={keyboardType}
                    />
                )}
            />
            {
                errors && errors[name] ? (
                    <Text style={{ color: "red" }}>{errors[name].message}</Text>
                ) : null
            }
        </>
    )
}
