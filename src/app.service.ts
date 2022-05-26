import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class AppService {
    private client = createClient({
        url: 'redis://127.0.0.1:6379'
    });

    constructor() {
        this.client.connect();
    };

    async createCache(key: string, value: any) {
        return await this.client.set(key, JSON.stringify(value)); //return "OK" if success
    };

    async getCache(key: string) {
        const cacheData = this.client.get(key);
        return JSON.parse(await cacheData);
    };

    async deleteCache(key: string | string[]) {
        return await this.client.del(key);
    };
};
