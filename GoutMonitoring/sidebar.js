const hideButton = document.querySelector(".hide");
const sidebar = document.querySelector(".side-bar");
const showButton = document.querySelector(".menubut");

hideButton.addEventListener("click", () => {
    sidebar.classList.remove("show");
    sidebar.classList.add("hidden");

    setTimeout(() => {
        showButton.classList.remove("hidden");
    }, 150); 
})

showButton.addEventListener("click", () => {
    showButton.classList.add("hidden"); 
    sidebar.classList.remove("hidden");
    sidebar.classList.add("show");
});