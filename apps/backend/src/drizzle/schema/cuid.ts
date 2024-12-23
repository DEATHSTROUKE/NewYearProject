import { createId } from '@paralleldrive/cuid2'
import {
  type ColumnBaseConfig,
  type ColumnBuilderBaseConfig,
  type ColumnBuilderRuntimeConfig,
  type HasDefault,
  type MakeColumnConfig,
  entityKind,
} from 'drizzle-orm'
import { type AnyPgTable, PgColumn, PgColumnBuilder } from 'drizzle-orm/pg-core'

export type PgCuid2BuilderInitial<TName extends string> = Omit<
  PgCuid2Builder<{
    name: TName
    dataType: 'string'
    columnType: 'PgCuid2'
    data: string
    driverParam: string
    enumValues: undefined
  }>,
  'default' | '$default' | '$defaultFn'
>

export class PgCuid2Builder<
  T extends ColumnBuilderBaseConfig<'string', 'PgCuid2'>,
> extends PgColumnBuilder<T> {
  static readonly [entityKind]: string = 'PgCuid2Builder'

  constructor(name: string) {
    super(name, 'string', 'PgCuid2')
  }

  build<TTableName extends string>(
    table: AnyPgTable<{ name: TTableName }>,
  ): PgCuid2<MakeColumnConfig<T, TTableName>> {
    return new PgCuid2<MakeColumnConfig<T, TTableName>>(
      table,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
      this.config as ColumnBuilderRuntimeConfig<any, any>,
    )
  }

  /***
   * Creates a random `cuid2` value as the default value for the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   */
  defaultRandom(): HasDefault<this> {
    this.config.defaultFn = () => createId()
    this.config.hasDefault = true
    return this as HasDefault<this>
  }
}

export class PgCuid2<
  T extends ColumnBaseConfig<'string', 'PgCuid2'>,
> extends PgColumn<T> {
  static readonly [entityKind]: string = 'PgCuid2'

  getSQLType(): string {
    return `varchar(32)`
  }
}

export function cuid2<TName extends string>(
  name: TName,
): PgCuid2BuilderInitial<TName> {
  return new PgCuid2Builder(name)
}
