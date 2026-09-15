import { IsIn, IsOptional } from "class-validator";

export class FilterTicketsQueryDto {
    @IsOptional()
    @IsIn(['open', 'closed'])
    status: 'open' | 'closed';

    @IsOptional()
    @IsIn(['high', 'medium', 'low'])
    priority: 'high' | 'medium' | 'low';
}


// $ nest g class tickets/dto/filter-tickets-query.dto --no-spec --flat