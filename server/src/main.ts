import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from 'app.module';
import {ConfigService} from 'config/config.service';
import compression from 'compression';
import passport from 'passport';
import session from 'express-session';

const initSwagger = (app, config: ConfigService) => {
    if (config.useSwaggerUI) {
        const options = new DocumentBuilder()
            .setTitle('Swagger UI')
            .setDescription('API description')
            .setVersion('1.0')
            .setBasePath(config.apiPrefix)
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('swagger', app, document);
    }
};

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix(config.apiPrefix);

    app.use(
        session({
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    if (config.staticContentPath) {
        app.use(compression());
    }
    if (config.enableCors) {
        app.enableCors({
            credentials: true,
            origin: true
        });
    }

    initSwagger(app, config);

    await app.listen(config.port);
};

bootstrap();
