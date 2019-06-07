import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function InputBar(props) {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => props.textChange(text)}
                value={props.todoInput}
                />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={props.addNewTodo}
                >
                <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 3},
        shadowColor: 'black',
        shadowOpacity: .1
    },
    input: {
        backgroundColor: 'gray',
        flex: 1,
        fontSize: 18,
        height: 35
    },
    addButton: {
        width: 100,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700'
    }
})