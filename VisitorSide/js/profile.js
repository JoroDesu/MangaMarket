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