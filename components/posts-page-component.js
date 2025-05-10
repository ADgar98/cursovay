import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { user, posts, goToPage } from "../index.js";
import { initLikeClick } from "./initLikeClick.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
  // @TODO: реализовать рендер постов из api

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

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
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
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

  const pageContainer = `
  <div class="page-container">
  <div class="header-container"></div>
  <ul class="posts">${appHtml}</ul>
  </div>
  `;

  appEl.innerHTML = pageContainer;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  initLikeClick();
}
