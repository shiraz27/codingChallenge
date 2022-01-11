/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {gradient} from './src/assets/gradient.png';
import {gradient_false} from './src/assets/gradient_false.png';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {db} from './firebase/config';
import 'firebase/compat/firestore';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {getExercise} from './src/api/Exercise';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const App: () => Node = () => {
  const [exercise, setExercise] = useState(0);
  const [update, setUpdate] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [buttonText, setButtonText] = useState('CHECK ANSWER');
  const [currentExerciseNumber, setCurrentExerciseNumber] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [answerStyle, setAnswerStyle] = useState({
    color: 'white',
    fontSize: RFValue(30),
  });

  const [chosenAnswer, setChosenAnswer] = useState('______');

  useEffect(() => {
    getExercise().then((data, index) => {
      setExercise(data);
      setCurrentExercise(data[currentExerciseNumber]);
      data[currentExerciseNumber].answers.forEach(element => {
        console.log('element', element);
        element.correct == true ? setAnswer(element.value) : null;
      });
      console.log('exercise', data[0].german_sentence);
    });
  }, [update]);

  return (
    <View
      style={{
        backgroundColor: '#74dafe',
        width: width,
        height: height,
      }}>
      <View
        style={{
          backgroundColor: '#3b6c81',
          position: 'absolute',
          bottom: 0,
          width: width,
          height: height * 0.85,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '5%',
        }}>
        <View style={{height: '5%'}} />
        <Text
          style={{
            color: 'white',
            fontSize: RFValue(15),
            fontFamily: 'PTSans-Regular',
          }}>
          Fill in the missing word
        </Text>
        <View style={{height: '5%'}} />
        <Text
          style={{
            color: 'white',
            fontSize: RFValue(20),
            fontFamily: 'PTSans-Regular',
          }}>
          {currentExercise &&
            currentExercise.english_sentence.substring(
              0,
              currentExercise.english_sentence.indexOf('*'),
            )}
          <Text
            style={{
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            {currentExercise &&
              currentExercise.english_sentence.substring(
                currentExercise.english_sentence.indexOf('*') + 1,
                currentExercise.english_sentence.lastIndexOf('*'),
              )}
          </Text>
          {currentExercise &&
            currentExercise.english_sentence.substring(
              currentExercise.english_sentence.lastIndexOf('*') + 1,
              currentExercise.english_sentence.length,
            )}
        </Text>
        <View style={{height: '7%'}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: RFValue(20)}}>
            {currentExercise &&
              currentExercise.german_sentence.substring(
                0,
                currentExercise.german_sentence.indexOf('_'),
              )}
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {chosenAnswer == '______' ? (
              <Text style={{color: 'white', fontSize: RFValue(20)}}>
                ______
              </Text>
            ) : (
              <Text style={answerStyle}>{chosenAnswer}</Text>
            )}
          </View>
          <Text style={{color: 'white', fontSize: RFValue(20)}}>
            {currentExercise &&
              currentExercise.german_sentence.substring(
                currentExercise.german_sentence.indexOf('_') + 1,
                currentExercise.german_sentence.length,
              )}
          </Text>
        </View>
        <View style={{height: '7%'}} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              setAnswerStyle(styles.defaultAnswerStyle);
              setChosenAnswer(currentExercise.answers[0].value);
            }}
            style={styles.answer}>
            <Text style={styles.answerText}>
              {currentExercise && currentExercise.answers[0].value}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAnswerStyle(styles.defaultAnswerStyle);
              setChosenAnswer(currentExercise.answers[1].value);
            }}
            style={styles.answer}>
            <Text style={styles.answerText}>
              {currentExercise && currentExercise.answers[1].value}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: '2%'}} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              setAnswerStyle(styles.defaultAnswerStyle);

              setChosenAnswer(currentExercise.answers[2].value);
            }}
            style={styles.answer}>
            <Text style={styles.answerText}>
              {currentExercise && currentExercise.answers[2].value}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAnswerStyle(styles.defaultAnswerStyle);
              setChosenAnswer(currentExercise.answers[3].value);
            }}
            style={styles.answer}>
            <Text style={styles.answerText}>
              {currentExercise && currentExercise.answers[3].value}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (buttonText == 'CONTINUE' && chosenAnswer == answer) {
              setCurrentExercise(currentExercise[currentExerciseNumber]);
              setAnswerStyle({
                color: 'white',
                fontSize: RFValue(30),
              });
              setChosenAnswer('______');
              setButtonText('CHECK ANSWER');
              setUpdate(!update);
            } else {
              setButtonText('CONTINUE');
              setCurrentExerciseNumber(currentExerciseNumber + 1);
              chosenAnswer == answer
                ? setAnswerStyle(styles.correctAnswer)
                : setAnswerStyle(styles.wrongAnswer);
            }
          }}
          style={{
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            elevation: 3,
            backgroundColor: '#6391a6',
            paddingHorizontal: '10%',
            paddingVertical: '5%',
            borderRadius: 20,
            marginHorizontal: '2%',
            position: 'absolute',
            bottom: 0,
            marginBottom: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * 0.8,
          }}>
          <Text style={styles.continue}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  correctAnswer: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: '#03dfe9',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderRadius: 20,
    marginHorizontal: '2%',
    fontSize: RFValue(15),
    fontFamily: 'PTSans-Regular',
    color: 'white',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  wrongAnswer: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: '#fe7886',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderRadius: 20,
    marginHorizontal: '2%',
    fontSize: RFValue(15),
    fontFamily: 'PTSans-Regular',
    color: 'white',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  defaultAnswerStyle: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderRadius: 20,
    marginHorizontal: '2%',
    fontSize: RFValue(15),
    fontFamily: 'PTSans-Regular',
    color: '#3b6c81',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  continue: {
    fontSize: RFValue(15),
    fontFamily: 'PTSans-Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: RFValue(15),
    fontFamily: 'PTSans-Regular',
    color: '#3b6c81',
    fontWeight: 'bold',
  },
  answer: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderRadius: 20,
    marginHorizontal: '2%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
