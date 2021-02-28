import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateScreen from '../screens/UpdateScreen';
import DetailScreen from '../screens/DetailScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';

// redux
import {connect} from 'react-redux';
// redux store actions
import {userAuthAction} from '../store/actions/homeActions';

// firebase
import auth from '@react-native-firebase/auth';

// component
import TabBar from './TabBar';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarNav = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{icon: 'home'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{icon: 'user'}}
      />
    </Tab.Navigator>
  );
};

const Navigation = ({userAuth, userAuthAction}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    userAuthAction(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={styles.initialLogo}>
        <MaterialCommunityIcons
          name="book-search-outline"
          size={100}
          color="#6d67f7"
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        {!userAuth ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={TabBarNav} />
            <Stack.Screen name="Update" component={UpdateScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  initialLogo: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    userAuthAction: (userAuth) => dispatch(userAuthAction(userAuth)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Navigation);
