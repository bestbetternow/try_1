import ProductView from "./productView.js";
import CategoryView from "./categoryView.js";
import CookieBanner from "./cookieBanner.js";
import { applyTranslations, toggleLang, getLang } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
    const productView = new ProductView();
    const categoryView = new CategoryView();
    categoryView.setupApp();
    productView.setupApp();

    applyTranslations(getLang());
    const langBtn = document.getElementById("langToggle");
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            toggleLang();
            // Re-render the product list so date columns reformat into the
            // newly active locale.
            productView.sortBySelect(productView.sortSelect.value);
        });
    }

    new CookieBanner().init();
});
