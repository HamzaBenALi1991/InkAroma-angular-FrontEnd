export class ReviewtypeModule {
    BookScore: number;
    book: string;
    createdAt: any;
    review: string;
    updatedAt: any;
    _id: string;
    user: {
        user: any,
        image: any
    }
    constructor(bookScore: number, book: string, createdAt: any, review: string, updatedAt: any, _id: string, user: {
        user: any,
        image: any
    }) {
        this.BookScore=bookScore , 
        this.book = book ,
        this.createdAt =createdAt ,
        this.updatedAt= updatedAt , 
        this._id = _id , 
        this.user=user ,
        this.review=review

     }
}
