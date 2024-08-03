'use strict';

const inputFirstname = document.querySelector('#input-firstname');
const inputLastname = document.querySelector('#input-lastname');
const inputUsername = document.querySelector('#input-username');
const inputPassword = document.querySelector('#input-password');
const inputPasswordConfirm = document.querySelector('#input-password-confirm');
const btnSubmit = document.querySelector('#btn-submit');

// Tạo mảng lưu trữ thông tin người dùng
let userArray = loadUserArray();
// Hàm tải mảng thông tin người dùng từ local storage
function loadUserArray() {
  const dataStorage = getFromStorage('userArray');
  console.log(JSON.parse(dataStorage));
  return dataStorage ? JSON.parse(dataStorage) : [];
}
// Hàm tạo đối tượng người dùng từ dữ liệu
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}
// Hàm xóa dữ liệu nhập trong các input
const clearData = () => {
  inputFirstname.value = '';
  inputLastname.value = '';
  inputUsername.value = '';
  inputPassword.value = '';
  inputPasswordConfirm.value = '';
};

btnSubmit.addEventListener('click', function () {
  //tạo biến lấy dữ liệu
  const data = {
    firstName: inputFirstname.value,
    lastName: inputLastname.value,
    userName: inputUsername.value,
    password: inputPassword.value,
    confirmPassword: inputPasswordConfirm.value,
  };
  // Kiểm tra và xác thực dữ liệu
  let validate = validateData(data);
  if (validate) {
    userArray.push(data);
    saveToStorage('userArray', JSON.stringify(userArray));
    console.log(userArray);
    clearData();
    window.location.replace('login.html');
  }
});
// Hàm kiểm tra và xác thực dữ liệu người dùng
function validateData(data) {
  if (data.firstName == '') {
    alert('Chưa điền First Name!');
    return false;
  } else if (data.lastName == '') {
    alert('Chưa điền Last Name!');
    return false;
  } else if (data.userName == '') {
    alert('Chưa điền User Name!');
    return false;
  } else if (!(data.password.length > 8)) {
    alert('Password phải nhiều hơn 8 kí tự!');
    return false;
  } else if (!(data.confirmPassword == data.password)) {
    alert('Không khớp!');
    return false;
  }
  //lặp qua mảng userArray kiểm tra xem tên user đã tồn tại chưa
  for (let i = 0; i < userArray.length; i++) {
    if (data.userName == userArray[i].userName) {
      alert('Tên đăng nhập này đã tồn tại!');
      return false;
    }
  }
  return true;
}
