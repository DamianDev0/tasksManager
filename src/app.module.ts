import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST, // leerá 'mysql.railway.internal'
      port: +process.env.MYSQLPORT, // leerá '3306'
      username: process.env.MYSQLUSER, // leerá 'root'
      password: process.env.MYSQLPASSWORD, // leerá 'VIHExQHfZvyXRCxCkwZFxntNjaPnOCMX'
      database: process.env.MYSQL_DATABASE, // leerá 'railway'
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
