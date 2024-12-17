// Fetch and populate the manga table
function fetchMangas() {
  fetch(`https://white-seal-771693.hostingersite.com/AdminSide/php/fetchTbManga.php`)
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
              if (Array.isArray(data)) {
                  populateMangaTable(data);
              } else {
                  console.error('Data is not in expected array format');
                  displayNoDataMessage();
              }
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

  // Build the table rows directly with data
  const rows = mangas.map(manga => {
      return `
          <tr class="border-t border-gray-300 text-center">
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.manga_id || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.title || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.author || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.genre || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.price || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.stock || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.description || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">
                  <img src="${manga.image_url || ''}" alt="${manga.title || 'No image available'}" class="w-16 h-16 object-cover" />
              </td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.saleprice || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.ratings || 'N/A'}</td>
              <td class="px-4 py-2 bg-white border-black border-t-2 border-b-2">${manga.created_at || 'N/A'}</td>
              <td class="px-4 py-2 flex justify-center space-x-2 bg-white border-black rounded-r-[15px] border-t-2 border-b-2 border-r-2">
                  <button class="bg-transparent text-black p-2 rounded hover:bg-orange-300" onclick="handleMangaAction('edit', ${JSON.stringify(manga)})">
                      <i class="fas fa-edit"></i>
                  </button>
                  <button class="bg-transparent text-black p-2 rounded hover:bg-orange-300" onclick="handleMangaAction('delete', ${manga.manga_id})">
                      <i class="fas fa-trash"></i>
                  </button>
              </td>
          </tr>
      `;
  }).join('');

  // Insert the rows into the table body
  tableBody.innerHTML = rows;
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
