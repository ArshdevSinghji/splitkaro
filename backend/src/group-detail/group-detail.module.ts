import { Module } from '@nestjs/common';
import { GroupDetailService } from './group-detail.service';
import { GroupDetailController } from './group-detail.controller';
import { GroupModule } from 'src/group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupDetail } from './entity/groupDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupDetail]), GroupModule],
  providers: [GroupDetailService],
  controllers: [GroupDetailController],
})
export class GroupDetailModule {}
