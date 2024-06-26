import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { ProfileModule } from './profile/profile.module';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizBankModule } from './quiz-bank/quiz-bank.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { UsergoogleModule } from './usergoogle/usergoogle.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { ChapterModule } from './chapter/chapter.module';
import { UploadModule } from './upload/upload.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường toàn cục cho ứng dụng
    }),
    MongooseModule.forRoot('mongodb+srv://trungkhang223:khangdas123@gnosis.6by2f4q.mongodb.net/Gnosis?retryWrites=true&w=majority'),
    // Thêm tất cả các module khác của bạn vào đây...
    CourseModule,
    LessonModule,
    ProfileModule,
    QuestionModule,
    UserModule,
    QuizModule,
    QuizBankModule,
    ReviewModule,
    AuthModule,
    UsergoogleModule,
    AuthorModule,
    CategoryModule,
    ChapterModule,
    UploadModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
