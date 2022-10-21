import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {CriarJogadorDto} from "./dtos/criar-jogador.dto";
import {Jogador} from "./interfaces/jogador.interface";
import {v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
    async deletarJogador(email): Promise<void> {
        const jogadorEncontrado =  this.jogadores.find(jogador => jogador.email === email);
        this.jogadores = this.jogadores.filter(jogador => jogador.email != jogadorEncontrado.email);
    }
    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado =  this.jogadores.find(jogador => jogador.email === email);
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
        return jogadorEncontrado;

    }
    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);
    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);

        if (jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, criarJogadorDto)
        } else {
            await this.criar(criarJogadorDto);
        }
    }

    private atualizar(jogadorEncontrado : Jogador, criarJogadorDto: CriarJogadorDto): void {
        const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }
    private criar(criarJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criarJogadorDto;
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            email,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jps'
        };
        this.logger.log(`criarJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);
    }
}
