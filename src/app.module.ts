import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST || 'mysql.railway.internal',
      port: +process.env.MYSQLPORT || 3306,
      username: process.env.MYSQLUSER || '*******',
      password: process.env.MYSQLPASSWORD || 'VIHExQHfZvyXRCxCkwZFxntNjaPnOCMX',
      database: process.env.MYSQL_DATABASE || '*******',
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
