function createGalerryMarkup(carts) {
  return carts
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery__item" target="_self" href="${largeImageURL}>
				    <div class="img-container photo-card">
					<img class="gallery__image" src="${webformatURL}" alt="${tags}" data-image="${largeImageURL}" loading="lazy" />
					<div class="info">
						<p class="info-item">
						<b>${likes}</b>
						</p>
						<p class="info-item">
						<b>${views}</b>
						</p>
						<p class="info-item">
						<b>${comments}</b>
						</p>
						<p class="info-item">
						<b>${downloads}</b>
						</p>
					</div>
				</div></a>`;
      }
    )
    .join('');
}

export { createGalerryMarkup };
