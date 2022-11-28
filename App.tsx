import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import {Provider} from 'react-redux';

// @store
import {store} from './src/store';

// @navigation vendors
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// @screens
import FavoritesScreen from './src/screens/FavoritesScreen/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DetailScreen from './src/screens/DetailScreen/DetailScreen';

// @theme
import {theme} from './src/mainTheme';
import {Pallet} from './src/theme';

// @assets
const homeIcon = require('./src/assets/svg/home');
const favoritesIcon = require('./src/assets/svg/favorite');

const App = () => {
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStackScreen = () => (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );

  const MyTabs = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let icon = 'home';
          if (route.name === 'Artwork') {
            icon = homeIcon;
          }
          if (route.name === 'Favorites') {
            icon = favoritesIcon;
          }
          return (
            <SvgUri
              fill={focused ? Pallet.blackGray : Pallet.grayLight}
              height={18}
              width={18}
              svgXmlData={icon}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Artwork"
        component={HomeStackScreen}
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
