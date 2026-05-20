import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('users')
export class UsersController implements OnModuleInit {
    constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

    async onModuleInit() {
        await this.client.connect();
    }

    @Get()
    async findAll() {
        return firstValueFrom(this.client.send({ cmd: 'findAllUsers' }, {}));
    }

}