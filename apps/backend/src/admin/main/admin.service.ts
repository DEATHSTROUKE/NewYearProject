import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION, DB_TYPE } from '../../database/db-connection'
import { adminTable } from '../../drizzle/schema/schema'

@Injectable()
export class AdminService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE,
    private readonly jwtService: JwtService,
  ) {}
  async signIn({ login, password }: { login: string; password: string }) {
    const admin = await this.db.query.adminTable.findFirst({
      where: eq(adminTable.login, login),
    })

    if (!admin) {
      throw new Error('Wrong login or password')
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      throw new Error('Wrong login or password')
    }

    const token = this.jwtService.sign({ admin: login })

    return { token }
  }

  create() {
    return 'This action adds a new admin'
  }

  async findAll() {
    return `This action returns all admin`
  }

  async findOne(id: number) {
    return `This action returns a #${id} admin`
  }

  update(id: number) {
    return `This action updates a #${id} admin`
  }

  remove(id: number) {
    return `This action removes a #${id} admin`
  }
}
