import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { getImageFromApi } from '../api/TMDB-api';

class FilmDetails extends React.Component {
  render() {
    const film = this.props.navigation.state.params.film;

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: getImageFromApi(film.backdrop_path) }}
        />
        <View style={styles.separator} />
        <View style={styles.entete}>
          <Text style={styles.filmTitle}>{film.title}</Text>
          <Text style={styles.vote}>{film.vote_average}</Text>
        </View>
        <ScrollView>
          <Text style={styles.descriptionFilm}>
            {film.overview}
          </Text>
        </ScrollView>
        <View style={styles.containerDateParution}>
          <Text style={styles.dateParution}>Sorti le {film.release_date}</Text>
        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5
  },
  image: {
    borderWidth: 2,
    width: '96%',
    height: '30%',
    marginRight: '2%',
    marginLeft: '2%',
    backgroundColor: 'gray',
    paddingRight: 5
  },
  separator: {
    marginVertical: 5,
    width: '96%',
    marginRight: '2%',
    marginLeft: '2%',
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  entete: {
    flex: 1,
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
  }
});

export default FilmDetails;
