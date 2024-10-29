

document.getElementById("search-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    scrollToMatch();
  }
});


function scrollToMatch() {
  const searchText = document.getElementById("search-input").value.trim().toLowerCase();

  if (!searchText) {
    return; // No search term, do nothing
  }

  const menuPostDescElements = document.querySelectorAll(".menu-post-desc, .malayalam");

  for (const element of menuPostDescElements) {
    const elementText = element.textContent.toLowerCase();

    if (elementText.includes(searchText)) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }
  swal("No Item found !", "");

}