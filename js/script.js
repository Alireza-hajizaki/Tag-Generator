const $ = document;
const tagsUlElem = $.querySelector("ul");
const tagInputElem = $.querySelector("input");
const tagsCountSpanElem = $.querySelector(".num-tag");
const removeAllBtn = $.querySelector(".remove-btn");

let tags = [];
let maxTagsCount = 10;

const addTag = (event) => {
  if (event.key === "Enter") {
    let tagTitle = event.target.value;

    if (tags.length < 10 && !tags.includes(tagTitle.toLowerCase())) {
      tagTitle.split(",").forEach((tag) => {
        tags.push(tag.toLowerCase());
      });
    }

    event.target.value = "";
    createTag();
  }
};

const removeAllLis = () => {
  tagsUlElem.querySelectorAll("li").forEach((tag) => tag.remove());
};

const countTags = () => {
  tagInputElem.focus();
  tagsCountSpanElem.innerText = maxTagsCount - tags.length;
};

const removeTag = (tagElem, tagTitle) => {
  let mainTagIndex = tags.indexOf(tagTitle);
  tags.splice(mainTagIndex, 1);

  tagElem.parentElement.remove();

  countTags();
};

const createTag = () => {
  removeAllLis();

  let tagLi = null;

  [...tags].reverse().forEach((tag) => {
    tagLi = `<li>${tag} <i class="uit uit-multiply" onclick="removeTag(this, '${tag}')"></i></li>`;
    tagsUlElem.insertAdjacentHTML("afterbegin", tagLi);
  });

  countTags();
};

createTag();
countTags();

tagInputElem.addEventListener("keyup", addTag);
removeAllBtn.addEventListener("click", () => {
  tags.length = 0;
  removeAllLis();
  countTags();
});
