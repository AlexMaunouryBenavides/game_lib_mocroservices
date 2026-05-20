import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game as GameModel } from 'generated/prisma/client';
import type { Game } from 'generated/prisma/browser';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('game/:id')
  async getGameById(@Param('id') id: string): Promise<GameModel> {
    const game = await this.gameService.game({ id: Number(id) });
    if (!game) throw new NotFoundException(`Game #${id} not found`);
    return game;
  }

  @Get('games')
  async getGames(): Promise<GameModel[]> {
    return this.gameService.games({});
  }

  @Post('game')
  async createGame(@Body() gameData: Game): Promise<GameModel> {
    return this.gameService.createGame(gameData);
  }

  @Patch('game/:id')
  async updateGame(
    @Param('id') id: string,
    @Body() gameData: Game,
  ): Promise<GameModel> {
    return this.gameService.updateGame({
      where: { id: Number(id) },
      data: gameData,
    });
  }

  @Delete('game/:id')
  async deleteGame(@Param('id') id: string): Promise<GameModel> {
    return this.gameService.deleteGame({ id: Number(id) });
  }
}
