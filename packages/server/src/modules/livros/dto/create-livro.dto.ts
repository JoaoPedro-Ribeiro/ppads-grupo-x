// src/livros/dto/create-livro.dto.ts
export class CreateLivroDto {
    book_id: number;
    amount: number;
    book_categoria: string;
    book_name: string;
    description: {
        short: string;
        long: string;
    };
}