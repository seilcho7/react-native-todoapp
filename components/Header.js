import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
})