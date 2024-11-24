import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme } from "../utils/ThemeContext";


export default function MainContainer({ style, children, canScroll }) {
    const { colorScheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.Body_bg_second }]}>
            <ScrollView contentContainerStyle={style} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} scrollEnabled={canScroll} >
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 20,
    }
});
