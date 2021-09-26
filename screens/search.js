import React from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
import FilmItem from '../components/film-item';
import { getFilmsFromApiWithSearchedText } from '../api/TMDB-api';

class Search extends React.Component {

  /**
  * Constructeur
  **/
  constructor(props) {
    super(props);
    this.searchedText = '';
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false
    };
  }

  /**
  * Permet de modifier la variable modifiant le texte saisi dans le input.
  * @param text le text à récupérer pour la recherche.
  **/
  _searchedTextInputChanged(text) {
    this.searchedText = text;
  }

  /**
  * Permet d'afficher le loading.
  **/
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View styles={styles.containerLoading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }

  /**
  * Permet d'afficher un toast.
  * @param message le message à afficher dans le toast.
  **/
  _showToast(message) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  /**
  * Permet de faire à l'api pour la recherche de films.
  **/
  _loadFilms() {
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then((response) => {
        if (response.results.length == 0) {
          { this._showToast('Aucun résultat !') }
        }
        else {
          this.page = response.page;
          this.totalPages = response.total_pages;
          this.setState({ films: [...this.state.films, ...response.results] });
        }
        this.setState({ isLoading: false });
      }).catch((error) => {
        this.setState({ isLoading: false });
        // On affiche notre erreur dans un toast.
        { this._showToast('Une erreur est survenu, vérifier votre connexion internet !') }
      });
    }
  }

  /**
  * Permet de lancer la recherche de films.
  **/
  _SearchFilm() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      isLoading: true,
      films: []
    }, () => {
      this._loadFilms();
    });
  }

  /**
  * Permet de visualiser les détails d'un film.
  * @param film le film à détailler.
  **/
  _displayDetailsForMovie = (film) => {
    this.props.navigation.navigate('FilmDetails', { film: film });
  }

  // Le rendu de l'application
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            mode='outlined'
            label='Titre du film'
            style={styles.input}
            placeholder='Titre du film'
            onChangeText={(text) => this._searchedTextInputChanged(text)}
            onSubmitEditing={() => this._SearchFilm()}
          />
          <Button
            title='Rechercher'            
            disable={this.searchedText.length < 1}
            onPress={() => this._SearchFilm()}
          />
          <View style={styles.separator} />
        </View>

        <FlatList
          data={this.state.films}
          keyExtractor={(film) => film.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} displayDetailsForMovie={this._displayDetailsForMovie} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
        />

        {this._displayLoading()}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 40
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  containerLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Search;
