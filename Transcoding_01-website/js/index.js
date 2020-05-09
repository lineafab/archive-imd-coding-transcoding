//scrolltop animation

// Get the id of the <path> element and the length of <path>
var triangle = document.getElementById("triangle");
var length = triangle.getTotalLength();

// The start position of the drawing
triangle.style.strokeDasharray = length;

// Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
triangle.style.strokeDashoffset = length;

// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
window.addEventListener("scroll", myFunction);

function myFunction() {
var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  var draw = length * scrollpercent;

  // Reverse the drawing (when scrolling upwards)
  triangle.style.strokeDashoffset = length - draw;
}



// revisiting abbr tooltip

function showTooltip(tooltipContainer) {
  tooltipContainer.querySelector("[role='tooltip']").classList.remove("hidden");
}

function hideTooltip(tooltipContainer) {
  tooltipContainer.querySelector("[role='tooltip']").classList.add("hidden");
}

const abbrs = Array.from(document.querySelectorAll("abbr[data-tooltip]"));

abbrs.forEach((abbr, index) => {

  // Change abbr element to a link and span
  const tooltipContainer = document.createElement("span");
  tooltipContainer.setAttribute("data-tooltip", "");
  tooltipContainer.innerHTML = `
    <a href="#tt-${index}" aria-describedby="tt-${index}">
      <abbr>${abbr.innerHTML}</abbr>
    </a>
    <span role="tooltip" id="tt-${index}" class="hidden">${abbr.getAttribute("title")}</span>
  `;

  abbr.parentElement.replaceChild(tooltipContainer, abbr);

  tooltipContainer.addEventListener("mouseenter", (e) => showTooltip(tooltipContainer));
  tooltipContainer.addEventListener("mouseleave", (e) => hideTooltip(tooltipContainer));
});

// Set global event listeners

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 9 && e.target.parentElement.hasAttribute("data-tooltip")) {
    showTooltip(e.target.parentElement);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 9 && e.target.parentElement.hasAttribute("data-tooltip")) {
    hideTooltip(e.target.parentElement);
  }
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentElement.hasAttribute("data-tooltip")) {
    showTooltip(e.target.parentElement);
  }
});
