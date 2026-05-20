import { Body, Controller, Delete, Get, Inject, OnModuleInit, Patch, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('users')
export class UsersController implements OnModuleInit {
    constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

    async onModuleInit() {
        await this.client.connect();
    }

    @Post()
    async create(@Body() userData: any) {
        return firstValueFrom(this.client.send({ cmd: 'createUser' }, userData));
    }

    @Get()
    async findAll() {
        return firstValueFrom(this.client.send({ cmd: 'findAllUsers' }, {}));
    }

    @Get(':id')
    async findOne(id: number) {
        return firstValueFrom(this.client.send({ cmd: 'findOneUser' }, id));
    }  

    @Patch(':id')
    async update(id: number, @Body() userData: any) {
        return firstValueFrom(this.client.send({ cmd: 'updateUser' }, { id, userData }));
    }

    @Delete(':id')
    async remove(id: number) {
        return firstValueFrom(this.client.send({ cmd: 'removeUser' }, id));
    }   
}