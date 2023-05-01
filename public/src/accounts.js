function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort(function(lastNameA, lastNameB) {
    if(lastNameA.name.last < lastNameB.name.last) {
      return -1;
    } else if(lastNameA.name.last > lastNameB.name.last) {
      return 1;
    } else {
      return 0;
    }
  });
  
  return sorted;
}

//helper function to get borrows array
function getBorrowsArray(books){
  let borrowsArray = [];
  for(let i = 0; i < books.length; i++) {
    for(let j = 0; j < books[i].borrows.length; j++) {
      borrowsArray.push(books[i].borrows[j]);
    }
  }
  
  return borrowsArray;
}



function getTotalNumberOfBorrows(account, books) {
  
  let borrowsArray = getBorrowsArray(books);
  
  let accountId = account.id;
  let totalBorrowed = 0;
  
  for(let i = 0; i < borrowsArray.length; i++) {
    if(borrowsArray[i].id === accountId) {
      totalBorrowed++;
    }
  }
  
  return totalBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
    let allBooks = [];
    
  books.forEach(book => {
      if(book.borrows.find(item => item.id === account.id && !item.returned)) {
        allBooks.push(book);
      }
    });
    
  allBooks.forEach(book=>{
      let author = authors.find(person => person.id === book.authorId);
      book['author'] = author;
    });
  
  return allBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
