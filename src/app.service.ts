import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class AppService {
    private client = createClient({
        url: 'redis://127.0.0.1:6379'
    });

    constructor() {
        this.client.connect();

        this.deleteAllKeys("*").then(resp => console.log(resp));
    };

    async createCache(appName: string, key: string, value: any) {
        return await this.client.set(`${appName}:${key}`, JSON.stringify(value)); //return "OK" if success
    };

    async getCache(appName: string, key: string) {
        const cacheData = this.client.get(`${appName}:${key}`);
        return JSON.parse(await cacheData);
    };

    async deleteCache(appName: string, key: string) {
        return await this.client.del(`${appName}:${key}`);
    };

    async deleteAllKeys(appName: string) {
        const allKeys = await this.client.keys(appName);

        console.log(allKeys);

        for (let key of allKeys) {
            await this.deleteCache(appName, key);
        };

        return "OK";
    };
};
