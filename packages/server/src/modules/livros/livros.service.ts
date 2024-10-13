import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivrosService {
  private livros = [];
  private idCounter = 1;

  create(createLivroDto: CreateLivroDto) {
    const newLivro = { id: this.idCounter++, ...createLivroDto };
    this.livros.push(newLivro);
    return newLivro;
  }

  findAll() {
    return this.livros;
  }

  findOne(id: number) {
    const livro = this.livros.find(livro => livro.id === id);
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }
    return livro;
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    const livroIndex = this.livros.findIndex(livro => livro.id === id);
    if (livroIndex === -1) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }
    this.livros[livroIndex] = { ...this.livros[livroIndex], ...updateLivroDto };
    return this.livros[livroIndex];
  }

  remove(id: number) {
    const livroIndex = this.livros.findIndex(livro => livro.id === id);
    if (livroIndex === -1) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado`);
    }
    const removedLivro = this.livros.splice(livroIndex, 1);
    return removedLivro[0];
  }
}