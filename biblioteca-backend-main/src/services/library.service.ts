import { LibraryRepository } from "../repository/library.repository";
import {
    LibraryInputFilterType,
    LibraryInputType,
    LibraryType,
} from "../schemas/library.schema";

export default class LibraryService {
  private libraryRepository: LibraryRepository;

  constructor() {
    this.libraryRepository = new LibraryRepository();
  }

  async create(data: LibraryInputType): Promise<LibraryType> {
    return await this.libraryRepository.create(data);
  }

  async findById(id: string): Promise<LibraryType | null> {
    return await this.libraryRepository.findById(id);
  }

  async findAll(filters: LibraryInputFilterType): Promise<LibraryType[]> {
    return await this.libraryRepository.findAll(filters);
  }

  async update(id: string, data: LibraryInputType): Promise<LibraryType> {
    return await this.libraryRepository.update(id, data);
  }

  async delete(id: string): Promise<LibraryType> {
    return await this.libraryRepository.delete(id);
  }
}
