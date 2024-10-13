// src/livros/dto/update-livro.dto.ts
export class UpdateLivroDto {
    book_id?: number;
    amount?: number;
    book_categoria?: string;
    book_name?: string;
    description?: {
        short?: string;
        long?: string;
    };
}