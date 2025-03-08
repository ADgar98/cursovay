import { posts } from "../index.js";
import { likePost } from "../api.js";
import { dislikePost } from "../api.js";
import { getToken } from "../index.js";
import { renderPostsPageComponent } from "./posts-page-component.js";
import { renderUserPostsPageComponent } from "./renderUserPostsPageComponent.js";
import { page } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { USER_POSTS_PAGE } from "../routes.js";

export const initLikeClick = () => {
  const likes = document.querySelectorAll(".like-button");
  for (const like of likes) {
    like.addEventListener("click", () => {
      const indexLike = like.dataset.num;
      console.log(`нажимаю ${indexLike}`);
      // event.stopPropagation()
      const likeObj = posts[indexLike];
      const likeObjId = posts[indexLike].id;
      like.classList.add("-loading-like")

      let userHostId =
        "https://wedev-api.sky.pro/api/v1/prod/instapro/" +
        likeObjId.toString();

      if (likeObj.isLiked) {
        likeObj.isLiked = false;
        dislikePost({ token: getToken(), baseHostId: userHostId }).then(
          (data) => {
            const lastEl = data.post.likes.length - 1
            console.log(lastEl);
            
            const appEl = document.getElementById("app");
            posts[indexLike].likes.shift(data.post.likes[lastEl]);

            if (page === POSTS_PAGE) {
              renderPostsPageComponent({
                appEl,
              });
            } else if (page === USER_POSTS_PAGE) {
              renderUserPostsPageComponent({
                appEl,
              });
            }
          },
        );
      } else {
        likePost({ token: getToken(), baseHostId: userHostId }).then((data) => {
          const lastEl = data.post.likes.length - 1
          const appEl = document.getElementById("app");
          posts[indexLike].likes.unshift(data.post.likes[lastEl]);
          console.log(data.post.likes);

          if (page === POSTS_PAGE) {
            renderPostsPageComponent({
              appEl,
            });
          } else if (page === USER_POSTS_PAGE) {
            renderUserPostsPageComponent({
              appEl,
            });
          }
        });
        likeObj.isLiked = true;
      }
      // console.log(posts);
      
    });
  }
};
