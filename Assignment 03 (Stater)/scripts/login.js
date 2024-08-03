'use strict';

const inputUserName = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const btnSubmit = document.getElementById('btn-submit');
let userArray = loadUserArray();
function loadUserArray() {
  const dataStorage = getFromStorage('userArray');
  return dataStorage ? JSON.parse(dataStorage) : [];
}

// lấy dữ liệu từ currentUser
let currentUser = loadCurrentUser();
function loadCurrentUser() {
  const dataStorage = getFromStorage('currentUser');
  return dataStorage ? JSON.parse(dataStorage) : [];
}
//gán sự kiện nút đăng nhập
btnSubmit.addEventListener('click', () => {
  const data = {
    username: inputUserName.value,
    password: inputPassword.value,
  };
  let validate = validateData(data);
  //kiểm tra và xác thực thông tin
  if (data.username && data.password) {
    if (validate) {
      currentUser.push(data);
      saveToStorage('currentUser', JSON.stringify(currentUser));
      console.log(currentUser);
      window.location.replace('/index.html');
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không hợp lệ');
    }
  } else {
    alert('Vui lòng điền đủ thông tin');
  }
});
//hàm kiểm tra dữ liệu
function validateData(data) {
  for (let i = 0; i < userArray.length; i++) {
    if (
      userArray[i].userName === data.username &&
      userArray[i].password === data.password
    ) {
      return userArray[i];
    }
  }
  return null;
}
