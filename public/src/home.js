function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  
  for(let i = 0; i < books.length; i++) {
    for(let j = 0; j < books[i].borrows.length; j++) {
      if(books[i].borrows[j].returned === false) {
        borrowedCount++;
      }
    }
  }
  
  return borrowedCount;
}

// helper function for counting genre totals
function genreTotal(books) {
 let countObj = {};
  books.forEach(book => {
    if (countObj[book.genre] != null) {
      countObj[book.genre]++;
    } else {
      countObj[book.genre] = 1;
    }
  });
 return countObj;
}

function getMostCommonGenres(books) { 
  let countObj = genreTotal(books);
  let countArray = [];
  for (const [key, value] of Object.entries(countObj)) {
    countArray.push({
      'name' : key,
      'count' : value
    }); 
  }
  countArray.sort((bookA,bookB) => bookB.count - bookA.count);
  return countArray.slice(0, 5);
}

function getMostPopularBooks(books) {
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    borrows.sort((book1,book2) => book2.count - book1.count);

    return borrows.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: 0
  };
  books.forEach((book) => {
   if (book.authorId === author.id) {
    theAuthor.count += book.borrows.length;
   }
  });
  result.push(theAuthor);
 });
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
  
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};