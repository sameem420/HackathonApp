import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
import firestore from '@react-native-firebase/firestore';

//redux
import {connect} from 'react-redux';
import {setFormShow} from '../store/actions/homeActions';

const {width, height} = Dimensions.get('window');

const FormFields = ({userAuth, formShow, setFormShow}) => {
  const [accountType, setAccountType] = useState(null);
  const [loader, setLoader] = useState(false);

  const [grade, setGrade] = useState('');
  const [numbers, setNumbers] = useState('');
  const [courses, setCourses] = useState('');

  const [experence, setExperence] = useState('');
  const [noOfOpening, setNoOfOpening] = useState('');
  const [reqMarks, setReqMarks] = useState('');

  const submit = async () => {
    var updateObject;
    if (accountType == 'student') {
      updateObject = {
        grade,
        numbers,
        courses,
      };
    } else if (accountType == 'company') {
      updateObject = {
        grade,
        experence,
        noOfOpening,
        reqMarks,
      };
    }

    if (updateObject) {
      firestore()
        .collection(accountType)
        .doc(userAuth.uid)
        .update(updateObject)
        .then(() => {
          AsyncStorage.setItem(`@show_form_${userAuth.userUID}`, 'falseFlag');
          setFormShow(false);
          // console.log('Form Update Successfully');
        })
        .catch((err) => {
          // console.log('err ==>>> ', err);
        });
    }
  };

  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Complete Form :</Text>
      <Text style={styles.helperText}>complete form to use app</Text>

      {accountType == 'student' && (
        <View>
          <TextInput
            value={grade}
            style={styles.textInput}
            placeholder="Grade"
            onChangeText={(text) => setGrade(text.trim())}
          />
          <TextInput
            value={numbers}
            style={styles.textInput}
            placeholder="Marks"
            onChangeText={(text) => setNumbers(text.trim())}
          />
          <TextInput
            value={courses}
            style={styles.textInput}
            placeholder="Courses"
            onChangeText={(text) => setCourses(text.trim())}
          />
          <TouchableOpacity
            onPress={submit}
            activeOpacity={0.8}
            style={
              grade && courses && numbers
                ? styles.button
                : styles.disabledButton
            }
            disabled={!(grade && courses && numbers)}>
            <Text
              style={
                grade && courses && numbers
                  ? styles.buttonText
                  : styles.disabledButtonText
              }>
              submit
            </Text>
            {loader && (
              <ActivityIndicator
                color={'#fff'}
                size="small"
                style={{marginLeft: 5}}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
      {accountType == 'company' && (
        <View>
          <TextInput
            value={noOfOpening}
            style={styles.textInput}
            placeholder="No of Openings"
            onChangeText={(text) => setNoOfOpening(text.trim())}
          />
          <TextInput
            value={experence}
            style={styles.textInput}
            placeholder="Experence Level"
            onChangeText={(text) => setExperence(text.trim())}
          />
          <TextInput
            value={grade}
            style={styles.textInput}
            placeholder="Grade"
            onChangeText={(text) => setGrade(text.trim())}
          />
          <TextInput
            value={reqMarks}
            style={styles.textInput}
            placeholder="Least Marks"
            onChangeText={(text) => setReqMarks(text.trim())}
          />
          <TouchableOpacity
            onPress={submit}
            activeOpacity={0.8}
            style={
              grade && noOfOpening && experence && reqMarks
                ? styles.button
                : styles.disabledButton
            }
            disabled={!(grade && noOfOpening && experence && reqMarks)}>
            <Text
              style={
                grade && noOfOpening && experence && reqMarks
                  ? styles.buttonText
                  : styles.disabledButtonText
              }>
              submit
            </Text>
            {loader && (
              <ActivityIndicator
                color={'#fff'}
                size="small"
                style={{marginLeft: 5}}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#a171ef',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    color: '#a171ef',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#a171ef',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
  },
  disabledButton: {
    backgroundColor: '#e6e6e6',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButtonText: {
    fontWeight: 'bold',
    color: '#586069',
    fontSize: 15,
  },
  helperText: {
    fontSize: 12,
    color: '#a171ef',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
    formShow: state.homeReducer.formShow,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setFormShow: (show) => dispatch(setFormShow(show)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(FormFields);
