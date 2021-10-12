import React from "react";
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../screens/search";
import FilmDetails from "../screens/film-details";
import Favorite from "../screens/favorite";

// Pour le snack navigator
const Stack = createStackNavigator();

const StackNavigatorSearch = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Rechercher"
        }}
      />
      <Stack.Screen
        name="FilmDetails"
        component={FilmDetails}
        options={{
          title: "Détails film"
        }}
      />
    </Stack.Navigator>
  );
}

// Pour le tab navigator
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TabSearch"
        component={StackNavigatorSearch}
        options={{
          title: 'Rechercher',
          tabBarIcon: () => {
            return <Image
              source={require('../assets/images/ic_search.png')}
              style={styles.icon}/>
          },
          tabBarActiveBackgroundColor: '#DDDDDD',
          tabBarInactiveBackgroundColor: '#FFFFFF',
          tabBarShowIcon: true,
          tabBarShowLabel: false
        }} />
      <Tab.Screen name="TabFavorites" 
        component={Favorite}
        options={{
          title: "Favoris",
          tabBarIcon: () => {
            return <Image
              source={require('../assets/images/ic_favorite.png')}
              style={styles.icon}/>
          },
          tabBarActiveBackgroundColor: '#DDDDDD',
          tabBarInactiveBackgroundColor: '#FFFFFF',
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          tabBarBadge: 3
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});

// On connecte le state de notre application au component FilmDetail.
function mapStateToProps(state) {
  return {
    favoritesFilm: state.favoritesFilm,
  };
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
} 
