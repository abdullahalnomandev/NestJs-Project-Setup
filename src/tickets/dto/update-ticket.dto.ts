import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTicketDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    subject?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;


    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(["high", "medium", "low"])
    priority?: "high" | "medium" | "low";
}


// $ next g class tickets/dto/update-ticket.dto --no-spec --flat