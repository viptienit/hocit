'use strict';

const newsPerPage = document.querySelector('#input-page-size');
const newsCategory = document.querySelector('#input-category');
const saveBtn = document.getElementById('btn-submit');
// Kiểm tra xem đã có cài đặt trước đó trong localStorage chưa
const saveNewsPerPage = localStorage.getItem('newsPerPage');
const saveNewsCategory = localStorage.getItem('newsCategory');
// Nếu đã có cài đặt, thì hiển thị lên các input
if (saveNewsPerPage) {
  newsPerPage.value = saveNewsPerPage;
}
if (saveNewsCategory) {
  newsCategory.value = saveNewsCategory;
}
//gán sự kiện nút lưu
saveBtn.addEventListener('click', function () {
  // Lấy giá trị từ input
  const selectedNewsPerPage = parseInt(newsPerPage.value);
  const selectedNewsCategory = newsCategory.value;
  // Lưu vào localStorage
  saveToStorage('newsPerPage', selectedNewsPerPage);
  saveToStorage('newsCategory', selectedNewsCategory);
  // Thông báo lưu thành công
  alert('Setting saved successfully.');
});
