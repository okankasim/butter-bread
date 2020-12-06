import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const SDInput = props => {

    return (
        // {...props} this will take all the props that assigned to SDInput reference and assign it to TextInput here.
        <TextInput {...props} style={{...styles.input, ...props.style}} />
    )
}

const styles = StyleSheet.create({
    input:{
        height: 30,
        borderColor: 'grey',
        borderWidth: 1,
        marginVertical: 10
    }
}) 