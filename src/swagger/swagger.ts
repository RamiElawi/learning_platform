import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_CONFIG } from "./swagger.config";

export const createDocument=(app:INestApplication):OpenAPIObject=>{
    const builder=new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth({
        type:'http',
        scheme:'bearer',
        bearerFormat:'JWT',
        in: 'header'
    },'accessToken')
    .addSecurityRequirements('bearer')
    
    const option=builder.build()
    return SwaggerModule.createDocument(app,option)
}