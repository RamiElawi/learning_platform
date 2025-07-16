import { ApiProperty } from "@nestjs/swagger"

export class UserSubjectDto{
    @ApiProperty()
    userId:number
    @ApiProperty()
    subjectId:number
}