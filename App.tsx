import React from 'react';
import {ThemeProvider, Text} from 'react-native-elements';
import {SafeAreaView, StatusBar} from 'react-native';

// @theme
import {theme} from './src/mainTheme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} backgroundColor="white" />
        <Text>hola</Text>
        <Text>hola</Text>
        <Text>hola</Text>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
