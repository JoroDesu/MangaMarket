// Function to toggle between tabs
function showTab(tabName) {
    const accountSection = document.getElementById('accountSection');
    const ordersSection = document.getElementById('ordersSection');

    const myAccountTab = document.getElementById('myAccountTab');
    const myOrdersTab = document.getElementById('myOrdersTab');

    if (tabName === 'account') {
      accountSection.classList.remove('hidden');
      ordersSection.classList.add('hidden');

      myAccountTab.classList.add('bg-blue-500', 'text-white');
      myAccountTab.classList.remove('bg-gray-200', 'text-gray-700');

      myOrdersTab.classList.add('bg-gray-200', 'text-gray-700');
      myOrdersTab.classList.remove('bg-blue-500', 'text-white');
    } else {
      accountSection.classList.add('hidden');
      ordersSection.classList.remove('hidden');

      myOrdersTab.classList.add('bg-blue-500', 'text-white');
      myOrdersTab.classList.remove('bg-gray-200', 'text-gray-700');

      myAccountTab.classList.add('bg-gray-200', 'text-gray-700');
      myAccountTab.classList.remove('bg-blue-500', 'text-white');
    }
  }

  // Default tab
  showTab('account');

  function logout() {
    fetch('https://mangamarket.store/VisitorSide/php/logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                // Redirect to the login page after successful logout
                window.location.href = '/VisitorSide/html/Main_Page.html';
            } else {
                alert('Logout failed. Please try again.');
            }
        })
        .catch((error) => console.error('Error:', error));
}