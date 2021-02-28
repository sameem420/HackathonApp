import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

//redux
import {connect} from 'react-redux';

// firebase
import firestore from '@react-native-firebase/firestore';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const UpdateUserScreen = ({navigation, detail}) => {
  const [loader, setLoader] = useState(false);

  // use by Both
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numbers, setNumbers] = useState('');
  const [grade, setGrade] = useState('');

  // use by student
  const [courses, setCourses] = useState('');
  const [gender, setGender] = useState('');

  // use by company
  const [experence, setExperence] = useState('');
  const [noOfOpening, setNoOfOpening] = useState('');
  const [reqMarks, setReqMarks] = useState('');
  const [city, setCity] = useState('');

  const submit = () => {
    setLoader(true);
    if (detail.accountType == 'student') {
      firestore()
        .collection(`${detail.accountType}`)
        .doc(`${detail.userUID}`)
        .update({
          courses: courses,
          gender: gender,
          grade: grade,
          numbers: numbers,
          phoneNumber: phoneNumber,
          userName: name,
        })
        .then(() => {
          setLoader(false);
          navigation.goBack();
        })
        .catch(() => {
          setLoader(false);
        });
    } else if (detail.accountType == 'company') {
      firestore()
        .collection(`${detail.accountType}`)
        .doc(`${detail.userUID}`)
        .update({
          city: city,
          experence: experence,
          grade: grade,
          noOfOpening: noOfOpening,
          phoneNumber: phoneNumber,
          reqMarks: reqMarks,
          userName: name,
        })
        .then(() => {
          setLoader(false);
          navigation.goBack();
        })
        .catch(() => {
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    if (detail.accountType == 'student') {
      setName(detail.userName);
      setEmail(detail.email);
      setPhoneNumber(detail.phoneNumber);
      setGender(detail.gender);
      setGrade(detail.grade);
      setNumbers(detail.numbers);
      setCourses(detail.courses);
    } else if (detail.accountType == 'company') {
      setName(detail.userName);
      setEmail(detail.email);
      setPhoneNumber(detail.phoneNumber);
      setCity(detail.city);
      setNoOfOpening(detail.noOfOpening);
      setExperence(detail.experence);
      setGrade(detail.grade);
      setReqMarks(detail.reqMarks);
    }
  }, []);

  return (
    <View style={styles.container}>
      {detail && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backButton}
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons
                name="chevron-back"
                size={30}
                style={styles.backButtonIcons}
              />
            </TouchableOpacity>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Update User</Text>
            </View>
          </View>

          <View style={styles.lowerCont}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                width,
                alignItems: 'center',
              }}>
              {detail.accountType == 'student' && (
                <>
                  <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.textInput}
                    placeholder="Full Name"
                    textContentType="name"
                  />
                  <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text.trim())}
                    style={styles.textInput}
                    placeholder="Email"
                    textContentType="emailAddress"
                    editable={false}
                  />

                  <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text.trim())}
                    style={styles.textInput}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                  />
                  <View style={styles.genderButtonCont}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.genderButton}
                      onPress={() => {
                        setGender('male');
                      }}>
                      <View
                        style={
                          gender == 'male'
                            ? styles.fillCircle
                            : styles.emptyCircle
                        }
                      />
                      <Text style={styles.genderButtonText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.genderButton}
                      onPress={() => {
                        setGender('female');
                      }}>
                      <View
                        style={
                          gender == 'female'
                            ? styles.fillCircle
                            : styles.emptyCircle
                        }
                      />
                      <Text style={styles.genderButtonText}>Female</Text>
                    </TouchableOpacity>
                  </View>
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
                      name &&
                      email &&
                      phoneNumber &&
                      gender &&
                      grade &&
                      courses &&
                      numbers
                        ? styles.button
                        : styles.disabledButton
                    }
                    disabled={
                      !(
                        name &&
                        email &&
                        phoneNumber &&
                        gender &&
                        grade &&
                        courses &&
                        numbers
                      )
                    }>
                    <Text
                      style={
                        name &&
                        email &&
                        phoneNumber &&
                        gender &&
                        grade &&
                        courses &&
                        numbers
                          ? styles.buttonText
                          : styles.disabledButtonText
                      }>
                      Update
                    </Text>
                    {loader && (
                      <ActivityIndicator
                        color={'#fff'}
                        size="small"
                        style={{marginLeft: 5}}
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}

              {detail.accountType == 'company' && (
                <>
                  <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.textInput}
                    placeholder="Company Name"
                    textContentType="name"
                  />
                  <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text.trim())}
                    style={styles.textInput}
                    placeholder="Email"
                    textContentType="emailAddress"
                    editable={false}
                  />
                  <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text.trim())}
                    style={styles.textInput}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={city}
                    onChangeText={(text) => setCity(text.trim())}
                    style={styles.textInput}
                    placeholder="City"
                  />
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
                      name &&
                      email &&
                      phoneNumber &&
                      city &&
                      noOfOpening &&
                      experence &&
                      grade &&
                      reqMarks
                        ? styles.button
                        : styles.disabledButton
                    }
                    disabled={
                      !(
                        name &&
                        email &&
                        phoneNumber &&
                        city &&
                        noOfOpening &&
                        experence &&
                        grade &&
                        reqMarks
                      )
                    }>
                    <Text
                      style={
                        name &&
                        email &&
                        phoneNumber &&
                        city &&
                        noOfOpening &&
                        experence &&
                        grade &&
                        reqMarks
                          ? styles.buttonText
                          : styles.disabledButtonText
                      }>
                      Update
                    </Text>
                    {loader && (
                      <ActivityIndicator
                        color={'#fff'}
                        size="small"
                        style={{marginLeft: 5}}
                      />
                    )}
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    padding: 10,
  },
  heading: {
    marginLeft: 10,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a171ef',
  },
  backButton: {},
  backButtonIcons: {
    color: '#a171ef',
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#a171ef',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  lowerCont: {
    flex: 1,
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#a171ef',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
    marginRight: 10,
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
  fillCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#a171ef',
    borderRadius: 10,
  },
  emptyCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#a171ef',
    borderRadius: 10,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderButtonText: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 15,
  },
  genderButtonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

const mapStatetoProps = (state) => {
  return {
    detail: state.homeReducer.detail,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(UpdateUserScreen);
