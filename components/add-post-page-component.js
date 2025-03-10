import { renderUploadImageComponent } from "./upload-image-component.js";
import { sanitizeHtml } from "../helpers.js";
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // @TODO: Реализовать страницу добавления поста
    let imageUrl = "";
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="add-post-box"> 
      <div class="upload-image-container"></div>
       <input type="text" id="description-input" class="input" placeholder="Описание поста" />
      <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      if (imageUrl && document.querySelector("#description-input").value) {
        onAddPostClick({
          description: `${sanitizeHtml(document.querySelector("#description-input").value)}`,
          imageUrl: `${imageUrl}`,
        });
      } else {
        alert ('Загрузите изображение и добавьте описание!')
      }
      
    });
  };

  render();
}
