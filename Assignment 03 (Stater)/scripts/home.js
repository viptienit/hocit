'use strict';
const loginModal = document.querySelector('#login-modal');
const mainContent = document.querySelector('#main-content');
const currentUserKey = 'currentUser';
const welcomeMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

//tạo biến lấy dữ liệu từ mảng currentUserKey
const currentUser = JSON.parse(getFromStorage(currentUserKey));
if (currentUser) {
  //chưa đăng nhập
  loginModal.style.display = 'none';
  mainContent.style.display = 'block';
  welcomeMessage.textContent = `Welcome ${currentUser[0].username}`;
} else {
  //nếu đã đăng nhâp
  loginModal.style.display = 'block';
  mainContent.style.display = 'none';
}
//gán sự kiện nút logout
btnLogout.addEventListener('click', function () {
  localStorage.removeItem(currentUserKey);
  alert('Sign out successfull');
  loginModal.style.display = 'block';
  mainContent.style.display = 'none';
});
