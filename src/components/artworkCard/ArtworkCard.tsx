import React, {useEffect, useRef} from 'react';
import {
  Animated,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {Text} from 'react-native-elements';

// @theme
import {Pallet} from '../../theme';
import {IArtwork} from '../../types';

// @styles
import styles from './styles';

// @assets
const favoriteIcon = require('../../assets/svg/favorite');

interface IArtworkCardProps {
  artwork: IArtwork;
  onPress?: () => void;
  onSaveFavorite?: () => void;
  urlImage: string;
  favorite: boolean;
}

const ArtworkCard: React.FC<IArtworkCardProps> = ({
  artwork,
  favorite,
  urlImage,
  onPress,
  onSaveFavorite,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        imageStyle={styles.imageBackground}
        style={styles.artworkCard}
        source={{
          uri: urlImage,
        }}>
        <Animated.View style={[styles.animatedView, {opacity: fadeAnim}]}>
          <ScrollView style={styles.contentCard}>
            <View style={styles.headerCard}>
              <Text style={styles.titleCard}>{artwork.title}</Text>
              {!favorite && (
                <TouchableOpacity onPress={onSaveFavorite}>
                  <SvgUri
                    fill={Pallet.gray}
                    height={18}
                    width={18}
                    svgXmlData={favoriteIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.originCard}>
              from {artwork.place_of_origin}
            </Text>
            <Text>{artwork?.thumbnail?.alt_text}</Text>
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ArtworkCard;
