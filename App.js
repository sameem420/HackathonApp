import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

//Component
import Navigation from './src/components/Navigation';

// Redux
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
