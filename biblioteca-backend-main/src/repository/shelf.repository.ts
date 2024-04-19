import prisma from "../database";
import {
  ShelfInputFilterType,
  ShelfInputType,
  ShelfType,
} from "../schemas/shelf.schema";

export class ShelfRepository {
  async create({ name, code, library}: ShelfInputType): Promise<ShelfType> {
    return await prisma.shelf.create({
      data: {
        name,
        code,
        library_id: library.id,
      },
        include: {library:true},

    });
  }

  async findById(id: string): Promise<ShelfType | null> {
    return await prisma.shelf.findUnique({
      where: {
        id,
      },
      include: {library:true},

    });
  }

  async findAll(filters: ShelfInputFilterType): Promise<ShelfType[]> {
    return await prisma.shelf.findMany({
      where: {
        AND: [
          { name: { contains: filters.name } },
          { code: { contains: filters.code } },
        ],
      },
      include: {library:true},

    });
  }

  async update(id: string, { name, code }: ShelfInputType): Promise<ShelfType> {
    return await prisma.shelf.update({
      where: {
        id,
      },
      data: {
        name,
        code,
      },        
      include: {library:true},


    });
  }

  async delete(id: string): Promise<ShelfType> {
    return await prisma.shelf.delete({
      where: {
        id,
      },
      include: {library:true},

    });
  }
}
