import React from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";


class Favorite extends React.Component {
  render() {
    return (
      <FilmList
        films={this.props.favoritesFilm}
        navigation={this.props.navigation}
        // Ici on est bien dans le cas de la liste des films favoris. 
        // Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
        isfavoriteList={true} 
      />
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorite);
