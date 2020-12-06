import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors'

export const NumberContainer = props => {

    return (
     <View style={styles.container}>
        <Text style={styles.number}>{props.children}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    number : {
        color: Colors.soft_orange, 
        fontStyle: 'italic', 
        fontWeight: 'bold', 
        fontSize: 22, 
        marginTop: 4
    },
    container: {
       borderWidth: 2,
       borderColor: 'green',
       padding: 10,
       borderRadius: 10,
       marginVertical: 10,
       alignItems: 'center',
       justifyContent: 'center'
    }
});