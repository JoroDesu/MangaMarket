document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});

function fetchOrders() {
    fetch('https://mangamarket.store/AdminSide/php/fetchOrders.php')
        .then(response => response.json())
        .then(orders => populateOrdersTable(orders))
        .catch(error => console.error('Error fetching orders:', error));
}

function populateOrdersTable(orders) {
    const tableBody = document.querySelector('#orders-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    if (orders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="14" class="text-center py-4">No orders found.</td></tr>`;
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.classList.add('border-t');

        row.innerHTML = `
            <td class="px-4 py-2 text-center">${order.order_id}</td>
            <td class="px-4 py-2 text-center">${order.user_id}</td>
            <td class="px-4 py-2 text-center">${order.manga_id}</td>
            <td class="px-4 py-2 text-center">${order.status}</td>
            <td class="px-4 py-2 text-center">${order.full_name}</td>
            <td class="px-4 py-2 text-center">${order.region}</td>
            <td class="px-4 py-2 text-center">${order.building_number}</td>
            <td class="px-4 py-2 text-center">${order.street_name}</td>
            <td class="px-4 py-2 text-center">${order.city}</td>
            <td class="px-4 py-2 text-center">${order.state}</td>
            <td class="px-4 py-2 text-center">${order.postal_code}</td>
            <td class="px-4 py-2 text-center">${order.phone_number}</td>
            <td class="px-4 py-2 text-center">${order.delivery_instructions || 'N/A'}</td>
            <td class="px-4 py-2 text-center">${order.total_price.toFixed(2)}</td>
        `;

        tableBody.appendChild(row);
    });
}
