import { IsNumber } from "class-validator";

export class BookDetailsParamsDto {
    @IsNumber()
    id: number;
}
