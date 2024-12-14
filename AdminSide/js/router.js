document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const content = document.getElementById("content");
  let currentScript = null;
  let cleanupFunctions = {};

  // Retrieve the last visited page from localStorage or default to 'dashboard'
  const savedPage = localStorage.getItem("currentPage") || "dashboard";

  function showLoadingIndicator() {
      content.innerHTML = `
          <div class="flex justify-center items-center h-full">
              <div class="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
              <p class="ml-4 text-gray-600">Loading...</p>
          </div>`;
  }

  function loadContent(page) {
      unloadContent(); // Reset content and states before loading a new page

      showLoadingIndicator(); // Show the loading indicator

      fetch(`html/${page}.html`)
          .then((response) => {
              if (!response.ok) {
                  throw new Error(
                      `Error loading page: ${response.statusText} (status code: ${response.status})`
                  );
              }
              return response.text();
          })
          .then((html) => {
              content.innerHTML = html;
              updateActiveTab(page);
              loadScript(page);
          })
          .catch((error) => {
              content.innerHTML = `<p class=\"text-red-500\">Error: ${error.message}</p>`;
              console.error("Content Load Error:", error);
          });
  }

  function loadScript(page) {
      const script = document.createElement("script");
      script.src = `js/${page}.js`;
      script.onload = () => {
          console.log(`${page}.js loaded successfully`);

          if (typeof init === "function") {
              init(); // Initialize page-specific logic
          }

          if (typeof cleanup === "function") {
              cleanupFunctions[page] = cleanup; // Store cleanup function for the page
          }
      };
      script.onerror = () => {
          console.error(`Failed to load script: src/js/${page}.js`);
      };

      document.body.appendChild(script);
      currentScript = script;
  }

  function unloadContent() {
      if (content) {
          content.innerHTML = ""; // Clear all child elements
      }

      if (currentScript) {
          document.body.removeChild(currentScript);
          currentScript = null;
      }

      Object.keys(cleanupFunctions).forEach((page) => {
          if (typeof cleanupFunctions[page] === "function") {
              cleanupFunctions[page]();
          }
      });

      cleanupFunctions = {}; // Reset cleanup functions

      if (typeof window.cleanup === "function") {
          window.cleanup();
          window.cleanup = null;
      }
  }

  function updateActiveTab(activePage) {
      navLinks.forEach((link) => {
          const page = link.getAttribute("data-page");
          if (page === activePage) {
              link.parentNode.classList.add("active");
          } else {
              link.parentNode.classList.remove("active");
          }
      });
  }

  // Initialize the saved or default page
  loadContent(savedPage);
  updateActiveTab(savedPage);

  navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
          e.preventDefault();

          const page = link.getAttribute("data-page");

          if (!page) {
              console.error("Error: Invalid page attribute.");
              return;
          }

          loadContent(page);
          localStorage.setItem("currentPage", page);
          updateActiveTab(page);
      });
  });
});
