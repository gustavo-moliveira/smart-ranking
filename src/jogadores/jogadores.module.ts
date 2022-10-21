import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';

@Module({
    imports: [JogadoresModule],
    controllers: [JogadoresController],
    providers: [],
})
export class JogadoresModule {}
