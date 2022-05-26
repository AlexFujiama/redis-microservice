import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { };

    @MessagePattern("createCache")
    async createCache(key: string, value: any) {
        return await this.appService.createCache(key, value);
    };

    @MessagePattern("getCache")
    async getCache(key: string) {
        return await this.appService.getCache(key);
    };

    @MessagePattern("deleteCache")
    async deleteCache(key: string | string[]) {
        return await this.appService.deleteCache(key);
    };
};
