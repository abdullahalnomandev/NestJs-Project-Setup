import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {

    @IsString()
    @IsNotEmpty()
    subject: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsIn(["low", "medium", "high"])
    priority: "low" | "medium" | "high";
}


// $ nest g class tickets/dto/create-ticket.dto --no-spec --flat
// $ npm install class-validator class-transformer

// class-validator= Check if the property is valid.
// class-transformer= Transform the property to the desired type.