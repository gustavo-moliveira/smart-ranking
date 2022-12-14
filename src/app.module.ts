import { Module } from "@nestjs/common";
import { JogadoresModule } from "./jogadores/jogadores.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot
    ('mongodb+srv://admin:admin@cluster0.ljacmuc.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
      ),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
