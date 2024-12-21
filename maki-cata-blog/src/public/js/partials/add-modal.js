document.addEventListener("DOMContentLoaded", function () {
	// Get the modal and button elements
	const modal = document.getElementById("modal");
	const addButton = document.querySelector(".add-button");
	const closeModal = document.getElementById("closeModal");

	// Function to open the modal
	function openModal() {
		modal.style.display = "block";
	}

	// Function to close the modal
	function closeModalFunc() {
		modal.style.display = "none";
	}

	// Event listener to open the modal when the "add-button" is clicked
	addButton.addEventListener("click", openModal);

	// Event listener to close the modal when the "close" button is clicked
	closeModal.addEventListener("click", closeModalFunc);

	// Close the modal if the user clicks outside the modal content
	window.addEventListener("click", function (event) {
		if (event.target === modal) {
			closeModalFunc();
		}
	});
});
