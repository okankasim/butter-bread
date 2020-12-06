import React, { useState } from 'react';
import { View,Text } from 'react-native';
import { Header } from './components/header';
import { StartGameScreen } from './screens/start-game-screen';
import {AppLoading} from 'expo';
import GameScreen from './screens/game-screen';
import GameOverScreen from './screens/game-over-screen'
import * as Font from 'expo-font';


const fetchFonts = () => {
 return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRoundsCount, setGuesRoundsCount] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)}/> // this is coming from expo when we need to load images or 
    // fonts they need to be ready before rhe splash screen so Apploading takes 2 arg. where startAsync loads the image/fonts etc. onFinish sets 
    // the condition true so it can launch the app itself
  }



  const reStartHandler = () => {
    setGuesRoundsCount(0);
    setUserNumber(null)
  }
  const startGameHandler = selectedNum => {
    setUserNumber(selectedNum);
    setGuesRoundsCount(0);
  }
  const gameOverHandler = numOfRounds => {
    setGuesRoundsCount(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  // content = (
  //     <GameOverScreen
  //     roundsCount={guessRoundsCount}
  //     resultUserNumber={userNumber}
  //       onRestart={reStartHandler}
  //     />
  //   );
  if (userNumber && guessRoundsCount <= 0) {
    content = (// content decides which module to be shown on the screen
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} backPressed={reStartHandler}/>
    );
  } else if (guessRoundsCount > 0) {
    content = (
      <GameOverScreen
      roundsCount={guessRoundsCount}
      resultUserNumber={userNumber}
        onRestart={reStartHandler}
      />
    );
  }



  // let content =  <StartGameScreen onStartGame={startGameHandler} />;
  // if(userNumber && guessRounds <= 0){
  //   content = <GameScreen userChoice={userNumber} backPressed={reStartHandler} onGameOver={gameOverHandler}/>;
  // }
  // // content decides which module to be shown on the screen

  // if(guessRoundsCount <= 0){
  //   content = <StartGameScreen onStartGame={startGameHandler} />;
  // }else if (guessRoundsCount >0){
  //   content = <GameOverScreen roundsCount={guessRoundsCount} resultUserNumber={userNumber} onRestart={reStartHandler}/>
  // }

  return (
    <View style={{flex: 1}}>
      <Header title='Guess a Number'/>
     {content}
    </View>
  );
}


