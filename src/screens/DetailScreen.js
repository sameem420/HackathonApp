import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import {connect} from 'react-redux';
import {setDetail} from '../store/actions/homeActions';

// firebasee
import firestore from '@react-native-firebase/firestore';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const DetailScreen = ({navigation, detail, setDetail}) => {
  const userDetailFetch = async () => {
    if (detail) {
      firestore()
        .collection(`${detail.accountType}`)
        .doc(`${detail.userUID}`)
        .onSnapshot((data) => {
          setDetail(data.data());
        });
    }
  };

  useEffect(() => {
    userDetailFetch();
  }, []);

  const [accountType, setAccountType] = useState(null);
  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {detail && (
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setDetail(null);
                  navigation.goBack();
                }}
                style={styles.button}>
                <AntDesign name="left" size={22} color={'#fff'} />
              </TouchableOpacity>
            </View>
            <View style={styles.editButtonContainer}>
              {accountType == 'admin' && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UpdateUser');
                  }}
                  style={styles.editButton}>
                  <AntDesign name="edit" size={25} color={'#fff'} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.photoCircle}>
              {detail.photoURL ? (
                <Image
                  source={{uri: detail.photoURL}}
                  style={styles.imageStyle}
                />
              ) : (
                <View style={styles.defaultImage}>
                  <AntDesign name="user" size={60} color={'#c4c4c4'} />
                </View>
              )}
            </View>
          </View>
          <View style={styles.userDetailWrapper}>
            {detail.accountType == 'student' && (
              <>
                <View style={styles.userDetailContainer}>
                  <View>
                    <Text style={styles.headingText}>Personal Detail</Text>
                  </View>

                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Name :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.userName}
                    </Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Email :</Text>
                    <Text style={styles.userDetailValue}>{detail.email}</Text>
                  </View>

                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Gender :</Text>
                    <Text style={styles.userDetailValue}>{detail.gender}</Text>
                  </View>

                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Phone :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.phoneNumber}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.headingText}>Achievements</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Grade :</Text>
                    <Text style={styles.userDetailValue}>{detail.grade}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Score :</Text>
                    <Text style={styles.userDetailValue}>{detail.numbers}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Courses :</Text>
                    <Text style={styles.userDetailValue}>{detail.courses}</Text>
                  </View>
                </View>
              </>
            )}
            {detail.accountType == 'company' && (
              <>
                <View style={styles.userDetailContainer}>
                  <View>
                    <Text style={styles.headingText}>About us</Text>
                  </View>

                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Company Name :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.userName}
                    </Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Email :</Text>
                    <Text style={styles.userDetailValue}>{detail.email}</Text>
                  </View>

                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Phone :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.phoneNumber}
                    </Text>
                  </View>

                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>City :</Text>
                    <Text style={styles.userDetailValue}>{detail.city}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>No of Openings :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.noOfOpening}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.headingText}>Requiments</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Grade :</Text>
                    <Text style={styles.userDetailValue}>{detail.grade}</Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Experence :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.experence}
                    </Text>
                  </View>
                  <View style={styles.userDetail}>
                    <Text style={styles.userDetailLabel}>Minimum Marks :</Text>
                    <Text style={styles.userDetailValue}>
                      {detail.reqMarks}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    width: 100,
    position: 'absolute',
    top: 10,
    left: -10,
    backgroundColor: '#a171ef',
  },
  button: {
    backgroundColor: '#a171ef',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#a171ef',
    fontWeight: 'bold',
  },
  photoContainer: {
    width,
    backgroundColor: '#a171ef',
    height: 100,
    alignItems: 'center',
    marginBottom: 50,
  },
  photoCircle: {
    position: 'relative',
    top: 50,
    width: 106,
    height: 106,
    backgroundColor: '#f6f6f6',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailWrapper: {
    paddingVertical: 20,
  },
  userDetailContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  userDetail: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  userDetailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 20,
  },
  defaultImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonContainer: {
    zIndex: 10,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  editButton: {
    padding: 5,
    borderRadius: 100,
  },
  loaderContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#a171ef',
  },
});

const mapStatetoProps = (state) => {
  return {
    accountType: state.homeReducer.accountType,
    detail: state.homeReducer.detail,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setDetail: (detail) => dispatch(setDetail(detail)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(DetailScreen);
