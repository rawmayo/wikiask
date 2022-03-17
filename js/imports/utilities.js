export const setSearchBarTop = () => {
  document.querySelector(".search").classList.add("raise-top");
};

export const setClearTextIcon = () => {
  document.querySelector(".search-input").addEventListener("keyup", (e) => {
    if (e.target.value.trim().length > 0) {
      document.querySelector(".button.clear-button").classList.remove("d-none");
      clearTextInput(e.target);
    } else {
      document.querySelector(".button.clear-button").classList.add("d-none");
    }
  });
};

export const setLoader = () => {
  document.querySelector(".loader").classList.toggle("d-flex");
  document.querySelector(".loader").classList.toggle("d-none");
};

export const makeHtml = (
  element = "",
  elementId = "",
  elementClassNames = [],
  attribs = {}
) => {
  const el = document.createElement(element);

  if (elementId.trim().length > 0) {
    el.id = elementId;
  }

  if (elementClassNames.length > 0) {
    elementClassNames.forEach((className) => el.classList.add(className));
  }

  if (Object.keys(attribs).length > 0) {
    Object.keys(attribs).forEach((key, i) => {
      el.setAttribute(key, Object.values(attribs)[i]);
    });
  }

  return el;
};

export const removeOldResults = () => {
  const resultBody = document.querySelector(".search-results");
  document.querySelector(".search-found").classList.add("d-none");

  [...resultBody.children].forEach((child) => {
    if (child.classList.contains("result")) {
      resultBody.removeChild(child);
    }
  });
};

export const toggleSearchCount = (count) => {
  document.querySelector(".search-found").classList.remove("d-none");
  document.querySelector(
    ".result-count"
  ).textContent = `Search found ${count} result(s)`;
};

/**
 * Local functions
 */

const clearTextInput = (input) => {
  document
    .querySelector(".button.clear-button")
    .addEventListener("click", () => {
      input.value = "";
      document.querySelector(".button.clear-button").classList.add("d-none");
      setSearchFocus();
    });
};

const setSearchFocus = () => {
  document.querySelector(".search-input").focus();
};
