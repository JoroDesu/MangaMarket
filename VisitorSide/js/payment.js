// Function to open the modal
function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
}

// Function to close the modal
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
