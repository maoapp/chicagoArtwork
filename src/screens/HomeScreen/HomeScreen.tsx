import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';

// @redux
import {getArtworks, onSelectArtwork} from '../../reducers/artworkReducer';

// @theme
import {FontNames, FontSizes, Pallet} from '../../theme';

// @components
import ArtworkCard from '../../components/artworkCard/ArtworkCard';
import Loader from '../../components/loader/Loader';

// @types
import {IArtwork, INavigation} from '../../types';
import {RootState, useAppDispatch} from '../../store';

// @utils
import {buildArtwork, buildImageUrl} from '../../utils/general';

const HomeScreen: React.FC<INavigation> = ({navigation}) => {
  const [markedAsFavorites, setMarkedAsFavorites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const artworks = useSelector((state: RootState) => state.artworks).artworks;
  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    dispatch(getArtworks(page));
    onMarkFavorites();
  }, [dispatch, page]);

  const onMarkFavorites = async () => {
    const favoritesStored = await AsyncStorage.getItem('favorites');

    if (!favoritesStored) {
      return false;
    }

    const favoritesArtworksIds = JSON.parse(favoritesStored as string).map(
      (artwork: IArtwork) => artwork.id,
    );

    setMarkedAsFavorites(favoritesArtworksIds);
  };

  const renderError = () => (
    <View style={styles.infoContainer}>
      <Text style={styles.emptyState}>Error fetching artworks</Text>
    </View>
  );

  const saveArtworkOnDevice = useCallback(
    async (artwork: IArtwork, imageUrl: string) => {
      const favoritesStored = await AsyncStorage.getItem('favorites');
      let newFavorite = JSON.parse(favoritesStored as string);

      if (!newFavorite) {
        newFavorite = [];
      } else {
        newFavorite = newFavorite.filter(
          (item: IArtwork) => item.id !== artwork.id,
        );
      }

      newFavorite.push(buildArtwork(artwork, imageUrl));

      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorite))
        .then(() => {
          toast.show('Artwork Saved on favorites');
          setMarkedAsFavorites([...markedAsFavorites, artwork.id]);
        })
        .catch(() => {
          toast.show('Error saving artwork, try again please');
        });
    },
    [markedAsFavorites],
  );

  const handleArtworkSelection = (artwork: IArtwork) => {
    dispatch(onSelectArtwork(artwork));
    const imageUrl = buildImageUrl(
      artworks.data.config.iiif_url,
      artwork.image_id,
    );
    navigation.navigate('Detail', {imageUrl});
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
          onSaveFavorite={() =>
            saveArtworkOnDevice(item, artworks.data.config.iiif_url)
          }
          favorite={markedAsFavorites.includes(item.id)}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.dividerCard} />}
      onEndReached={() => setPage(page + 1)}
    />
  );

  const renderContent = () => {
    let content;

    if (artworks.loading) {
      content = <Loader />;
    }

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
    paddingBottom: 50,
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
  emptyState: {
    fontSize: FontSizes.ExtraMedium,
  },
});

export default HomeScreen;
