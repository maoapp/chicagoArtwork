import React from 'react';
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {RouteProp} from '@react-navigation/native';

// @redux
import {showArtworkDetail} from '../../reducers/artworkReducer';

// @components
import Loader from '../../components/loader/Loader';

// @theme
import {FontNames, FontSizes, Pallet} from '../../theme';
import {INavigation} from '../../types';

// @assets
const {width, height} = Dimensions.get('window');
const backIcon = require('../../assets/svg/back');

interface DetailScreenProps {
  navigation: INavigation;
  route: RouteProp<{params: {imageUrl: string}}, 'params'>;
}

const DetailScreen: React.FC<DetailScreenProps> = ({route, navigation}) => {
  const artwork = useSelector(showArtworkDetail);
  const {imageUrl} = route.params;

  console.log(imageUrl, 'imageUrl');
  return (
    <ImageBackground
      source={{uri: imageUrl}}
      imageStyle={{width, height}}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack}>
          <SvgUri fill="white" height={20} width={20} svgXmlData={backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.infoContainer}>{artwork.thumbnail.alt_text}</Text>
        <Text style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Author: </Text>
          {artwork.artist_display}
        </Text>
        <Text style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Title: </Text> {artwork.artist_title}
        </Text>
        <Text style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Type: </Text>
          {artwork.artwork_type_title}
        </Text>
        <Text style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Origin: </Text>
          {artwork.artwork_type_title}
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  infoTitle: {fontFamily: FontNames.TextExtraBold},
  infoContainer: {
    fontSize: FontSizes.Medium,
    marginTop: 10,
  },
  title: {
    fontSize: FontSizes.ExtraLarge,
    alignSelf: 'center',
    fontFamily: FontNames.TextBold,
    marginBottom: 20,
  },
  container: {
    backgroundColor: Pallet.black,
    opacity: 0.7,
    width,
    height,
    paddingHorizontal: 15,
  },
});

export default DetailScreen;
