import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import {NumberContainer} from '../components/number-container';
import {Card} from '../components/Card';
import SDBodyText from '../components/SDBodyText'
import SDButton from '../components/SDButton'
import { Ionicons } from '@expo/vector-icons'


const generateRandomBetween = (min, max, exclude) => {
    min= Math.ceil(min);
    max= Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max-min)) + min;
    if(randomNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }else{
       return randomNum;
    }
};

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCuerrentGuess] = useState(initialGuess); 
    const [incorrectGuesses, setIncorrectGuesses] = useState([initialGuess]); // whit this and 
    

    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    

    const {userChoice, onGameOver} = props; //object destructuring ->  we are pulling this two existing properties out of props object
                                            // and storing them to a const with the same name

    useEffect(() => {
        if(currentGuess === userChoice){ // pay attention we are not calling them with props.userChoice anymore
            onGameOver(incorrectGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])


    const nextGuessHandler = direction => {
       if((    direction === 'lower' && currentGuess < props.userChoice) 
            || (direction === 'greater' && currentGuess > props.userChoice) ){
        Alert.alert('Don\'t lie!', 'You know this is a wrong hit...', [{text: 'Sorry!', style: 'cancel' }]);
       return;
       }

    //    if(currentGuess === props.userChoice){
    //     Alert.alert('Don\'t lie!', 'You know this is the Correct Guess!', [{text: 'Yeah! You won!', style: 'cancel' }]);
    //     return;
    //    }

       if(direction === 'lower'){
       currentHigh.current = currentGuess;
       }else{
           currentLow.current= currentGuess + 1;
       }
      const nextNUm = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
      setCuerrentGuess(nextNUm);
    //   setRoundsCount(curRounds => curRounds+1)
      setIncorrectGuesses(currentGuess => [nextNUm,...currentGuess])
    }

  


    return (
        <View style={styles.screenContainer}>
            <View style={{flexDirection: 'row', flex:0.2, alignItems: 'center', justifyContent: 'space-around'}}>
                <Button onPress={props.backPressed} title='Back'/>
                <SDBodyText>Opponent's guess</SDBodyText>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
               <SDButton style={styles.lowerButton} onPress={nextGuessHandler.bind(this, 'lower')}> <Ionicons color='yellow' name='md-remove' size={24} /> </SDButton> 
               <SDButton style={styles.greaterButton} onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons color='red' name='md-add' size={24} /></SDButton> 
            </Card>
            <ScrollView>
               {incorrectGuesses.map(guess =>
                 <View key= {guess}> 
                   <Text>{guess}</Text>
                 </View>)}
            </ScrollView>
        </View>
    )

};
export default GameScreen;


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    lowerButton: {
        backgroundColor: '#87cefa'
    },
    greaterButton: {
        backgroundColor: '#48d1cc'
    }
});