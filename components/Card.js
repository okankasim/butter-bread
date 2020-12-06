import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

export const Card = props => {
    return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 16, // this is only for android since the shadow objects are only working for iOS
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    }
})