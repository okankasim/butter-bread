import React, { useState } from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert} from 'react-native';
import {Card} from '../components/Card'
import {SDInput} from '../components/SDInput'
import Colors from '../constants/colors';
import {NumberContainer} from '../components/number-container'
import SDBodyText from '../components/SDBodyText'
import SDTitleText from '../components/SDTitleText'
import SDButton from '../components/SDButton'

 /* maxLength={2} is setting up how many char we can add to this input*/
export const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false) // we will use this for
    const [selectedNumber, setSelectedNumber] =  useState()

    const numberInputHandler = (text) => {
          setEnteredValue(text.replace(/[^0-9]/g, '')) // we are saying we only accept numeric values. Which regex will replace non-numeric
                                                    // values with empty string. g means globally
    }
    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false) // user has not confirmed the value so it should be false
    }
    const confirmInputHandler = () => { 

        const choseNumber = parseInt(enteredValue)
        if(isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99){ // number should be between 1-99
            Alert.alert('Invalid number', 'Number has to be between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return; // if this condition true then after the if block will not get executed
        }
        setConfirmed(true)
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('')
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if(confirmed){
    confirmedOutput= 
    <Card style={styles.summaryContainer}>
        <SDBodyText style={{color: 'green'}}>You selected</SDBodyText> 
        <NumberContainer>{selectedNumber}</NumberContainer>
            <SDButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</SDButton>
             {/* <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)}/> */}
    </Card>
    }

   return ( // Keyboard.dismiss() using this react-native component with TouchableWithoutFeedback enables us to dissmiss the keyboard
             // when we touch outside of the anywhere on the screen
     <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss()}}> 
          <View style={styles.screen}>
            <SDTitleText style={styles.title}>Start a New Game!</SDTitleText>
            <Card style={styles.inputContainer}>
              <SDBodyText>Select a Number</SDBodyText>                                     
               <SDInput 
                    style={styles.input}
                    placeholder={'Number'} 
                    keyboardType={'number-pad'} 
                    blurOnSubmit={true} 
                    autoCorrect={false} 
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
              /> 
              <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Button title='Reset' onPress={resetInputHandler} color={Colors.soft_orange}/>
                  </View>
                  <View style={styles.button}>
                    <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} testID='jsdkkndk'/>
                  </View>
              </View>
            </Card>
            {confirmedOutput}
         </View>
     </TouchableWithoutFeedback>
   ) 
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
        
    }, 
    title: {
        fontSize: 20,
        marginVertical: 10, // this takes place of top and bottom margins
        fontFamily: 'open-sans-bold' // open-sans-bold >> coming from app.js line 14 where we named that external library 
    },
    button: {
        width: 90,
        color: 'green'
    },
    input: {
        width: '30%',
        textAlign: 'center'
    },
    summaryContainer: {
     marginTop: 20   
    }
})