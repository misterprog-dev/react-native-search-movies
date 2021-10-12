import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import FilmItem from "../components/film-item";
import FilmList from "../components/film-list";
import { getFilmsFromApiWithSearchedText } from "../api/TMDB-api";

class Search extends React.Component {
  /**
   * Constructeur par défaut.
   **/
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
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
   *
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
  }

  /**
   * Permet de faire à l'api pour la recherche de films.
   **/
  _loadFilms() {
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1)
        .then((response) => {
          if (response.results.length == 0) {
            {
              this._showToast("Aucun résultat !");
            }
          } else {
            this.page = response.page;
            this.totalPages = response.total_pages;
            this.setState({
              films: [...this.state.films, ...response.results],
            });
          }
          this.setState({ isLoading: false });
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          // On affiche notre erreur dans un toast.
          {
            this._showToast(
              "Une erreur est survenu, vérifier votre connexion internet !"
            );
          }
        });
    }
  }

  /**
   * Permet de lancer la recherche de films.
   **/
  _SearchFilm() {
    if (this.searchedText.trim().length > 0) {
      this.page = 0;
      this.totalPages = 0;
      this.setState(
        {
          isLoading: true,
          films: [],
        },
        () => {
          this._loadFilms();
        }
      );
    }
  }

  // Le rendu de l'application
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            mode="outlined"
            label="Titre du film"
            style={styles.input}
            placeholder="Titre du film"
            onChangeText={(text) => this._searchedTextInputChanged(text)}
            onSubmitEditing={() => this._SearchFilm()}
          />
          <Button
            title="Rechercher"
            disable={this.searchedText.length < 1}
            onPress={() => this._SearchFilm()}
          />
          <View style={styles.separator} />
        </View>

        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
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
    marginTop: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  containerLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
