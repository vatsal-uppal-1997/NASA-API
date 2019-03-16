const req = new XMLHttpRequest();

/**
 * Function to load background image by fetching NASA's image of the day from :-
 * 
 * https://api.nasa.gov/planetary/apod?api_key=<YOUR_API_KEY_HERE>  
 * 
 * @param {String} bgId id for the div to add the background image to
 * @param {String} pId id of the 'Please Wait While The Background Loads' loading text which gets eventually replaced by scroll arrows
 */
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

/**
 * Utility function to add full width divs to the body with background image set as the provided href param
 * 
 * Format for the div to be added :-
 *      <div class="container-fluid full-height" style="background: url(<HREF>) no-repeat;background-size: cover"></div>
 * 
 * @param {String} href link of the image to set as background of the full width div 
 * @param {HTMLElement} appendTo Element to append the div to (Body here) 
 */
function createDiv(href, appendTo) {
    const div = document.createElement("div");
    appendTo.appendChild(div);
    div.classList.add("container-fluid");
    div.classList.add("full-height");
    div.style.background = "url('"+href+"') no-repeat";
    div.style.backgroundSize = "cover";
}

/**
 * Function to make AJAX calls to the NASA's search API and add received data to the DOM
 * 
 * NASA's search API :-
 *  https://images-api.nasa.gov/search?q=<TO_SEARCH>
 * 
 * @param {String} queryId Id of the input box to fetch user input 
 */
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