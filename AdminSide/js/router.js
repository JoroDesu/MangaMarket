function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
  }

  // Function to handle active state for navigation links
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', function() {
      // Remove active class from all links
      links.forEach(l => l.classList.remove('active'));
      // Add active class to the clicked link
      this.classList.add('active');
      
      // Change content based on the clicked page
      const page = this.getAttribute('data-page');
      loadContent(page);
    });
  });

  // Function to load content dynamically based on page
  function loadContent(page) {
    const contentDiv = document.getElementById('content');
    let content = '';
    switch(page) {
      case 'dashboard':
        content = '<h2>Welcome to the Dashboard</h2><p>Here you can view key metrics and manage the overall system.</p>';
        break;
      case 'product-management':
        content = '<h2>Product Management</h2><p>Manage your products, update prices, and add new items to the store.</p>';
        break;
      case 'order-management':
        content = '<h2>Order Management</h2><p>View and manage customer orders, track shipping, and update statuses.</p>';
        break;
      case 'customer-management':
        content = '<h2>Customer Management</h2><p>View and manage customer details, interactions, and support requests.</p>';
        break;
      case 'payment-transaction':
        content = '<h2>Payment & Transactions</h2><p>Manage and track payment records and transaction history.</p>';
        break;
      case 'discount-promotion':
        content = '<h2>Discount & Promotion</h2><p>Set up and manage promotions and discounts for customers.</p>';
        break;
      case 'shipping-management':
        content = '<h2>Shipping Management</h2><p>Manage shipping options, rates, and track orders in transit.</p>';
        break;
      case 'cms':
        content = '<h2>Content Management System (CMS)</h2><p>Manage your website content, blog posts, and news updates.</p>';
        break;
      default:
        content = '<h2>Welcome!</h2><p>Select a page from the sidebar to start managing your store.</p>';
    }
    contentDiv.innerHTML = content;
  }

  // Initialize default content for dashboard
  loadContent('dashboard');
