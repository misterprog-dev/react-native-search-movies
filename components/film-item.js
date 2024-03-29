import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../api/TMDB-api';

class FilmItem extends React.Component {
  
  /**
   * Affiche l'image du favoris.
   */
  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche l'image du favoris.
      return (
        <Image
          style={styles.favoriteImage}
          source={require('../assets/images/ic_favorite_border.png')}
        />
      )
    }
  }

  render() {
    const { film, displayDetailsForMovie } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {displayDetailsForMovie(film.id)}}>
        <Image
          style={styles.image}
          source={{ uri: getImageFromApi(film.backdrop_path) }}
        />
        <View style={styles.containerInfoFilm}>
          <View style={styles.entete}>
            {this._displayFavoriteImage()}
            <Text style={styles.filmTitle}>{film.title}</Text>
            <Text style={styles.vote}>{film.vote_average}</Text>
          </View>
          <View style={styles.descriptionFilm}>
            <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.containerDateParution}>
            <Text style={styles.dateParution}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    height: 220,
    marginVertical: 10,
    marginHorizontal: 2,
    flexDirection: 'row'
  },
  image: {
    borderWidth: 2,
    width: 135,
    height: 200,
    marginRight: 2,
    backgroundColor: 'gray'
  },
  containerInfoFilm: {
    flex: 1,
    margin: 5
  },
  entete: {
    flex: 3,
    flexDirection: 'row'
  },
  filmTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  vote: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666'
  },
  containerDescription: {
    flex: 5
  },
  descriptionFilm: {
    fontSize: 15,
    textAlign: 'justify'
  },
  containerDateParution: {
    flex: 1
  },
  dateParution: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  favoriteImage: {
    width: 25,
    height: 25,
    marginRight: 5
  },
});

export default FilmItem;
