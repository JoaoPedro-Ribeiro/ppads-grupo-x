import { Test, TestingModule } from '@nestjs/testing';
import { LivrosService } from './livros.service';
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
      titulo: 'Livro Teste',
      autor: 'Autor Teste',
      ano: 2023,
    };
    const livro = service.create(createLivroDto);
    expect(livro).toEqual({
      id: expect.any(Number),
      ...createLivroDto,
    });
  });

  it('should return all livros', () => {
    const livros = service.findAll();
    expect(livros).toBeInstanceOf(Array);
  });

  it('should return a livro by id', () => {
    const createLivroDto: CreateLivroDto = {
      titulo: 'Livro Teste',
      autor: 'Autor Teste',
      ano: 2023,
    };
    const livro = service.create(createLivroDto);
    const foundLivro = service.findOne(livro.id);
    expect(foundLivro).toEqual(livro);
  });

  it('should update a livro by id', () => {
    const createLivroDto: CreateLivroDto = {
      titulo: 'Livro Teste',
      autor: 'Autor Teste',
      ano: 2023,
    };
    const livro = service.create(createLivroDto);
    const updateLivroDto: UpdateLivroDto = { titulo: 'Livro Atualizado' };
    const updatedLivro = service.update(livro.id, updateLivroDto);
    expect(updatedLivro.titulo).toEqual('Livro Atualizado');
  });

  it('should remove a livro by id', () => {
    const createLivroDto: CreateLivroDto = {
      titulo: 'Livro Teste',
      autor: 'Autor Teste',
      ano: 2023,
    };
    const livro = service.create(createLivroDto);
    const removedLivro = service.remove(livro.id);
    expect(removedLivro).toEqual(livro);
    expect(() => service.findOne(livro.id)).toThrow();
  });
});