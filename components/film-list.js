import React from "react";
import { connect } from "react-redux";
import { StyleSheet, FlatList } from "react-native";
import FilmItem from "../components/film-item";

class FilmList extends React.Component {
  /**
   * Constructeur par défaut.
   **/
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  /**
   * Permet de visualiser les détails d'un film.
   *
   * @param filmId l'id du film à détailler.
   **/
  _displayDetailsForMovie = (filmId) => {
    this.props.navigation.navigate("FilmDetails", { filmId: filmId });
  };

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.films}
        keyExtractor={(film) => film.id.toString()}
        extraData={this.props.favoritesFilm}
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            displayDetailsForMovie={this._displayDetailsForMovie}
            // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher une image favoris ou non.
            isFilmFavorite={
              this.props.favoritesFilm.findIndex(
                (film) => film.id === item.id
              ) !== -1
                ? true
                : false
            }
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (this.page < this.totalPages) {
            this.props.loadFilms();
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search.
function mapStateToProps(state) {
  return {
    favoritesFilm: state.favoritesFilm,
  };
}

export default connect(mapStateToProps)(FilmList);
