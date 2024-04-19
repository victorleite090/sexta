import { BookRepository } from "../repository/book.repository";
import { ShelfRepository } from "../repository/shelf.repository";
import {
  BookInputFilterType,
  BookInputType,
  BookType,
} from "../schemas/book.schema";

export default class BookService {
  private bookRepository: BookRepository;
  private shelfRepository: ShelfRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.shelfRepository = new ShelfRepository();
  }

  async create(data: BookInputType): Promise<BookType> {
    return await this.bookRepository.create(data);
  }

  async findById(id: string): Promise<BookType | null> {
    return await this.bookRepository.findById(id);
  }

  async findAll(filters: BookInputFilterType): Promise<BookType[]> {
    return await this.bookRepository.findAll(filters);
  }

  async update(id: string, data: BookInputType): Promise<BookType> {
    return await this.bookRepository.update(id, data);
  }

  async delete(id: string): Promise<BookType> {
    return await this.bookRepository.delete(id);
  }
}
