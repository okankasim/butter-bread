import React from 'react';
import {View, StyleSheet, Text, Button, Image, ScrollView } from  'react-native'
import SDBodyText from '../components/SDBodyText'
import SDTitleText from '../components/SDTitleText' //we have 2 ways to pass common style to our components first one we can create a custom
// component and define the styles there or 2. way
import DefaultTextStyles from '../constants/default-styles'// the second way to create a constant file and its object then call those constants 
import { Card } from '../components/Card';
// wherever we want to use them.


const GameOverScreen = props => {


return (
    <View style={styles.screen}>
        <SDTitleText style={{color: 'blue'}}>The Game is over!</SDTitleText>
        <ScrollView style={{direction:'inherit', ...styles.imageContainer}}>
        <Image 
        source={require('../assets/custom-made-knife.png')} // require -> local images
        // source={{uri: 'https://www.tehaleh.com/media/8070156/mt-rainier-paradise-1.png?format=jpeg'}} // uri -> images from web
        style={{flex:1, width:350, height:350, direction:'row'}}/>
        </ScrollView>
        <Text style={DefaultTextStyles.bodyText}>Number of rounds: <Text style={{fontSize: 20, color: 'orange'}}>{props.roundsCount}</Text></Text>
        <SDBodyText>Number was:   <Text style={{fontSize: 20, color: '#20b2aa'}}>{props.resultUserNumber}</Text></SDBodyText>
        <Card style={styles.buttonContainer}>
            <Button style={styles.button} title='Start Again' color='blue' onPress={props.onRestart}/>
        </Card>
    </View>
)
};


const styles = StyleSheet.create({
screen:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
   
},
imageContainer: {
    borderRadius: 200,
    borderWidth: 1,
    // width: 350,
    maxHeight: 350,
    // maxWidth: 350
},
buttonContainer: {
    padding: 8,
    backgroundColor: 'orange'
},
button: {
    flex: 1,
    width: '100%',
    height: '100%'
}
});
export default GameOverScreen;
