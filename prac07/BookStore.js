/**
 * @BookStore.js
 * Contains the Book and BookStore class
 * 
 * Last updated - 11 September 2018
 */

let listOfAllKnownAuthors = []

class BookStore
/* Represents a book store. */
{
    constructor(name, address, owner)
    /** 
     * @constructor
     * @param {string} name - The name of the book store.
     * @param {string} address - The address of the book store.
     * @param {string} owner - The owner of the book store.
    */
    {
        this._name = name;
        this._address = address;
        this._owner = owner;
        this._booksAvailable = [];          // books that are available for sale at this bookstore
        this._totalCopiesOfAllBooks = 0     // number of books available at bookstore
    }

    addBook(bookInstance, copies)
    // increases the number of copies of bookInstance by the number of copies
    {
        // checks if number of copies is valid
        if (copies < 0)
        {
            console.log("Can't add books. Number of copies to be added must be a positive integer.")
            return null;
        }

        // proceeds with function if valid number of copies
        let positionOfBook = this.checkForBook(bookInstance);
        if (positionOfBook != null)
        {
            // add copies to bookInstance if found in booksAvailable
             let foundBook = this._booksAvailable[positionOfBook];
             foundBook.copies += copies;
             console.log("Added " + copies + " copies of " + foundBook.book);
             listOfAllKnownAuthors.push(foundBook.book.author);
        }
        else
        {
            // make new object if book is a new book, then add to booksAvailable
             let bookCopies = {
                 book: bookInstance,
                 copies: copies
             };
             this._booksAvailable.push(bookCopies);
             console.log("Added " + copies + " copies of a new book: " + bookInstance);
        }

        this._totalCopiesOfAllBooks += copies;
    }

    sellBook(bookInstance, numberSold)
    // reduces the number of copies of bookInstance by the number of copies sold
    {
        // checks if number of copies is valid
        if (numberSold < 0)
        {
            console.log("Can't sell books. Number of copies sold must be a positive integer.")
            return null;
        }

        // proceeds with function if valid number of copies
        let positionOfBook = this.checkForBook(bookInstance);
        if (positionOfBook != null)
        // reduce number of copies if bookInstance is in booksAvailable
        {
            let foundBook = this._booksAvailable[positionOfBook];
            if (numberSold > this._booksAvailable[positionOfBook].copies)
            // print error message if copies to be sold is greater than copies left
            {
                console.log("Not enough copies of " + foundBook.book + " to sell");
            }
            else
            {
                foundBook.copies -= numberSold;
                if (foundBook.copies === 0)
                // remove book and author if number of copies hits 0
                {
                    this._booksAvailable.pop(PositionOfBook);
                    this._NumTitles -= 1;
                    let foundAuth = Book.authorKnown(foundBook.book.author);
                    listOfAllKnownAuthors.pop(foundAuth);
                }
                // update number of book copies
                this._totalCopiesOfAllBooks -= numberSold;
                console.log("Sold " + numberSold + " copies of " + foundBook.book);
            }
        }
        else
        {
            console.log(bookInstance + " not found");
        }
    }

    checkForBook(bookInstance)
    // gets the index of bookInstance from the list booksAvailable if present, returns null otherwise
    {
        let currBookNum = 0;
        while (currBookNum < this._booksAvailable.length)
        {
            if (this._booksAvailable[currBookNum].book.isTheSame(bookInstance))
            {
                return currBookNum;
            }
            currBookNum += 1;
        }
        return null;
    }

    get name()
    {
        return this._name;
    }

    set name(newName)
    {
        this._name = newName;
    }

    get address()
    {
        return this._address;
    }

    set address(newAddress)
    {
        this._address = newAddress;
    }

    get owner()
    {
        return this._owner;
    }

    set owner(newOwner)
    {
        this._owner = newOwner;
    }
}

class Book
/* Represents a book */
{
    constructor(title, author, publicationYear, price)
    /** 
     * @constructor
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     * @param {string} publicationYear - The year the book was published.
     * @param {string} price - The price of the book.
    */
    {
        this._title = title;
        this._author = author;
        this._publicationYear = publicationYear;
        this._price = price;
        if (Book.authorKnown(this._author) === false)
        // if author is not recognised, add author to listOfAllKnownAuthors
        {
            listOfAllKnownAuthors.push(this._author)
        }
    }

    isTheSame(otherBook)
    // checks if this book and otherBook is the same title
    {
        return otherBook.title === this.title;
    }

    static authorKnown(authorName)
    // checks if authorName is in listOfAllKnownAuthors
    {
        let foundThem = false;
        for (let pos = 0; pos < listOfAllKnownAuthors.length; pos++)
        {
            if (authorName === listOfAllKnownAuthors[pos])
            {
                foundThem = true;
            }
        }
        return foundThem;
    }

    get title()
    {
        return this._title;
    }

    get author()
    {
        return this._author;
    }

    get publicationYear()
    {
        return this._publicationYear;
    }

    get price()
    {
        return this._price;
    }

    toString()
    // formats data as a string in this format -> Title, Author. Year Published ($Price)
    {
        return this.title + ", " + this.author + ". " + this.publicationYear + " ($" + this.price + ")";
    }
}

// Book details courtesy of Harry Potter series by J.K. Rowling
let cheapSpellBook = new Book("The idiot's guide to spells","Morlan",2005,40);
let flourishAndBlotts = new BookStore("Flourish & Blotts", "North side, Diagon Alley, London, England", "unknown");
let monsterBook = new Book("The Monster Book of Monsters", "Edwardus Lima", 1978, 40);
let monsterBookToSell = new Book("The Monster Book of Monsters", "Edwardus Lima", 1978, 40);
let spellBook = new Book("The Standard Book of Spells, Grade 4", "Miranda Goshawk", 1921, 80);
flourishAndBlotts.addBook(cheapSpellBook,1000);
flourishAndBlotts.addBook(monsterBook, 500);
flourishAndBlotts.sellBook(monsterBookToSell, 200);
flourishAndBlotts.addBook(spellBook, 40);
flourishAndBlotts.addBook(spellBook, 20);
flourishAndBlotts.sellBook(spellBook, 15);
flourishAndBlotts.addBook(monsterBookToSell, -30);
flourishAndBlotts.sellBook(monsterBookToSell, 750);

console.log("Authors known: " + listOfAllKnownAuthors);