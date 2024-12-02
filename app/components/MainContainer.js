import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme } from "../utils/ThemeContext";


export default function MainContainer({ style, children, canScroll = true, bodyBg }) {
    const { colorScheme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: bodyBg? bodyBg :colorScheme.Body_bg_second }]}>
            <ScrollView contentContainerStyle={[styles.scrollContent, style]}  nestedScrollEnabled={true} showsVerticalScrollIndicator={false} scrollEnabled={canScroll} >
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
    },
    scrollContent: {
        flexGrow: 1, // Garante que o conteúdo cresça e permita o scroll
    }
});
