import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  create(@Body() createLivroDto: CreateLivroDto) {
    const livro = this.livrosService.create(createLivroDto);
    return { message: 'Livro cadastrado com sucesso', livro };
  }

  @Get()
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    const livro = this.livrosService.update(+id, updateLivroDto);
    return { message: 'Livro atualizado com sucesso', livro };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const livro = this.livrosService.remove(+id);
    return { message: 'Livro deletado com sucesso', livro };
  }
}