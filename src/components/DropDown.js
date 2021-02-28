import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {setAccountType} from '../store/actions/homeActions';

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const DropDown = ({screen, accountType, setAccountType}) => {
  const [dropDownShow, setDropDownShow] = useState(false);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View
        style={{
          width: width / 1.5,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.search}
          onPress={() => {
            setDropDownShow(!dropDownShow);
          }}>
          <View style={styles.inputWrapper}>
            <View style={styles.greenDot} />
            <View>
              {accountType ? (
                <Text style={styles.inputText}>{accountType}</Text>
              ) : (
                <Text style={styles.inputText}>Account Type</Text>
              )}
            </View>
          </View>
          <View>
            <AntDesign name="down" size={20} style={{color: '#8b8d96'}} />
          </View>
        </TouchableOpacity>

        {dropDownShow && (
          <View>
            <View style={styles.dropDownCont}>
              {screen == 'login' && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.dropDownTextCont}
                  onPress={() => {
                    setAccountType('admin');
                    setDropDownShow(false);
                  }}>
                  <Text style={styles.dropDownText}>Admin</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.dropDownTextCont}
                onPress={() => {
                  setAccountType('student');
                  setDropDownShow(false);
                }}>
                <Text style={styles.dropDownText}>Student</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.dropDownTextCont}
                onPress={() => {
                  setAccountType('company');
                  setDropDownShow(false);
                }}>
                <Text style={styles.dropDownText}>Company</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 10,
    height: 10,
    backgroundColor: '#a171ef',
    borderRadius: 100,
    marginRight: 10,
  },
  inputText: {
    textTransform: 'uppercase',
  },
  search: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },
  dropDownCont: {
    width: width / 1.5,
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: '#c4c4c4',
    position: 'absolute',
    zIndex: 99,
  },
  dropDownTextCont: {
    padding: 15,
    borderBottomColor: '#f6f6f6',
    borderBottomWidth: 1,
  },
  dropDownText: {
    fontSize: 14,
  },
  dropDownGroupCont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStatetoProps = (state) => {
  return {
    accountType: state.homeReducer.accountType,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setAccountType: (type) => dispatch(setAccountType(type)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(DropDown);
