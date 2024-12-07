import { DATABASE_CONNECTION, DB_TYPE } from '@/database/db-connection'
import * as schema from '@/drizzle/schema/schema'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

import { EditTextDto } from '../types/admin.dto'

@Injectable()
export class AdminService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: DB_TYPE,
    private readonly jwtService: JwtService,
  ) {}
  async signIn({ login, password }: { login: string; password: string }) {
    const admin = await this.db.query.adminTable.findFirst({
      where: eq(schema.adminTable.login, login),
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

  async getTexts() {
    return await this.db.query.adminTextsTable.findMany({
      orderBy: schema.adminTextsTable.id,
    })
  }

  async editText({ title, text, startDate, endDate }: EditTextDto) {
    console.info({ text })
    await this.db
      .update(schema.adminTextsTable)
      .set({
        text,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      })
      .where(eq(schema.adminTextsTable.title, title))
  }
}
