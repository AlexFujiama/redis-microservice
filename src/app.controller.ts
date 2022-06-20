import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { };

    @MessagePattern("createCache")
    async createCache({appName, key, value}) {
        return await this.appService.createCache(appName, key, value);
    };

    @MessagePattern("getCache")
    async getCache({ appName, key }) {
        return await this.appService.getCache(appName, key);
    };

    @MessagePattern("deleteCache")
    async deleteCache({ appName, key }) {
        return await this.appService.deleteCache(appName, key);
    };

    @MessagePattern("deleteAllKeys")
    async deleteAllKeys(appName: string) {
        return await this.appService.deleteAllKeys(appName);
    };
};
