import { Body, Controller, Delete, Get, HttpException, Inject, OnModuleInit, Param, Patch, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller('users')
export class UsersController implements OnModuleInit {
    constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

    async onModuleInit() {
        try {
            await this.client.connect();
        } catch (error: any) {
            console.log(error);
        }

    }

    @Post()
    async create(@Body() userData: any) {
        try {
            return await firstValueFrom(this.client.send({ cmd: 'createUser' }, userData));
        } catch (error: any) {
            throw new HttpException(error.message, error.status || 500);
        }
    }

    @Get()
    async findAll() {
        return await firstValueFrom(this.client.send({ cmd: 'findAllUsers' }, {}));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        try {
            return await firstValueFrom(this.client.send({ cmd: 'findOneUser' }, id));
        } catch (error: any) {
            throw new HttpException(error.message, error.status || 500);
        }
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() userData: any) {
        try {
            return await firstValueFrom(this.client.send({ cmd: 'updateUser' }, { id, userData }));
        } catch (error: any) {
            throw new HttpException(error.message, error.status || 500);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return await firstValueFrom(this.client.send({ cmd: 'removeUser' }, id));
        } catch (error: any) {
            throw new HttpException(error.message, error.status || 500);
        }
    }
}