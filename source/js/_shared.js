'use strict'
/**
 * Select2Custom
 * */
class Select2Custom {
    constructor({ $select, props = {} }) {
        this.$select = $select;
        this.props = props;
    }
    init() {
        var select2Custom = this;
        return select2Custom.$select.select2({
            theme: "bootstrap-5",
            language: "vi",
            ...select2Custom.props,
        });
    }
}
/**
 * HtmlElement
 * */
class HtmlElement {
    constructor() {
        this.init();
        this.inputMask();
        this.validationStates();
        this.select2Mask();
        this.type = [];
    }
    init() {
    }
    // Định dạng số điện thoại
    phoneMask(max = 11) {
        var num = $(this).val().replace(/\D/g, '');
        $(this).val(
            num.substring(0, 4)
            + (num.length > 4 ? ' ' + num.substring(4, 7) : '')
            + (num.length > 7 ? ' ' + num.substring(7, 9) : '')
            + (num.length > 9 ? ' ' + num.substring(9, 11) : '')
        );
    }
    // Gán mask cho thẻ
    inputMask() {
        $('[type="tel"]').keyup(this.phoneMask);
        $('.numberInt32format').on("change", function () {
            var num = $(this).val() == "" ? 0 : parseInt($(this).val(), 10),
                limit = !$(this).attr("limit") ? "0-max" : $(this).attr("limit"),
                min = parseInt(limit.split("-")[0], 10),
                max = limit.split("-")[1] == "max" ? "max" : parseInt(limit.split("-")[1], 10);
            $(this).val(num);
            if (num <= min) $(this).val(min);
            if (max != "max" && num >= max) {
                $(this).val(max);
            };
        });
        $('.dateformat').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
        $('.datetimeformat').inputmask('datetime', { 'placeholder': 'dd/mm/yyyy hh:mm' });
    }
    select2Mask(parentName) {
        var htmlEl = this,
            $select2 = htmlEl.findByParent(".form-select2", parentName);
        var selec2Custom = new Select2Custom({
            $select: $select2,
            props: {
                dropdownParent: parentName
            }
        }).init();
    }
    // Tìm thẻ qua thẻ cha (thẻ cha có thể null)
    findByParent(childName, parentName = "") {
        if (parentName != "") {
            var $parent = $(parentName);
            return $(`${childName}`, $parent);
        } else {
            return $(`${childName}`);
        }
    };
    // Nhấn vào thẻ span sẽ biến thành thẻ input và ngược lại
    spanToInput(span, className = '', type = 'text') {
        var htmlEl = this,
            text = $(span).text(),
            input = $(`<input type="${type}" class="${className}" value="${text}" />`);
        $(input).blur(function () {
            var span = $(`<span class="${className}" onclick="${htmlEl.spanToInput(span, className, type)}">${$(this).val()}</span>`);
            $(this).replaceWith(span);
        });
        $(span).replaceWith(input);
        input.focus();
    }
    // Gán sự kiện kiểm tra thẻ required
    validationStates(parentName) {
        var htmlEl = this,
            $inputRequired = htmlEl.findByParent("input[required]", parentName),
            $selectRequired = htmlEl.findByParent("select[required]", parentName);
        $inputRequired.on("change", function () {
            htmlEl.inputValidationStates(this, parentName);
        });
        $selectRequired.on("change", function () {
            htmlEl.selectValidationStates(this, parentName);
        });
    }
    // Kiểm tra dữ liệu input trong 1 thẻ cha (thẻ cha có thể null)
    inputValidationStates(el, parentName, feedBack = "Không được để trống",
        activeManual = {
            status: false, isvalid: false
        }) {
        var htmlEl = this;

        var $input = $(el),
            inputName = $input.attr("name"),
            $feedBack = htmlEl.findByParent(`.feedback[for="${inputName}"]`, parentName);
        $feedBack.text(feedBack);
        if (activeManual.status) {
            if (activeManual.isvalid) {
                $input.removeClass("is-invalid").addClass("is-valid");
                $feedBack.hide();
            } else {
                $input.removeClass("is-valid").addClass("is-invalid");
                $input.focus();
                $feedBack.show();
            };
        } else {
            if ($input.val().trim() !== "") {
                $input.removeClass("is-invalid").addClass("is-valid");
                $feedBack.hide();
            } else {
                $input.removeClass("is-valid").addClass("is-invalid");
                $input.focus();
                $feedBack.show();
            };
        };
    }
    // Kiểm tra dữ liệu input trong 1 thẻ cha (thẻ cha có thể null)
    selectValidationStates(el, parentName, feedBack = "Không được để trống",
        activeManual = {
            status: false, isvalid: false
        }) {
        var htmlEl = this;

        var $select = $(el),
            selectName = $select.attr("name"),
            $feedBack = htmlEl.findByParent(`.feedback[for="${selectName}"]`, parentName);
        $feedBack.text(feedBack);
        if (activeManual.status) {
            if (activeManual.isvalid) {
                $select.removeClass("is-invalid").addClass("is-valid");
                $feedBack.hide();
            } else {
                $select.removeClass("is-valid").addClass("is-invalid");
                $select.focus();
                $feedBack.show();
            };
        } else {
            if ($select.val() !== "" && $select.val() !== null) {
                $select.removeClass("is-invalid").addClass("is-valid");
                $feedBack.hide();
            } else {
                $select.removeClass("is-valid").addClass("is-invalid");
                $feedBack.show();
            };
        };
    }
    // Gọi sự kiện kiểm tra các thẻ có gán required => true/false
    activeValidationStates(parentName) {
        var htmlEl = this,
            $inputRequired = htmlEl.findByParent("input[required]", parentName),
            $selectRequired = htmlEl.findByParent("select[required]", parentName);
        // Kích hoạt kiểm tra thẻ
        $inputRequired.trigger("change");
        $selectRequired.trigger("change");
        // Kiểm tra có thẻ nào chưa đủ điều kiện
        var $invalidEl = htmlEl.findByParent("[required].is-invalid", parentName);
        if ($invalidEl.length > 0) {
            return false;
        }
        return true;
    }
    // Mã hóa ký hiệu HTML thành chuỗi
    changeSignToCode(text) {
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    // Mã hóa HTML thành văn bản thuần túy
    changeHTMLtoString(text) {
        return $('<div>').text(text).html();
    }
}
var htmlEl = new HtmlElement();
/**
 * Modal
 * */
class Modal {
    constructor({ name = '', displayStatus = 'show', level = 1 }) {
        this.name = name;
        this.displayStatus = displayStatus;
        this.level = level;

        this.init();
    }
    init() {
        var html = new HtmlElement();
        html.init();
    }
    // Trạng thái hiển thị modal
    display() {
        var modal = this,
            $modal = $(modal.name),
            zIndex_Default = 1050;
        // Làm cho modal-backdrop của modal đè lên modal trước
        $modal.on("shown.bs.modal", function () { // shown.bs.moda: Modal chưa hiển thị
            let $modalBackdrop = $(".modal-backdrop").last();

            if ($modalBackdrop.is(":visible")) {
                $modalBackdrop.css("z-index", zIndex_Default + modal.level)
                $modalBackdrop.attr("for", `${modal.name}`)
            }
        });
        $modal.on("shown.bs.modal", function () { // shown.bs.moda: Modal đã hiển thị
            $modal.css("z-index", zIndex_Default + modal.level + 1);
            // Thêm validation cho thẻ
            htmlEl.validationStates(modal.name);
            htmlEl.select2Mask(modal.name);
        });
        $modal.on("hide.bs.modal", function () { // hide.bs.modal: Modal chưa tắt
        });
        $modal.on("hidden.bs.modal", function () { // hide.bs.modal: Modal đã tắt
            if ($modal.attr("removeBody") == "true") $modal.empty();
        });
        if (modal.displayStatus == "show") {
            $modal.modal("show");
        } else {
            $modal.modal("hide");
        };
    }
}
/**
 * System
 * */
class System {
    constructor() {
        this.modal;
    }
    init() {
        var sys = this;
        // Hiển thị khung chat
        $("#khungchat-active").css({
            "display": "flex"
        })
        // select-input
        var selec2Custom = new Select2Custom({
            $select: $(".form-select2"),
            props: {
                dropdownParent: $("document")
            }
        }).init();
        /**
         * Gia hạn session timeout
         */
        sys.keepSessionAlive();
        /**
         * Mặc định tắt sys.loading()
         */
        sys.loading(false);
    }
    // Giữ cho hệ thống không chết session
    keepSessionAlive() {
        var xhttp = new XMLHttpRequest();

        function sendRequest() {
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Xử lý phản hồi từ máy chủ
                    console.log(this.responseText);
                }
            };
            xhttp.open("GET", "/Home/KeepSessionAlive", true);
            xhttp.send();
        }

