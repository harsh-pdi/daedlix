import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActionService } from '../services/action.service';

@Controller('action')
export class ActionController {
    constructor(private readonly actionService: ActionService) {}

    @Post()
    async createAction(@Body() input: { name: string, audienceUrls: Array<string> }) {
        return await this.actionService.createAction(input);
    }

    @Get(':id')
    async getAction(@Param('id') actionId: string) {
        return await this.actionService.getAction(+actionId);
    }

    @Post(':id/enable-email')
    async enableEmailAction(@Param('id') actionId: string) {
        return await this.actionService.enableEmailAction(+actionId);
    }

    @Post(':id/disable-email')
    async disableEmailAction(@Param('id') actionId: string) {
        return await this.actionService.disableEmailAction(+actionId);
    }
}
