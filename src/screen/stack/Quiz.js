import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {questions} from '../../data/questions';

const Quiz = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(59);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    stopTimer();
  }, [currentQuestionIdx]);

  useEffect(() => {
    const startTimer = () => {
      if (!isRunning && timeLeft > 0) {
        setIsRunning(true);
        timerRef.current = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timerRef.current);
              setIsRunning(false);
              return 0; // Stop at 0
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    };
    startTimer();
  }, []);

  const stopTimer = () => {
    setTimeLeft(59);
  };

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const handleOptionPress = pressedOption => {
    const isCorrectAnswer =
      questions[currentQuestionIdx].answer == pressedOption;

    if (currentQuestionIdx === questions.length - 1) {
      handleGoBack();
    } else {
      setTimeout(() => {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1000);
    }

    setSelectedOption(pressedOption);
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleGoBack = () => {
    pauseTimer();
    Alert.alert(
      'Quiz Completed!',
      `Great job! You’ve answered 25 questions. Here’s your score: ${correctAnswers}  ✅ Correct Answers:${correctAnswers} 
❌ Wrong Answers: ${25 - correctAnswers}`,
      [
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        },
      ],
      {cancelable: false},
    );
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      Alert.alert(
        'Leave the Quiz?',
        'You haven’t finished the quiz yet! If you leave now, your progress will be lost. Do you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel'),
            style: 'cancel',
          },
          {
            text: 'Leave',
            onPress: () => navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <Layout>
      <ScrollView>
        <LinearGradient
          colors={['#3F3782', '#AE583D']}
          style={styles.headerContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => handleBack()}
              activeOpacity={0.7}
              style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/icons/back.png')} />
              <Text style={styles.headerBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View
          style={{marginHorizontal: 16, marginTop: 36, alignItems: 'center'}}>
          <Text style={styles.timerText}>
            {Math.floor(timeLeft / 60) + '0'}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60} ` : timeLeft % 60}
          </Text>
        </View>

        <View style={{marginHorizontal: 16, marginTop: 100}}>
          <Text style={styles.questionText}>
            {questions[currentQuestionIdx].question}
          </Text>
          <View style={{gap: 16, marginTop: 36, marginBottom: 30}}>
            {questions[currentQuestionIdx].options.map(option => (
              <TouchableOpacity
                key={option}
                style={{
                  backgroundColor:
                    selectedOption === option
                      ? isCorrect
                        ? '#34C759'
                        : '#FF3B30'
                      : '#3F378266',

                  width: '100%',
                  paddingHorizontal: 24,
                  paddingVertical: 16,
                  borderRadius: 16,
                }}
                onPress={() => handleOptionPress(option)}>
                <Text style={styles.optionsText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Chango-Regular',
    textAlign: 'center',
  },

  headerContainer: {
    paddingTop: 80,
    paddingLeft: 16,
    borderRadius: 16,
    height: 130,
  },
  headerBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FAC40C',
    marginLeft: 6,
  },
  userImgContainer: {
    width: 141,
    height: 141,
    backgroundColor: '#3F3782',
    borderRadius: 110,
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#3F378266',
    borderRadius: 16,
  },
  optionsText: {fontSize: 16, fontWeight: '400', color: '#fff'},
  questionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
  },
  secondaryText: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  headerBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FAC40C',
    marginLeft: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Quiz;