        function startPolling() {
            setInterval(function () {
                sendRequest();
            }, 900000);
        }

        startPolling();
    }
    // Kích hoạt trạng thái chọn của sideItem (Modul)
    activePage({ page = null, pageGroup = null }) {
        if (page) {
            $("#page-menu li").removeClass("active");
            if (pageGroup) {
                $(`#page-menu .${pageGroup}`).addClass("active");
                $(`#page-menu .${pageGroup} .${page}`).addClass("active");
            } else {
                $(`#page-menu .${page}`).addClass("active");
            }
        }
    }
    // Trạng thái loading của hệ thống
    loading(stt = true) {
        const $loading = $('#sys-loading');
        stt ? $loading.show() : $loading.hide();
    }
    // Modal hỏi trước khi thực hiện hành động
    confirmDialog({ mess = "", callback = function () { } }) {
        var sys = this;
        $("#confirmdialog-content").html(mess);
        sys.displayModal({
            name: "#confirmdialog",
            level: 100
        })
        // Phải off() rồi mới on() để không bị lặp lại sự kiện nhiều lần
        $("#confirmdialog").find("button[name='yes']").off().on("click", function (e) {
            e.preventDefault();
            callback();
            sys.displayModal({
                name: "#confirmdialog",
                displayStatus: "hide",
                level: 100
            })
        });
    }
    // Thông báo đăng xuất hệ thống
    logoutDialog({ mess = "", callback = function () { } }) {
        var sys = this;
        $("#logoutdialog-content").text(mess);
        sys.displayModal({
            name: "#logoutdialog",
            level: 100
        })
        // Phải off() rồi mới on() để không bị lặp lại sự kiện nhiều lần
        $("#logoutdialog").find("button[name='yes']").off().on("click", function (e) {
            e.preventDefault();
            /*callback();*/
            sys.displayModal({
                name: "#logoutdialog",
                displayStatus: "hide",
                level: 100
            });
            $("btn-logout").trigger("click");
        });
    }
    // Thông báo
    alert({
        oldestFirst = true,
        mess = "Có chút vấn đề: ",
        status = "",
        timeout = 3000,
        node = undefined,
        selector = undefined,
        callback = function () {
        },
        destination = undefined,
        newWindow = false,
        close = false,
        gravity = "toastify-top",
        positionLeft = false,
        position = '',
        avatar = "",
        className = "",
        stopOnFocus = true,
        onClick = function () {
        },
        offset = { x: 0, y: 0 },
        escapeMarkup = true,
        ariaLive = 'polite',
        //style = { background: '' }
    }) {
        let background = "";
        if (status == "success") {
            background = "#198754";
            mess = "✅ " + mess;
        }
        else if (status == "warning") {
            background = "#fd7e14";
            mess = "⚠️ " + mess;
        }
        else if (status == "error") {
            background = "#dc3545";
            mess = "❌ " + mess;
        }
        else {
            background = "#0dcaf0";
            mess = "🗨️ " + mess;
        }

        var toast = Toastify({
            text: mess, duration: timeout, style: { background },
            oldestFirst, node, selector, callback, destination, newWindow, close, gravity, positionLeft, position, avatar, className, stopOnFocus,
            onClick: function () {
                toast.hideToast();
            }, offset, escapeMarkup, ariaLive
        });
        toast.showToast();
    }
    // Kích hoạt trạng thái hiển thị modal
    displayModal({ name = "", displayStatus = "show", level = 1 }) {
        var sys = this;
        sys.modal = new Modal({
            name,
            displayStatus,
            level
        });
        sys.modal.display();
    }
    // Cắt chuỗi
    truncateString(str, length) {
        if (str.length > length) {
            return str.substring(0, length) + ' ...';
        };
        return str;
    }
}
var sys = new System();
sys.init();