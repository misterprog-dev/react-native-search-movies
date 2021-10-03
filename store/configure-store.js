import { createStore } from "redux";
import toggleFavorite from "./reducers/favorite-reducer";

export default createStore(toggleFavorite);