import { ShelfRepository } from "../repository/shelf.repository";
import {
  ShelfInputFilterType,
  ShelfInputType,
  ShelfType,
} from "../schemas/shelf.schema";

export default class ShelfService {
  private shelfRepository: ShelfRepository;

  constructor() {
    this.shelfRepository = new ShelfRepository();
  }

  async create(data: ShelfInputType): Promise<ShelfType> {
    return await this.shelfRepository.create(data);
  }

  async findById(id: string): Promise<ShelfType | null> {
    return await this.shelfRepository.findById(id);
  }

  async findAll(filters: ShelfInputFilterType): Promise<ShelfType[]> {
    return await this.shelfRepository.findAll(filters);
  }

  async update(id: string, data: ShelfInputType): Promise<ShelfType> {
    return await this.shelfRepository.update(id, data);
  }

  async delete(id: string): Promise<ShelfType> {
    return await this.shelfRepository.delete(id);
  }
}
