import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

// @redux
import {getArtworks, showArtworks} from '../../reducers/artworkReducer';
import {getArtworkDetail, showArtworkDetail} from '../../reducers/artworkDetailReducer';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const artworks = useSelector(showArtworks);
  const arworkDetail = useSelector(showArtworkDetail);

  console.log(artworks, 'artworks', arworkDetail);
  useEffect(() => {
    dispatch(getArtworks());
    dispatch(getArtworkDetail());
  }, []);

  //TODO Add UI
  // const renderLoader = () => (
  //   <View style={{flex: 1, justifyContent: 'center', flexDirection: 'center'}}>
  //     <ActivityIndicator color="black" size="large" />
  //   </View>
  // );

  // const renderError = () => (
  //   <View style={{flex: 1, justifyContent: 'center', flexDirection: 'center'}}>
  //     <Text>Error</Text>
  //   </View>
  // );

  // const renderArtworks = () => {

  // }

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
