import { ApiProperty } from "@nestjs/swagger";

export class FilterReferanceDto{
    @ApiProperty()
    limit:number;
    @ApiProperty()
    skip:number;
}