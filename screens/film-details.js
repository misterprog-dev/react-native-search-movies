import React from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import numeral from "numeral";
import { getFilmDetailsFromApi, getImageFromApi } from "../api/TMDB-api";

class FilmDetails extends React.Component {
  /**
   * Constructeur par défaut.
   **/
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    };
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
   * Gestion de favoris
   */
  _toggleFavorite() {
    const action = {
      type: "TOGGLE_FAVORITE",
      value: this.state.film,
    };
    this.props.dispatch(action);
  }

  /**
   * Construire une image de favoris.
   *
   * @return Image favorite
   */
  _displayFavoriteImage() {
    var sourceImage = require("../assets/images/ic_favorite_border.png");
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      // Film dans nos favoris
      sourceImage = require("../assets/images/ic_favorite.png");
    }
    return <Image style={styles.favoriteImage} source={sourceImage} />;
  }

  /**
   * Permet d'afficher le film.
   */
  _displayMovie() {
    const film = this.state.film;
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.imageBackground}>
            <Image
              style={styles.image}
              source={{ uri: getImageFromApi(film.backdrop_path) }}
            />
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.filmTitle}>{film.title}</Text>
            <TouchableOpacity
              onPress={() => this._toggleFavorite()}
              style={styles.favoriteContainer}
            >
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <Text style={styles.descriptionFilm}>{film.overview}</Text>
            <Text style={styles.defaultText}>
              Sorti le{" "}
              {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.defaultText}>
              Note : {film.vote_average} / 10
            </Text>
            <Text style={styles.defaultText}>
              Nombre de votes : {film.vote_count}
            </Text>
            <Text style={styles.defaultText}>
              Budget : {numeral(film.budget).format("0,0[.]00 $")}
            </Text>
            <Text style={styles.defaultText}>
              Genre(s) :{" "}
              {film.genres
                .map(function (genre) {
                  return genre.name;
                })
                .join(" / ")}
            </Text>
            <Text style={styles.defaultText}>
              Companie(s) :{" "}
              {film.production_companies
                .map(function (company) {
                  return company.name;
                })
                .join(" / ")}
            </Text>
          </View>
        </ScrollView>
      );
    }
  }

  // Une fois notre component initialisé, on charge le film demandé.
  componentDidMount() {

    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm);
    
    if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      })
      return;
    }

    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true });

    getFilmDetailsFromApi(this.props.route.params.filmId)
      .then((response) => {
        this.setState({
          film: response,
          isLoading: false,
        });
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

  componentDidUpdate() {
    // Lorsque le component se met à jour !
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._displayLoading()}
        {this._displayMovie()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  imageBackground: {
    backgroundColor: "#f9c2ff",
    height: "60%",
  },
  image: {
    borderWidth: 2,
    width: "96%",
    height: "94%",
    marginTop: "2%",
    marginRight: "2%",
    marginLeft: "2%",
    backgroundColor: "gray",
    paddingRight: 5,
  },
  containerInfo: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  filmTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
  },
  descriptionFilm: {
    fontSize: 15,
    textAlign: "justify",
  },
  defaultText: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    fontSize: 15,
  },
  favoriteContainer: {
    alignItems: "center",
  },
  favoriteImage: {
    width: 40,
    height: 40,
  },
});

// On connecte le state de notre application au component FilmDetail.
function mapStateToProps(state) {
  return {
    favoritesFilm: state.favoritesFilm,
  };
}

export default connect(mapStateToProps)(FilmDetails);
