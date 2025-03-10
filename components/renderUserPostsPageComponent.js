import { renderHeaderComponent } from "./header-component.js";
import { user, posts } from "../index.js";
import { initLikeClick } from "./initLikeClick.js";
import { formatDistanceToNow } from "https://esm.sh/date-fns";
import { ru } from "https://esm.sh/date-fns/locale";

export const renderUserPostsPageComponent = ({ appEl }) => {
  const appHtml = posts
    .map((post, index) => {
      let timeAgo = formatDistanceToNow(new Date(post.createdAt), {
        locale: ru,
      });

      let likesNum = post.likes.length;
      const nameOfLikersAndId = post.likes;
      let nameOfLikers = nameOfLikersAndId.map((like) => like.name);
      let showLikers;
      if (likesNum === 0) {
        showLikers = "";
      } else if (likesNum === 1) {
        showLikers = nameOfLikers[0];
      } else {
        showLikers = `${nameOfLikers[0]} и еще ${likesNum - 1}`;
      }

      return `
        <li class="post">
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
        <button data-num="${index}" class="like-button">
          <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${showLikers}</strong>
        </p>
      </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${timeAgo} назад
          </p>
        </li>
     
    `;
    })
    .join("");

  const userProfilPhoto = posts[0].user.imageUrl;
  const userProfilName = posts[0].user.name;

  const userProfil = `
        <img class="user-photo" src="${userProfilPhoto}" alt="">
        <p class="user-name-individual">${userProfilName}</p>
     `;

  const pageContainer = `
      <div class="page-container">
      <div class="header-container"></div>
      <div class="user-profil">${userProfil} </div>
      <ul class="posts">${appHtml}</ul>
      </div>
      `;

  appEl.innerHTML = pageContainer;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  initLikeClick();
};
