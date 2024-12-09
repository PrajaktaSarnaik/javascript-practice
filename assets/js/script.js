// Sample Book Database
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", borrowed: false, favorite: false },
    { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", borrowed: false, favorite: false },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", borrowed: false, favorite: false },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", borrowed: false, favorite: false },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", borrowed: false, favorite: false },
    { id: 6, title: "Moby-Dick", author: "Herman Melville", genre: "Adventure", borrowed: false, favorite: false }
  ];
  
  // To store borrowed books and user preferences
  let borrowedBooks = [];
  let recommendedBooks = [];
  
  // Function to render books
  function renderBooks(bookList) {
    const bookListDiv = document.getElementById("bookList");
    bookListDiv.innerHTML = ''; // Clear the current book list
  
    bookList.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
  
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;
  
      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = `By: ${book.author}`;
  
      const bookGenre = document.createElement("p");
      bookGenre.textContent = `Genre: ${book.genre}`;
  
      const borrowBtn = document.createElement("button");
      borrowBtn.textContent = book.borrowed ? "Already Borrowed" : "Borrow";
      borrowBtn.onclick = () => handleBorrow(book);
  
      const favBtn = document.createElement("button");
      favBtn.textContent = book.favorite ? "Unfavorite" : "Add to Favorites";
      favBtn.classList.add("fav-btn");
      favBtn.onclick = () => toggleFavorite(book);
  
      bookCard.append(bookTitle, bookAuthor, bookGenre, borrowBtn, favBtn);
      bookListDiv.append(bookCard);
    });
  }
  
  // Function to handle borrowing books
  function handleBorrow(book) {
    if (!book.borrowed) {
      book.borrowed = true;
      borrowedBooks.push(book);
      updateRecommendations();
      renderBooks(books);
      renderBorrowedBooks();
    }
  }
  
  // Function to toggle favorites
  function toggleFavorite(book) {
    book.favorite = !book.favorite;
    renderBooks(books);
  }
  
  // Function to render borrowed books
  function renderBorrowedBooks() {
    const borrowedBooksDiv = document.getElementById("borrowedBooks");
    borrowedBooksDiv.innerHTML = '';
  
    borrowedBooks.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
  
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;
  
      const returnBtn = document.createElement("button");
      returnBtn.textContent = "Return";
      returnBtn.classList.add("return-btn");
      returnBtn.onclick = () => handleReturn(book);
  
      bookCard.append(bookTitle, returnBtn);
      borrowedBooksDiv.append(bookCard);
    });
  }
  
  // Function to handle returning books
  function handleReturn(book) {
    book.borrowed = false;
    borrowedBooks = borrowedBooks.filter(b => b.id !== book.id);
    updateRecommendations();
    renderBooks(books);
    renderBorrowedBooks();
  }
  
  // Function to update recommendations
  function updateRecommendations() {
    const genres = borrowedBooks.map(book => book.genre);
    recommendedBooks = books.filter(book => genres.includes(book.genre) && !book.borrowed);
    renderRecommendedBooks();
  }
  
  // Function to render recommended books
  function renderRecommendedBooks() {
    const recommendedBooksDiv = document.getElementById("recommendedBooks");
    recommendedBooksDiv.innerHTML = '';
  
    recommendedBooks.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
  
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;
  
      bookCard.append(bookTitle);
      recommendedBooksDiv.append(bookCard);
    });
  }
  
  // Function to handle search and filtering
  document.getElementById("searchBtn").addEventListener("click", () => {
    const title = document.getElementById("searchTitle").value.toLowerCase();
    const author = document.getElementById("searchAuthor").value.toLowerCase();
    const genre = document.getElementById("searchGenre").value.toLowerCase();
  
    const filteredBooks = books.filter(book => {
      return (
        (title === "" || book.title.toLowerCase().includes(title)) &&
        (author === "" || book.author.toLowerCase().includes(author)) &&
        (genre === "" || book.genre.toLowerCase().includes(genre))
      );
    });
  
    renderBooks(filteredBooks);
  });
  
  // Initial rendering
  renderBooks(books);
  