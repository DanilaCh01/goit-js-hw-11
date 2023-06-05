function createMarkup(pictures) {
  const markup = pictures.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<a href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" width="350px" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes: </b>${likes}
            </p>
            <p class="info-item">
              <b>Views: </b>${views}
            </p>
            <p class="info-item">
              <b>Comments: </b>${comments}
            </p>
            <p class="info-item">
              <b>Downloads: </b>${downloads}
            </p>
          </div>
        </div>
      </a>`;
    }
  );

  return markup.join('');
}

export { createMarkup };
