import React from 'react';
 import { View, Text, StyleSheet} from 'react-native';
 import Colors from '../constants/colors'
 import SDTitleText from '../components/SDTitleText'
 
 export const Header = props => {

    

    return (
        <View style={styles.header}>
            <SDTitleText>{props.title}</SDTitleText>
        </View>
    )
 }

 const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
 });