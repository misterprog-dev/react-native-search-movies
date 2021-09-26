import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
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
    flex: 1
  },
  imageBackground: {
    backgroundColor: "#f9c2ff",
    height: "60%"
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
    marginRight: "2%"
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
});

export default FilmDetails;
