import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import {Provider} from 'react-redux';

// @store
import {store} from './src/store';

// @navigation vendors
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// @screens
import FavoritesScreen from './src/screens/FavoritesScreen/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

// @theme
import {theme} from './src/mainTheme';

// @assets
const homeIcon = require('./src/assets/svg/home');
const favoritesIcon = require('./src/assets/svg/favorite');

const App = () => {
  const Tab = createBottomTabNavigator();

  const MyTabs = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let icon = 'home';
          if (route.name === 'Home') {
            icon = homeIcon;
          }
          if (route.name === 'Favorites') {
            icon = favoritesIcon;
          }
          return <SvgUri fill="red" height={20} width={20} svgXmlData={icon} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Favorites"
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
