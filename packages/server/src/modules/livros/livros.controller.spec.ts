import { Test, TestingModule } from '@nestjs/testing';
import { LivrosService } from './livros.service';
import { NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

describe('LivrosService', () => {
  let service: LivrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivrosService],
    }).compile();

    service = module.get<LivrosService>(LivrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new livro', () => {
    const createLivroDto: CreateLivroDto = {
      book_id: 1,
      amount: 10,
      book_categoria: 'Ficção',
      book_name: 'Test Livro',
      description: {
        short: 'Descrição curta',
        long: 'Descrição longa'
      }
    };
    const result = service.create(createLivroDto);
    expect(result).toEqual({ ...createLivroDto, id: expect.any(Number) });
  });

  it('should return all livros', () => {
    const createLivroDto: CreateLivroDto = {
      book_id: 1,
      amount: 10,
      book_categoria: 'Ficção',
      book_name: 'Test Livro',
      description: {
        short: 'Descrição curta',
        long: 'Descrição longa'
      }
    };
    service.create(createLivroDto);
    const result = service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ ...createLivroDto, id: expect.any(Number) });
  });

  it('should return a livro by id', () => {
    const createLivroDto: CreateLivroDto = {
      book_id: 1,
      amount: 10,
      book_categoria: 'Ficção',
      book_name: 'Test Livro',
      description: {
        short: 'Descrição curta',
        long: 'Descrição longa'
      }
    };
    const createdLivro = service.create(createLivroDto);
    const result = service.findOne(createdLivro.id);
    expect(result).toEqual(createdLivro);
  });

  it('should throw NotFoundException if livro not found by id', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a livro by id', () => {
    const createLivroDto: CreateLivroDto = {
      book_id: 1,
      amount: 10,
      book_categoria: 'Ficção',
      book_name: 'Test Livro',
      description: {
        short: 'Descrição curta',
        long: 'Descrição longa'
      }
    };
    const createdLivro = service.create(createLivroDto);
    const updateLivroDto: UpdateLivroDto = {
      book_id: 1,
      amount: 20,
      book_categoria: 'Ficção Atualizada',
      book_name: 'Updated Livro',
      description: {
        short: 'Descrição curta atualizada',
        long: 'Descrição longa atualizada'
      }
    };
    const result = service.update(createdLivro.id, updateLivroDto);
    expect(result).toEqual({ ...updateLivroDto, id: createdLivro.id });
  });

  it('should throw NotFoundException if livro to update not found by id', () => {
    const updateLivroDto: UpdateLivroDto = {
      book_id: 1,
      amount: 20,
      book_categoria: 'Ficção Atualizada',
      book_name: 'Updated Livro',
      description: {
        short: 'Descrição curta atualizada',
        long: 'Descrição longa atualizada'
      }
    };
    expect(() => service.update(999, updateLivroDto)).toThrow(NotFoundException);
  });

  it('should remove a livro by id', () => {
    const createLivroDto: CreateLivroDto = {
      book_id: 1,
      amount: 10,
      book_categoria: 'Ficção',
      book_name: 'Test Livro',
      description: {
        short: 'Descrição curta',
        long: 'Descrição longa'
      }
    };
    const createdLivro = service.create(createLivroDto);
    const result = service.remove(createdLivro.id);
    expect(result).toEqual(createdLivro);
  });

  it('should throw NotFoundException if livro to remove not found by id', () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });

  it('should handle empty livros array', () => {
    const result = service.findAll();
    expect(result).toEqual([]);
  });
});