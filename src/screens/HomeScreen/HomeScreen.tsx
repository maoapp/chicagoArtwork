import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @redux
import {
  getArtworks,
  showArtworks,
  onSelectArtwork,
} from '../../reducers/artworkReducer';

// @theme
import {FontNames, FontSizes, Pallet} from '../../theme';

// @components
import ArtworkCard from '../../components/artworkCard/ArtworkCard';
import Loader from '../../components/loader/Loader';

// @types
import {IArtwork, INavigation} from '../../types';

// @utils
import {buildImageUrl} from '../../utils/general';

const HomeScreen: React.FC<INavigation> = ({navigation}) => {
  const dispatch = useDispatch();
  const artworks = useSelector(showArtworks);
  useEffect(() => {
    dispatch(getArtworks());
  }, []);

  const renderError = () => (
    <View style={styles.infoContainer}>
      <Text>Error</Text>
    </View>
  );

  const handleArtworkSelection = (artwork: IArtwork) => {
    dispatch(onSelectArtwork(artwork));
    const imageUrl = buildImageUrl(
      artworks.data.config.iiif_url,
      artwork.image_id,
    );
    navigation.navigate('Detail', {imageUrl});
  };

  const handleSaveArtwork = async (artwork: IArtwork) => {
    // const favoritesStored = JSON.P AsyncStorage.getItem('favorites');

    // const newFavorite = JSON.stringify(artwork);
    // AsyncStorage.setItem('favorites', JSON.stringify(artwork));
  };

  const renderArtworks = () => (
    <FlatList
      data={artworks.data.data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ArtworkCard
          artwork={item}
          urlImage={buildImageUrl(artworks.data.config.iiif_url, item.image_id)}
          onPress={() => handleArtworkSelection(item)}
          onSaveFavorite={() => handleSaveArtwork(item)}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.dividerCard} />}
    />
  );

  const renderContent = () => {
    let content;

    // if (true) {
    //   content = <Loader />;
    // }

    if (artworks.data) {
      content = renderArtworks();
    }

    if (artworks.error) {
      content = renderError();
    }

    return content;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ARTWORK CATALOG</Text>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallet.grayVariant,
  },
  title: {
    fontFamily: FontNames.TextExtraBold,
    fontSize: FontSizes.Large,
    alignSelf: 'center',
    color: '#796f65',
    marginVertical: 20,
  },
  dividerCard: {
    width: '100%',
    backgroundColor: Pallet.grayLight,
    height: 0.3,
    marginVertical: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
