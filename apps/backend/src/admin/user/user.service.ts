import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  async findAll() {
    return ['findAll users']
  }
  async findOne(id: number) {
    return 'findAll user'
  }
  async update(id: number, { isLotteryUser }: { isLotteryUser: boolean }) {
    console.info('update user')
  }
}
