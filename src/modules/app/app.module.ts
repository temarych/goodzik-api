import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { NewsModule } from '@modules/news/news.module';
import { AdminModule } from '@modules/admin/admin.module';
import { GuideModule } from '@modules/guide/guide.module';
import { GuideCategoryModule } from '@modules/guide-category/guide-category.module';
import { GuideStepModule } from '@modules/guide-step/guide-step.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    NewsModule,
    AdminModule,
    GuideModule,
    GuideCategoryModule,
    GuideStepModule,
  ],
})
export class AppModule {}
