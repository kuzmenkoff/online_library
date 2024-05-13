document.addEventListener("DOMContentLoaded", function() {
    OutputBooks();
});

function OutputBooks() {
  fetch('books_data/books.json')
  .then(response => response.json())
  .then(books => {
    const container = document.getElementById('books_output');
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book_card';

      const img = document.createElement('img');
      img.src = book.image_path;
      bookCard.appendChild(img);

      const title = document.createElement('span');
      title.className = 'title';
      title.textContent = book.title;
      bookCard.appendChild(title);

      const author = document.createElement('span');
      author.className = 'author';
      author.textContent = book.author;
      bookCard.appendChild(author);

      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'book_card_buttons';
      const openButton = document.createElement('button');
      openButton.className = 'open_button';
      openButton.textContent = 'Open';

      openButton.addEventListener('click', () => {
        window.open(book.pdf_path, '_blank');
      });

      buttonsContainer.appendChild(openButton);

      const downloadButton = document.createElement('button');
      downloadButton.className = 'download_button';
      downloadButton.textContent = 'Download';

      downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = book.pdf_path;
        link.download = book.pdf_path.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      buttonsContainer.appendChild(downloadButton);

      const addButton = document.createElement('button');
      addButton.className = 'add_button';
      addButton.textContent = 'Add';
      buttonsContainer.appendChild(addButton);

      bookCard.appendChild(buttonsContainer);

      container.appendChild(bookCard);
    });
  })
  .catch(error => console.error('Error loading the books:', error));
}