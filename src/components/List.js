import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux
import {connect} from 'react-redux';
import {setDetail} from '../store/actions/homeActions';
// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const List = ({navigation, data, loader, setDetail, active}) => {
  const [accountType, setAccountType] = useState(null);
  useEffect(() => {
    const getType = async () => {
      const value = await AsyncStorage.getItem('@account_type');
      setAccountType(value);
    };
    getType();
  }, []);

  return (
    <>
      {!loader && (
        <View style={styles.container}>
          {accountType == 'student' && (
            <View style={styles.heading}>
              <Text style={styles.headingText}>Companies List</Text>
            </View>
          )}
          {accountType == 'company' && (
            <View style={styles.heading}>
              <Text style={styles.headingText}>Students List</Text>
            </View>
          )}

          {accountType === 'admin' && (
            <>
              <>
                {active == 'student' && (
                  <View style={styles.heading}>
                    <Text style={styles.headingText}>Students List</Text>
                  </View>
                )}
              </>
              <>
                {active == 'company' && (
                  <View style={styles.heading}>
                    <Text style={styles.headingText}>Company List</Text>
                  </View>
                )}
              </>
            </>
          )}

          {data.length !== 0 ? (
            <View style={{marginTop: 20, marginBottom: 120}}>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  width,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                }}>
                {data.map((groupVal, i) => {
                  const data = groupVal.data();
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setDetail(data);
                        navigation.navigate('Detail');
                      }}
                      key={i}
                      activeOpacity={1}
                      style={styles.groupContainer}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.groupImage}>
                          <AntDesign name="user" size={40} color={'#c4c4c4'} />
                        </View>
                        <View style={styles.groupDetail}>
                          <Text>{data.userName}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                marginTop: 50,
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: '#a171ef'}}>
                No Data
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  heading: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a171ef',
  },
  groupContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.21,

    elevation: 3,
  },
  groupImage: {
    width: 50,
    height: 50,
    backgroundColor: '#e4e4e4',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  groupDetail: {
    paddingLeft: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStatetoProps = (state) => {
  return {
    accountType: state.homeReducer.accountType,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setDetail: (detail) => dispatch(setDetail(detail)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(List);
