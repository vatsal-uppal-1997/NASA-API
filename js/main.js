/**
 * https://api.nasa.gov/planetary/apod?api_key=KEQY4tEG5rnX4sC4XhWz3U5tSVcseEovLvtLcJJc
 */
const req = new XMLHttpRequest();

function loadBg(bgId, pId) {
    const container = document.getElementById(pId);
    const bg = document.getElementById(bgId);
    req.open("GET", "https://api.nasa.gov/planetary/apod?api_key=KEQY4tEG5rnX4sC4XhWz3U5tSVcseEovLvtLcJJc");
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            const parsed = JSON.parse(req.response);
            bg.style.background = "url('"+parsed.url+"') no-repeat";
            bg.style.backgroundSize = "cover";
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

// <div class="container-fluid full-height" style="background: url('https://images-assets.nasa.gov/image/PIA18906/PIA18906~thumb.jpg') no-repeat;background-size: cover">
//     </div>
// https://images-api.nasa.gov/search?q=sun
function createDiv(href, appendTo) {
    const div = document.createElement("div");
    appendTo.appendChild(div);
    div.classList.add("container-fluid");
    div.classList.add("full-height");
    div.style.background = "url('"+href+"') no-repeat";
    div.style.backgroundSize = "cover";
}
function process(queryId) {
    const query = document.getElementById(queryId).value;
    req.open("GET", "https://images-api.nasa.gov/search?q="+query);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            const parsed = JSON.parse(req.response);
            parsed.collection.items.forEach((val) => {
                const href = val.links[0].href;
                createDiv(href, document.body);
            });
        }
    }
    return false;
}