import {
  setClearTextIcon,
  setSearchBarTop,
  setLoader,
  makeHtml,
  removeOldResults,
  toggleSearchCount,
} from "./imports/utilities.js";
import { getSearchQuery, processQuery } from "./imports/modules.js";

const getSearchResults = () => {
  setClearTextIcon();
  document
    .querySelector(".search-bar")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!getSearchQuery()) return;

      setLoader();

      removeOldResults();

      const searchQuery = getSearchQuery();

      setSearchBarTop();

      const data = await processQuery(searchQuery, 100);

      if (data.query !== undefined) {
        setLoader();

        toggleSearchCount(Object.values(data.query.pages).length);

        Object.values(data.query.pages).forEach((result) => {
          createResultsHtml(result);
        });
      } else {
        setLoader();

        toggleSearchCount(0);
      }
    });
};

const createResultsHtml = (data) => {
  const { extract, pageid, thumbnail, title, pageimage } = data;

  const searchResult = document.querySelector(".search-results");

  const resultDiv = makeHtml("div", undefined, ["result"]);

  const titleH1 = makeHtml("h1", undefined, ["result-link"]);

  const link = makeHtml("a", undefined, undefined, {
    href: `https://en.wikipedia.org/?curid=${pageid}`,
  });
  link.textContent = title;

  titleH1.appendChild(link);

  resultDiv.appendChild(titleH1);

  const flexDiv = makeHtml("div", undefined, ["result-flex"]);
  if (thumbnail) {
    const img = makeHtml("img", undefined, ["result-img"], {
      src: thumbnail.source,
      alt: pageimage,
    });

    flexDiv.appendChild(img);
  }

  const info = makeHtml("p", undefined, ["result-text"]);
  info.textContent = extract;
  flexDiv.appendChild(info);

  resultDiv.appendChild(flexDiv);

  searchResult.appendChild(resultDiv);
};

const init = () => {
  getSearchResults();
};

// Run init function

init();
