import prisma from "../database";
import {
    LibraryInputFilterType,
    LibraryInputType,
    LibraryType,
} from "../schemas/library.schema";

export class LibraryRepository {
  async create({ name, cnpj, logo   }: LibraryInputType): Promise<LibraryType> {
    return await prisma.library.create({
      data: {
        name,
        cnpj,
        logo,
      },
    });
  }

  async findById(id: string): Promise<LibraryType | null> {
    return await prisma.library.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(filters: LibraryInputFilterType): Promise<LibraryType[]> {
    return await prisma.library.findMany({
      where: {
        AND: [
          { name: { contains: filters.name } },
          { cnpj: { contains: filters.cnpj } },
        ],
      },
    });
  }

  async update(id: string, { name, cnpj }: LibraryInputType): Promise<LibraryType> {
    return await prisma.library.update({
      where: {
        id,
      },
      data: {
        name,
        cnpj,
      },
    });
  }

  async delete(id: string): Promise<LibraryType> {
    return await prisma.library.delete({
      where: {
        id,
      },
    });
  }
}
