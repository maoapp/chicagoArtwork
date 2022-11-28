import React from 'react';
import {
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
  onPress: () => void;
  onSaveFavorite?: (artwork: IArtwork) => void;
  urlImage: string;
}

const ArtworkCard: React.FC<IArtworkCardProps> = ({
  artwork,
  onPress,
  onSaveFavorite,
  urlImage,
}) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground
      imageStyle={styles.imageBackground}
      style={styles.artworkCard}
      source={{
        uri: urlImage,
      }}>
      <ScrollView style={styles.contentCard}>
        <View style={styles.headerCard}>
          <Text style={styles.titleCard}>{artwork.title}</Text>
          <TouchableOpacity onPress={() => onSaveFavorite(artwork)}>
            <SvgUri
              fill={Pallet.gray}
              height={18}
              width={18}
              svgXmlData={favoriteIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.originCard}>from {artwork.place_of_origin}</Text>
        <Text>{artwork.thumbnail.alt_text}</Text>
      </ScrollView>
    </ImageBackground>
  </TouchableOpacity>
);

export default ArtworkCard;
