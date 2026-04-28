import Storage from "./storage.js";
import { showToast } from "./toast.js";

export default class CategoryView {
    constructor() {
        // variables
        this.ctgTitleInput = document.querySelector("#categoryTitle")
        this.ctgDescInput = document.querySelector("#categoryDescription")
        this.ctgCacelBtn = document.querySelector("#categoryCanelBtn")
        this.ctgAddBtn = document.querySelector("#categoryAddNewBtn")
        this.ctgSelect = document.querySelector("#categoriesSelect")
        // event listeners
        this.ctgAddBtn.addEventListener("click", () => {
            this.addNewCategory()
        })
        this.ctgCacelBtn.addEventListener("click", () => {
            this.ctgTitleInput.value = ' '
            this.ctgDescInput.value = ' '
        })
    }

    setupApp() {
        this.instantCtgUpdate(Storage.getCategories())
    }

    addNewCategory() {
        // Race-condition guard for double-click.
        if (!showToast("Saving…", "info", { key: "addCategory", lockMs: 400 })) return;

        if (this.ctgTitleInput.value.trim().length >= 2) {
            const newCategroy = {
                id: new Date().getTime(),
                title: this.ctgTitleInput.value.trim(),
                description: this.ctgDescInput.value.trim(),
            }
            this.ctgTitleInput.value = ' '
            this.ctgDescInput.value = ' '
            const savedCategories = Storage.getCategories();
            const existedItem = savedCategories.find((c) => c.title === newCategroy.title);
            if (existedItem) {
                existedItem.title = newCategroy.title;
                existedItem.description = newCategroy.description;
                Storage.saveCategories(savedCategories);
                this.instantCtgUpdate(savedCategories);
                showToast("Category description updated", "info");
                return
            } else {
                newCategroy.createdAt = new Date().toISOString();
                savedCategories.push(newCategroy);
            }
            Storage.saveCategories(savedCategories)
            this.instantCtgUpdate(savedCategories)
            showToast("Category added", "success");
        } else {
            showToast("Title must be at least 2 characters", "error");
        }
    }

    instantCtgUpdate(categories) {
        const ctgListTitles = categories.map(obj => obj.title.trim())
        console.log(categories);
        // create option for each category
        this.ctgSelect.innerHTML = ` <option selected value="none">- select category -</option>  `
        ctgListTitles.forEach(option => {
            const newOption = document.createElement("option")
            newOption.value = option;
            newOption.textContent = option;
            // append new created option to select tg
            this.ctgSelect.append(newOption)
        });
    }

}