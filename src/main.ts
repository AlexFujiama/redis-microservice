import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as ip from 'ip';
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
    const host = ip.address();
    const port = parseInt(process.env.PORT) || 4000;

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.TCP,
            options: {
                host: "0.0.0.0",
                port: port
            }
        },
    );
    app.listen().then(() => {
        console.log(`\nRunning on host: ${host}`);
        console.log(`Running on port: ${port}\n`);
    });
};
bootstrap();
