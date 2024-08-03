'use strict';

const inputSearch = document.querySelector('#input-query');
const searchBtn = document.getElementById('btn-submit');
const newsContainer = document.getElementById('news-container');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
let isFetching = false;
class Search {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.page = 1;
    this.maxPage = 1;
    this.newsPerPage = parseInt(localStorage.getItem('newsPerPage') || 10);
    this.newsCategory = localStorage.getItem('newsCategory') || 'business';
    this.pageSize = this.newsPerPage;
  }
  // Cập nhật trang hiện tại và hiển thị tin tức
  async updatePage(page) {
    if (isFetching) {
      console.log('A request is already in progress. Please wait.');
      return;
    }
    isFetching = true;
    this.page = page;
    try {
      // Hiển thị danh sách tin tức mới
      await this.displayNews();
      // Cập nhật pageSize và category dựa trên cài đặt người dùng
      this.pageSize = this.newsPerPage;
      this.category = this.newsCategory;
      // Ẩn hoặc hiển thị nút "Next" dựa trên việc đạt đến giới hạn maxPage
      if (this.page >= this.maxPage) {
        btnNext.style.display = 'none'; // Ẩn nút "Next" khi đạt đến giới hạn maxPage
      } else {
        btnNext.style.display = 'block'; // Hiển thị nút "Next" khi chưa đạt đến giới hạn maxPage
      }
    } catch (error) {
      console.error('Error updating page:', error);
    } finally {
      isFetching = false;
    }
  }
  //tìm kiếm News
  async searchNews() {
    try {
      const searchQuery = inputSearch.value;
      //validate
      if (searchQuery === '') {
        alert('Vui lòng điền thông tin bạn muốn tìm kiếm!');
        return;
      }
      //fetch API
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${this.apiKey}`
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      this.totalResults = data.totalResults;
      this.maxPage = Math.ceil(this.totalResults / this.pageSize);
      return data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
  //hàm hiển thị news
  async displayNews() {
    const articles = await this.searchNews();
    console.log(articles);
    pageNum.textContent = this.page;
    if (articles.length === 0) {
      newsContainer.innerHTML = 'No news available.';
      return [];
    }
    //đặt giới hạn cho bài viết được hiển thị
    const startIndex = (this.page - 1) * this.newsPerPage;
    const endIndex = startIndex + this.newsPerPage;
    const displayedArticles = articles.slice(startIndex, endIndex);
    console.log(displayedArticles.length);
    let newsHTML = '';
    displayedArticles.forEach(article => {
      newsHTML += `
                  <div class="card flex-row flex-wrap">
              <div class="card mb-3" style="">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      src="${
                        article.urlToImage === null
                          ? 'https://t3.ftcdn.net/jpg/05/14/75/82/360_F_514758236_i8rnB85PVdEaK19yGaK0TpaYEYMyxOL5.jpg'
                          : article.urlToImage
                      }"
                      class="card-img"
                      alt="${article.title}"
                    />
                 </div>
                <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${
                    article.description === null
                      ? 'Download content...'
                      : article.description
                  }</p>
  
                  <a href="${article.url}"class="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });
    newsContainer.innerHTML = newsHTML;
    if (this.page == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = 'block';
    }
  }
}

searchBtn.addEventListener('click', async function () {
  // Kiểm tra xem giá trị tìm kiếm có hợp lệ không

  await user.updatePage(user.page);
  //   await user.displayNews();
});
btnPrev.addEventListener('click', async () => {
  await user.updatePage(user.page - 1);
});
btnNext.addEventListener('click', async () => {
  await user.updatePage(user.page + 1);
});
const apiKey = '7150f6cd24ce4069ae6d86f4472cb73a';
const user = new Search(apiKey);
user.displayNews();
// sử dụng những key dưới đây nếu bị lỗi request 429
// key: 0bdb2428ef9c4ecf80b4c531e96a6fa8
// key: 91e721516c2a472e82a654484d616dbc
// key: 8c0061c6ea9448388acda175a6f9ca1d
// key: 7150f6cd24ce4069ae6d86f4472cb73a
