/**
 * https://api.nasa.gov/planetary/apod?api_key=KEQY4tEG5rnX4sC4XhWz3U5tSVcseEovLvtLcJJc
 */
const req = new XMLHttpRequest();

function loadBg(pId) {
    const container = document.getElementById(pId);
    const nav = document.getElementById("nav");
    req.open("GET", "https://api.nasa.gov/planetary/apod?api_key=KEQY4tEG5rnX4sC4XhWz3U5tSVcseEovLvtLcJJc");
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            const parsed = JSON.parse(req.response);
            document.body.style.background = "url('"+parsed.url+"') no-repeat";
            document.body.style.backgroundSize = "cover";
            nav.classList.remove("bg-light");
            nav.style.backgroundColor = "rgba(255,255,255,0.2)";
            console.log(nav);
            const parent = container.parentElement;
            parent.removeChild(container)
            //<i class="fas fa-angle-double-down"></i>
            const scrollIcon = document.createElement("i");
            scrollIcon.classList.add("fas");
            scrollIcon.classList.add("fa-angle-double-down");
            parent.appendChild(scrollIcon);
            scrollIcon.style.color = "white";
            scrollIcon.style.fontSize = "36px";
        }
    }
}