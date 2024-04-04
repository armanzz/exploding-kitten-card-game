import { DRAW_CARD, START_GAME, WIN_GAME, LOSE_GAME,SET_USERNAME } from './actiontypes';
const initializeDeck = () => {


 // Define the probability of each card being included in the deck
  const cardProbabilities = {
      'Cat': 0.4, // 40% probability
      'Defuse': 0.3, // 30% probability
      'Exploding Kitten' : 0.2, // 20% probability
      'Shuffle' : 0.1, // 10% probability
  };
  
  const deck = [];
  
  // Determine the deck size based on the number of cards and their probabilities
  const deckSize = 5; // Define your desired deck size
  
  // Fill the deck by randomly selecting cards based on their probabilities
  for (let i = 0; i < deckSize; i++) {
      const random = Math.random();
      let cumulativeProbability = 0;
      for (const card in cardProbabilities) {
          cumulativeProbability += cardProbabilities[card];
          if (random < cumulativeProbability) {
              deck.push(card);
              break;
          }
      }
  }

  return deck;
};

const initialState = {
    deck: initializeDeck(),
    gameOver: false,
    defuses: 0,
    drawnCard: null,
    username: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DRAW_CARD: {
            let newDeck = [...state.deck];
            const drawnCard = newDeck.shift();
            let gameOver = state.gameOver;
            let defuses = state.defuses;

            switch (drawnCard) {
                case 'Exploding Kitten':
                    if (defuses > 0) {
                        defuses -= 1;
                       } 
                    else {
                        gameOver = true;
                        return { ...state, gameOver, defuses, drawnCard };
                    }
                    break;
                case 'Shuffle':
                    newDeck = initializeDeck();
                    break;
                case 'Defuse':
                    defuses += 1;
                    break;
                default:
                    break;
            }

            
            return { ...state, deck: newDeck, gameOver, defuses, drawnCard };
        }
        case START_GAME:
            return { deck: initializeDeck(), gameOver: false, defuses: 0, drawnCard: null };
        case WIN_GAME:
            return { deck: initializeDeck(), gameOver: false, defuses: 0, drawnCard: null };
        case LOSE_GAME:
            return { deck: initializeDeck(), gameOver: false, defuses: 0, drawnCard: null };
        case SET_USERNAME:
            return { ...state, username: action.payload };
        default:
            return state;
    }
};

export default reducer;
