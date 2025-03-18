function getPlayType(playerCards, numCards) {
    // this function checks for valid combinations of cards 
    if (numCards == 1) {
      // any single card is valid 
      return 1; 
    } else if (numCards == 2) {
      // check if pair (aka number value is the same)
      if (playerCards[0].number == playerCards[1].number) {
        return 2;  
      } else {
        return -1; 
      }
    } else if (numCards == 3) {
      // check if triple 
      if (playerCards[0].number == playerCards[1].number && 
        playerCards[1].number == playerCards[2].number) {
          return 3; 
      } else {
        return -1; 
      }
    } else if (numCards == 5) {
      //sort the cards by ascending value
      playerCards.sort((a, b) => (a.value - b.value));
  
      //check for straight
      if (playerCards[0].number == playerCards[1].number - 1) {
        if (playerCards[1].number == playerCards[2].number - 1) {
          if (playerCards[2].number == playerCards[3].number - 1) {
            if (playerCards[3].number == playerCards[4].number - 1) {

              // check for straight flush
              if (playerCards[0].suit == playerCards[0].suit) {
                if (playerCards[1].suit == playerCards[2].suit) {
                  if (playerCards[2].suit == playerCards[3].suit) {
                    if (playerCards[3].suit == playerCards[4].suit) {
                      return 55; 
                    }
                  }
                }
              }

              return 51; 
            }
          }
        }
      }
  
      //check for flush
      if (playerCards[0].suit == playerCards[0].suit) {
        if (playerCards[1].suit == playerCards[2].suit) {
          if (playerCards[2].suit == playerCards[3].suit) {
            if (playerCards[3].suit == playerCards[4].suit) {
              return 52; 
            }
          }
        }
      }
  
      //check for full house (High triple)
      if (playerCards[0].number == playerCards[1].number) {
        if (playerCards[2].number == playerCards[3].number) {
          if (playerCards[3].number == playerCards[4].number) {
            return 53;  
          }
        }
      }
  
      //check for full house (High pair)
      if (playerCards[0].number == playerCards[1].number) {
        if (playerCards[1].number == playerCards[2].number) {
          if (playerCards[3].number == playerCards[4].number) {
            return 53;
          }
        }
      }
  
      //check for four-of-a-kind (Low Single)
      if (playerCards[1].number == playerCards[2].number) {
        if (playerCards[2].number == playerCards[3].number) {
          if (playerCards[3].number == playerCards[4].number) {
            return 54; 
          }
        }
      }
  
      //check for four-of-a-kind (High Single)
      if (playerCards[0].number == playerCards[1].number) {
        if (playerCards[1].number == playerCards[2].number) {
          if (playerCards[2].number == playerCards[3].number) {
            return 54;
          }
        }
      } 
      
    } else {
      return -10; 
    }
    
    return -1; 

}

function higherThanDeck(playerCards, deckCards, numCards) {
    //sort by value (ascending)
    playerCards.sort((a, b) => (a.value - b.value)); 
    deckCards.sort((a, b) => (a.value - b.value)); 
  
    if (numCards == 1) {
      if (playerCards[0].value > deckCards[0].value) {
        return true; 
      } else {
        return false;
      }
    }
  
    if (numCards == 2) {
      if (playerCards[1].value > deckCards[1].value) {
        return true;
      } else {
        return false; 
      }
    }
  
    if (numCards == 3) {
      if (playerCards[2].value > deckCards[2].value) {
        return true; 
      } else {
        return false; 
      }
    }
  
    if (numCards == 5) {
      let playType1 = getPlayType(playerCards, numCards); 
      let playType2 = getPlayType(deckCards, numCards); 
  
      if (playType1 > playType2) {
        return true; 
      } else if (playType1 < playType2) {
        return false;
      } else {
        if (playType1 == 51) {
          //both are straights
          if (playerCards[4].value > deckCards[4].value) {
            return true; 
          } else {
            return false;
          }
        } else if (playType1 == 52) {
          //both are flushes
          if (playerCards[4].number > deckCards[4].number) {
            return true;
          } else if (playerCards[4].number == deckCards[4].number) {
            if (playerCards[3].number > deckCards[3].number) {
              return true;
            } else if (playerCards[3].number == deckCards[3].number) {
              if (playerCards[2].number > deckCards[2].number) {
                return true;
              } else if (playerCards[2].number == deckCards[2].number) {
                if (playerCards[1].number > deckCards[1].number) {
                  return true;
                } else if (playerCards[1].number == deckCards[1].number) {
                  if (playerCards[0].number > deckCards[0].number) {
                    return true; 
                  } else if (playerCards[0].number == deckCards[0].number) {
                    if (playerCards[4].value > deckCards[0].value) {
                      return true;
                    } else {
                      return false; 
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
          
        } else if (playType1 == 53) {
          //both are full-houses
  
          if (playerCards[1].number == playerCards[2].number) {
            if (deckCards[1].number == deckCards[2].number) {
              //both full-houses have low triple
              if (playerCards[2].value > deckCards[2].value) {
                return true; 
              } else {
                return false;
              }
            } else {
              //player has low triple, deck has high triple
              if (playerCards[2].value > deckCards[4].value) {
                return true; 
              } else {
                return false;
              }
            }
          } else {
            if (deckCards[1].number == deckCards[2].number) {
              //player has high triple, deck has low triple
              if (playerCards[4].value > deckCards[2].value) {
                return true; 
              } else {
                return false;
              }
            } else {
              //both full-houses have high triple  
              if (playerCards[4].value > deckCards[4].value) {
                return true; 
              } else {
                return false;
              }
            }
          }
        } else if (playType1 == 54) {
          //both are 4-of-a-kinds
  
          if (playerCards[2].number > deckCards[2].number) {
            return true; 
          } else {
            return false; 
          }
  
        } else if (playType1 == 55) {
          //both are straight flushes
  
          if (playerCards[4].value > deckCards[4].value) {
            return true;
          } else {
            return false; 
          }
        }
      }
    }
  }
  
  
  export { getPlayType, higherThanDeck };  