export async function dangKyTuVan() {
  var modalValidtion = htmlEl.activeValidationStates("#form-dangkytuvan");
  if (modalValidtion) {
    var thongTinNguoiDangKy = {
      thoiGian: localLocale.subtract(10, 'days').calendar(),
      hoTen: $("#input-hoten", $("#form-dangkytuvan")).val(),
      email: $("#input-email", $("#form-dangkytuvan")).val(),
      chuongTrinhHoc: $("#select-chuongtrinhhoc", $("#form-dangkytuvan")).val(),
      noiDung: $("#input-noidung", $("#form-dangkytuvan")).val(),
    };
    main.displayModal_DangKyTuVan('hide');
    sys.alert({
      status: 'success',
      mess: "Đăng ký thành công, VIETGEN sẽ liên hệ với bạn sau ít phút"
    });
    var url = `https://script.google.com/macros/s/AKfycbzLOuZrPRwRkgq_tPQjBXI-gt21rTkd78eOvIxkXl-ZmvYyQVl7hJWyQBGdjjRzNOgA/exec`;
    var res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        "Origin": "http://localhost:3000/"
        // "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(thongTinNguoiDangKy)
    });
    console.log(res.json());
  };
}
