import {Injectable} from '@angular/core';
import {Book} from './book';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
    constructor(private http: Http) { }

    getBooks(){
        return this.http.get('/server/showBooks.jsp').map(
            function(res) {
                console.log('1111');
                return res.json();
            }
        );
    }
    
    getBook(id) {
        return this.http.get('/server/showBook.jsp?id=' + id).map(res=>res.json());
    }
    
    addBook(f) {
        let headers = new Headers({'Content-Type':'json/application'});
        var p = [];
        for(var key in f) {
            p.push(key + '=' + encodeURIComponent(f[key]));
        }
        
        var params = p.join('&');
        return this.http.post('/server/addBook.jsp', params, {'headers':headers}).map(res=>res.json());
    }
    
    updBook(f) {
        let headers = new Headers({'Content-Type':'json/application'});
        var p = [];
        for(var key in f) {
            p.push(key + '=' + encodeURIComponent(f[key]));
        }
        
        var params = p.join('&');
        return this.http.post('/server/updBook.jsp', params, {'headers':headers}).map(res=>res.json());
    }
}