// Placeholder data for manga
const mangaData = [
  {
    id: 1,
    title: "Manga Title 1",
    author: "Author Name 1",
    genre: "Adventure",
    price: "$19.99",
    cover: "/source/583649164431305.63f68280e2b51.jpg",
    description: "An epic tale of a young hero embarking on a dangerous journey to uncover the truth about their mysterious past.",
  },
  {
    id: 2,
    title: "Manga Title 2",
    author: "Author Name 2",
    genre: "Fantasy",
    price: "$15.99",
    cover: "/source/Horimiya.600.3183213.jpg",
    description: "Dive into a magical realm where myths come to life, and a group of friends must band together to save their world.",
  },
  {
    id: 3,
    title: "Manga Title 3",
    author: "Author Name 3",
    genre: "Sci-Fi",
    price: "$17.99",
    cover: "/source/583649164431305.63f68280e2b51.jpg",
    description: "A futuristic saga of survival and rebellion set in a dystopian society controlled by artificial intelligence.",
  },
  {
    id: 4,
    title: "Manga Title 4",
    author: "Author Name 4",
    genre: "Romance",
    price: "$12.99",
    cover: "/source/583649164431305.63f68280e2b51.jpg",
    description: "A heartwarming story about two star-crossed lovers who must navigate life's challenges to find happiness.",
  },
  {
    id: 5,
    title: "Manga Title 5",
    author: "Author Name 5",
    genre: "Horror",
    price: "$14.99",
    cover: "/source/Horimiya.600.3183213.jpg",
    description: "A chilling series of encounters with the supernatural that will keep you on the edge of your seat.",
  },
  {
    id: 6,
    title: "Manga Title 6",
    author: "Author Name 6",
    genre: "Mystery",
    price: "$18.99",
    cover: "/source/583649164431305.63f68280e2b51.jpg",
    description: "A gripping detective story about a brilliant investigator solving complex crimes in a small town.",
  },
  {
    id: 7,
    title: "Manga Title 7",
    author: "Author Name 7",
    genre: "Comedy",
    price: "$11.99",
    cover: "/source/Horimiya.600.3183213.jpg",
    description: "A lighthearted series following the hilarious misadventures of a quirky group of friends.",
  },
  {
    id: 8,
    title: "Manga Title 8",
    author: "Author Name 8",
    genre: "Drama",
    price: "$16.99",
    cover: "/source/583649164431305.63f68280e2b51.jpg",
    description: "A touching tale of personal growth and resilience, exploring the struggles and triumphs of everyday life.",
  },

];

// Function to populate manga boxes
function populateMangaBoxes() {
  const boxContainer = document.querySelector(".box-container");
  boxContainer.innerHTML = ""; // Clear existing content

  mangaData.forEach((manga) => {
    const mangaBox = `
      <a href="/VisitorSide/html/Descriptions.html" class="manga-box">
        <img src="${manga.cover}" alt="Manga Cover" class="manga-cover">
        <div class="manga-details">
          <h3 class="manga-title">${manga.title}</h3>
          <p class="manga-author">Author: ${manga.author}</p>
          <p class="manga-genre">Genre: ${manga.genre}</p>
          <p class="manga-price">Price: ${manga.price}</p>
        </div>
      </a>
    `;
    boxContainer.innerHTML += mangaBox;
  });
}


// Call the function to populate on page load
populateMangaBoxes();

// Function for the "View Details" button
function viewMangaDetails(title) {
  alert(`View details for: ${title}`);
}

