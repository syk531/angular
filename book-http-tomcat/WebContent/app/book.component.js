"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var book_service_1 = require('./book.service');
var book_1 = require('./book');
var BookComponent = (function () {
    function BookComponent(bookService) {
        this.bookService = bookService;
        this.showMode = 'showBooks';
        this.book = new book_1.Book('', '', 0, '', '');
    }
    BookComponent.prototype.ngOnInit = function () {
        this.showBooks();
    };
    BookComponent.prototype.changeShowMode = function (param) {
        this.showMode = param;
    };
    BookComponent.prototype.showBooks = function () {
        var _this = this;
        this.bookService.getBooks().subscribe(function (data) {
            _this.books = data.info.books;
        }, function (error) {
            alert(error.msg);
        }, function () { return console.log('finished'); });
    };
    BookComponent.prototype.showUpdBook = function (id) {
        var _this = this;
        this.bookService.getBook(id).subscribe(function (data) {
            _this.book = data.info.book;
            _this.changeShowMode('showBook');
        }, function (error) {
            alert(error.msg);
        }, function () { return console.log('finished'); });
    };
    BookComponent.prototype.addBook = function (f) {
        var _this = this;
        var me = this;
        this.bookService.addBook(f.value).subscribe(function (data) {
            if (data.success == true) {
                _this.changeShowMode('showBooks');
                _this.showBooks();
            }
            else {
                alert('오류' + data.msg);
            }
        }, function (error) { return alert(error.status); }, function () { return console.log('finished'); });
    };
    BookComponent.prototype.updBook = function (f) {
        var _this = this;
        var me = this;
        this.bookService.updBook(f.value).subscribe(function (data) {
            if (data.success == true) {
                _this.changeShowMode('showBooks');
                _this.showBooks();
            }
            else {
                alert('오류' + data.msg);
            }
        }, function (error) { return alert(error.status); }, function () { return console.log('finished'); });
    };
    BookComponent = __decorate([
        core_1.Component({
            selector: 'my-book',
            templateUrl: './app/book.component.html',
            styleUrls: ["./assets/stylesheets/book.css"],
            providers: [book_service_1.BookService]
        }), 
        __metadata('design:paramtypes', [book_service_1.BookService])
    ], BookComponent);
    return BookComponent;
}());
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map