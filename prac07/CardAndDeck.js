'use strict';

// ========================================================
// Class definitions
// ========================================================

class Card
{
    constructor(value, suit)
    {
        // Private attributes:
        this._value = value;    // Integer value 1-13 inclusive
        this._suit = suit;      // Integer value 1-4 inclusive
    }

    // Public methods:

    set suit(newSuit)
    {
        // Ensure that only valid suits are allowed
        if (newSuit >= 1 && newSuit <= 4)
        {
            this._suit = newSuit;
        }
        else
        {
            this._suit = 0;
            console.log("Card: Invalid suit value " + newSuit);
        }
    }

    set value(newValue)
    {
        if (newValue >= 1 && newValue <= 13)
        {
            this._value = newValue;
        }
        else
        {
            this._value = 0;
            console.log("Card: Invalid card value " + newValue);
        }
    }


    // Reinitialises this instance from a public-data card object.
    initialiseFromCardPDO(cardObject)
    {
        // Initialise the instance via the mutator methods from the PDO object.
        this.value = cardObject._value;
        this.suit  = cardObject._suit;
    }

    get value()
    {
        return this._value;
    }

    get suit()
    {
        return this._suit;
    }

    toString()
    {
        return "The " + this._getValueName() + " of " + this._getSuitName();
    };

    // Private methods:

    _getValueName()
    {
        let valueLookup = ["", "ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king" ];
        return valueLookup[this._value];
    };

    _getSuitName()
    {
        let valueLookup = ["", "clubs", "diamonds", "hearts", "spades"];
        return valueLookup[this._suit];
    }
}


// Deck class
// ----------
//
class Deck
{
    constructor()
    {
        // Private attributes:
        this._cards = [];

        // Code to inialise the card array
        for (let theSuit = 1; theSuit <= 4; theSuit++)
        {
            for (let theValue = 1; theValue <= 13; theValue++)
            {
                this._cards.push(new Card(theValue, theSuit));
            }
        }
    }

    // Public methods:

    toString()
    {
        let output = "";
        for (let i = 0; i < this._cards.length; i++)
        {
            output += this._cards[i] + "<br/>";
        }
        return output;
    }

    shuffle()
    {
        let card2Index;
        let tempCard;

        // For each card in deck array, swap it with another card
        // at a random position in the array.
        for (let card1Index = 0; card1Index < this._cards.length; card1Index++)
        {
            card2Index = Math.floor(Math.random() * this._cards.length);

            // Swap 'em
            tempCard = this._cards[card1Index];
            this._cards[card1Index] = this._cards[card2Index] ;
            this._cards[card2Index] = tempCard;
        }
    };

    get size()
    {
        return this._cards.length;
    }

    // This method should remove the next card from the Deck and
    // return it.  If called when the Deck is empty it should
    // return null.
    dealCard()
    {
        let cardToDeal = this._cards.pop();;
        return cardToDeal;
    }

    initialiseDeckFromPDO(DeckPDO) 
    {
        this._cards = []
        for (let i = 0; i < DeckPDO._cards.length; i++)
        {
            let card = new Card();
            card.initialiseFromCardPDO(DeckPDO._cards[i]);
            // Then add the new card instance to the this._cards array.
            this._cards.push(card)
        }
    }
}

// =================================================================

// Code that runs on page load
// ========================================================

const STORAGE_KEY = "ENG1003Prac7Cards";

let deckInstance = new Deck();
deckInstance.shuffle();

// Button click event handlers
// ========================================================

function storeDeck()
{
    if (typeof(Storage) !== "undefined")
    {
        // TODO: Stringify deckInstance to a JSON string
        let deckInstanceString = JSON.stringify(deckInstance);

        // TODO: store this JSON string to local storage
        //       using the key STORAGE_KEY.
        localStorage.setItem(STORAGE_KEY, deckInstanceString);
    }
    else
    {
        console.log("Error: localStorage is not supported by current browser.");
    }

    // Now clear memory.
    deckInstance = null;
}


function retrieveDeck()
{
    if (typeof(Storage) !== "undefined")
    {
        // TODO: Retrieve the stored JSON string and parse
        //       to a variable called deckObject.
        //       Use this to initialise an new instance of
        //       the Deck class.
        let deckObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
        deckInstance = new Deck();
        deckInstance.initialiseDeckFromPDO(deckObject);
    }
    else
    {
        console.log("Error: localStorage is not supported by current browser.");
    }

}


function displayRetrievedDeck()
{
    let outputAreaRef = document.getElementById("outputArea");
    let output = "";

    if (deckInstance)
    {
        output += deckInstance;
    }
    else
    {
        output = "Error: Test deck instance not loaded.<br />"
    }

    outputAreaRef.innerHTML = output;
}