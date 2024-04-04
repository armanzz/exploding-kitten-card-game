import { DRAW_CARD, START_GAME, WIN_GAME, LOSE_GAME, SET_USERNAME } from './actiontypes';

// Action creators
export const drawCard = () => {
  return (dispatch, getState) => {
    dispatch({ type: DRAW_CARD });
  };
};

export const startGame = () => {
  return (dispatch) => {
    dispatch({ type: START_GAME });
  };
};

export const winGame = () => {
  return (dispatch) => {
    dispatch({ type: WIN_GAME  });
  };
};

export const loseGame = () => {
  return (dispatch) => {
    dispatch({ type: LOSE_GAME   });
  };
};
export const setUsername = (username) => {
  return (dispatch) => {
    dispatch({ type: SET_USERNAME,payload: username });
  };
};
