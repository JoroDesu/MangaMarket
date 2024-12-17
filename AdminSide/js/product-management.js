// Fetch and populate the manga table
function fetchMangas(sort = 'newest') {
  fetch(`https://museobulawan.online/development/admin_mis/src/php/fetchMangas.php?sort=${sort}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          if (data.error) {
              console.error(data.error);
              displayNoDataMessage();
          } else {
              populateMangaTable(data);
          }
      })
      .catch(error => {
          console.error('Error fetching mangas:', error);
          displayNoDataMessage();
      });
}

// Populate the manga table
function populateMangaTable(mangas) {
  const tableBody = document.getElementById('manga-table').querySelector('tbody');
  tableBody.innerHTML = ''; 
  // Check if there are mangas
  if (mangas.length === 0) {
      displayNoDataMessage();
      return;
  }

  // Populate table rows
  mangas.forEach(manga => {
      const row = document.createElement('tr');
      row.classList.add('border-t', 'border-gray-300', 'text-center');

      // Create and populate cells
      const mangaIdCell = document.createElement('td');
      mangaIdCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2', 'border-l-2');
      mangaIdCell.textContent = manga.manga_id;

      const titleCell = document.createElement('td');
      titleCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      titleCell.textContent = manga.title;

      const authorCell = document.createElement('td');
      authorCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      authorCell.textContent = manga.author;

      const genreCell = document.createElement('td');
      genreCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      genreCell.textContent = manga.genre;

      const priceCell = document.createElement('td');
      priceCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      priceCell.textContent = manga.price;

      const stockCell = document.createElement('td');
      stockCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      stockCell.textContent = manga.stock;

      const descriptionCell = document.createElement('td');
      descriptionCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      descriptionCell.textContent = manga.description;

      const imageCell = document.createElement('td');
      imageCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      const img = document.createElement('img');
      img.src = manga.image_url;
      img.alt = manga.title;
      img.classList.add('w-16', 'h-16', 'object-cover');
      imageCell.appendChild(img);

      const salePriceCell = document.createElement('td');
      salePriceCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      salePriceCell.textContent = manga.saleprice;

      const ratingsCell = document.createElement('td');
      ratingsCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      ratingsCell.textContent = manga.ratings;

      const createdAtCell = document.createElement('td');
      createdAtCell.classList.add('px-4', 'py-2', 'bg-white', 'border-black', 'border-t-2', 'border-b-2');
      createdAtCell.textContent = manga.created_at;

      const actionCell = document.createElement('td');
      actionCell.classList.add('px-4', 'py-2', 'flex', 'justify-center', 'space-x-2', 'bg-white', 'border-black', 'rounded-r-[15px]', 'border-t-2', 'border-b-2', 'border-r-2');

      // Add buttons with event listeners
      const editButton = document.createElement('button');
      editButton.classList.add('bg-transparent', 'text-black', 'p-2', 'rounded', 'hover:bg-orange-300');
      editButton.innerHTML = `<i class="fas fa-edit"></i>`;
      editButton.addEventListener('click', () => handleMangaAction('edit', manga));

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('bg-transparent', 'text-black', 'p-2', 'rounded', 'hover:bg-orange-300');
      deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
      deleteButton.addEventListener('click', () => handleMangaAction('delete', manga.manga_id));

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      // Append cells to row
      row.appendChild(mangaIdCell);
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(genreCell);
      row.appendChild(priceCell);
      row.appendChild(stockCell);
      row.appendChild(descriptionCell);
      row.appendChild(imageCell);
      row.appendChild(salePriceCell);
      row.appendChild(ratingsCell);
      row.appendChild(createdAtCell);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
  });
}

// Handle actions for edit and delete
function handleMangaAction(action, data) {
  switch (action) {
      case 'edit':
          showMangaModal(data); // 'data' is the manga object
          break;
      case 'delete':
          openMangaDeleteModal((response) => {
              if (response) {
                  deleteManga(data) // 'data' is manga.manga_id
                      .then(() => {
                          console.log(`Manga with ID ${data} deleted.`);
                          init(); // Refresh the data/display
                      })
                      .catch(error => {
                          console.error('Error deleting manga:', error);
                          alert('An error occurred while deleting the manga.');
                      });
              } else {
                  console.log("Delete action canceled.");
              }
          });
          break;
      default:
          console.error('Unknown action:', action);
  }
}
