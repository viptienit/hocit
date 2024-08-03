'use strict';

const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const currentUser = JSON.parse(getFromStorage('currentUser'));
const newsContainer = document.getElementById('news-container');
let isFetching = false;
// const maxRequests = 10; // Giới hạn số lần yêu cầu

// 8c0061c6ea9448388acda175a6f9ca1d: mã API
class Username {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://newsapi.org/v2/top-headlines';
    this.country = 'us';
    this.category = 'general'; // Change this to the desired category
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
  //lấy thông tin từ api
  async fetchNews() {
    const url = `${this.apiUrl}?country=${this.country}&category=${this.category}&pageSize=${this.pageSize}&page=${this.page}&apiKey=${this.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.totalResults = data.totalResults;
      this.maxPage = Math.ceil(this.totalResults / this.pageSize);
      return data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
  //hiển thị news mới
  async displayNews() {
    const articles = await this.fetchNews();
    console.log(articles);
    pageNum.textContent = `${this.page}`;
    if (articles.length === 0) {
      newsContainer.innerHTML = 'No news available.';
      return;
    }
    let newsHTML = '';
    articles.forEach(article => {
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
    //thêm bài báo vào container
    newsContainer.innerHTML = newsHTML;
    if (this.page == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = 'block';
    }
    //thêm sự kiện nút previous
    btnPrev.addEventListener('click', async () => {
      await this.updatePage(this.page - 1);
    });
    //thêm sự kiện nút next
    btnNext.addEventListener('click', async () => {
      await this.updatePage(this.page + 1);
    });
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
}

const apiKey = '7150f6cd24ce4069ae6d86f4472cb73a';
// Replace with your actual API Key
const user = new Username(apiKey);
user.displayNews();
// sử dụng những key dưới đây nếu bị lỗi request 429
// key: 0bdb2428ef9c4ecf80b4c531e96a6fa8
// key: 91e721516c2a472e82a654484d616dbc
// key: 8c0061c6ea9448388acda175a6f9ca1d
// key: 7150f6cd24ce4069ae6d86f4472cb73a
