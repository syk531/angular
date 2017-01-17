import {Component, OnInit} from '@angular/core';
import {BookService} from './book.service';
import {Book} from './book';

@Component({
    selector: 'my-book',
    templateUrl: './app/book.component.html',
    styleUrls:["./assets/stylesheets/book.css"],
    providers:[BookService]
})

export class BookComponent implements OnInit { 
    
    showMode:string = 'showBooks';
    book:Book;
    books:Book[];
    
    constructor(private bookService : BookService){
        this.book = new Book('','', 0, '','');
    }
    
    ngOnInit() {
        this.showBooks();
    }
    
    changeShowMode(param){
        this.showMode = param;
    }
    
    showBooks() {
        this.bookService.getBooks().subscribe(
            data => {
                this.books = data.info.books
            },
            error => {
                alert(error.msg)
            },
            () => console.log('finished')
        );
    }
    
    showUpdBook(id) {
        this.bookService.getBook(id).subscribe(
            data => {
                this.book = data.info.book;
                this.changeShowMode('showBook');
            },
            error => {
                alert(error.msg)
            },
            () => console.log('finished')
        );
    }
    
    addBook(f) {
        var me = this;
        this.bookService.addBook(f.value).subscribe(
            data => {
                if(data.success == true) {
                    this.changeShowMode('showBooks');
                    this.showBooks();
                } else {
                    alert('오류' + data.msg);
                }
            },
            error => alert(error.status),
            () => console.log('finished')
        )
    }
    
    updBook(f) {
        var me = this;
        this.bookService.updBook(f.value).subscribe(
            data => {
                if(data.success == true) {
                    this.changeShowMode('showBooks');
                    this.showBooks();
                } else {
                    alert('오류' + data.msg);
                }
            },
            error => alert(error.status),
            () => console.log('finished')
        )
    } 
    
}
