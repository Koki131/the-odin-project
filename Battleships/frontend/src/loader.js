const loader = document.querySelector("svg");
const container = document.getElementById("game-container");
const randomizeLink = document.getElementById("randomize-ships");

const showLoader = () => {
    setTimeout(showPage, 2000);
}

const showPage = () => {

    loader.style.display = "none";
    randomizeLink.style.display = "";
    container.style.visibility = "";

}

export default showLoader;