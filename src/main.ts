import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from '@config';
import { ValidationPipe } from '@cores/validator/validation.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Authorization Service')
    .setDescription('The authorization service API description')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(configService.getPort(), () => {
    // tslint:disable-next-line:no-console
    console.log('Express server started on port: ' + configService.getPort());
  });
}
bootstrap().then();
