
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model agendamentos
 * 
 */
export type agendamentos = $Result.DefaultSelection<Prisma.$agendamentosPayload>
/**
 * Model clientes
 * 
 */
export type clientes = $Result.DefaultSelection<Prisma.$clientesPayload>
/**
 * Model disponibilidadeprod
 * The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.
 */
export type disponibilidadeprod = $Result.DefaultSelection<Prisma.$disponibilidadeprodPayload>
/**
 * Model funcionarios
 * 
 */
export type funcionarios = $Result.DefaultSelection<Prisma.$funcionariosPayload>
/**
 * Model imagens
 * 
 */
export type imagens = $Result.DefaultSelection<Prisma.$imagensPayload>
/**
 * Model pagamentos
 * 
 */
export type pagamentos = $Result.DefaultSelection<Prisma.$pagamentosPayload>
/**
 * Model produtos
 * 
 */
export type produtos = $Result.DefaultSelection<Prisma.$produtosPayload>
/**
 * Model servicos
 * 
 */
export type servicos = $Result.DefaultSelection<Prisma.$servicosPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const pagamentos_Status: {
  OK: 'OK',
  NOK: 'NOK'
};

export type pagamentos_Status = (typeof pagamentos_Status)[keyof typeof pagamentos_Status]


export const pagamentos_Modalidade: {
  Presencial: 'Presencial',
  Online: 'Online'
};

export type pagamentos_Modalidade = (typeof pagamentos_Modalidade)[keyof typeof pagamentos_Modalidade]


export const funcionarios_Status: {
  Ativo: 'Ativo',
  Inativo: 'Inativo'
};

export type funcionarios_Status = (typeof funcionarios_Status)[keyof typeof funcionarios_Status]


export const agendamentos_Status: {
  Realizado: 'Realizado',
  Confirmado: 'Confirmado',
  Cancelado: 'Cancelado',
  Marcado: 'Marcado'
};

export type agendamentos_Status = (typeof agendamentos_Status)[keyof typeof agendamentos_Status]

}

export type pagamentos_Status = $Enums.pagamentos_Status

export const pagamentos_Status: typeof $Enums.pagamentos_Status

export type pagamentos_Modalidade = $Enums.pagamentos_Modalidade

export const pagamentos_Modalidade: typeof $Enums.pagamentos_Modalidade

export type funcionarios_Status = $Enums.funcionarios_Status

export const funcionarios_Status: typeof $Enums.funcionarios_Status

export type agendamentos_Status = $Enums.agendamentos_Status

export const agendamentos_Status: typeof $Enums.agendamentos_Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agendamentos
 * const agendamentos = await prisma.agendamentos.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agendamentos
   * const agendamentos = await prisma.agendamentos.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agendamentos`: Exposes CRUD operations for the **agendamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agendamentos
    * const agendamentos = await prisma.agendamentos.findMany()
    * ```
    */
  get agendamentos(): Prisma.agendamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clientes`: Exposes CRUD operations for the **clientes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.clientes.findMany()
    * ```
    */
  get clientes(): Prisma.clientesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.disponibilidadeprod`: Exposes CRUD operations for the **disponibilidadeprod** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disponibilidadeprods
    * const disponibilidadeprods = await prisma.disponibilidadeprod.findMany()
    * ```
    */
  get disponibilidadeprod(): Prisma.disponibilidadeprodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.funcionarios`: Exposes CRUD operations for the **funcionarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Funcionarios
    * const funcionarios = await prisma.funcionarios.findMany()
    * ```
    */
  get funcionarios(): Prisma.funcionariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.imagens`: Exposes CRUD operations for the **imagens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Imagens
    * const imagens = await prisma.imagens.findMany()
    * ```
    */
  get imagens(): Prisma.imagensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pagamentos`: Exposes CRUD operations for the **pagamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagamentos
    * const pagamentos = await prisma.pagamentos.findMany()
    * ```
    */
  get pagamentos(): Prisma.pagamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produtos`: Exposes CRUD operations for the **produtos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produtos.findMany()
    * ```
    */
  get produtos(): Prisma.produtosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.servicos`: Exposes CRUD operations for the **servicos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servicos
    * const servicos = await prisma.servicos.findMany()
    * ```
    */
  get servicos(): Prisma.servicosDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    agendamentos: 'agendamentos',
    clientes: 'clientes',
    disponibilidadeprod: 'disponibilidadeprod',
    funcionarios: 'funcionarios',
    imagens: 'imagens',
    pagamentos: 'pagamentos',
    produtos: 'produtos',
    servicos: 'servicos'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agendamentos" | "clientes" | "disponibilidadeprod" | "funcionarios" | "imagens" | "pagamentos" | "produtos" | "servicos"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      agendamentos: {
        payload: Prisma.$agendamentosPayload<ExtArgs>
        fields: Prisma.agendamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agendamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agendamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>
          }
          findFirst: {
            args: Prisma.agendamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agendamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>
          }
          findMany: {
            args: Prisma.agendamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>[]
          }
          create: {
            args: Prisma.agendamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>
          }
          createMany: {
            args: Prisma.agendamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.agendamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>
          }
          update: {
            args: Prisma.agendamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>
          }
          deleteMany: {
            args: Prisma.agendamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agendamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.agendamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agendamentosPayload>
          }
          aggregate: {
            args: Prisma.AgendamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgendamentos>
          }
          groupBy: {
            args: Prisma.agendamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgendamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.agendamentosCountArgs<ExtArgs>
            result: $Utils.Optional<AgendamentosCountAggregateOutputType> | number
          }
        }
      }
      clientes: {
        payload: Prisma.$clientesPayload<ExtArgs>
        fields: Prisma.clientesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.clientesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.clientesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>
          }
          findFirst: {
            args: Prisma.clientesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.clientesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>
          }
          findMany: {
            args: Prisma.clientesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>[]
          }
          create: {
            args: Prisma.clientesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>
          }
          createMany: {
            args: Prisma.clientesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.clientesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>
          }
          update: {
            args: Prisma.clientesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>
          }
          deleteMany: {
            args: Prisma.clientesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.clientesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.clientesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$clientesPayload>
          }
          aggregate: {
            args: Prisma.ClientesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientes>
          }
          groupBy: {
            args: Prisma.clientesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientesGroupByOutputType>[]
          }
          count: {
            args: Prisma.clientesCountArgs<ExtArgs>
            result: $Utils.Optional<ClientesCountAggregateOutputType> | number
          }
        }
      }
      disponibilidadeprod: {
        payload: Prisma.$disponibilidadeprodPayload<ExtArgs>
        fields: Prisma.disponibilidadeprodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.disponibilidadeprodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.disponibilidadeprodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>
          }
          findFirst: {
            args: Prisma.disponibilidadeprodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.disponibilidadeprodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>
          }
          findMany: {
            args: Prisma.disponibilidadeprodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>[]
          }
          create: {
            args: Prisma.disponibilidadeprodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>
          }
          createMany: {
            args: Prisma.disponibilidadeprodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.disponibilidadeprodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>
          }
          update: {
            args: Prisma.disponibilidadeprodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>
          }
          deleteMany: {
            args: Prisma.disponibilidadeprodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.disponibilidadeprodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.disponibilidadeprodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$disponibilidadeprodPayload>
          }
          aggregate: {
            args: Prisma.DisponibilidadeprodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisponibilidadeprod>
          }
          groupBy: {
            args: Prisma.disponibilidadeprodGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisponibilidadeprodGroupByOutputType>[]
          }
          count: {
            args: Prisma.disponibilidadeprodCountArgs<ExtArgs>
            result: $Utils.Optional<DisponibilidadeprodCountAggregateOutputType> | number
          }
        }
      }
      funcionarios: {
        payload: Prisma.$funcionariosPayload<ExtArgs>
        fields: Prisma.funcionariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.funcionariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.funcionariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>
          }
          findFirst: {
            args: Prisma.funcionariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.funcionariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>
          }
          findMany: {
            args: Prisma.funcionariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>[]
          }
          create: {
            args: Prisma.funcionariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>
          }
          createMany: {
            args: Prisma.funcionariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.funcionariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>
          }
          update: {
            args: Prisma.funcionariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>
          }
          deleteMany: {
            args: Prisma.funcionariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.funcionariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.funcionariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$funcionariosPayload>
          }
          aggregate: {
            args: Prisma.FuncionariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuncionarios>
          }
          groupBy: {
            args: Prisma.funcionariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<FuncionariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.funcionariosCountArgs<ExtArgs>
            result: $Utils.Optional<FuncionariosCountAggregateOutputType> | number
          }
        }
      }
      imagens: {
        payload: Prisma.$imagensPayload<ExtArgs>
        fields: Prisma.imagensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.imagensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.imagensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>
          }
          findFirst: {
            args: Prisma.imagensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.imagensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>
          }
          findMany: {
            args: Prisma.imagensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>[]
          }
          create: {
            args: Prisma.imagensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>
          }
          createMany: {
            args: Prisma.imagensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.imagensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>
          }
          update: {
            args: Prisma.imagensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>
          }
          deleteMany: {
            args: Prisma.imagensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.imagensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.imagensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$imagensPayload>
          }
          aggregate: {
            args: Prisma.ImagensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImagens>
          }
          groupBy: {
            args: Prisma.imagensGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImagensGroupByOutputType>[]
          }
          count: {
            args: Prisma.imagensCountArgs<ExtArgs>
            result: $Utils.Optional<ImagensCountAggregateOutputType> | number
          }
        }
      }
      pagamentos: {
        payload: Prisma.$pagamentosPayload<ExtArgs>
        fields: Prisma.pagamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pagamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pagamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>
          }
          findFirst: {
            args: Prisma.pagamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pagamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>
          }
          findMany: {
            args: Prisma.pagamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>[]
          }
          create: {
            args: Prisma.pagamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>
          }
          createMany: {
            args: Prisma.pagamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.pagamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>
          }
          update: {
            args: Prisma.pagamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>
          }
          deleteMany: {
            args: Prisma.pagamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pagamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.pagamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagamentosPayload>
          }
          aggregate: {
            args: Prisma.PagamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePagamentos>
          }
          groupBy: {
            args: Prisma.pagamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.pagamentosCountArgs<ExtArgs>
            result: $Utils.Optional<PagamentosCountAggregateOutputType> | number
          }
        }
      }
      produtos: {
        payload: Prisma.$produtosPayload<ExtArgs>
        fields: Prisma.produtosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.produtosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.produtosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          findFirst: {
            args: Prisma.produtosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.produtosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          findMany: {
            args: Prisma.produtosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>[]
          }
          create: {
            args: Prisma.produtosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          createMany: {
            args: Prisma.produtosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.produtosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          update: {
            args: Prisma.produtosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          deleteMany: {
            args: Prisma.produtosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.produtosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.produtosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$produtosPayload>
          }
          aggregate: {
            args: Prisma.ProdutosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProdutos>
          }
          groupBy: {
            args: Prisma.produtosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutosGroupByOutputType>[]
          }
          count: {
            args: Prisma.produtosCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutosCountAggregateOutputType> | number
          }
        }
      }
      servicos: {
        payload: Prisma.$servicosPayload<ExtArgs>
        fields: Prisma.servicosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.servicosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.servicosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>
          }
          findFirst: {
            args: Prisma.servicosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.servicosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>
          }
          findMany: {
            args: Prisma.servicosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>[]
          }
          create: {
            args: Prisma.servicosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>
          }
          createMany: {
            args: Prisma.servicosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.servicosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>
          }
          update: {
            args: Prisma.servicosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>
          }
          deleteMany: {
            args: Prisma.servicosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.servicosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.servicosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$servicosPayload>
          }
          aggregate: {
            args: Prisma.ServicosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServicos>
          }
          groupBy: {
            args: Prisma.servicosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServicosGroupByOutputType>[]
          }
          count: {
            args: Prisma.servicosCountArgs<ExtArgs>
            result: $Utils.Optional<ServicosCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    agendamentos?: agendamentosOmit
    clientes?: clientesOmit
    disponibilidadeprod?: disponibilidadeprodOmit
    funcionarios?: funcionariosOmit
    imagens?: imagensOmit
    pagamentos?: pagamentosOmit
    produtos?: produtosOmit
    servicos?: servicosOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgendamentosCountOutputType
   */

  export type AgendamentosCountOutputType = {
    pagamentos: number
  }

  export type AgendamentosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pagamentos?: boolean | AgendamentosCountOutputTypeCountPagamentosArgs
  }

  // Custom InputTypes
  /**
   * AgendamentosCountOutputType without action
   */
  export type AgendamentosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgendamentosCountOutputType
     */
    select?: AgendamentosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgendamentosCountOutputType without action
   */
  export type AgendamentosCountOutputTypeCountPagamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagamentosWhereInput
  }


  /**
   * Count Type ClientesCountOutputType
   */

  export type ClientesCountOutputType = {
    agendamentos: number
  }

  export type ClientesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | ClientesCountOutputTypeCountAgendamentosArgs
  }

  // Custom InputTypes
  /**
   * ClientesCountOutputType without action
   */
  export type ClientesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientesCountOutputType
     */
    select?: ClientesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientesCountOutputType without action
   */
  export type ClientesCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agendamentosWhereInput
  }


  /**
   * Count Type FuncionariosCountOutputType
   */

  export type FuncionariosCountOutputType = {
    agendamentos: number
  }

  export type FuncionariosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | FuncionariosCountOutputTypeCountAgendamentosArgs
  }

  // Custom InputTypes
  /**
   * FuncionariosCountOutputType without action
   */
  export type FuncionariosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuncionariosCountOutputType
     */
    select?: FuncionariosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FuncionariosCountOutputType without action
   */
  export type FuncionariosCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agendamentosWhereInput
  }


  /**
   * Count Type ProdutosCountOutputType
   */

  export type ProdutosCountOutputType = {
    disponibilidadeprod: number
    imagens: number
    servicos: number
  }

  export type ProdutosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disponibilidadeprod?: boolean | ProdutosCountOutputTypeCountDisponibilidadeprodArgs
    imagens?: boolean | ProdutosCountOutputTypeCountImagensArgs
    servicos?: boolean | ProdutosCountOutputTypeCountServicosArgs
  }

  // Custom InputTypes
  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutosCountOutputType
     */
    select?: ProdutosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeCountDisponibilidadeprodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: disponibilidadeprodWhereInput
  }

  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeCountImagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: imagensWhereInput
  }

  /**
   * ProdutosCountOutputType without action
   */
  export type ProdutosCountOutputTypeCountServicosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: servicosWhereInput
  }


  /**
   * Count Type ServicosCountOutputType
   */

  export type ServicosCountOutputType = {
    agendamentos: number
    disponibilidadeprod: number
  }

  export type ServicosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | ServicosCountOutputTypeCountAgendamentosArgs
    disponibilidadeprod?: boolean | ServicosCountOutputTypeCountDisponibilidadeprodArgs
  }

  // Custom InputTypes
  /**
   * ServicosCountOutputType without action
   */
  export type ServicosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicosCountOutputType
     */
    select?: ServicosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServicosCountOutputType without action
   */
  export type ServicosCountOutputTypeCountAgendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agendamentosWhereInput
  }

  /**
   * ServicosCountOutputType without action
   */
  export type ServicosCountOutputTypeCountDisponibilidadeprodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: disponibilidadeprodWhereInput
  }


  /**
   * Models
   */

  /**
   * Model agendamentos
   */

  export type AggregateAgendamentos = {
    _count: AgendamentosCountAggregateOutputType | null
    _avg: AgendamentosAvgAggregateOutputType | null
    _sum: AgendamentosSumAggregateOutputType | null
    _min: AgendamentosMinAggregateOutputType | null
    _max: AgendamentosMaxAggregateOutputType | null
  }

  export type AgendamentosAvgAggregateOutputType = {
    Id_Agendamento: number | null
    Id_Servico: number | null
    Id_Cliente: number | null
    Id_Funcionario: number | null
  }

  export type AgendamentosSumAggregateOutputType = {
    Id_Agendamento: number | null
    Id_Servico: number | null
    Id_Cliente: number | null
    Id_Funcionario: number | null
  }

  export type AgendamentosMinAggregateOutputType = {
    Id_Agendamento: number | null
    Id_Servico: number | null
    Id_Cliente: number | null
    Id_Funcionario: number | null
    Data: Date | null
    HoraInicio: Date | null
    HoraFinal: Date | null
    Status: $Enums.agendamentos_Status | null
    Observacoes: string | null
    LembreteEnviado: boolean | null
  }

  export type AgendamentosMaxAggregateOutputType = {
    Id_Agendamento: number | null
    Id_Servico: number | null
    Id_Cliente: number | null
    Id_Funcionario: number | null
    Data: Date | null
    HoraInicio: Date | null
    HoraFinal: Date | null
    Status: $Enums.agendamentos_Status | null
    Observacoes: string | null
    LembreteEnviado: boolean | null
  }

  export type AgendamentosCountAggregateOutputType = {
    Id_Agendamento: number
    Id_Servico: number
    Id_Cliente: number
    Id_Funcionario: number
    Data: number
    HoraInicio: number
    HoraFinal: number
    Status: number
    Observacoes: number
    LembreteEnviado: number
    _all: number
  }


  export type AgendamentosAvgAggregateInputType = {
    Id_Agendamento?: true
    Id_Servico?: true
    Id_Cliente?: true
    Id_Funcionario?: true
  }

  export type AgendamentosSumAggregateInputType = {
    Id_Agendamento?: true
    Id_Servico?: true
    Id_Cliente?: true
    Id_Funcionario?: true
  }

  export type AgendamentosMinAggregateInputType = {
    Id_Agendamento?: true
    Id_Servico?: true
    Id_Cliente?: true
    Id_Funcionario?: true
    Data?: true
    HoraInicio?: true
    HoraFinal?: true
    Status?: true
    Observacoes?: true
    LembreteEnviado?: true
  }

  export type AgendamentosMaxAggregateInputType = {
    Id_Agendamento?: true
    Id_Servico?: true
    Id_Cliente?: true
    Id_Funcionario?: true
    Data?: true
    HoraInicio?: true
    HoraFinal?: true
    Status?: true
    Observacoes?: true
    LembreteEnviado?: true
  }

  export type AgendamentosCountAggregateInputType = {
    Id_Agendamento?: true
    Id_Servico?: true
    Id_Cliente?: true
    Id_Funcionario?: true
    Data?: true
    HoraInicio?: true
    HoraFinal?: true
    Status?: true
    Observacoes?: true
    LembreteEnviado?: true
    _all?: true
  }

  export type AgendamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agendamentos to aggregate.
     */
    where?: agendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agendamentos to fetch.
     */
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agendamentos
    **/
    _count?: true | AgendamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgendamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgendamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgendamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgendamentosMaxAggregateInputType
  }

  export type GetAgendamentosAggregateType<T extends AgendamentosAggregateArgs> = {
        [P in keyof T & keyof AggregateAgendamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgendamentos[P]>
      : GetScalarType<T[P], AggregateAgendamentos[P]>
  }




  export type agendamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agendamentosWhereInput
    orderBy?: agendamentosOrderByWithAggregationInput | agendamentosOrderByWithAggregationInput[]
    by: AgendamentosScalarFieldEnum[] | AgendamentosScalarFieldEnum
    having?: agendamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgendamentosCountAggregateInputType | true
    _avg?: AgendamentosAvgAggregateInputType
    _sum?: AgendamentosSumAggregateInputType
    _min?: AgendamentosMinAggregateInputType
    _max?: AgendamentosMaxAggregateInputType
  }

  export type AgendamentosGroupByOutputType = {
    Id_Agendamento: number
    Id_Servico: number
    Id_Cliente: number
    Id_Funcionario: number | null
    Data: Date | null
    HoraInicio: Date | null
    HoraFinal: Date | null
    Status: $Enums.agendamentos_Status | null
    Observacoes: string | null
    LembreteEnviado: boolean
    _count: AgendamentosCountAggregateOutputType | null
    _avg: AgendamentosAvgAggregateOutputType | null
    _sum: AgendamentosSumAggregateOutputType | null
    _min: AgendamentosMinAggregateOutputType | null
    _max: AgendamentosMaxAggregateOutputType | null
  }

  type GetAgendamentosGroupByPayload<T extends agendamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgendamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgendamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgendamentosGroupByOutputType[P]>
            : GetScalarType<T[P], AgendamentosGroupByOutputType[P]>
        }
      >
    >


  export type agendamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Agendamento?: boolean
    Id_Servico?: boolean
    Id_Cliente?: boolean
    Id_Funcionario?: boolean
    Data?: boolean
    HoraInicio?: boolean
    HoraFinal?: boolean
    Status?: boolean
    Observacoes?: boolean
    LembreteEnviado?: boolean
    servicos?: boolean | servicosDefaultArgs<ExtArgs>
    clientes?: boolean | clientesDefaultArgs<ExtArgs>
    funcionarios?: boolean | agendamentos$funcionariosArgs<ExtArgs>
    pagamentos?: boolean | agendamentos$pagamentosArgs<ExtArgs>
    _count?: boolean | AgendamentosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agendamentos"]>



  export type agendamentosSelectScalar = {
    Id_Agendamento?: boolean
    Id_Servico?: boolean
    Id_Cliente?: boolean
    Id_Funcionario?: boolean
    Data?: boolean
    HoraInicio?: boolean
    HoraFinal?: boolean
    Status?: boolean
    Observacoes?: boolean
    LembreteEnviado?: boolean
  }

  export type agendamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Agendamento" | "Id_Servico" | "Id_Cliente" | "Id_Funcionario" | "Data" | "HoraInicio" | "HoraFinal" | "Status" | "Observacoes" | "LembreteEnviado", ExtArgs["result"]["agendamentos"]>
  export type agendamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    servicos?: boolean | servicosDefaultArgs<ExtArgs>
    clientes?: boolean | clientesDefaultArgs<ExtArgs>
    funcionarios?: boolean | agendamentos$funcionariosArgs<ExtArgs>
    pagamentos?: boolean | agendamentos$pagamentosArgs<ExtArgs>
    _count?: boolean | AgendamentosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $agendamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agendamentos"
    objects: {
      servicos: Prisma.$servicosPayload<ExtArgs>
      clientes: Prisma.$clientesPayload<ExtArgs>
      funcionarios: Prisma.$funcionariosPayload<ExtArgs> | null
      pagamentos: Prisma.$pagamentosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Agendamento: number
      Id_Servico: number
      Id_Cliente: number
      Id_Funcionario: number | null
      Data: Date | null
      HoraInicio: Date | null
      HoraFinal: Date | null
      Status: $Enums.agendamentos_Status | null
      Observacoes: string | null
      LembreteEnviado: boolean
    }, ExtArgs["result"]["agendamentos"]>
    composites: {}
  }

  type agendamentosGetPayload<S extends boolean | null | undefined | agendamentosDefaultArgs> = $Result.GetResult<Prisma.$agendamentosPayload, S>

  type agendamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agendamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgendamentosCountAggregateInputType | true
    }

  export interface agendamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agendamentos'], meta: { name: 'agendamentos' } }
    /**
     * Find zero or one Agendamentos that matches the filter.
     * @param {agendamentosFindUniqueArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agendamentosFindUniqueArgs>(args: SelectSubset<T, agendamentosFindUniqueArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agendamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agendamentosFindUniqueOrThrowArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agendamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, agendamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agendamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agendamentosFindFirstArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agendamentosFindFirstArgs>(args?: SelectSubset<T, agendamentosFindFirstArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agendamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agendamentosFindFirstOrThrowArgs} args - Arguments to find a Agendamentos
     * @example
     * // Get one Agendamentos
     * const agendamentos = await prisma.agendamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agendamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, agendamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agendamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agendamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agendamentos
     * const agendamentos = await prisma.agendamentos.findMany()
     * 
     * // Get first 10 Agendamentos
     * const agendamentos = await prisma.agendamentos.findMany({ take: 10 })
     * 
     * // Only select the `Id_Agendamento`
     * const agendamentosWithId_AgendamentoOnly = await prisma.agendamentos.findMany({ select: { Id_Agendamento: true } })
     * 
     */
    findMany<T extends agendamentosFindManyArgs>(args?: SelectSubset<T, agendamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agendamentos.
     * @param {agendamentosCreateArgs} args - Arguments to create a Agendamentos.
     * @example
     * // Create one Agendamentos
     * const Agendamentos = await prisma.agendamentos.create({
     *   data: {
     *     // ... data to create a Agendamentos
     *   }
     * })
     * 
     */
    create<T extends agendamentosCreateArgs>(args: SelectSubset<T, agendamentosCreateArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agendamentos.
     * @param {agendamentosCreateManyArgs} args - Arguments to create many Agendamentos.
     * @example
     * // Create many Agendamentos
     * const agendamentos = await prisma.agendamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agendamentosCreateManyArgs>(args?: SelectSubset<T, agendamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Agendamentos.
     * @param {agendamentosDeleteArgs} args - Arguments to delete one Agendamentos.
     * @example
     * // Delete one Agendamentos
     * const Agendamentos = await prisma.agendamentos.delete({
     *   where: {
     *     // ... filter to delete one Agendamentos
     *   }
     * })
     * 
     */
    delete<T extends agendamentosDeleteArgs>(args: SelectSubset<T, agendamentosDeleteArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agendamentos.
     * @param {agendamentosUpdateArgs} args - Arguments to update one Agendamentos.
     * @example
     * // Update one Agendamentos
     * const agendamentos = await prisma.agendamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agendamentosUpdateArgs>(args: SelectSubset<T, agendamentosUpdateArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agendamentos.
     * @param {agendamentosDeleteManyArgs} args - Arguments to filter Agendamentos to delete.
     * @example
     * // Delete a few Agendamentos
     * const { count } = await prisma.agendamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agendamentosDeleteManyArgs>(args?: SelectSubset<T, agendamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agendamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agendamentos
     * const agendamentos = await prisma.agendamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agendamentosUpdateManyArgs>(args: SelectSubset<T, agendamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Agendamentos.
     * @param {agendamentosUpsertArgs} args - Arguments to update or create a Agendamentos.
     * @example
     * // Update or create a Agendamentos
     * const agendamentos = await prisma.agendamentos.upsert({
     *   create: {
     *     // ... data to create a Agendamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agendamentos we want to update
     *   }
     * })
     */
    upsert<T extends agendamentosUpsertArgs>(args: SelectSubset<T, agendamentosUpsertArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agendamentosCountArgs} args - Arguments to filter Agendamentos to count.
     * @example
     * // Count the number of Agendamentos
     * const count = await prisma.agendamentos.count({
     *   where: {
     *     // ... the filter for the Agendamentos we want to count
     *   }
     * })
    **/
    count<T extends agendamentosCountArgs>(
      args?: Subset<T, agendamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgendamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgendamentosAggregateArgs>(args: Subset<T, AgendamentosAggregateArgs>): Prisma.PrismaPromise<GetAgendamentosAggregateType<T>>

    /**
     * Group by Agendamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agendamentosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agendamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agendamentosGroupByArgs['orderBy'] }
        : { orderBy?: agendamentosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agendamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgendamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agendamentos model
   */
  readonly fields: agendamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agendamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agendamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    servicos<T extends servicosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, servicosDefaultArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clientes<T extends clientesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, clientesDefaultArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    funcionarios<T extends agendamentos$funcionariosArgs<ExtArgs> = {}>(args?: Subset<T, agendamentos$funcionariosArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pagamentos<T extends agendamentos$pagamentosArgs<ExtArgs> = {}>(args?: Subset<T, agendamentos$pagamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agendamentos model
   */
  interface agendamentosFieldRefs {
    readonly Id_Agendamento: FieldRef<"agendamentos", 'Int'>
    readonly Id_Servico: FieldRef<"agendamentos", 'Int'>
    readonly Id_Cliente: FieldRef<"agendamentos", 'Int'>
    readonly Id_Funcionario: FieldRef<"agendamentos", 'Int'>
    readonly Data: FieldRef<"agendamentos", 'DateTime'>
    readonly HoraInicio: FieldRef<"agendamentos", 'DateTime'>
    readonly HoraFinal: FieldRef<"agendamentos", 'DateTime'>
    readonly Status: FieldRef<"agendamentos", 'agendamentos_Status'>
    readonly Observacoes: FieldRef<"agendamentos", 'String'>
    readonly LembreteEnviado: FieldRef<"agendamentos", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * agendamentos findUnique
   */
  export type agendamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * Filter, which agendamentos to fetch.
     */
    where: agendamentosWhereUniqueInput
  }

  /**
   * agendamentos findUniqueOrThrow
   */
  export type agendamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * Filter, which agendamentos to fetch.
     */
    where: agendamentosWhereUniqueInput
  }

  /**
   * agendamentos findFirst
   */
  export type agendamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * Filter, which agendamentos to fetch.
     */
    where?: agendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agendamentos to fetch.
     */
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agendamentos.
     */
    cursor?: agendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agendamentos.
     */
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * agendamentos findFirstOrThrow
   */
  export type agendamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * Filter, which agendamentos to fetch.
     */
    where?: agendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agendamentos to fetch.
     */
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agendamentos.
     */
    cursor?: agendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agendamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agendamentos.
     */
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * agendamentos findMany
   */
  export type agendamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * Filter, which agendamentos to fetch.
     */
    where?: agendamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agendamentos to fetch.
     */
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agendamentos.
     */
    cursor?: agendamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agendamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agendamentos.
     */
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * agendamentos create
   */
  export type agendamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a agendamentos.
     */
    data: XOR<agendamentosCreateInput, agendamentosUncheckedCreateInput>
  }

  /**
   * agendamentos createMany
   */
  export type agendamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agendamentos.
     */
    data: agendamentosCreateManyInput | agendamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agendamentos update
   */
  export type agendamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a agendamentos.
     */
    data: XOR<agendamentosUpdateInput, agendamentosUncheckedUpdateInput>
    /**
     * Choose, which agendamentos to update.
     */
    where: agendamentosWhereUniqueInput
  }

  /**
   * agendamentos updateMany
   */
  export type agendamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agendamentos.
     */
    data: XOR<agendamentosUpdateManyMutationInput, agendamentosUncheckedUpdateManyInput>
    /**
     * Filter which agendamentos to update
     */
    where?: agendamentosWhereInput
    /**
     * Limit how many agendamentos to update.
     */
    limit?: number
  }

  /**
   * agendamentos upsert
   */
  export type agendamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the agendamentos to update in case it exists.
     */
    where: agendamentosWhereUniqueInput
    /**
     * In case the agendamentos found by the `where` argument doesn't exist, create a new agendamentos with this data.
     */
    create: XOR<agendamentosCreateInput, agendamentosUncheckedCreateInput>
    /**
     * In case the agendamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agendamentosUpdateInput, agendamentosUncheckedUpdateInput>
  }

  /**
   * agendamentos delete
   */
  export type agendamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    /**
     * Filter which agendamentos to delete.
     */
    where: agendamentosWhereUniqueInput
  }

  /**
   * agendamentos deleteMany
   */
  export type agendamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agendamentos to delete
     */
    where?: agendamentosWhereInput
    /**
     * Limit how many agendamentos to delete.
     */
    limit?: number
  }

  /**
   * agendamentos.funcionarios
   */
  export type agendamentos$funcionariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    where?: funcionariosWhereInput
  }

  /**
   * agendamentos.pagamentos
   */
  export type agendamentos$pagamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    where?: pagamentosWhereInput
    orderBy?: pagamentosOrderByWithRelationInput | pagamentosOrderByWithRelationInput[]
    cursor?: pagamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagamentosScalarFieldEnum | PagamentosScalarFieldEnum[]
  }

  /**
   * agendamentos without action
   */
  export type agendamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
  }


  /**
   * Model clientes
   */

  export type AggregateClientes = {
    _count: ClientesCountAggregateOutputType | null
    _avg: ClientesAvgAggregateOutputType | null
    _sum: ClientesSumAggregateOutputType | null
    _min: ClientesMinAggregateOutputType | null
    _max: ClientesMaxAggregateOutputType | null
  }

  export type ClientesAvgAggregateOutputType = {
    Id_Cliente: number | null
    Nif: number | null
  }

  export type ClientesSumAggregateOutputType = {
    Id_Cliente: number | null
    Nif: number | null
  }

  export type ClientesMinAggregateOutputType = {
    Id_Cliente: number | null
    Nome: string | null
    Email: string | null
    Telemovel: string | null
    Senha: string | null
    DataNascimento: Date | null
    Morada: string | null
    Nif: number | null
  }

  export type ClientesMaxAggregateOutputType = {
    Id_Cliente: number | null
    Nome: string | null
    Email: string | null
    Telemovel: string | null
    Senha: string | null
    DataNascimento: Date | null
    Morada: string | null
    Nif: number | null
  }

  export type ClientesCountAggregateOutputType = {
    Id_Cliente: number
    Nome: number
    Email: number
    Telemovel: number
    Senha: number
    DataNascimento: number
    Morada: number
    Nif: number
    _all: number
  }


  export type ClientesAvgAggregateInputType = {
    Id_Cliente?: true
    Nif?: true
  }

  export type ClientesSumAggregateInputType = {
    Id_Cliente?: true
    Nif?: true
  }

  export type ClientesMinAggregateInputType = {
    Id_Cliente?: true
    Nome?: true
    Email?: true
    Telemovel?: true
    Senha?: true
    DataNascimento?: true
    Morada?: true
    Nif?: true
  }

  export type ClientesMaxAggregateInputType = {
    Id_Cliente?: true
    Nome?: true
    Email?: true
    Telemovel?: true
    Senha?: true
    DataNascimento?: true
    Morada?: true
    Nif?: true
  }

  export type ClientesCountAggregateInputType = {
    Id_Cliente?: true
    Nome?: true
    Email?: true
    Telemovel?: true
    Senha?: true
    DataNascimento?: true
    Morada?: true
    Nif?: true
    _all?: true
  }

  export type ClientesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clientes to aggregate.
     */
    where?: clientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientes to fetch.
     */
    orderBy?: clientesOrderByWithRelationInput | clientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: clientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned clientes
    **/
    _count?: true | ClientesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientesMaxAggregateInputType
  }

  export type GetClientesAggregateType<T extends ClientesAggregateArgs> = {
        [P in keyof T & keyof AggregateClientes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientes[P]>
      : GetScalarType<T[P], AggregateClientes[P]>
  }




  export type clientesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: clientesWhereInput
    orderBy?: clientesOrderByWithAggregationInput | clientesOrderByWithAggregationInput[]
    by: ClientesScalarFieldEnum[] | ClientesScalarFieldEnum
    having?: clientesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientesCountAggregateInputType | true
    _avg?: ClientesAvgAggregateInputType
    _sum?: ClientesSumAggregateInputType
    _min?: ClientesMinAggregateInputType
    _max?: ClientesMaxAggregateInputType
  }

  export type ClientesGroupByOutputType = {
    Id_Cliente: number
    Nome: string | null
    Email: string | null
    Telemovel: string | null
    Senha: string | null
    DataNascimento: Date | null
    Morada: string | null
    Nif: number | null
    _count: ClientesCountAggregateOutputType | null
    _avg: ClientesAvgAggregateOutputType | null
    _sum: ClientesSumAggregateOutputType | null
    _min: ClientesMinAggregateOutputType | null
    _max: ClientesMaxAggregateOutputType | null
  }

  type GetClientesGroupByPayload<T extends clientesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientesGroupByOutputType[P]>
            : GetScalarType<T[P], ClientesGroupByOutputType[P]>
        }
      >
    >


  export type clientesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Cliente?: boolean
    Nome?: boolean
    Email?: boolean
    Telemovel?: boolean
    Senha?: boolean
    DataNascimento?: boolean
    Morada?: boolean
    Nif?: boolean
    agendamentos?: boolean | clientes$agendamentosArgs<ExtArgs>
    _count?: boolean | ClientesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientes"]>



  export type clientesSelectScalar = {
    Id_Cliente?: boolean
    Nome?: boolean
    Email?: boolean
    Telemovel?: boolean
    Senha?: boolean
    DataNascimento?: boolean
    Morada?: boolean
    Nif?: boolean
  }

  export type clientesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Cliente" | "Nome" | "Email" | "Telemovel" | "Senha" | "DataNascimento" | "Morada" | "Nif", ExtArgs["result"]["clientes"]>
  export type clientesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | clientes$agendamentosArgs<ExtArgs>
    _count?: boolean | ClientesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $clientesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "clientes"
    objects: {
      agendamentos: Prisma.$agendamentosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Cliente: number
      Nome: string | null
      Email: string | null
      Telemovel: string | null
      Senha: string | null
      DataNascimento: Date | null
      Morada: string | null
      Nif: number | null
    }, ExtArgs["result"]["clientes"]>
    composites: {}
  }

  type clientesGetPayload<S extends boolean | null | undefined | clientesDefaultArgs> = $Result.GetResult<Prisma.$clientesPayload, S>

  type clientesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<clientesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientesCountAggregateInputType | true
    }

  export interface clientesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['clientes'], meta: { name: 'clientes' } }
    /**
     * Find zero or one Clientes that matches the filter.
     * @param {clientesFindUniqueArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends clientesFindUniqueArgs>(args: SelectSubset<T, clientesFindUniqueArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clientes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {clientesFindUniqueOrThrowArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends clientesFindUniqueOrThrowArgs>(args: SelectSubset<T, clientesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientesFindFirstArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends clientesFindFirstArgs>(args?: SelectSubset<T, clientesFindFirstArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clientes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientesFindFirstOrThrowArgs} args - Arguments to find a Clientes
     * @example
     * // Get one Clientes
     * const clientes = await prisma.clientes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends clientesFindFirstOrThrowArgs>(args?: SelectSubset<T, clientesFindFirstOrThrowArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.clientes.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.clientes.findMany({ take: 10 })
     * 
     * // Only select the `Id_Cliente`
     * const clientesWithId_ClienteOnly = await prisma.clientes.findMany({ select: { Id_Cliente: true } })
     * 
     */
    findMany<T extends clientesFindManyArgs>(args?: SelectSubset<T, clientesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clientes.
     * @param {clientesCreateArgs} args - Arguments to create a Clientes.
     * @example
     * // Create one Clientes
     * const Clientes = await prisma.clientes.create({
     *   data: {
     *     // ... data to create a Clientes
     *   }
     * })
     * 
     */
    create<T extends clientesCreateArgs>(args: SelectSubset<T, clientesCreateArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {clientesCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const clientes = await prisma.clientes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends clientesCreateManyArgs>(args?: SelectSubset<T, clientesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Clientes.
     * @param {clientesDeleteArgs} args - Arguments to delete one Clientes.
     * @example
     * // Delete one Clientes
     * const Clientes = await prisma.clientes.delete({
     *   where: {
     *     // ... filter to delete one Clientes
     *   }
     * })
     * 
     */
    delete<T extends clientesDeleteArgs>(args: SelectSubset<T, clientesDeleteArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clientes.
     * @param {clientesUpdateArgs} args - Arguments to update one Clientes.
     * @example
     * // Update one Clientes
     * const clientes = await prisma.clientes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends clientesUpdateArgs>(args: SelectSubset<T, clientesUpdateArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {clientesDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.clientes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends clientesDeleteManyArgs>(args?: SelectSubset<T, clientesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const clientes = await prisma.clientes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends clientesUpdateManyArgs>(args: SelectSubset<T, clientesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Clientes.
     * @param {clientesUpsertArgs} args - Arguments to update or create a Clientes.
     * @example
     * // Update or create a Clientes
     * const clientes = await prisma.clientes.upsert({
     *   create: {
     *     // ... data to create a Clientes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clientes we want to update
     *   }
     * })
     */
    upsert<T extends clientesUpsertArgs>(args: SelectSubset<T, clientesUpsertArgs<ExtArgs>>): Prisma__clientesClient<$Result.GetResult<Prisma.$clientesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientesCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.clientes.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends clientesCountArgs>(
      args?: Subset<T, clientesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientesAggregateArgs>(args: Subset<T, ClientesAggregateArgs>): Prisma.PrismaPromise<GetClientesAggregateType<T>>

    /**
     * Group by Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clientesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends clientesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: clientesGroupByArgs['orderBy'] }
        : { orderBy?: clientesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, clientesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the clientes model
   */
  readonly fields: clientesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for clientes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__clientesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends clientes$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, clientes$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the clientes model
   */
  interface clientesFieldRefs {
    readonly Id_Cliente: FieldRef<"clientes", 'Int'>
    readonly Nome: FieldRef<"clientes", 'String'>
    readonly Email: FieldRef<"clientes", 'String'>
    readonly Telemovel: FieldRef<"clientes", 'String'>
    readonly Senha: FieldRef<"clientes", 'String'>
    readonly DataNascimento: FieldRef<"clientes", 'DateTime'>
    readonly Morada: FieldRef<"clientes", 'String'>
    readonly Nif: FieldRef<"clientes", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * clientes findUnique
   */
  export type clientesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * Filter, which clientes to fetch.
     */
    where: clientesWhereUniqueInput
  }

  /**
   * clientes findUniqueOrThrow
   */
  export type clientesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * Filter, which clientes to fetch.
     */
    where: clientesWhereUniqueInput
  }

  /**
   * clientes findFirst
   */
  export type clientesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * Filter, which clientes to fetch.
     */
    where?: clientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientes to fetch.
     */
    orderBy?: clientesOrderByWithRelationInput | clientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clientes.
     */
    cursor?: clientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clientes.
     */
    distinct?: ClientesScalarFieldEnum | ClientesScalarFieldEnum[]
  }

  /**
   * clientes findFirstOrThrow
   */
  export type clientesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * Filter, which clientes to fetch.
     */
    where?: clientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientes to fetch.
     */
    orderBy?: clientesOrderByWithRelationInput | clientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clientes.
     */
    cursor?: clientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clientes.
     */
    distinct?: ClientesScalarFieldEnum | ClientesScalarFieldEnum[]
  }

  /**
   * clientes findMany
   */
  export type clientesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * Filter, which clientes to fetch.
     */
    where?: clientesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clientes to fetch.
     */
    orderBy?: clientesOrderByWithRelationInput | clientesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing clientes.
     */
    cursor?: clientesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clientes.
     */
    skip?: number
    distinct?: ClientesScalarFieldEnum | ClientesScalarFieldEnum[]
  }

  /**
   * clientes create
   */
  export type clientesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * The data needed to create a clientes.
     */
    data?: XOR<clientesCreateInput, clientesUncheckedCreateInput>
  }

  /**
   * clientes createMany
   */
  export type clientesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many clientes.
     */
    data: clientesCreateManyInput | clientesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * clientes update
   */
  export type clientesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * The data needed to update a clientes.
     */
    data: XOR<clientesUpdateInput, clientesUncheckedUpdateInput>
    /**
     * Choose, which clientes to update.
     */
    where: clientesWhereUniqueInput
  }

  /**
   * clientes updateMany
   */
  export type clientesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update clientes.
     */
    data: XOR<clientesUpdateManyMutationInput, clientesUncheckedUpdateManyInput>
    /**
     * Filter which clientes to update
     */
    where?: clientesWhereInput
    /**
     * Limit how many clientes to update.
     */
    limit?: number
  }

  /**
   * clientes upsert
   */
  export type clientesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * The filter to search for the clientes to update in case it exists.
     */
    where: clientesWhereUniqueInput
    /**
     * In case the clientes found by the `where` argument doesn't exist, create a new clientes with this data.
     */
    create: XOR<clientesCreateInput, clientesUncheckedCreateInput>
    /**
     * In case the clientes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<clientesUpdateInput, clientesUncheckedUpdateInput>
  }

  /**
   * clientes delete
   */
  export type clientesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
    /**
     * Filter which clientes to delete.
     */
    where: clientesWhereUniqueInput
  }

  /**
   * clientes deleteMany
   */
  export type clientesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which clientes to delete
     */
    where?: clientesWhereInput
    /**
     * Limit how many clientes to delete.
     */
    limit?: number
  }

  /**
   * clientes.agendamentos
   */
  export type clientes$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    where?: agendamentosWhereInput
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    cursor?: agendamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * clientes without action
   */
  export type clientesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clientes
     */
    select?: clientesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the clientes
     */
    omit?: clientesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: clientesInclude<ExtArgs> | null
  }


  /**
   * Model disponibilidadeprod
   */

  export type AggregateDisponibilidadeprod = {
    _count: DisponibilidadeprodCountAggregateOutputType | null
    _avg: DisponibilidadeprodAvgAggregateOutputType | null
    _sum: DisponibilidadeprodSumAggregateOutputType | null
    _min: DisponibilidadeprodMinAggregateOutputType | null
    _max: DisponibilidadeprodMaxAggregateOutputType | null
  }

  export type DisponibilidadeprodAvgAggregateOutputType = {
    Id_Disponibilidade: number | null
    Id_Produto: number | null
    Id_Servico: number | null
  }

  export type DisponibilidadeprodSumAggregateOutputType = {
    Id_Disponibilidade: number | null
    Id_Produto: number | null
    Id_Servico: number | null
  }

  export type DisponibilidadeprodMinAggregateOutputType = {
    Id_Disponibilidade: number | null
    Id_Produto: number | null
    Id_Servico: number | null
  }

  export type DisponibilidadeprodMaxAggregateOutputType = {
    Id_Disponibilidade: number | null
    Id_Produto: number | null
    Id_Servico: number | null
  }

  export type DisponibilidadeprodCountAggregateOutputType = {
    Id_Disponibilidade: number
    Id_Produto: number
    Id_Servico: number
    _all: number
  }


  export type DisponibilidadeprodAvgAggregateInputType = {
    Id_Disponibilidade?: true
    Id_Produto?: true
    Id_Servico?: true
  }

  export type DisponibilidadeprodSumAggregateInputType = {
    Id_Disponibilidade?: true
    Id_Produto?: true
    Id_Servico?: true
  }

  export type DisponibilidadeprodMinAggregateInputType = {
    Id_Disponibilidade?: true
    Id_Produto?: true
    Id_Servico?: true
  }

  export type DisponibilidadeprodMaxAggregateInputType = {
    Id_Disponibilidade?: true
    Id_Produto?: true
    Id_Servico?: true
  }

  export type DisponibilidadeprodCountAggregateInputType = {
    Id_Disponibilidade?: true
    Id_Produto?: true
    Id_Servico?: true
    _all?: true
  }

  export type DisponibilidadeprodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which disponibilidadeprod to aggregate.
     */
    where?: disponibilidadeprodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of disponibilidadeprods to fetch.
     */
    orderBy?: disponibilidadeprodOrderByWithRelationInput | disponibilidadeprodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: disponibilidadeprodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` disponibilidadeprods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` disponibilidadeprods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned disponibilidadeprods
    **/
    _count?: true | DisponibilidadeprodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DisponibilidadeprodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DisponibilidadeprodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisponibilidadeprodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisponibilidadeprodMaxAggregateInputType
  }

  export type GetDisponibilidadeprodAggregateType<T extends DisponibilidadeprodAggregateArgs> = {
        [P in keyof T & keyof AggregateDisponibilidadeprod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisponibilidadeprod[P]>
      : GetScalarType<T[P], AggregateDisponibilidadeprod[P]>
  }




  export type disponibilidadeprodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: disponibilidadeprodWhereInput
    orderBy?: disponibilidadeprodOrderByWithAggregationInput | disponibilidadeprodOrderByWithAggregationInput[]
    by: DisponibilidadeprodScalarFieldEnum[] | DisponibilidadeprodScalarFieldEnum
    having?: disponibilidadeprodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisponibilidadeprodCountAggregateInputType | true
    _avg?: DisponibilidadeprodAvgAggregateInputType
    _sum?: DisponibilidadeprodSumAggregateInputType
    _min?: DisponibilidadeprodMinAggregateInputType
    _max?: DisponibilidadeprodMaxAggregateInputType
  }

  export type DisponibilidadeprodGroupByOutputType = {
    Id_Disponibilidade: number
    Id_Produto: number
    Id_Servico: number
    _count: DisponibilidadeprodCountAggregateOutputType | null
    _avg: DisponibilidadeprodAvgAggregateOutputType | null
    _sum: DisponibilidadeprodSumAggregateOutputType | null
    _min: DisponibilidadeprodMinAggregateOutputType | null
    _max: DisponibilidadeprodMaxAggregateOutputType | null
  }

  type GetDisponibilidadeprodGroupByPayload<T extends disponibilidadeprodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisponibilidadeprodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisponibilidadeprodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisponibilidadeprodGroupByOutputType[P]>
            : GetScalarType<T[P], DisponibilidadeprodGroupByOutputType[P]>
        }
      >
    >


  export type disponibilidadeprodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Disponibilidade?: boolean
    Id_Produto?: boolean
    Id_Servico?: boolean
    produtos?: boolean | produtosDefaultArgs<ExtArgs>
    servicos?: boolean | servicosDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disponibilidadeprod"]>



  export type disponibilidadeprodSelectScalar = {
    Id_Disponibilidade?: boolean
    Id_Produto?: boolean
    Id_Servico?: boolean
  }

  export type disponibilidadeprodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Disponibilidade" | "Id_Produto" | "Id_Servico", ExtArgs["result"]["disponibilidadeprod"]>
  export type disponibilidadeprodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | produtosDefaultArgs<ExtArgs>
    servicos?: boolean | servicosDefaultArgs<ExtArgs>
  }

  export type $disponibilidadeprodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "disponibilidadeprod"
    objects: {
      produtos: Prisma.$produtosPayload<ExtArgs>
      servicos: Prisma.$servicosPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Disponibilidade: number
      Id_Produto: number
      Id_Servico: number
    }, ExtArgs["result"]["disponibilidadeprod"]>
    composites: {}
  }

  type disponibilidadeprodGetPayload<S extends boolean | null | undefined | disponibilidadeprodDefaultArgs> = $Result.GetResult<Prisma.$disponibilidadeprodPayload, S>

  type disponibilidadeprodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<disponibilidadeprodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DisponibilidadeprodCountAggregateInputType | true
    }

  export interface disponibilidadeprodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['disponibilidadeprod'], meta: { name: 'disponibilidadeprod' } }
    /**
     * Find zero or one Disponibilidadeprod that matches the filter.
     * @param {disponibilidadeprodFindUniqueArgs} args - Arguments to find a Disponibilidadeprod
     * @example
     * // Get one Disponibilidadeprod
     * const disponibilidadeprod = await prisma.disponibilidadeprod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends disponibilidadeprodFindUniqueArgs>(args: SelectSubset<T, disponibilidadeprodFindUniqueArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Disponibilidadeprod that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {disponibilidadeprodFindUniqueOrThrowArgs} args - Arguments to find a Disponibilidadeprod
     * @example
     * // Get one Disponibilidadeprod
     * const disponibilidadeprod = await prisma.disponibilidadeprod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends disponibilidadeprodFindUniqueOrThrowArgs>(args: SelectSubset<T, disponibilidadeprodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Disponibilidadeprod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {disponibilidadeprodFindFirstArgs} args - Arguments to find a Disponibilidadeprod
     * @example
     * // Get one Disponibilidadeprod
     * const disponibilidadeprod = await prisma.disponibilidadeprod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends disponibilidadeprodFindFirstArgs>(args?: SelectSubset<T, disponibilidadeprodFindFirstArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Disponibilidadeprod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {disponibilidadeprodFindFirstOrThrowArgs} args - Arguments to find a Disponibilidadeprod
     * @example
     * // Get one Disponibilidadeprod
     * const disponibilidadeprod = await prisma.disponibilidadeprod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends disponibilidadeprodFindFirstOrThrowArgs>(args?: SelectSubset<T, disponibilidadeprodFindFirstOrThrowArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Disponibilidadeprods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {disponibilidadeprodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disponibilidadeprods
     * const disponibilidadeprods = await prisma.disponibilidadeprod.findMany()
     * 
     * // Get first 10 Disponibilidadeprods
     * const disponibilidadeprods = await prisma.disponibilidadeprod.findMany({ take: 10 })
     * 
     * // Only select the `Id_Disponibilidade`
     * const disponibilidadeprodWithId_DisponibilidadeOnly = await prisma.disponibilidadeprod.findMany({ select: { Id_Disponibilidade: true } })
     * 
     */
    findMany<T extends disponibilidadeprodFindManyArgs>(args?: SelectSubset<T, disponibilidadeprodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Disponibilidadeprod.
     * @param {disponibilidadeprodCreateArgs} args - Arguments to create a Disponibilidadeprod.
     * @example
     * // Create one Disponibilidadeprod
     * const Disponibilidadeprod = await prisma.disponibilidadeprod.create({
     *   data: {
     *     // ... data to create a Disponibilidadeprod
     *   }
     * })
     * 
     */
    create<T extends disponibilidadeprodCreateArgs>(args: SelectSubset<T, disponibilidadeprodCreateArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Disponibilidadeprods.
     * @param {disponibilidadeprodCreateManyArgs} args - Arguments to create many Disponibilidadeprods.
     * @example
     * // Create many Disponibilidadeprods
     * const disponibilidadeprod = await prisma.disponibilidadeprod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends disponibilidadeprodCreateManyArgs>(args?: SelectSubset<T, disponibilidadeprodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Disponibilidadeprod.
     * @param {disponibilidadeprodDeleteArgs} args - Arguments to delete one Disponibilidadeprod.
     * @example
     * // Delete one Disponibilidadeprod
     * const Disponibilidadeprod = await prisma.disponibilidadeprod.delete({
     *   where: {
     *     // ... filter to delete one Disponibilidadeprod
     *   }
     * })
     * 
     */
    delete<T extends disponibilidadeprodDeleteArgs>(args: SelectSubset<T, disponibilidadeprodDeleteArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Disponibilidadeprod.
     * @param {disponibilidadeprodUpdateArgs} args - Arguments to update one Disponibilidadeprod.
     * @example
     * // Update one Disponibilidadeprod
     * const disponibilidadeprod = await prisma.disponibilidadeprod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends disponibilidadeprodUpdateArgs>(args: SelectSubset<T, disponibilidadeprodUpdateArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Disponibilidadeprods.
     * @param {disponibilidadeprodDeleteManyArgs} args - Arguments to filter Disponibilidadeprods to delete.
     * @example
     * // Delete a few Disponibilidadeprods
     * const { count } = await prisma.disponibilidadeprod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends disponibilidadeprodDeleteManyArgs>(args?: SelectSubset<T, disponibilidadeprodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disponibilidadeprods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {disponibilidadeprodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disponibilidadeprods
     * const disponibilidadeprod = await prisma.disponibilidadeprod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends disponibilidadeprodUpdateManyArgs>(args: SelectSubset<T, disponibilidadeprodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Disponibilidadeprod.
     * @param {disponibilidadeprodUpsertArgs} args - Arguments to update or create a Disponibilidadeprod.
     * @example
     * // Update or create a Disponibilidadeprod
     * const disponibilidadeprod = await prisma.disponibilidadeprod.upsert({
     *   create: {
     *     // ... data to create a Disponibilidadeprod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disponibilidadeprod we want to update
     *   }
     * })
     */
    upsert<T extends disponibilidadeprodUpsertArgs>(args: SelectSubset<T, disponibilidadeprodUpsertArgs<ExtArgs>>): Prisma__disponibilidadeprodClient<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Disponibilidadeprods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {disponibilidadeprodCountArgs} args - Arguments to filter Disponibilidadeprods to count.
     * @example
     * // Count the number of Disponibilidadeprods
     * const count = await prisma.disponibilidadeprod.count({
     *   where: {
     *     // ... the filter for the Disponibilidadeprods we want to count
     *   }
     * })
    **/
    count<T extends disponibilidadeprodCountArgs>(
      args?: Subset<T, disponibilidadeprodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisponibilidadeprodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disponibilidadeprod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisponibilidadeprodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisponibilidadeprodAggregateArgs>(args: Subset<T, DisponibilidadeprodAggregateArgs>): Prisma.PrismaPromise<GetDisponibilidadeprodAggregateType<T>>

    /**
     * Group by Disponibilidadeprod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {disponibilidadeprodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends disponibilidadeprodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: disponibilidadeprodGroupByArgs['orderBy'] }
        : { orderBy?: disponibilidadeprodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, disponibilidadeprodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisponibilidadeprodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the disponibilidadeprod model
   */
  readonly fields: disponibilidadeprodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for disponibilidadeprod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__disponibilidadeprodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produtos<T extends produtosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, produtosDefaultArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    servicos<T extends servicosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, servicosDefaultArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the disponibilidadeprod model
   */
  interface disponibilidadeprodFieldRefs {
    readonly Id_Disponibilidade: FieldRef<"disponibilidadeprod", 'Int'>
    readonly Id_Produto: FieldRef<"disponibilidadeprod", 'Int'>
    readonly Id_Servico: FieldRef<"disponibilidadeprod", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * disponibilidadeprod findUnique
   */
  export type disponibilidadeprodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * Filter, which disponibilidadeprod to fetch.
     */
    where: disponibilidadeprodWhereUniqueInput
  }

  /**
   * disponibilidadeprod findUniqueOrThrow
   */
  export type disponibilidadeprodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * Filter, which disponibilidadeprod to fetch.
     */
    where: disponibilidadeprodWhereUniqueInput
  }

  /**
   * disponibilidadeprod findFirst
   */
  export type disponibilidadeprodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * Filter, which disponibilidadeprod to fetch.
     */
    where?: disponibilidadeprodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of disponibilidadeprods to fetch.
     */
    orderBy?: disponibilidadeprodOrderByWithRelationInput | disponibilidadeprodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for disponibilidadeprods.
     */
    cursor?: disponibilidadeprodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` disponibilidadeprods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` disponibilidadeprods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of disponibilidadeprods.
     */
    distinct?: DisponibilidadeprodScalarFieldEnum | DisponibilidadeprodScalarFieldEnum[]
  }

  /**
   * disponibilidadeprod findFirstOrThrow
   */
  export type disponibilidadeprodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * Filter, which disponibilidadeprod to fetch.
     */
    where?: disponibilidadeprodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of disponibilidadeprods to fetch.
     */
    orderBy?: disponibilidadeprodOrderByWithRelationInput | disponibilidadeprodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for disponibilidadeprods.
     */
    cursor?: disponibilidadeprodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` disponibilidadeprods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` disponibilidadeprods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of disponibilidadeprods.
     */
    distinct?: DisponibilidadeprodScalarFieldEnum | DisponibilidadeprodScalarFieldEnum[]
  }

  /**
   * disponibilidadeprod findMany
   */
  export type disponibilidadeprodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * Filter, which disponibilidadeprods to fetch.
     */
    where?: disponibilidadeprodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of disponibilidadeprods to fetch.
     */
    orderBy?: disponibilidadeprodOrderByWithRelationInput | disponibilidadeprodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing disponibilidadeprods.
     */
    cursor?: disponibilidadeprodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` disponibilidadeprods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` disponibilidadeprods.
     */
    skip?: number
    distinct?: DisponibilidadeprodScalarFieldEnum | DisponibilidadeprodScalarFieldEnum[]
  }

  /**
   * disponibilidadeprod create
   */
  export type disponibilidadeprodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * The data needed to create a disponibilidadeprod.
     */
    data: XOR<disponibilidadeprodCreateInput, disponibilidadeprodUncheckedCreateInput>
  }

  /**
   * disponibilidadeprod createMany
   */
  export type disponibilidadeprodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many disponibilidadeprods.
     */
    data: disponibilidadeprodCreateManyInput | disponibilidadeprodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * disponibilidadeprod update
   */
  export type disponibilidadeprodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * The data needed to update a disponibilidadeprod.
     */
    data: XOR<disponibilidadeprodUpdateInput, disponibilidadeprodUncheckedUpdateInput>
    /**
     * Choose, which disponibilidadeprod to update.
     */
    where: disponibilidadeprodWhereUniqueInput
  }

  /**
   * disponibilidadeprod updateMany
   */
  export type disponibilidadeprodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update disponibilidadeprods.
     */
    data: XOR<disponibilidadeprodUpdateManyMutationInput, disponibilidadeprodUncheckedUpdateManyInput>
    /**
     * Filter which disponibilidadeprods to update
     */
    where?: disponibilidadeprodWhereInput
    /**
     * Limit how many disponibilidadeprods to update.
     */
    limit?: number
  }

  /**
   * disponibilidadeprod upsert
   */
  export type disponibilidadeprodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * The filter to search for the disponibilidadeprod to update in case it exists.
     */
    where: disponibilidadeprodWhereUniqueInput
    /**
     * In case the disponibilidadeprod found by the `where` argument doesn't exist, create a new disponibilidadeprod with this data.
     */
    create: XOR<disponibilidadeprodCreateInput, disponibilidadeprodUncheckedCreateInput>
    /**
     * In case the disponibilidadeprod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<disponibilidadeprodUpdateInput, disponibilidadeprodUncheckedUpdateInput>
  }

  /**
   * disponibilidadeprod delete
   */
  export type disponibilidadeprodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    /**
     * Filter which disponibilidadeprod to delete.
     */
    where: disponibilidadeprodWhereUniqueInput
  }

  /**
   * disponibilidadeprod deleteMany
   */
  export type disponibilidadeprodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which disponibilidadeprods to delete
     */
    where?: disponibilidadeprodWhereInput
    /**
     * Limit how many disponibilidadeprods to delete.
     */
    limit?: number
  }

  /**
   * disponibilidadeprod without action
   */
  export type disponibilidadeprodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
  }


  /**
   * Model funcionarios
   */

  export type AggregateFuncionarios = {
    _count: FuncionariosCountAggregateOutputType | null
    _avg: FuncionariosAvgAggregateOutputType | null
    _sum: FuncionariosSumAggregateOutputType | null
    _min: FuncionariosMinAggregateOutputType | null
    _max: FuncionariosMaxAggregateOutputType | null
  }

  export type FuncionariosAvgAggregateOutputType = {
    Id_Funcionario: number | null
  }

  export type FuncionariosSumAggregateOutputType = {
    Id_Funcionario: number | null
  }

  export type FuncionariosMinAggregateOutputType = {
    Id_Funcionario: number | null
    Nome: string | null
    Email: string | null
    Administrador: boolean | null
    Senha: string | null
    Status: $Enums.funcionarios_Status | null
  }

  export type FuncionariosMaxAggregateOutputType = {
    Id_Funcionario: number | null
    Nome: string | null
    Email: string | null
    Administrador: boolean | null
    Senha: string | null
    Status: $Enums.funcionarios_Status | null
  }

  export type FuncionariosCountAggregateOutputType = {
    Id_Funcionario: number
    Nome: number
    Email: number
    Administrador: number
    Senha: number
    Status: number
    _all: number
  }


  export type FuncionariosAvgAggregateInputType = {
    Id_Funcionario?: true
  }

  export type FuncionariosSumAggregateInputType = {
    Id_Funcionario?: true
  }

  export type FuncionariosMinAggregateInputType = {
    Id_Funcionario?: true
    Nome?: true
    Email?: true
    Administrador?: true
    Senha?: true
    Status?: true
  }

  export type FuncionariosMaxAggregateInputType = {
    Id_Funcionario?: true
    Nome?: true
    Email?: true
    Administrador?: true
    Senha?: true
    Status?: true
  }

  export type FuncionariosCountAggregateInputType = {
    Id_Funcionario?: true
    Nome?: true
    Email?: true
    Administrador?: true
    Senha?: true
    Status?: true
    _all?: true
  }

  export type FuncionariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which funcionarios to aggregate.
     */
    where?: funcionariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of funcionarios to fetch.
     */
    orderBy?: funcionariosOrderByWithRelationInput | funcionariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: funcionariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned funcionarios
    **/
    _count?: true | FuncionariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FuncionariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FuncionariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FuncionariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FuncionariosMaxAggregateInputType
  }

  export type GetFuncionariosAggregateType<T extends FuncionariosAggregateArgs> = {
        [P in keyof T & keyof AggregateFuncionarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuncionarios[P]>
      : GetScalarType<T[P], AggregateFuncionarios[P]>
  }




  export type funcionariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: funcionariosWhereInput
    orderBy?: funcionariosOrderByWithAggregationInput | funcionariosOrderByWithAggregationInput[]
    by: FuncionariosScalarFieldEnum[] | FuncionariosScalarFieldEnum
    having?: funcionariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FuncionariosCountAggregateInputType | true
    _avg?: FuncionariosAvgAggregateInputType
    _sum?: FuncionariosSumAggregateInputType
    _min?: FuncionariosMinAggregateInputType
    _max?: FuncionariosMaxAggregateInputType
  }

  export type FuncionariosGroupByOutputType = {
    Id_Funcionario: number
    Nome: string | null
    Email: string | null
    Administrador: boolean | null
    Senha: string | null
    Status: $Enums.funcionarios_Status | null
    _count: FuncionariosCountAggregateOutputType | null
    _avg: FuncionariosAvgAggregateOutputType | null
    _sum: FuncionariosSumAggregateOutputType | null
    _min: FuncionariosMinAggregateOutputType | null
    _max: FuncionariosMaxAggregateOutputType | null
  }

  type GetFuncionariosGroupByPayload<T extends funcionariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FuncionariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FuncionariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FuncionariosGroupByOutputType[P]>
            : GetScalarType<T[P], FuncionariosGroupByOutputType[P]>
        }
      >
    >


  export type funcionariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Funcionario?: boolean
    Nome?: boolean
    Email?: boolean
    Administrador?: boolean
    Senha?: boolean
    Status?: boolean
    agendamentos?: boolean | funcionarios$agendamentosArgs<ExtArgs>
    _count?: boolean | FuncionariosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["funcionarios"]>



  export type funcionariosSelectScalar = {
    Id_Funcionario?: boolean
    Nome?: boolean
    Email?: boolean
    Administrador?: boolean
    Senha?: boolean
    Status?: boolean
  }

  export type funcionariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Funcionario" | "Nome" | "Email" | "Administrador" | "Senha" | "Status", ExtArgs["result"]["funcionarios"]>
  export type funcionariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | funcionarios$agendamentosArgs<ExtArgs>
    _count?: boolean | FuncionariosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $funcionariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "funcionarios"
    objects: {
      agendamentos: Prisma.$agendamentosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Funcionario: number
      Nome: string | null
      Email: string | null
      Administrador: boolean | null
      Senha: string | null
      Status: $Enums.funcionarios_Status | null
    }, ExtArgs["result"]["funcionarios"]>
    composites: {}
  }

  type funcionariosGetPayload<S extends boolean | null | undefined | funcionariosDefaultArgs> = $Result.GetResult<Prisma.$funcionariosPayload, S>

  type funcionariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<funcionariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FuncionariosCountAggregateInputType | true
    }

  export interface funcionariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['funcionarios'], meta: { name: 'funcionarios' } }
    /**
     * Find zero or one Funcionarios that matches the filter.
     * @param {funcionariosFindUniqueArgs} args - Arguments to find a Funcionarios
     * @example
     * // Get one Funcionarios
     * const funcionarios = await prisma.funcionarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends funcionariosFindUniqueArgs>(args: SelectSubset<T, funcionariosFindUniqueArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Funcionarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {funcionariosFindUniqueOrThrowArgs} args - Arguments to find a Funcionarios
     * @example
     * // Get one Funcionarios
     * const funcionarios = await prisma.funcionarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends funcionariosFindUniqueOrThrowArgs>(args: SelectSubset<T, funcionariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Funcionarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {funcionariosFindFirstArgs} args - Arguments to find a Funcionarios
     * @example
     * // Get one Funcionarios
     * const funcionarios = await prisma.funcionarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends funcionariosFindFirstArgs>(args?: SelectSubset<T, funcionariosFindFirstArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Funcionarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {funcionariosFindFirstOrThrowArgs} args - Arguments to find a Funcionarios
     * @example
     * // Get one Funcionarios
     * const funcionarios = await prisma.funcionarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends funcionariosFindFirstOrThrowArgs>(args?: SelectSubset<T, funcionariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Funcionarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {funcionariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Funcionarios
     * const funcionarios = await prisma.funcionarios.findMany()
     * 
     * // Get first 10 Funcionarios
     * const funcionarios = await prisma.funcionarios.findMany({ take: 10 })
     * 
     * // Only select the `Id_Funcionario`
     * const funcionariosWithId_FuncionarioOnly = await prisma.funcionarios.findMany({ select: { Id_Funcionario: true } })
     * 
     */
    findMany<T extends funcionariosFindManyArgs>(args?: SelectSubset<T, funcionariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Funcionarios.
     * @param {funcionariosCreateArgs} args - Arguments to create a Funcionarios.
     * @example
     * // Create one Funcionarios
     * const Funcionarios = await prisma.funcionarios.create({
     *   data: {
     *     // ... data to create a Funcionarios
     *   }
     * })
     * 
     */
    create<T extends funcionariosCreateArgs>(args: SelectSubset<T, funcionariosCreateArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Funcionarios.
     * @param {funcionariosCreateManyArgs} args - Arguments to create many Funcionarios.
     * @example
     * // Create many Funcionarios
     * const funcionarios = await prisma.funcionarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends funcionariosCreateManyArgs>(args?: SelectSubset<T, funcionariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Funcionarios.
     * @param {funcionariosDeleteArgs} args - Arguments to delete one Funcionarios.
     * @example
     * // Delete one Funcionarios
     * const Funcionarios = await prisma.funcionarios.delete({
     *   where: {
     *     // ... filter to delete one Funcionarios
     *   }
     * })
     * 
     */
    delete<T extends funcionariosDeleteArgs>(args: SelectSubset<T, funcionariosDeleteArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Funcionarios.
     * @param {funcionariosUpdateArgs} args - Arguments to update one Funcionarios.
     * @example
     * // Update one Funcionarios
     * const funcionarios = await prisma.funcionarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends funcionariosUpdateArgs>(args: SelectSubset<T, funcionariosUpdateArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Funcionarios.
     * @param {funcionariosDeleteManyArgs} args - Arguments to filter Funcionarios to delete.
     * @example
     * // Delete a few Funcionarios
     * const { count } = await prisma.funcionarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends funcionariosDeleteManyArgs>(args?: SelectSubset<T, funcionariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {funcionariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Funcionarios
     * const funcionarios = await prisma.funcionarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends funcionariosUpdateManyArgs>(args: SelectSubset<T, funcionariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Funcionarios.
     * @param {funcionariosUpsertArgs} args - Arguments to update or create a Funcionarios.
     * @example
     * // Update or create a Funcionarios
     * const funcionarios = await prisma.funcionarios.upsert({
     *   create: {
     *     // ... data to create a Funcionarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Funcionarios we want to update
     *   }
     * })
     */
    upsert<T extends funcionariosUpsertArgs>(args: SelectSubset<T, funcionariosUpsertArgs<ExtArgs>>): Prisma__funcionariosClient<$Result.GetResult<Prisma.$funcionariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {funcionariosCountArgs} args - Arguments to filter Funcionarios to count.
     * @example
     * // Count the number of Funcionarios
     * const count = await prisma.funcionarios.count({
     *   where: {
     *     // ... the filter for the Funcionarios we want to count
     *   }
     * })
    **/
    count<T extends funcionariosCountArgs>(
      args?: Subset<T, funcionariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FuncionariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuncionariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FuncionariosAggregateArgs>(args: Subset<T, FuncionariosAggregateArgs>): Prisma.PrismaPromise<GetFuncionariosAggregateType<T>>

    /**
     * Group by Funcionarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {funcionariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends funcionariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: funcionariosGroupByArgs['orderBy'] }
        : { orderBy?: funcionariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, funcionariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuncionariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the funcionarios model
   */
  readonly fields: funcionariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for funcionarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__funcionariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends funcionarios$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, funcionarios$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the funcionarios model
   */
  interface funcionariosFieldRefs {
    readonly Id_Funcionario: FieldRef<"funcionarios", 'Int'>
    readonly Nome: FieldRef<"funcionarios", 'String'>
    readonly Email: FieldRef<"funcionarios", 'String'>
    readonly Administrador: FieldRef<"funcionarios", 'Boolean'>
    readonly Senha: FieldRef<"funcionarios", 'String'>
    readonly Status: FieldRef<"funcionarios", 'funcionarios_Status'>
  }
    

  // Custom InputTypes
  /**
   * funcionarios findUnique
   */
  export type funcionariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * Filter, which funcionarios to fetch.
     */
    where: funcionariosWhereUniqueInput
  }

  /**
   * funcionarios findUniqueOrThrow
   */
  export type funcionariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * Filter, which funcionarios to fetch.
     */
    where: funcionariosWhereUniqueInput
  }

  /**
   * funcionarios findFirst
   */
  export type funcionariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * Filter, which funcionarios to fetch.
     */
    where?: funcionariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of funcionarios to fetch.
     */
    orderBy?: funcionariosOrderByWithRelationInput | funcionariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for funcionarios.
     */
    cursor?: funcionariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of funcionarios.
     */
    distinct?: FuncionariosScalarFieldEnum | FuncionariosScalarFieldEnum[]
  }

  /**
   * funcionarios findFirstOrThrow
   */
  export type funcionariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * Filter, which funcionarios to fetch.
     */
    where?: funcionariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of funcionarios to fetch.
     */
    orderBy?: funcionariosOrderByWithRelationInput | funcionariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for funcionarios.
     */
    cursor?: funcionariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` funcionarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of funcionarios.
     */
    distinct?: FuncionariosScalarFieldEnum | FuncionariosScalarFieldEnum[]
  }

  /**
   * funcionarios findMany
   */
  export type funcionariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * Filter, which funcionarios to fetch.
     */
    where?: funcionariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of funcionarios to fetch.
     */
    orderBy?: funcionariosOrderByWithRelationInput | funcionariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing funcionarios.
     */
    cursor?: funcionariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` funcionarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` funcionarios.
     */
    skip?: number
    distinct?: FuncionariosScalarFieldEnum | FuncionariosScalarFieldEnum[]
  }

  /**
   * funcionarios create
   */
  export type funcionariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * The data needed to create a funcionarios.
     */
    data?: XOR<funcionariosCreateInput, funcionariosUncheckedCreateInput>
  }

  /**
   * funcionarios createMany
   */
  export type funcionariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many funcionarios.
     */
    data: funcionariosCreateManyInput | funcionariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * funcionarios update
   */
  export type funcionariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * The data needed to update a funcionarios.
     */
    data: XOR<funcionariosUpdateInput, funcionariosUncheckedUpdateInput>
    /**
     * Choose, which funcionarios to update.
     */
    where: funcionariosWhereUniqueInput
  }

  /**
   * funcionarios updateMany
   */
  export type funcionariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update funcionarios.
     */
    data: XOR<funcionariosUpdateManyMutationInput, funcionariosUncheckedUpdateManyInput>
    /**
     * Filter which funcionarios to update
     */
    where?: funcionariosWhereInput
    /**
     * Limit how many funcionarios to update.
     */
    limit?: number
  }

  /**
   * funcionarios upsert
   */
  export type funcionariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * The filter to search for the funcionarios to update in case it exists.
     */
    where: funcionariosWhereUniqueInput
    /**
     * In case the funcionarios found by the `where` argument doesn't exist, create a new funcionarios with this data.
     */
    create: XOR<funcionariosCreateInput, funcionariosUncheckedCreateInput>
    /**
     * In case the funcionarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<funcionariosUpdateInput, funcionariosUncheckedUpdateInput>
  }

  /**
   * funcionarios delete
   */
  export type funcionariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
    /**
     * Filter which funcionarios to delete.
     */
    where: funcionariosWhereUniqueInput
  }

  /**
   * funcionarios deleteMany
   */
  export type funcionariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which funcionarios to delete
     */
    where?: funcionariosWhereInput
    /**
     * Limit how many funcionarios to delete.
     */
    limit?: number
  }

  /**
   * funcionarios.agendamentos
   */
  export type funcionarios$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    where?: agendamentosWhereInput
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    cursor?: agendamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * funcionarios without action
   */
  export type funcionariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the funcionarios
     */
    select?: funcionariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the funcionarios
     */
    omit?: funcionariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: funcionariosInclude<ExtArgs> | null
  }


  /**
   * Model imagens
   */

  export type AggregateImagens = {
    _count: ImagensCountAggregateOutputType | null
    _avg: ImagensAvgAggregateOutputType | null
    _sum: ImagensSumAggregateOutputType | null
    _min: ImagensMinAggregateOutputType | null
    _max: ImagensMaxAggregateOutputType | null
  }

  export type ImagensAvgAggregateOutputType = {
    Id_Imagem: number | null
    Id_Produto: number | null
  }

  export type ImagensSumAggregateOutputType = {
    Id_Imagem: number | null
    Id_Produto: number | null
  }

  export type ImagensMinAggregateOutputType = {
    Id_Imagem: number | null
    Id_Produto: number | null
    CaminhoImagem: string | null
    AltText: string | null
  }

  export type ImagensMaxAggregateOutputType = {
    Id_Imagem: number | null
    Id_Produto: number | null
    CaminhoImagem: string | null
    AltText: string | null
  }

  export type ImagensCountAggregateOutputType = {
    Id_Imagem: number
    Id_Produto: number
    CaminhoImagem: number
    AltText: number
    _all: number
  }


  export type ImagensAvgAggregateInputType = {
    Id_Imagem?: true
    Id_Produto?: true
  }

  export type ImagensSumAggregateInputType = {
    Id_Imagem?: true
    Id_Produto?: true
  }

  export type ImagensMinAggregateInputType = {
    Id_Imagem?: true
    Id_Produto?: true
    CaminhoImagem?: true
    AltText?: true
  }

  export type ImagensMaxAggregateInputType = {
    Id_Imagem?: true
    Id_Produto?: true
    CaminhoImagem?: true
    AltText?: true
  }

  export type ImagensCountAggregateInputType = {
    Id_Imagem?: true
    Id_Produto?: true
    CaminhoImagem?: true
    AltText?: true
    _all?: true
  }

  export type ImagensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which imagens to aggregate.
     */
    where?: imagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of imagens to fetch.
     */
    orderBy?: imagensOrderByWithRelationInput | imagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: imagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` imagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` imagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned imagens
    **/
    _count?: true | ImagensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImagensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImagensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImagensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImagensMaxAggregateInputType
  }

  export type GetImagensAggregateType<T extends ImagensAggregateArgs> = {
        [P in keyof T & keyof AggregateImagens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImagens[P]>
      : GetScalarType<T[P], AggregateImagens[P]>
  }




  export type imagensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: imagensWhereInput
    orderBy?: imagensOrderByWithAggregationInput | imagensOrderByWithAggregationInput[]
    by: ImagensScalarFieldEnum[] | ImagensScalarFieldEnum
    having?: imagensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImagensCountAggregateInputType | true
    _avg?: ImagensAvgAggregateInputType
    _sum?: ImagensSumAggregateInputType
    _min?: ImagensMinAggregateInputType
    _max?: ImagensMaxAggregateInputType
  }

  export type ImagensGroupByOutputType = {
    Id_Imagem: number
    Id_Produto: number | null
    CaminhoImagem: string | null
    AltText: string | null
    _count: ImagensCountAggregateOutputType | null
    _avg: ImagensAvgAggregateOutputType | null
    _sum: ImagensSumAggregateOutputType | null
    _min: ImagensMinAggregateOutputType | null
    _max: ImagensMaxAggregateOutputType | null
  }

  type GetImagensGroupByPayload<T extends imagensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImagensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImagensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImagensGroupByOutputType[P]>
            : GetScalarType<T[P], ImagensGroupByOutputType[P]>
        }
      >
    >


  export type imagensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Imagem?: boolean
    Id_Produto?: boolean
    CaminhoImagem?: boolean
    AltText?: boolean
    produtos?: boolean | imagens$produtosArgs<ExtArgs>
  }, ExtArgs["result"]["imagens"]>



  export type imagensSelectScalar = {
    Id_Imagem?: boolean
    Id_Produto?: boolean
    CaminhoImagem?: boolean
    AltText?: boolean
  }

  export type imagensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Imagem" | "Id_Produto" | "CaminhoImagem" | "AltText", ExtArgs["result"]["imagens"]>
  export type imagensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | imagens$produtosArgs<ExtArgs>
  }

  export type $imagensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "imagens"
    objects: {
      produtos: Prisma.$produtosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Imagem: number
      Id_Produto: number | null
      CaminhoImagem: string | null
      AltText: string | null
    }, ExtArgs["result"]["imagens"]>
    composites: {}
  }

  type imagensGetPayload<S extends boolean | null | undefined | imagensDefaultArgs> = $Result.GetResult<Prisma.$imagensPayload, S>

  type imagensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<imagensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImagensCountAggregateInputType | true
    }

  export interface imagensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['imagens'], meta: { name: 'imagens' } }
    /**
     * Find zero or one Imagens that matches the filter.
     * @param {imagensFindUniqueArgs} args - Arguments to find a Imagens
     * @example
     * // Get one Imagens
     * const imagens = await prisma.imagens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends imagensFindUniqueArgs>(args: SelectSubset<T, imagensFindUniqueArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Imagens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {imagensFindUniqueOrThrowArgs} args - Arguments to find a Imagens
     * @example
     * // Get one Imagens
     * const imagens = await prisma.imagens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends imagensFindUniqueOrThrowArgs>(args: SelectSubset<T, imagensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Imagens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imagensFindFirstArgs} args - Arguments to find a Imagens
     * @example
     * // Get one Imagens
     * const imagens = await prisma.imagens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends imagensFindFirstArgs>(args?: SelectSubset<T, imagensFindFirstArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Imagens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imagensFindFirstOrThrowArgs} args - Arguments to find a Imagens
     * @example
     * // Get one Imagens
     * const imagens = await prisma.imagens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends imagensFindFirstOrThrowArgs>(args?: SelectSubset<T, imagensFindFirstOrThrowArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Imagens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imagensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Imagens
     * const imagens = await prisma.imagens.findMany()
     * 
     * // Get first 10 Imagens
     * const imagens = await prisma.imagens.findMany({ take: 10 })
     * 
     * // Only select the `Id_Imagem`
     * const imagensWithId_ImagemOnly = await prisma.imagens.findMany({ select: { Id_Imagem: true } })
     * 
     */
    findMany<T extends imagensFindManyArgs>(args?: SelectSubset<T, imagensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Imagens.
     * @param {imagensCreateArgs} args - Arguments to create a Imagens.
     * @example
     * // Create one Imagens
     * const Imagens = await prisma.imagens.create({
     *   data: {
     *     // ... data to create a Imagens
     *   }
     * })
     * 
     */
    create<T extends imagensCreateArgs>(args: SelectSubset<T, imagensCreateArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Imagens.
     * @param {imagensCreateManyArgs} args - Arguments to create many Imagens.
     * @example
     * // Create many Imagens
     * const imagens = await prisma.imagens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends imagensCreateManyArgs>(args?: SelectSubset<T, imagensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Imagens.
     * @param {imagensDeleteArgs} args - Arguments to delete one Imagens.
     * @example
     * // Delete one Imagens
     * const Imagens = await prisma.imagens.delete({
     *   where: {
     *     // ... filter to delete one Imagens
     *   }
     * })
     * 
     */
    delete<T extends imagensDeleteArgs>(args: SelectSubset<T, imagensDeleteArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Imagens.
     * @param {imagensUpdateArgs} args - Arguments to update one Imagens.
     * @example
     * // Update one Imagens
     * const imagens = await prisma.imagens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends imagensUpdateArgs>(args: SelectSubset<T, imagensUpdateArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Imagens.
     * @param {imagensDeleteManyArgs} args - Arguments to filter Imagens to delete.
     * @example
     * // Delete a few Imagens
     * const { count } = await prisma.imagens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends imagensDeleteManyArgs>(args?: SelectSubset<T, imagensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Imagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imagensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Imagens
     * const imagens = await prisma.imagens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends imagensUpdateManyArgs>(args: SelectSubset<T, imagensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Imagens.
     * @param {imagensUpsertArgs} args - Arguments to update or create a Imagens.
     * @example
     * // Update or create a Imagens
     * const imagens = await prisma.imagens.upsert({
     *   create: {
     *     // ... data to create a Imagens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Imagens we want to update
     *   }
     * })
     */
    upsert<T extends imagensUpsertArgs>(args: SelectSubset<T, imagensUpsertArgs<ExtArgs>>): Prisma__imagensClient<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Imagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imagensCountArgs} args - Arguments to filter Imagens to count.
     * @example
     * // Count the number of Imagens
     * const count = await prisma.imagens.count({
     *   where: {
     *     // ... the filter for the Imagens we want to count
     *   }
     * })
    **/
    count<T extends imagensCountArgs>(
      args?: Subset<T, imagensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImagensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Imagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImagensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImagensAggregateArgs>(args: Subset<T, ImagensAggregateArgs>): Prisma.PrismaPromise<GetImagensAggregateType<T>>

    /**
     * Group by Imagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {imagensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends imagensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: imagensGroupByArgs['orderBy'] }
        : { orderBy?: imagensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, imagensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImagensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the imagens model
   */
  readonly fields: imagensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for imagens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__imagensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produtos<T extends imagens$produtosArgs<ExtArgs> = {}>(args?: Subset<T, imagens$produtosArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the imagens model
   */
  interface imagensFieldRefs {
    readonly Id_Imagem: FieldRef<"imagens", 'Int'>
    readonly Id_Produto: FieldRef<"imagens", 'Int'>
    readonly CaminhoImagem: FieldRef<"imagens", 'String'>
    readonly AltText: FieldRef<"imagens", 'String'>
  }
    

  // Custom InputTypes
  /**
   * imagens findUnique
   */
  export type imagensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * Filter, which imagens to fetch.
     */
    where: imagensWhereUniqueInput
  }

  /**
   * imagens findUniqueOrThrow
   */
  export type imagensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * Filter, which imagens to fetch.
     */
    where: imagensWhereUniqueInput
  }

  /**
   * imagens findFirst
   */
  export type imagensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * Filter, which imagens to fetch.
     */
    where?: imagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of imagens to fetch.
     */
    orderBy?: imagensOrderByWithRelationInput | imagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for imagens.
     */
    cursor?: imagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` imagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` imagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of imagens.
     */
    distinct?: ImagensScalarFieldEnum | ImagensScalarFieldEnum[]
  }

  /**
   * imagens findFirstOrThrow
   */
  export type imagensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * Filter, which imagens to fetch.
     */
    where?: imagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of imagens to fetch.
     */
    orderBy?: imagensOrderByWithRelationInput | imagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for imagens.
     */
    cursor?: imagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` imagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` imagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of imagens.
     */
    distinct?: ImagensScalarFieldEnum | ImagensScalarFieldEnum[]
  }

  /**
   * imagens findMany
   */
  export type imagensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * Filter, which imagens to fetch.
     */
    where?: imagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of imagens to fetch.
     */
    orderBy?: imagensOrderByWithRelationInput | imagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing imagens.
     */
    cursor?: imagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` imagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` imagens.
     */
    skip?: number
    distinct?: ImagensScalarFieldEnum | ImagensScalarFieldEnum[]
  }

  /**
   * imagens create
   */
  export type imagensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * The data needed to create a imagens.
     */
    data?: XOR<imagensCreateInput, imagensUncheckedCreateInput>
  }

  /**
   * imagens createMany
   */
  export type imagensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many imagens.
     */
    data: imagensCreateManyInput | imagensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * imagens update
   */
  export type imagensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * The data needed to update a imagens.
     */
    data: XOR<imagensUpdateInput, imagensUncheckedUpdateInput>
    /**
     * Choose, which imagens to update.
     */
    where: imagensWhereUniqueInput
  }

  /**
   * imagens updateMany
   */
  export type imagensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update imagens.
     */
    data: XOR<imagensUpdateManyMutationInput, imagensUncheckedUpdateManyInput>
    /**
     * Filter which imagens to update
     */
    where?: imagensWhereInput
    /**
     * Limit how many imagens to update.
     */
    limit?: number
  }

  /**
   * imagens upsert
   */
  export type imagensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * The filter to search for the imagens to update in case it exists.
     */
    where: imagensWhereUniqueInput
    /**
     * In case the imagens found by the `where` argument doesn't exist, create a new imagens with this data.
     */
    create: XOR<imagensCreateInput, imagensUncheckedCreateInput>
    /**
     * In case the imagens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<imagensUpdateInput, imagensUncheckedUpdateInput>
  }

  /**
   * imagens delete
   */
  export type imagensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    /**
     * Filter which imagens to delete.
     */
    where: imagensWhereUniqueInput
  }

  /**
   * imagens deleteMany
   */
  export type imagensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which imagens to delete
     */
    where?: imagensWhereInput
    /**
     * Limit how many imagens to delete.
     */
    limit?: number
  }

  /**
   * imagens.produtos
   */
  export type imagens$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    where?: produtosWhereInput
  }

  /**
   * imagens without action
   */
  export type imagensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
  }


  /**
   * Model pagamentos
   */

  export type AggregatePagamentos = {
    _count: PagamentosCountAggregateOutputType | null
    _avg: PagamentosAvgAggregateOutputType | null
    _sum: PagamentosSumAggregateOutputType | null
    _min: PagamentosMinAggregateOutputType | null
    _max: PagamentosMaxAggregateOutputType | null
  }

  export type PagamentosAvgAggregateOutputType = {
    Id_Pagamentos: number | null
    Valor: number | null
    Fatura: number | null
    Id_Agendamento: number | null
  }

  export type PagamentosSumAggregateOutputType = {
    Id_Pagamentos: number | null
    Valor: number | null
    Fatura: number | null
    Id_Agendamento: number | null
  }

  export type PagamentosMinAggregateOutputType = {
    Id_Pagamentos: number | null
    Valor: number | null
    Status: $Enums.pagamentos_Status | null
    Modalidade: $Enums.pagamentos_Modalidade | null
    Fatura: number | null
    Id_Agendamento: number | null
  }

  export type PagamentosMaxAggregateOutputType = {
    Id_Pagamentos: number | null
    Valor: number | null
    Status: $Enums.pagamentos_Status | null
    Modalidade: $Enums.pagamentos_Modalidade | null
    Fatura: number | null
    Id_Agendamento: number | null
  }

  export type PagamentosCountAggregateOutputType = {
    Id_Pagamentos: number
    Valor: number
    Status: number
    Modalidade: number
    Fatura: number
    Id_Agendamento: number
    _all: number
  }


  export type PagamentosAvgAggregateInputType = {
    Id_Pagamentos?: true
    Valor?: true
    Fatura?: true
    Id_Agendamento?: true
  }

  export type PagamentosSumAggregateInputType = {
    Id_Pagamentos?: true
    Valor?: true
    Fatura?: true
    Id_Agendamento?: true
  }

  export type PagamentosMinAggregateInputType = {
    Id_Pagamentos?: true
    Valor?: true
    Status?: true
    Modalidade?: true
    Fatura?: true
    Id_Agendamento?: true
  }

  export type PagamentosMaxAggregateInputType = {
    Id_Pagamentos?: true
    Valor?: true
    Status?: true
    Modalidade?: true
    Fatura?: true
    Id_Agendamento?: true
  }

  export type PagamentosCountAggregateInputType = {
    Id_Pagamentos?: true
    Valor?: true
    Status?: true
    Modalidade?: true
    Fatura?: true
    Id_Agendamento?: true
    _all?: true
  }

  export type PagamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pagamentos to aggregate.
     */
    where?: pagamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagamentos to fetch.
     */
    orderBy?: pagamentosOrderByWithRelationInput | pagamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pagamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pagamentos
    **/
    _count?: true | PagamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagamentosMaxAggregateInputType
  }

  export type GetPagamentosAggregateType<T extends PagamentosAggregateArgs> = {
        [P in keyof T & keyof AggregatePagamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagamentos[P]>
      : GetScalarType<T[P], AggregatePagamentos[P]>
  }




  export type pagamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagamentosWhereInput
    orderBy?: pagamentosOrderByWithAggregationInput | pagamentosOrderByWithAggregationInput[]
    by: PagamentosScalarFieldEnum[] | PagamentosScalarFieldEnum
    having?: pagamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagamentosCountAggregateInputType | true
    _avg?: PagamentosAvgAggregateInputType
    _sum?: PagamentosSumAggregateInputType
    _min?: PagamentosMinAggregateInputType
    _max?: PagamentosMaxAggregateInputType
  }

  export type PagamentosGroupByOutputType = {
    Id_Pagamentos: number
    Valor: number | null
    Status: $Enums.pagamentos_Status | null
    Modalidade: $Enums.pagamentos_Modalidade | null
    Fatura: number | null
    Id_Agendamento: number | null
    _count: PagamentosCountAggregateOutputType | null
    _avg: PagamentosAvgAggregateOutputType | null
    _sum: PagamentosSumAggregateOutputType | null
    _min: PagamentosMinAggregateOutputType | null
    _max: PagamentosMaxAggregateOutputType | null
  }

  type GetPagamentosGroupByPayload<T extends pagamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagamentosGroupByOutputType[P]>
            : GetScalarType<T[P], PagamentosGroupByOutputType[P]>
        }
      >
    >


  export type pagamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Pagamentos?: boolean
    Valor?: boolean
    Status?: boolean
    Modalidade?: boolean
    Fatura?: boolean
    Id_Agendamento?: boolean
    agendamentos?: boolean | pagamentos$agendamentosArgs<ExtArgs>
  }, ExtArgs["result"]["pagamentos"]>



  export type pagamentosSelectScalar = {
    Id_Pagamentos?: boolean
    Valor?: boolean
    Status?: boolean
    Modalidade?: boolean
    Fatura?: boolean
    Id_Agendamento?: boolean
  }

  export type pagamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Pagamentos" | "Valor" | "Status" | "Modalidade" | "Fatura" | "Id_Agendamento", ExtArgs["result"]["pagamentos"]>
  export type pagamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | pagamentos$agendamentosArgs<ExtArgs>
  }

  export type $pagamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pagamentos"
    objects: {
      agendamentos: Prisma.$agendamentosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Pagamentos: number
      Valor: number | null
      Status: $Enums.pagamentos_Status | null
      Modalidade: $Enums.pagamentos_Modalidade | null
      Fatura: number | null
      Id_Agendamento: number | null
    }, ExtArgs["result"]["pagamentos"]>
    composites: {}
  }

  type pagamentosGetPayload<S extends boolean | null | undefined | pagamentosDefaultArgs> = $Result.GetResult<Prisma.$pagamentosPayload, S>

  type pagamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pagamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagamentosCountAggregateInputType | true
    }

  export interface pagamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pagamentos'], meta: { name: 'pagamentos' } }
    /**
     * Find zero or one Pagamentos that matches the filter.
     * @param {pagamentosFindUniqueArgs} args - Arguments to find a Pagamentos
     * @example
     * // Get one Pagamentos
     * const pagamentos = await prisma.pagamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pagamentosFindUniqueArgs>(args: SelectSubset<T, pagamentosFindUniqueArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pagamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pagamentosFindUniqueOrThrowArgs} args - Arguments to find a Pagamentos
     * @example
     * // Get one Pagamentos
     * const pagamentos = await prisma.pagamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pagamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, pagamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagamentosFindFirstArgs} args - Arguments to find a Pagamentos
     * @example
     * // Get one Pagamentos
     * const pagamentos = await prisma.pagamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pagamentosFindFirstArgs>(args?: SelectSubset<T, pagamentosFindFirstArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagamentosFindFirstOrThrowArgs} args - Arguments to find a Pagamentos
     * @example
     * // Get one Pagamentos
     * const pagamentos = await prisma.pagamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pagamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, pagamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagamentos
     * const pagamentos = await prisma.pagamentos.findMany()
     * 
     * // Get first 10 Pagamentos
     * const pagamentos = await prisma.pagamentos.findMany({ take: 10 })
     * 
     * // Only select the `Id_Pagamentos`
     * const pagamentosWithId_PagamentosOnly = await prisma.pagamentos.findMany({ select: { Id_Pagamentos: true } })
     * 
     */
    findMany<T extends pagamentosFindManyArgs>(args?: SelectSubset<T, pagamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pagamentos.
     * @param {pagamentosCreateArgs} args - Arguments to create a Pagamentos.
     * @example
     * // Create one Pagamentos
     * const Pagamentos = await prisma.pagamentos.create({
     *   data: {
     *     // ... data to create a Pagamentos
     *   }
     * })
     * 
     */
    create<T extends pagamentosCreateArgs>(args: SelectSubset<T, pagamentosCreateArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagamentos.
     * @param {pagamentosCreateManyArgs} args - Arguments to create many Pagamentos.
     * @example
     * // Create many Pagamentos
     * const pagamentos = await prisma.pagamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pagamentosCreateManyArgs>(args?: SelectSubset<T, pagamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pagamentos.
     * @param {pagamentosDeleteArgs} args - Arguments to delete one Pagamentos.
     * @example
     * // Delete one Pagamentos
     * const Pagamentos = await prisma.pagamentos.delete({
     *   where: {
     *     // ... filter to delete one Pagamentos
     *   }
     * })
     * 
     */
    delete<T extends pagamentosDeleteArgs>(args: SelectSubset<T, pagamentosDeleteArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pagamentos.
     * @param {pagamentosUpdateArgs} args - Arguments to update one Pagamentos.
     * @example
     * // Update one Pagamentos
     * const pagamentos = await prisma.pagamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pagamentosUpdateArgs>(args: SelectSubset<T, pagamentosUpdateArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagamentos.
     * @param {pagamentosDeleteManyArgs} args - Arguments to filter Pagamentos to delete.
     * @example
     * // Delete a few Pagamentos
     * const { count } = await prisma.pagamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pagamentosDeleteManyArgs>(args?: SelectSubset<T, pagamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagamentos
     * const pagamentos = await prisma.pagamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pagamentosUpdateManyArgs>(args: SelectSubset<T, pagamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pagamentos.
     * @param {pagamentosUpsertArgs} args - Arguments to update or create a Pagamentos.
     * @example
     * // Update or create a Pagamentos
     * const pagamentos = await prisma.pagamentos.upsert({
     *   create: {
     *     // ... data to create a Pagamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pagamentos we want to update
     *   }
     * })
     */
    upsert<T extends pagamentosUpsertArgs>(args: SelectSubset<T, pagamentosUpsertArgs<ExtArgs>>): Prisma__pagamentosClient<$Result.GetResult<Prisma.$pagamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagamentosCountArgs} args - Arguments to filter Pagamentos to count.
     * @example
     * // Count the number of Pagamentos
     * const count = await prisma.pagamentos.count({
     *   where: {
     *     // ... the filter for the Pagamentos we want to count
     *   }
     * })
    **/
    count<T extends pagamentosCountArgs>(
      args?: Subset<T, pagamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagamentosAggregateArgs>(args: Subset<T, PagamentosAggregateArgs>): Prisma.PrismaPromise<GetPagamentosAggregateType<T>>

    /**
     * Group by Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagamentosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pagamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pagamentosGroupByArgs['orderBy'] }
        : { orderBy?: pagamentosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pagamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pagamentos model
   */
  readonly fields: pagamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pagamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pagamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends pagamentos$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, pagamentos$agendamentosArgs<ExtArgs>>): Prisma__agendamentosClient<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pagamentos model
   */
  interface pagamentosFieldRefs {
    readonly Id_Pagamentos: FieldRef<"pagamentos", 'Int'>
    readonly Valor: FieldRef<"pagamentos", 'Int'>
    readonly Status: FieldRef<"pagamentos", 'pagamentos_Status'>
    readonly Modalidade: FieldRef<"pagamentos", 'pagamentos_Modalidade'>
    readonly Fatura: FieldRef<"pagamentos", 'Int'>
    readonly Id_Agendamento: FieldRef<"pagamentos", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * pagamentos findUnique
   */
  export type pagamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * Filter, which pagamentos to fetch.
     */
    where: pagamentosWhereUniqueInput
  }

  /**
   * pagamentos findUniqueOrThrow
   */
  export type pagamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * Filter, which pagamentos to fetch.
     */
    where: pagamentosWhereUniqueInput
  }

  /**
   * pagamentos findFirst
   */
  export type pagamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * Filter, which pagamentos to fetch.
     */
    where?: pagamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagamentos to fetch.
     */
    orderBy?: pagamentosOrderByWithRelationInput | pagamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pagamentos.
     */
    cursor?: pagamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pagamentos.
     */
    distinct?: PagamentosScalarFieldEnum | PagamentosScalarFieldEnum[]
  }

  /**
   * pagamentos findFirstOrThrow
   */
  export type pagamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * Filter, which pagamentos to fetch.
     */
    where?: pagamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagamentos to fetch.
     */
    orderBy?: pagamentosOrderByWithRelationInput | pagamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pagamentos.
     */
    cursor?: pagamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pagamentos.
     */
    distinct?: PagamentosScalarFieldEnum | PagamentosScalarFieldEnum[]
  }

  /**
   * pagamentos findMany
   */
  export type pagamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * Filter, which pagamentos to fetch.
     */
    where?: pagamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pagamentos to fetch.
     */
    orderBy?: pagamentosOrderByWithRelationInput | pagamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pagamentos.
     */
    cursor?: pagamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pagamentos.
     */
    skip?: number
    distinct?: PagamentosScalarFieldEnum | PagamentosScalarFieldEnum[]
  }

  /**
   * pagamentos create
   */
  export type pagamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a pagamentos.
     */
    data?: XOR<pagamentosCreateInput, pagamentosUncheckedCreateInput>
  }

  /**
   * pagamentos createMany
   */
  export type pagamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pagamentos.
     */
    data: pagamentosCreateManyInput | pagamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pagamentos update
   */
  export type pagamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a pagamentos.
     */
    data: XOR<pagamentosUpdateInput, pagamentosUncheckedUpdateInput>
    /**
     * Choose, which pagamentos to update.
     */
    where: pagamentosWhereUniqueInput
  }

  /**
   * pagamentos updateMany
   */
  export type pagamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pagamentos.
     */
    data: XOR<pagamentosUpdateManyMutationInput, pagamentosUncheckedUpdateManyInput>
    /**
     * Filter which pagamentos to update
     */
    where?: pagamentosWhereInput
    /**
     * Limit how many pagamentos to update.
     */
    limit?: number
  }

  /**
   * pagamentos upsert
   */
  export type pagamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the pagamentos to update in case it exists.
     */
    where: pagamentosWhereUniqueInput
    /**
     * In case the pagamentos found by the `where` argument doesn't exist, create a new pagamentos with this data.
     */
    create: XOR<pagamentosCreateInput, pagamentosUncheckedCreateInput>
    /**
     * In case the pagamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pagamentosUpdateInput, pagamentosUncheckedUpdateInput>
  }

  /**
   * pagamentos delete
   */
  export type pagamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
    /**
     * Filter which pagamentos to delete.
     */
    where: pagamentosWhereUniqueInput
  }

  /**
   * pagamentos deleteMany
   */
  export type pagamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pagamentos to delete
     */
    where?: pagamentosWhereInput
    /**
     * Limit how many pagamentos to delete.
     */
    limit?: number
  }

  /**
   * pagamentos.agendamentos
   */
  export type pagamentos$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    where?: agendamentosWhereInput
  }

  /**
   * pagamentos without action
   */
  export type pagamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pagamentos
     */
    select?: pagamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pagamentos
     */
    omit?: pagamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pagamentosInclude<ExtArgs> | null
  }


  /**
   * Model produtos
   */

  export type AggregateProdutos = {
    _count: ProdutosCountAggregateOutputType | null
    _avg: ProdutosAvgAggregateOutputType | null
    _sum: ProdutosSumAggregateOutputType | null
    _min: ProdutosMinAggregateOutputType | null
    _max: ProdutosMaxAggregateOutputType | null
  }

  export type ProdutosAvgAggregateOutputType = {
    Id_Produto: number | null
    Estoque: number | null
    EstoqueCritico: number | null
  }

  export type ProdutosSumAggregateOutputType = {
    Id_Produto: number | null
    Estoque: number | null
    EstoqueCritico: number | null
  }

  export type ProdutosMinAggregateOutputType = {
    Id_Produto: number | null
    Nome: string | null
    Estoque: number | null
    EstoqueCritico: number | null
  }

  export type ProdutosMaxAggregateOutputType = {
    Id_Produto: number | null
    Nome: string | null
    Estoque: number | null
    EstoqueCritico: number | null
  }

  export type ProdutosCountAggregateOutputType = {
    Id_Produto: number
    Nome: number
    Estoque: number
    EstoqueCritico: number
    _all: number
  }


  export type ProdutosAvgAggregateInputType = {
    Id_Produto?: true
    Estoque?: true
    EstoqueCritico?: true
  }

  export type ProdutosSumAggregateInputType = {
    Id_Produto?: true
    Estoque?: true
    EstoqueCritico?: true
  }

  export type ProdutosMinAggregateInputType = {
    Id_Produto?: true
    Nome?: true
    Estoque?: true
    EstoqueCritico?: true
  }

  export type ProdutosMaxAggregateInputType = {
    Id_Produto?: true
    Nome?: true
    Estoque?: true
    EstoqueCritico?: true
  }

  export type ProdutosCountAggregateInputType = {
    Id_Produto?: true
    Nome?: true
    Estoque?: true
    EstoqueCritico?: true
    _all?: true
  }

  export type ProdutosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which produtos to aggregate.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned produtos
    **/
    _count?: true | ProdutosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutosMaxAggregateInputType
  }

  export type GetProdutosAggregateType<T extends ProdutosAggregateArgs> = {
        [P in keyof T & keyof AggregateProdutos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProdutos[P]>
      : GetScalarType<T[P], AggregateProdutos[P]>
  }




  export type produtosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: produtosWhereInput
    orderBy?: produtosOrderByWithAggregationInput | produtosOrderByWithAggregationInput[]
    by: ProdutosScalarFieldEnum[] | ProdutosScalarFieldEnum
    having?: produtosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutosCountAggregateInputType | true
    _avg?: ProdutosAvgAggregateInputType
    _sum?: ProdutosSumAggregateInputType
    _min?: ProdutosMinAggregateInputType
    _max?: ProdutosMaxAggregateInputType
  }

  export type ProdutosGroupByOutputType = {
    Id_Produto: number
    Nome: string | null
    Estoque: number | null
    EstoqueCritico: number | null
    _count: ProdutosCountAggregateOutputType | null
    _avg: ProdutosAvgAggregateOutputType | null
    _sum: ProdutosSumAggregateOutputType | null
    _min: ProdutosMinAggregateOutputType | null
    _max: ProdutosMaxAggregateOutputType | null
  }

  type GetProdutosGroupByPayload<T extends produtosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutosGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutosGroupByOutputType[P]>
        }
      >
    >


  export type produtosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Produto?: boolean
    Nome?: boolean
    Estoque?: boolean
    EstoqueCritico?: boolean
    disponibilidadeprod?: boolean | produtos$disponibilidadeprodArgs<ExtArgs>
    imagens?: boolean | produtos$imagensArgs<ExtArgs>
    servicos?: boolean | produtos$servicosArgs<ExtArgs>
    _count?: boolean | ProdutosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produtos"]>



  export type produtosSelectScalar = {
    Id_Produto?: boolean
    Nome?: boolean
    Estoque?: boolean
    EstoqueCritico?: boolean
  }

  export type produtosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Produto" | "Nome" | "Estoque" | "EstoqueCritico", ExtArgs["result"]["produtos"]>
  export type produtosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disponibilidadeprod?: boolean | produtos$disponibilidadeprodArgs<ExtArgs>
    imagens?: boolean | produtos$imagensArgs<ExtArgs>
    servicos?: boolean | produtos$servicosArgs<ExtArgs>
    _count?: boolean | ProdutosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $produtosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "produtos"
    objects: {
      disponibilidadeprod: Prisma.$disponibilidadeprodPayload<ExtArgs>[]
      imagens: Prisma.$imagensPayload<ExtArgs>[]
      servicos: Prisma.$servicosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Produto: number
      Nome: string | null
      Estoque: number | null
      EstoqueCritico: number | null
    }, ExtArgs["result"]["produtos"]>
    composites: {}
  }

  type produtosGetPayload<S extends boolean | null | undefined | produtosDefaultArgs> = $Result.GetResult<Prisma.$produtosPayload, S>

  type produtosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<produtosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutosCountAggregateInputType | true
    }

  export interface produtosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['produtos'], meta: { name: 'produtos' } }
    /**
     * Find zero or one Produtos that matches the filter.
     * @param {produtosFindUniqueArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends produtosFindUniqueArgs>(args: SelectSubset<T, produtosFindUniqueArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produtos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {produtosFindUniqueOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends produtosFindUniqueOrThrowArgs>(args: SelectSubset<T, produtosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindFirstArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends produtosFindFirstArgs>(args?: SelectSubset<T, produtosFindFirstArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produtos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindFirstOrThrowArgs} args - Arguments to find a Produtos
     * @example
     * // Get one Produtos
     * const produtos = await prisma.produtos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends produtosFindFirstOrThrowArgs>(args?: SelectSubset<T, produtosFindFirstOrThrowArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produtos.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produtos.findMany({ take: 10 })
     * 
     * // Only select the `Id_Produto`
     * const produtosWithId_ProdutoOnly = await prisma.produtos.findMany({ select: { Id_Produto: true } })
     * 
     */
    findMany<T extends produtosFindManyArgs>(args?: SelectSubset<T, produtosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produtos.
     * @param {produtosCreateArgs} args - Arguments to create a Produtos.
     * @example
     * // Create one Produtos
     * const Produtos = await prisma.produtos.create({
     *   data: {
     *     // ... data to create a Produtos
     *   }
     * })
     * 
     */
    create<T extends produtosCreateArgs>(args: SelectSubset<T, produtosCreateArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {produtosCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produtos = await prisma.produtos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends produtosCreateManyArgs>(args?: SelectSubset<T, produtosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Produtos.
     * @param {produtosDeleteArgs} args - Arguments to delete one Produtos.
     * @example
     * // Delete one Produtos
     * const Produtos = await prisma.produtos.delete({
     *   where: {
     *     // ... filter to delete one Produtos
     *   }
     * })
     * 
     */
    delete<T extends produtosDeleteArgs>(args: SelectSubset<T, produtosDeleteArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produtos.
     * @param {produtosUpdateArgs} args - Arguments to update one Produtos.
     * @example
     * // Update one Produtos
     * const produtos = await prisma.produtos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends produtosUpdateArgs>(args: SelectSubset<T, produtosUpdateArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {produtosDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produtos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends produtosDeleteManyArgs>(args?: SelectSubset<T, produtosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produtos = await prisma.produtos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends produtosUpdateManyArgs>(args: SelectSubset<T, produtosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Produtos.
     * @param {produtosUpsertArgs} args - Arguments to update or create a Produtos.
     * @example
     * // Update or create a Produtos
     * const produtos = await prisma.produtos.upsert({
     *   create: {
     *     // ... data to create a Produtos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produtos we want to update
     *   }
     * })
     */
    upsert<T extends produtosUpsertArgs>(args: SelectSubset<T, produtosUpsertArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produtos.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends produtosCountArgs>(
      args?: Subset<T, produtosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutosAggregateArgs>(args: Subset<T, ProdutosAggregateArgs>): Prisma.PrismaPromise<GetProdutosAggregateType<T>>

    /**
     * Group by Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produtosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends produtosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: produtosGroupByArgs['orderBy'] }
        : { orderBy?: produtosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, produtosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the produtos model
   */
  readonly fields: produtosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for produtos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__produtosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    disponibilidadeprod<T extends produtos$disponibilidadeprodArgs<ExtArgs> = {}>(args?: Subset<T, produtos$disponibilidadeprodArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    imagens<T extends produtos$imagensArgs<ExtArgs> = {}>(args?: Subset<T, produtos$imagensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$imagensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    servicos<T extends produtos$servicosArgs<ExtArgs> = {}>(args?: Subset<T, produtos$servicosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the produtos model
   */
  interface produtosFieldRefs {
    readonly Id_Produto: FieldRef<"produtos", 'Int'>
    readonly Nome: FieldRef<"produtos", 'String'>
    readonly Estoque: FieldRef<"produtos", 'Int'>
    readonly EstoqueCritico: FieldRef<"produtos", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * produtos findUnique
   */
  export type produtosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos findUniqueOrThrow
   */
  export type produtosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos findFirst
   */
  export type produtosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for produtos.
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of produtos.
     */
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * produtos findFirstOrThrow
   */
  export type produtosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for produtos.
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of produtos.
     */
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * produtos findMany
   */
  export type produtosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter, which produtos to fetch.
     */
    where?: produtosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of produtos to fetch.
     */
    orderBy?: produtosOrderByWithRelationInput | produtosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing produtos.
     */
    cursor?: produtosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` produtos.
     */
    skip?: number
    distinct?: ProdutosScalarFieldEnum | ProdutosScalarFieldEnum[]
  }

  /**
   * produtos create
   */
  export type produtosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * The data needed to create a produtos.
     */
    data?: XOR<produtosCreateInput, produtosUncheckedCreateInput>
  }

  /**
   * produtos createMany
   */
  export type produtosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many produtos.
     */
    data: produtosCreateManyInput | produtosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * produtos update
   */
  export type produtosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * The data needed to update a produtos.
     */
    data: XOR<produtosUpdateInput, produtosUncheckedUpdateInput>
    /**
     * Choose, which produtos to update.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos updateMany
   */
  export type produtosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update produtos.
     */
    data: XOR<produtosUpdateManyMutationInput, produtosUncheckedUpdateManyInput>
    /**
     * Filter which produtos to update
     */
    where?: produtosWhereInput
    /**
     * Limit how many produtos to update.
     */
    limit?: number
  }

  /**
   * produtos upsert
   */
  export type produtosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * The filter to search for the produtos to update in case it exists.
     */
    where: produtosWhereUniqueInput
    /**
     * In case the produtos found by the `where` argument doesn't exist, create a new produtos with this data.
     */
    create: XOR<produtosCreateInput, produtosUncheckedCreateInput>
    /**
     * In case the produtos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<produtosUpdateInput, produtosUncheckedUpdateInput>
  }

  /**
   * produtos delete
   */
  export type produtosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    /**
     * Filter which produtos to delete.
     */
    where: produtosWhereUniqueInput
  }

  /**
   * produtos deleteMany
   */
  export type produtosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which produtos to delete
     */
    where?: produtosWhereInput
    /**
     * Limit how many produtos to delete.
     */
    limit?: number
  }

  /**
   * produtos.disponibilidadeprod
   */
  export type produtos$disponibilidadeprodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    where?: disponibilidadeprodWhereInput
    orderBy?: disponibilidadeprodOrderByWithRelationInput | disponibilidadeprodOrderByWithRelationInput[]
    cursor?: disponibilidadeprodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisponibilidadeprodScalarFieldEnum | DisponibilidadeprodScalarFieldEnum[]
  }

  /**
   * produtos.imagens
   */
  export type produtos$imagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the imagens
     */
    select?: imagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the imagens
     */
    omit?: imagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: imagensInclude<ExtArgs> | null
    where?: imagensWhereInput
    orderBy?: imagensOrderByWithRelationInput | imagensOrderByWithRelationInput[]
    cursor?: imagensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImagensScalarFieldEnum | ImagensScalarFieldEnum[]
  }

  /**
   * produtos.servicos
   */
  export type produtos$servicosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    where?: servicosWhereInput
    orderBy?: servicosOrderByWithRelationInput | servicosOrderByWithRelationInput[]
    cursor?: servicosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServicosScalarFieldEnum | ServicosScalarFieldEnum[]
  }

  /**
   * produtos without action
   */
  export type produtosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
  }


  /**
   * Model servicos
   */

  export type AggregateServicos = {
    _count: ServicosCountAggregateOutputType | null
    _avg: ServicosAvgAggregateOutputType | null
    _sum: ServicosSumAggregateOutputType | null
    _min: ServicosMinAggregateOutputType | null
    _max: ServicosMaxAggregateOutputType | null
  }

  export type ServicosAvgAggregateOutputType = {
    Id_Servico: number | null
    Duracao: number | null
    Valor: number | null
    Id_Produto: number | null
  }

  export type ServicosSumAggregateOutputType = {
    Id_Servico: number | null
    Duracao: number | null
    Valor: number | null
    Id_Produto: number | null
  }

  export type ServicosMinAggregateOutputType = {
    Id_Servico: number | null
    Nome: string | null
    Titulo: string | null
    Descricao: string | null
    Duracao: number | null
    Valor: number | null
    Id_Produto: number | null
  }

  export type ServicosMaxAggregateOutputType = {
    Id_Servico: number | null
    Nome: string | null
    Titulo: string | null
    Descricao: string | null
    Duracao: number | null
    Valor: number | null
    Id_Produto: number | null
  }

  export type ServicosCountAggregateOutputType = {
    Id_Servico: number
    Nome: number
    Titulo: number
    Descricao: number
    Duracao: number
    Valor: number
    Id_Produto: number
    _all: number
  }


  export type ServicosAvgAggregateInputType = {
    Id_Servico?: true
    Duracao?: true
    Valor?: true
    Id_Produto?: true
  }

  export type ServicosSumAggregateInputType = {
    Id_Servico?: true
    Duracao?: true
    Valor?: true
    Id_Produto?: true
  }

  export type ServicosMinAggregateInputType = {
    Id_Servico?: true
    Nome?: true
    Titulo?: true
    Descricao?: true
    Duracao?: true
    Valor?: true
    Id_Produto?: true
  }

  export type ServicosMaxAggregateInputType = {
    Id_Servico?: true
    Nome?: true
    Titulo?: true
    Descricao?: true
    Duracao?: true
    Valor?: true
    Id_Produto?: true
  }

  export type ServicosCountAggregateInputType = {
    Id_Servico?: true
    Nome?: true
    Titulo?: true
    Descricao?: true
    Duracao?: true
    Valor?: true
    Id_Produto?: true
    _all?: true
  }

  export type ServicosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which servicos to aggregate.
     */
    where?: servicosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of servicos to fetch.
     */
    orderBy?: servicosOrderByWithRelationInput | servicosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: servicosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned servicos
    **/
    _count?: true | ServicosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServicosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServicosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServicosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServicosMaxAggregateInputType
  }

  export type GetServicosAggregateType<T extends ServicosAggregateArgs> = {
        [P in keyof T & keyof AggregateServicos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServicos[P]>
      : GetScalarType<T[P], AggregateServicos[P]>
  }




  export type servicosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: servicosWhereInput
    orderBy?: servicosOrderByWithAggregationInput | servicosOrderByWithAggregationInput[]
    by: ServicosScalarFieldEnum[] | ServicosScalarFieldEnum
    having?: servicosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServicosCountAggregateInputType | true
    _avg?: ServicosAvgAggregateInputType
    _sum?: ServicosSumAggregateInputType
    _min?: ServicosMinAggregateInputType
    _max?: ServicosMaxAggregateInputType
  }

  export type ServicosGroupByOutputType = {
    Id_Servico: number
    Nome: string | null
    Titulo: string | null
    Descricao: string | null
    Duracao: number | null
    Valor: number | null
    Id_Produto: number | null
    _count: ServicosCountAggregateOutputType | null
    _avg: ServicosAvgAggregateOutputType | null
    _sum: ServicosSumAggregateOutputType | null
    _min: ServicosMinAggregateOutputType | null
    _max: ServicosMaxAggregateOutputType | null
  }

  type GetServicosGroupByPayload<T extends servicosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServicosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServicosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicosGroupByOutputType[P]>
            : GetScalarType<T[P], ServicosGroupByOutputType[P]>
        }
      >
    >


  export type servicosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Id_Servico?: boolean
    Nome?: boolean
    Titulo?: boolean
    Descricao?: boolean
    Duracao?: boolean
    Valor?: boolean
    Id_Produto?: boolean
    agendamentos?: boolean | servicos$agendamentosArgs<ExtArgs>
    disponibilidadeprod?: boolean | servicos$disponibilidadeprodArgs<ExtArgs>
    produtos?: boolean | servicos$produtosArgs<ExtArgs>
    _count?: boolean | ServicosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicos"]>



  export type servicosSelectScalar = {
    Id_Servico?: boolean
    Nome?: boolean
    Titulo?: boolean
    Descricao?: boolean
    Duracao?: boolean
    Valor?: boolean
    Id_Produto?: boolean
  }

  export type servicosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Id_Servico" | "Nome" | "Titulo" | "Descricao" | "Duracao" | "Valor" | "Id_Produto", ExtArgs["result"]["servicos"]>
  export type servicosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agendamentos?: boolean | servicos$agendamentosArgs<ExtArgs>
    disponibilidadeprod?: boolean | servicos$disponibilidadeprodArgs<ExtArgs>
    produtos?: boolean | servicos$produtosArgs<ExtArgs>
    _count?: boolean | ServicosCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $servicosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "servicos"
    objects: {
      agendamentos: Prisma.$agendamentosPayload<ExtArgs>[]
      disponibilidadeprod: Prisma.$disponibilidadeprodPayload<ExtArgs>[]
      produtos: Prisma.$produtosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      Id_Servico: number
      Nome: string | null
      Titulo: string | null
      Descricao: string | null
      Duracao: number | null
      Valor: number | null
      Id_Produto: number | null
    }, ExtArgs["result"]["servicos"]>
    composites: {}
  }

  type servicosGetPayload<S extends boolean | null | undefined | servicosDefaultArgs> = $Result.GetResult<Prisma.$servicosPayload, S>

  type servicosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<servicosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServicosCountAggregateInputType | true
    }

  export interface servicosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['servicos'], meta: { name: 'servicos' } }
    /**
     * Find zero or one Servicos that matches the filter.
     * @param {servicosFindUniqueArgs} args - Arguments to find a Servicos
     * @example
     * // Get one Servicos
     * const servicos = await prisma.servicos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends servicosFindUniqueArgs>(args: SelectSubset<T, servicosFindUniqueArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Servicos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {servicosFindUniqueOrThrowArgs} args - Arguments to find a Servicos
     * @example
     * // Get one Servicos
     * const servicos = await prisma.servicos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends servicosFindUniqueOrThrowArgs>(args: SelectSubset<T, servicosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Servicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicosFindFirstArgs} args - Arguments to find a Servicos
     * @example
     * // Get one Servicos
     * const servicos = await prisma.servicos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends servicosFindFirstArgs>(args?: SelectSubset<T, servicosFindFirstArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Servicos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicosFindFirstOrThrowArgs} args - Arguments to find a Servicos
     * @example
     * // Get one Servicos
     * const servicos = await prisma.servicos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends servicosFindFirstOrThrowArgs>(args?: SelectSubset<T, servicosFindFirstOrThrowArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Servicos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servicos
     * const servicos = await prisma.servicos.findMany()
     * 
     * // Get first 10 Servicos
     * const servicos = await prisma.servicos.findMany({ take: 10 })
     * 
     * // Only select the `Id_Servico`
     * const servicosWithId_ServicoOnly = await prisma.servicos.findMany({ select: { Id_Servico: true } })
     * 
     */
    findMany<T extends servicosFindManyArgs>(args?: SelectSubset<T, servicosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Servicos.
     * @param {servicosCreateArgs} args - Arguments to create a Servicos.
     * @example
     * // Create one Servicos
     * const Servicos = await prisma.servicos.create({
     *   data: {
     *     // ... data to create a Servicos
     *   }
     * })
     * 
     */
    create<T extends servicosCreateArgs>(args: SelectSubset<T, servicosCreateArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Servicos.
     * @param {servicosCreateManyArgs} args - Arguments to create many Servicos.
     * @example
     * // Create many Servicos
     * const servicos = await prisma.servicos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends servicosCreateManyArgs>(args?: SelectSubset<T, servicosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Servicos.
     * @param {servicosDeleteArgs} args - Arguments to delete one Servicos.
     * @example
     * // Delete one Servicos
     * const Servicos = await prisma.servicos.delete({
     *   where: {
     *     // ... filter to delete one Servicos
     *   }
     * })
     * 
     */
    delete<T extends servicosDeleteArgs>(args: SelectSubset<T, servicosDeleteArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Servicos.
     * @param {servicosUpdateArgs} args - Arguments to update one Servicos.
     * @example
     * // Update one Servicos
     * const servicos = await prisma.servicos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends servicosUpdateArgs>(args: SelectSubset<T, servicosUpdateArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Servicos.
     * @param {servicosDeleteManyArgs} args - Arguments to filter Servicos to delete.
     * @example
     * // Delete a few Servicos
     * const { count } = await prisma.servicos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends servicosDeleteManyArgs>(args?: SelectSubset<T, servicosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servicos
     * const servicos = await prisma.servicos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends servicosUpdateManyArgs>(args: SelectSubset<T, servicosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Servicos.
     * @param {servicosUpsertArgs} args - Arguments to update or create a Servicos.
     * @example
     * // Update or create a Servicos
     * const servicos = await prisma.servicos.upsert({
     *   create: {
     *     // ... data to create a Servicos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Servicos we want to update
     *   }
     * })
     */
    upsert<T extends servicosUpsertArgs>(args: SelectSubset<T, servicosUpsertArgs<ExtArgs>>): Prisma__servicosClient<$Result.GetResult<Prisma.$servicosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicosCountArgs} args - Arguments to filter Servicos to count.
     * @example
     * // Count the number of Servicos
     * const count = await prisma.servicos.count({
     *   where: {
     *     // ... the filter for the Servicos we want to count
     *   }
     * })
    **/
    count<T extends servicosCountArgs>(
      args?: Subset<T, servicosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServicosAggregateArgs>(args: Subset<T, ServicosAggregateArgs>): Prisma.PrismaPromise<GetServicosAggregateType<T>>

    /**
     * Group by Servicos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {servicosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends servicosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: servicosGroupByArgs['orderBy'] }
        : { orderBy?: servicosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, servicosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServicosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the servicos model
   */
  readonly fields: servicosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for servicos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__servicosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agendamentos<T extends servicos$agendamentosArgs<ExtArgs> = {}>(args?: Subset<T, servicos$agendamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agendamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    disponibilidadeprod<T extends servicos$disponibilidadeprodArgs<ExtArgs> = {}>(args?: Subset<T, servicos$disponibilidadeprodArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$disponibilidadeprodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    produtos<T extends servicos$produtosArgs<ExtArgs> = {}>(args?: Subset<T, servicos$produtosArgs<ExtArgs>>): Prisma__produtosClient<$Result.GetResult<Prisma.$produtosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the servicos model
   */
  interface servicosFieldRefs {
    readonly Id_Servico: FieldRef<"servicos", 'Int'>
    readonly Nome: FieldRef<"servicos", 'String'>
    readonly Titulo: FieldRef<"servicos", 'String'>
    readonly Descricao: FieldRef<"servicos", 'String'>
    readonly Duracao: FieldRef<"servicos", 'Int'>
    readonly Valor: FieldRef<"servicos", 'Int'>
    readonly Id_Produto: FieldRef<"servicos", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * servicos findUnique
   */
  export type servicosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * Filter, which servicos to fetch.
     */
    where: servicosWhereUniqueInput
  }

  /**
   * servicos findUniqueOrThrow
   */
  export type servicosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * Filter, which servicos to fetch.
     */
    where: servicosWhereUniqueInput
  }

  /**
   * servicos findFirst
   */
  export type servicosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * Filter, which servicos to fetch.
     */
    where?: servicosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of servicos to fetch.
     */
    orderBy?: servicosOrderByWithRelationInput | servicosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for servicos.
     */
    cursor?: servicosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of servicos.
     */
    distinct?: ServicosScalarFieldEnum | ServicosScalarFieldEnum[]
  }

  /**
   * servicos findFirstOrThrow
   */
  export type servicosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * Filter, which servicos to fetch.
     */
    where?: servicosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of servicos to fetch.
     */
    orderBy?: servicosOrderByWithRelationInput | servicosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for servicos.
     */
    cursor?: servicosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` servicos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of servicos.
     */
    distinct?: ServicosScalarFieldEnum | ServicosScalarFieldEnum[]
  }

  /**
   * servicos findMany
   */
  export type servicosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * Filter, which servicos to fetch.
     */
    where?: servicosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of servicos to fetch.
     */
    orderBy?: servicosOrderByWithRelationInput | servicosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing servicos.
     */
    cursor?: servicosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` servicos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` servicos.
     */
    skip?: number
    distinct?: ServicosScalarFieldEnum | ServicosScalarFieldEnum[]
  }

  /**
   * servicos create
   */
  export type servicosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * The data needed to create a servicos.
     */
    data?: XOR<servicosCreateInput, servicosUncheckedCreateInput>
  }

  /**
   * servicos createMany
   */
  export type servicosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many servicos.
     */
    data: servicosCreateManyInput | servicosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * servicos update
   */
  export type servicosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * The data needed to update a servicos.
     */
    data: XOR<servicosUpdateInput, servicosUncheckedUpdateInput>
    /**
     * Choose, which servicos to update.
     */
    where: servicosWhereUniqueInput
  }

  /**
   * servicos updateMany
   */
  export type servicosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update servicos.
     */
    data: XOR<servicosUpdateManyMutationInput, servicosUncheckedUpdateManyInput>
    /**
     * Filter which servicos to update
     */
    where?: servicosWhereInput
    /**
     * Limit how many servicos to update.
     */
    limit?: number
  }

  /**
   * servicos upsert
   */
  export type servicosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * The filter to search for the servicos to update in case it exists.
     */
    where: servicosWhereUniqueInput
    /**
     * In case the servicos found by the `where` argument doesn't exist, create a new servicos with this data.
     */
    create: XOR<servicosCreateInput, servicosUncheckedCreateInput>
    /**
     * In case the servicos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<servicosUpdateInput, servicosUncheckedUpdateInput>
  }

  /**
   * servicos delete
   */
  export type servicosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
    /**
     * Filter which servicos to delete.
     */
    where: servicosWhereUniqueInput
  }

  /**
   * servicos deleteMany
   */
  export type servicosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which servicos to delete
     */
    where?: servicosWhereInput
    /**
     * Limit how many servicos to delete.
     */
    limit?: number
  }

  /**
   * servicos.agendamentos
   */
  export type servicos$agendamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agendamentos
     */
    select?: agendamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agendamentos
     */
    omit?: agendamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agendamentosInclude<ExtArgs> | null
    where?: agendamentosWhereInput
    orderBy?: agendamentosOrderByWithRelationInput | agendamentosOrderByWithRelationInput[]
    cursor?: agendamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendamentosScalarFieldEnum | AgendamentosScalarFieldEnum[]
  }

  /**
   * servicos.disponibilidadeprod
   */
  export type servicos$disponibilidadeprodArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the disponibilidadeprod
     */
    select?: disponibilidadeprodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the disponibilidadeprod
     */
    omit?: disponibilidadeprodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: disponibilidadeprodInclude<ExtArgs> | null
    where?: disponibilidadeprodWhereInput
    orderBy?: disponibilidadeprodOrderByWithRelationInput | disponibilidadeprodOrderByWithRelationInput[]
    cursor?: disponibilidadeprodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisponibilidadeprodScalarFieldEnum | DisponibilidadeprodScalarFieldEnum[]
  }

  /**
   * servicos.produtos
   */
  export type servicos$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produtos
     */
    select?: produtosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the produtos
     */
    omit?: produtosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: produtosInclude<ExtArgs> | null
    where?: produtosWhereInput
  }

  /**
   * servicos without action
   */
  export type servicosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the servicos
     */
    select?: servicosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the servicos
     */
    omit?: servicosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: servicosInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgendamentosScalarFieldEnum: {
    Id_Agendamento: 'Id_Agendamento',
    Id_Servico: 'Id_Servico',
    Id_Cliente: 'Id_Cliente',
    Id_Funcionario: 'Id_Funcionario',
    Data: 'Data',
    HoraInicio: 'HoraInicio',
    HoraFinal: 'HoraFinal',
    Status: 'Status',
    Observacoes: 'Observacoes',
    LembreteEnviado: 'LembreteEnviado'
  };

  export type AgendamentosScalarFieldEnum = (typeof AgendamentosScalarFieldEnum)[keyof typeof AgendamentosScalarFieldEnum]


  export const ClientesScalarFieldEnum: {
    Id_Cliente: 'Id_Cliente',
    Nome: 'Nome',
    Email: 'Email',
    Telemovel: 'Telemovel',
    Senha: 'Senha',
    DataNascimento: 'DataNascimento',
    Morada: 'Morada',
    Nif: 'Nif'
  };

  export type ClientesScalarFieldEnum = (typeof ClientesScalarFieldEnum)[keyof typeof ClientesScalarFieldEnum]


  export const DisponibilidadeprodScalarFieldEnum: {
    Id_Disponibilidade: 'Id_Disponibilidade',
    Id_Produto: 'Id_Produto',
    Id_Servico: 'Id_Servico'
  };

  export type DisponibilidadeprodScalarFieldEnum = (typeof DisponibilidadeprodScalarFieldEnum)[keyof typeof DisponibilidadeprodScalarFieldEnum]


  export const FuncionariosScalarFieldEnum: {
    Id_Funcionario: 'Id_Funcionario',
    Nome: 'Nome',
    Email: 'Email',
    Administrador: 'Administrador',
    Senha: 'Senha',
    Status: 'Status'
  };

  export type FuncionariosScalarFieldEnum = (typeof FuncionariosScalarFieldEnum)[keyof typeof FuncionariosScalarFieldEnum]


  export const ImagensScalarFieldEnum: {
    Id_Imagem: 'Id_Imagem',
    Id_Produto: 'Id_Produto',
    CaminhoImagem: 'CaminhoImagem',
    AltText: 'AltText'
  };

  export type ImagensScalarFieldEnum = (typeof ImagensScalarFieldEnum)[keyof typeof ImagensScalarFieldEnum]


  export const PagamentosScalarFieldEnum: {
    Id_Pagamentos: 'Id_Pagamentos',
    Valor: 'Valor',
    Status: 'Status',
    Modalidade: 'Modalidade',
    Fatura: 'Fatura',
    Id_Agendamento: 'Id_Agendamento'
  };

  export type PagamentosScalarFieldEnum = (typeof PagamentosScalarFieldEnum)[keyof typeof PagamentosScalarFieldEnum]


  export const ProdutosScalarFieldEnum: {
    Id_Produto: 'Id_Produto',
    Nome: 'Nome',
    Estoque: 'Estoque',
    EstoqueCritico: 'EstoqueCritico'
  };

  export type ProdutosScalarFieldEnum = (typeof ProdutosScalarFieldEnum)[keyof typeof ProdutosScalarFieldEnum]


  export const ServicosScalarFieldEnum: {
    Id_Servico: 'Id_Servico',
    Nome: 'Nome',
    Titulo: 'Titulo',
    Descricao: 'Descricao',
    Duracao: 'Duracao',
    Valor: 'Valor',
    Id_Produto: 'Id_Produto'
  };

  export type ServicosScalarFieldEnum = (typeof ServicosScalarFieldEnum)[keyof typeof ServicosScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const agendamentosOrderByRelevanceFieldEnum: {
    Observacoes: 'Observacoes'
  };

  export type agendamentosOrderByRelevanceFieldEnum = (typeof agendamentosOrderByRelevanceFieldEnum)[keyof typeof agendamentosOrderByRelevanceFieldEnum]


  export const clientesOrderByRelevanceFieldEnum: {
    Nome: 'Nome',
    Email: 'Email',
    Telemovel: 'Telemovel',
    Senha: 'Senha',
    Morada: 'Morada'
  };

  export type clientesOrderByRelevanceFieldEnum = (typeof clientesOrderByRelevanceFieldEnum)[keyof typeof clientesOrderByRelevanceFieldEnum]


  export const funcionariosOrderByRelevanceFieldEnum: {
    Nome: 'Nome',
    Email: 'Email',
    Senha: 'Senha'
  };

  export type funcionariosOrderByRelevanceFieldEnum = (typeof funcionariosOrderByRelevanceFieldEnum)[keyof typeof funcionariosOrderByRelevanceFieldEnum]


  export const imagensOrderByRelevanceFieldEnum: {
    CaminhoImagem: 'CaminhoImagem',
    AltText: 'AltText'
  };

  export type imagensOrderByRelevanceFieldEnum = (typeof imagensOrderByRelevanceFieldEnum)[keyof typeof imagensOrderByRelevanceFieldEnum]


  export const produtosOrderByRelevanceFieldEnum: {
    Nome: 'Nome'
  };

  export type produtosOrderByRelevanceFieldEnum = (typeof produtosOrderByRelevanceFieldEnum)[keyof typeof produtosOrderByRelevanceFieldEnum]


  export const servicosOrderByRelevanceFieldEnum: {
    Nome: 'Nome',
    Titulo: 'Titulo',
    Descricao: 'Descricao'
  };

  export type servicosOrderByRelevanceFieldEnum = (typeof servicosOrderByRelevanceFieldEnum)[keyof typeof servicosOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'agendamentos_Status'
   */
  export type Enumagendamentos_StatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'agendamentos_Status'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'funcionarios_Status'
   */
  export type Enumfuncionarios_StatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'funcionarios_Status'>
    


  /**
   * Reference to a field of type 'pagamentos_Status'
   */
  export type Enumpagamentos_StatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'pagamentos_Status'>
    


  /**
   * Reference to a field of type 'pagamentos_Modalidade'
   */
  export type Enumpagamentos_ModalidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'pagamentos_Modalidade'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type agendamentosWhereInput = {
    AND?: agendamentosWhereInput | agendamentosWhereInput[]
    OR?: agendamentosWhereInput[]
    NOT?: agendamentosWhereInput | agendamentosWhereInput[]
    Id_Agendamento?: IntFilter<"agendamentos"> | number
    Id_Servico?: IntFilter<"agendamentos"> | number
    Id_Cliente?: IntFilter<"agendamentos"> | number
    Id_Funcionario?: IntNullableFilter<"agendamentos"> | number | null
    Data?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    HoraInicio?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    HoraFinal?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    Status?: Enumagendamentos_StatusNullableFilter<"agendamentos"> | $Enums.agendamentos_Status | null
    Observacoes?: StringNullableFilter<"agendamentos"> | string | null
    LembreteEnviado?: BoolFilter<"agendamentos"> | boolean
    servicos?: XOR<ServicosScalarRelationFilter, servicosWhereInput>
    clientes?: XOR<ClientesScalarRelationFilter, clientesWhereInput>
    funcionarios?: XOR<FuncionariosNullableScalarRelationFilter, funcionariosWhereInput> | null
    pagamentos?: PagamentosListRelationFilter
  }

  export type agendamentosOrderByWithRelationInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrderInput | SortOrder
    Data?: SortOrderInput | SortOrder
    HoraInicio?: SortOrderInput | SortOrder
    HoraFinal?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    Observacoes?: SortOrderInput | SortOrder
    LembreteEnviado?: SortOrder
    servicos?: servicosOrderByWithRelationInput
    clientes?: clientesOrderByWithRelationInput
    funcionarios?: funcionariosOrderByWithRelationInput
    pagamentos?: pagamentosOrderByRelationAggregateInput
    _relevance?: agendamentosOrderByRelevanceInput
  }

  export type agendamentosWhereUniqueInput = Prisma.AtLeast<{
    Id_Agendamento?: number
    AND?: agendamentosWhereInput | agendamentosWhereInput[]
    OR?: agendamentosWhereInput[]
    NOT?: agendamentosWhereInput | agendamentosWhereInput[]
    Id_Servico?: IntFilter<"agendamentos"> | number
    Id_Cliente?: IntFilter<"agendamentos"> | number
    Id_Funcionario?: IntNullableFilter<"agendamentos"> | number | null
    Data?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    HoraInicio?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    HoraFinal?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    Status?: Enumagendamentos_StatusNullableFilter<"agendamentos"> | $Enums.agendamentos_Status | null
    Observacoes?: StringNullableFilter<"agendamentos"> | string | null
    LembreteEnviado?: BoolFilter<"agendamentos"> | boolean
    servicos?: XOR<ServicosScalarRelationFilter, servicosWhereInput>
    clientes?: XOR<ClientesScalarRelationFilter, clientesWhereInput>
    funcionarios?: XOR<FuncionariosNullableScalarRelationFilter, funcionariosWhereInput> | null
    pagamentos?: PagamentosListRelationFilter
  }, "Id_Agendamento">

  export type agendamentosOrderByWithAggregationInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrderInput | SortOrder
    Data?: SortOrderInput | SortOrder
    HoraInicio?: SortOrderInput | SortOrder
    HoraFinal?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    Observacoes?: SortOrderInput | SortOrder
    LembreteEnviado?: SortOrder
    _count?: agendamentosCountOrderByAggregateInput
    _avg?: agendamentosAvgOrderByAggregateInput
    _max?: agendamentosMaxOrderByAggregateInput
    _min?: agendamentosMinOrderByAggregateInput
    _sum?: agendamentosSumOrderByAggregateInput
  }

  export type agendamentosScalarWhereWithAggregatesInput = {
    AND?: agendamentosScalarWhereWithAggregatesInput | agendamentosScalarWhereWithAggregatesInput[]
    OR?: agendamentosScalarWhereWithAggregatesInput[]
    NOT?: agendamentosScalarWhereWithAggregatesInput | agendamentosScalarWhereWithAggregatesInput[]
    Id_Agendamento?: IntWithAggregatesFilter<"agendamentos"> | number
    Id_Servico?: IntWithAggregatesFilter<"agendamentos"> | number
    Id_Cliente?: IntWithAggregatesFilter<"agendamentos"> | number
    Id_Funcionario?: IntNullableWithAggregatesFilter<"agendamentos"> | number | null
    Data?: DateTimeNullableWithAggregatesFilter<"agendamentos"> | Date | string | null
    HoraInicio?: DateTimeNullableWithAggregatesFilter<"agendamentos"> | Date | string | null
    HoraFinal?: DateTimeNullableWithAggregatesFilter<"agendamentos"> | Date | string | null
    Status?: Enumagendamentos_StatusNullableWithAggregatesFilter<"agendamentos"> | $Enums.agendamentos_Status | null
    Observacoes?: StringNullableWithAggregatesFilter<"agendamentos"> | string | null
    LembreteEnviado?: BoolWithAggregatesFilter<"agendamentos"> | boolean
  }

  export type clientesWhereInput = {
    AND?: clientesWhereInput | clientesWhereInput[]
    OR?: clientesWhereInput[]
    NOT?: clientesWhereInput | clientesWhereInput[]
    Id_Cliente?: IntFilter<"clientes"> | number
    Nome?: StringNullableFilter<"clientes"> | string | null
    Email?: StringNullableFilter<"clientes"> | string | null
    Telemovel?: StringNullableFilter<"clientes"> | string | null
    Senha?: StringNullableFilter<"clientes"> | string | null
    DataNascimento?: DateTimeNullableFilter<"clientes"> | Date | string | null
    Morada?: StringNullableFilter<"clientes"> | string | null
    Nif?: IntNullableFilter<"clientes"> | number | null
    agendamentos?: AgendamentosListRelationFilter
  }

  export type clientesOrderByWithRelationInput = {
    Id_Cliente?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    Telemovel?: SortOrderInput | SortOrder
    Senha?: SortOrderInput | SortOrder
    DataNascimento?: SortOrderInput | SortOrder
    Morada?: SortOrderInput | SortOrder
    Nif?: SortOrderInput | SortOrder
    agendamentos?: agendamentosOrderByRelationAggregateInput
    _relevance?: clientesOrderByRelevanceInput
  }

  export type clientesWhereUniqueInput = Prisma.AtLeast<{
    Id_Cliente?: number
    AND?: clientesWhereInput | clientesWhereInput[]
    OR?: clientesWhereInput[]
    NOT?: clientesWhereInput | clientesWhereInput[]
    Nome?: StringNullableFilter<"clientes"> | string | null
    Email?: StringNullableFilter<"clientes"> | string | null
    Telemovel?: StringNullableFilter<"clientes"> | string | null
    Senha?: StringNullableFilter<"clientes"> | string | null
    DataNascimento?: DateTimeNullableFilter<"clientes"> | Date | string | null
    Morada?: StringNullableFilter<"clientes"> | string | null
    Nif?: IntNullableFilter<"clientes"> | number | null
    agendamentos?: AgendamentosListRelationFilter
  }, "Id_Cliente">

  export type clientesOrderByWithAggregationInput = {
    Id_Cliente?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    Telemovel?: SortOrderInput | SortOrder
    Senha?: SortOrderInput | SortOrder
    DataNascimento?: SortOrderInput | SortOrder
    Morada?: SortOrderInput | SortOrder
    Nif?: SortOrderInput | SortOrder
    _count?: clientesCountOrderByAggregateInput
    _avg?: clientesAvgOrderByAggregateInput
    _max?: clientesMaxOrderByAggregateInput
    _min?: clientesMinOrderByAggregateInput
    _sum?: clientesSumOrderByAggregateInput
  }

  export type clientesScalarWhereWithAggregatesInput = {
    AND?: clientesScalarWhereWithAggregatesInput | clientesScalarWhereWithAggregatesInput[]
    OR?: clientesScalarWhereWithAggregatesInput[]
    NOT?: clientesScalarWhereWithAggregatesInput | clientesScalarWhereWithAggregatesInput[]
    Id_Cliente?: IntWithAggregatesFilter<"clientes"> | number
    Nome?: StringNullableWithAggregatesFilter<"clientes"> | string | null
    Email?: StringNullableWithAggregatesFilter<"clientes"> | string | null
    Telemovel?: StringNullableWithAggregatesFilter<"clientes"> | string | null
    Senha?: StringNullableWithAggregatesFilter<"clientes"> | string | null
    DataNascimento?: DateTimeNullableWithAggregatesFilter<"clientes"> | Date | string | null
    Morada?: StringNullableWithAggregatesFilter<"clientes"> | string | null
    Nif?: IntNullableWithAggregatesFilter<"clientes"> | number | null
  }

  export type disponibilidadeprodWhereInput = {
    AND?: disponibilidadeprodWhereInput | disponibilidadeprodWhereInput[]
    OR?: disponibilidadeprodWhereInput[]
    NOT?: disponibilidadeprodWhereInput | disponibilidadeprodWhereInput[]
    Id_Disponibilidade?: IntFilter<"disponibilidadeprod"> | number
    Id_Produto?: IntFilter<"disponibilidadeprod"> | number
    Id_Servico?: IntFilter<"disponibilidadeprod"> | number
    produtos?: XOR<ProdutosScalarRelationFilter, produtosWhereInput>
    servicos?: XOR<ServicosScalarRelationFilter, servicosWhereInput>
  }

  export type disponibilidadeprodOrderByWithRelationInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
    produtos?: produtosOrderByWithRelationInput
    servicos?: servicosOrderByWithRelationInput
  }

  export type disponibilidadeprodWhereUniqueInput = Prisma.AtLeast<{
    Id_Disponibilidade?: number
    AND?: disponibilidadeprodWhereInput | disponibilidadeprodWhereInput[]
    OR?: disponibilidadeprodWhereInput[]
    NOT?: disponibilidadeprodWhereInput | disponibilidadeprodWhereInput[]
    Id_Produto?: IntFilter<"disponibilidadeprod"> | number
    Id_Servico?: IntFilter<"disponibilidadeprod"> | number
    produtos?: XOR<ProdutosScalarRelationFilter, produtosWhereInput>
    servicos?: XOR<ServicosScalarRelationFilter, servicosWhereInput>
  }, "Id_Disponibilidade">

  export type disponibilidadeprodOrderByWithAggregationInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
    _count?: disponibilidadeprodCountOrderByAggregateInput
    _avg?: disponibilidadeprodAvgOrderByAggregateInput
    _max?: disponibilidadeprodMaxOrderByAggregateInput
    _min?: disponibilidadeprodMinOrderByAggregateInput
    _sum?: disponibilidadeprodSumOrderByAggregateInput
  }

  export type disponibilidadeprodScalarWhereWithAggregatesInput = {
    AND?: disponibilidadeprodScalarWhereWithAggregatesInput | disponibilidadeprodScalarWhereWithAggregatesInput[]
    OR?: disponibilidadeprodScalarWhereWithAggregatesInput[]
    NOT?: disponibilidadeprodScalarWhereWithAggregatesInput | disponibilidadeprodScalarWhereWithAggregatesInput[]
    Id_Disponibilidade?: IntWithAggregatesFilter<"disponibilidadeprod"> | number
    Id_Produto?: IntWithAggregatesFilter<"disponibilidadeprod"> | number
    Id_Servico?: IntWithAggregatesFilter<"disponibilidadeprod"> | number
  }

  export type funcionariosWhereInput = {
    AND?: funcionariosWhereInput | funcionariosWhereInput[]
    OR?: funcionariosWhereInput[]
    NOT?: funcionariosWhereInput | funcionariosWhereInput[]
    Id_Funcionario?: IntFilter<"funcionarios"> | number
    Nome?: StringNullableFilter<"funcionarios"> | string | null
    Email?: StringNullableFilter<"funcionarios"> | string | null
    Administrador?: BoolNullableFilter<"funcionarios"> | boolean | null
    Senha?: StringNullableFilter<"funcionarios"> | string | null
    Status?: Enumfuncionarios_StatusNullableFilter<"funcionarios"> | $Enums.funcionarios_Status | null
    agendamentos?: AgendamentosListRelationFilter
  }

  export type funcionariosOrderByWithRelationInput = {
    Id_Funcionario?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    Administrador?: SortOrderInput | SortOrder
    Senha?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    agendamentos?: agendamentosOrderByRelationAggregateInput
    _relevance?: funcionariosOrderByRelevanceInput
  }

  export type funcionariosWhereUniqueInput = Prisma.AtLeast<{
    Id_Funcionario?: number
    AND?: funcionariosWhereInput | funcionariosWhereInput[]
    OR?: funcionariosWhereInput[]
    NOT?: funcionariosWhereInput | funcionariosWhereInput[]
    Nome?: StringNullableFilter<"funcionarios"> | string | null
    Email?: StringNullableFilter<"funcionarios"> | string | null
    Administrador?: BoolNullableFilter<"funcionarios"> | boolean | null
    Senha?: StringNullableFilter<"funcionarios"> | string | null
    Status?: Enumfuncionarios_StatusNullableFilter<"funcionarios"> | $Enums.funcionarios_Status | null
    agendamentos?: AgendamentosListRelationFilter
  }, "Id_Funcionario">

  export type funcionariosOrderByWithAggregationInput = {
    Id_Funcionario?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    Administrador?: SortOrderInput | SortOrder
    Senha?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    _count?: funcionariosCountOrderByAggregateInput
    _avg?: funcionariosAvgOrderByAggregateInput
    _max?: funcionariosMaxOrderByAggregateInput
    _min?: funcionariosMinOrderByAggregateInput
    _sum?: funcionariosSumOrderByAggregateInput
  }

  export type funcionariosScalarWhereWithAggregatesInput = {
    AND?: funcionariosScalarWhereWithAggregatesInput | funcionariosScalarWhereWithAggregatesInput[]
    OR?: funcionariosScalarWhereWithAggregatesInput[]
    NOT?: funcionariosScalarWhereWithAggregatesInput | funcionariosScalarWhereWithAggregatesInput[]
    Id_Funcionario?: IntWithAggregatesFilter<"funcionarios"> | number
    Nome?: StringNullableWithAggregatesFilter<"funcionarios"> | string | null
    Email?: StringNullableWithAggregatesFilter<"funcionarios"> | string | null
    Administrador?: BoolNullableWithAggregatesFilter<"funcionarios"> | boolean | null
    Senha?: StringNullableWithAggregatesFilter<"funcionarios"> | string | null
    Status?: Enumfuncionarios_StatusNullableWithAggregatesFilter<"funcionarios"> | $Enums.funcionarios_Status | null
  }

  export type imagensWhereInput = {
    AND?: imagensWhereInput | imagensWhereInput[]
    OR?: imagensWhereInput[]
    NOT?: imagensWhereInput | imagensWhereInput[]
    Id_Imagem?: IntFilter<"imagens"> | number
    Id_Produto?: IntNullableFilter<"imagens"> | number | null
    CaminhoImagem?: StringNullableFilter<"imagens"> | string | null
    AltText?: StringNullableFilter<"imagens"> | string | null
    produtos?: XOR<ProdutosNullableScalarRelationFilter, produtosWhereInput> | null
  }

  export type imagensOrderByWithRelationInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrderInput | SortOrder
    CaminhoImagem?: SortOrderInput | SortOrder
    AltText?: SortOrderInput | SortOrder
    produtos?: produtosOrderByWithRelationInput
    _relevance?: imagensOrderByRelevanceInput
  }

  export type imagensWhereUniqueInput = Prisma.AtLeast<{
    Id_Imagem?: number
    AND?: imagensWhereInput | imagensWhereInput[]
    OR?: imagensWhereInput[]
    NOT?: imagensWhereInput | imagensWhereInput[]
    Id_Produto?: IntNullableFilter<"imagens"> | number | null
    CaminhoImagem?: StringNullableFilter<"imagens"> | string | null
    AltText?: StringNullableFilter<"imagens"> | string | null
    produtos?: XOR<ProdutosNullableScalarRelationFilter, produtosWhereInput> | null
  }, "Id_Imagem">

  export type imagensOrderByWithAggregationInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrderInput | SortOrder
    CaminhoImagem?: SortOrderInput | SortOrder
    AltText?: SortOrderInput | SortOrder
    _count?: imagensCountOrderByAggregateInput
    _avg?: imagensAvgOrderByAggregateInput
    _max?: imagensMaxOrderByAggregateInput
    _min?: imagensMinOrderByAggregateInput
    _sum?: imagensSumOrderByAggregateInput
  }

  export type imagensScalarWhereWithAggregatesInput = {
    AND?: imagensScalarWhereWithAggregatesInput | imagensScalarWhereWithAggregatesInput[]
    OR?: imagensScalarWhereWithAggregatesInput[]
    NOT?: imagensScalarWhereWithAggregatesInput | imagensScalarWhereWithAggregatesInput[]
    Id_Imagem?: IntWithAggregatesFilter<"imagens"> | number
    Id_Produto?: IntNullableWithAggregatesFilter<"imagens"> | number | null
    CaminhoImagem?: StringNullableWithAggregatesFilter<"imagens"> | string | null
    AltText?: StringNullableWithAggregatesFilter<"imagens"> | string | null
  }

  export type pagamentosWhereInput = {
    AND?: pagamentosWhereInput | pagamentosWhereInput[]
    OR?: pagamentosWhereInput[]
    NOT?: pagamentosWhereInput | pagamentosWhereInput[]
    Id_Pagamentos?: IntFilter<"pagamentos"> | number
    Valor?: IntNullableFilter<"pagamentos"> | number | null
    Status?: Enumpagamentos_StatusNullableFilter<"pagamentos"> | $Enums.pagamentos_Status | null
    Modalidade?: Enumpagamentos_ModalidadeNullableFilter<"pagamentos"> | $Enums.pagamentos_Modalidade | null
    Fatura?: IntNullableFilter<"pagamentos"> | number | null
    Id_Agendamento?: IntNullableFilter<"pagamentos"> | number | null
    agendamentos?: XOR<AgendamentosNullableScalarRelationFilter, agendamentosWhereInput> | null
  }

  export type pagamentosOrderByWithRelationInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    Modalidade?: SortOrderInput | SortOrder
    Fatura?: SortOrderInput | SortOrder
    Id_Agendamento?: SortOrderInput | SortOrder
    agendamentos?: agendamentosOrderByWithRelationInput
  }

  export type pagamentosWhereUniqueInput = Prisma.AtLeast<{
    Id_Pagamentos?: number
    AND?: pagamentosWhereInput | pagamentosWhereInput[]
    OR?: pagamentosWhereInput[]
    NOT?: pagamentosWhereInput | pagamentosWhereInput[]
    Valor?: IntNullableFilter<"pagamentos"> | number | null
    Status?: Enumpagamentos_StatusNullableFilter<"pagamentos"> | $Enums.pagamentos_Status | null
    Modalidade?: Enumpagamentos_ModalidadeNullableFilter<"pagamentos"> | $Enums.pagamentos_Modalidade | null
    Fatura?: IntNullableFilter<"pagamentos"> | number | null
    Id_Agendamento?: IntNullableFilter<"pagamentos"> | number | null
    agendamentos?: XOR<AgendamentosNullableScalarRelationFilter, agendamentosWhereInput> | null
  }, "Id_Pagamentos">

  export type pagamentosOrderByWithAggregationInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    Modalidade?: SortOrderInput | SortOrder
    Fatura?: SortOrderInput | SortOrder
    Id_Agendamento?: SortOrderInput | SortOrder
    _count?: pagamentosCountOrderByAggregateInput
    _avg?: pagamentosAvgOrderByAggregateInput
    _max?: pagamentosMaxOrderByAggregateInput
    _min?: pagamentosMinOrderByAggregateInput
    _sum?: pagamentosSumOrderByAggregateInput
  }

  export type pagamentosScalarWhereWithAggregatesInput = {
    AND?: pagamentosScalarWhereWithAggregatesInput | pagamentosScalarWhereWithAggregatesInput[]
    OR?: pagamentosScalarWhereWithAggregatesInput[]
    NOT?: pagamentosScalarWhereWithAggregatesInput | pagamentosScalarWhereWithAggregatesInput[]
    Id_Pagamentos?: IntWithAggregatesFilter<"pagamentos"> | number
    Valor?: IntNullableWithAggregatesFilter<"pagamentos"> | number | null
    Status?: Enumpagamentos_StatusNullableWithAggregatesFilter<"pagamentos"> | $Enums.pagamentos_Status | null
    Modalidade?: Enumpagamentos_ModalidadeNullableWithAggregatesFilter<"pagamentos"> | $Enums.pagamentos_Modalidade | null
    Fatura?: IntNullableWithAggregatesFilter<"pagamentos"> | number | null
    Id_Agendamento?: IntNullableWithAggregatesFilter<"pagamentos"> | number | null
  }

  export type produtosWhereInput = {
    AND?: produtosWhereInput | produtosWhereInput[]
    OR?: produtosWhereInput[]
    NOT?: produtosWhereInput | produtosWhereInput[]
    Id_Produto?: IntFilter<"produtos"> | number
    Nome?: StringNullableFilter<"produtos"> | string | null
    Estoque?: IntNullableFilter<"produtos"> | number | null
    EstoqueCritico?: IntNullableFilter<"produtos"> | number | null
    disponibilidadeprod?: DisponibilidadeprodListRelationFilter
    imagens?: ImagensListRelationFilter
    servicos?: ServicosListRelationFilter
  }

  export type produtosOrderByWithRelationInput = {
    Id_Produto?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Estoque?: SortOrderInput | SortOrder
    EstoqueCritico?: SortOrderInput | SortOrder
    disponibilidadeprod?: disponibilidadeprodOrderByRelationAggregateInput
    imagens?: imagensOrderByRelationAggregateInput
    servicos?: servicosOrderByRelationAggregateInput
    _relevance?: produtosOrderByRelevanceInput
  }

  export type produtosWhereUniqueInput = Prisma.AtLeast<{
    Id_Produto?: number
    AND?: produtosWhereInput | produtosWhereInput[]
    OR?: produtosWhereInput[]
    NOT?: produtosWhereInput | produtosWhereInput[]
    Nome?: StringNullableFilter<"produtos"> | string | null
    Estoque?: IntNullableFilter<"produtos"> | number | null
    EstoqueCritico?: IntNullableFilter<"produtos"> | number | null
    disponibilidadeprod?: DisponibilidadeprodListRelationFilter
    imagens?: ImagensListRelationFilter
    servicos?: ServicosListRelationFilter
  }, "Id_Produto">

  export type produtosOrderByWithAggregationInput = {
    Id_Produto?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Estoque?: SortOrderInput | SortOrder
    EstoqueCritico?: SortOrderInput | SortOrder
    _count?: produtosCountOrderByAggregateInput
    _avg?: produtosAvgOrderByAggregateInput
    _max?: produtosMaxOrderByAggregateInput
    _min?: produtosMinOrderByAggregateInput
    _sum?: produtosSumOrderByAggregateInput
  }

  export type produtosScalarWhereWithAggregatesInput = {
    AND?: produtosScalarWhereWithAggregatesInput | produtosScalarWhereWithAggregatesInput[]
    OR?: produtosScalarWhereWithAggregatesInput[]
    NOT?: produtosScalarWhereWithAggregatesInput | produtosScalarWhereWithAggregatesInput[]
    Id_Produto?: IntWithAggregatesFilter<"produtos"> | number
    Nome?: StringNullableWithAggregatesFilter<"produtos"> | string | null
    Estoque?: IntNullableWithAggregatesFilter<"produtos"> | number | null
    EstoqueCritico?: IntNullableWithAggregatesFilter<"produtos"> | number | null
  }

  export type servicosWhereInput = {
    AND?: servicosWhereInput | servicosWhereInput[]
    OR?: servicosWhereInput[]
    NOT?: servicosWhereInput | servicosWhereInput[]
    Id_Servico?: IntFilter<"servicos"> | number
    Nome?: StringNullableFilter<"servicos"> | string | null
    Titulo?: StringNullableFilter<"servicos"> | string | null
    Descricao?: StringNullableFilter<"servicos"> | string | null
    Duracao?: IntNullableFilter<"servicos"> | number | null
    Valor?: IntNullableFilter<"servicos"> | number | null
    Id_Produto?: IntNullableFilter<"servicos"> | number | null
    agendamentos?: AgendamentosListRelationFilter
    disponibilidadeprod?: DisponibilidadeprodListRelationFilter
    produtos?: XOR<ProdutosNullableScalarRelationFilter, produtosWhereInput> | null
  }

  export type servicosOrderByWithRelationInput = {
    Id_Servico?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Titulo?: SortOrderInput | SortOrder
    Descricao?: SortOrderInput | SortOrder
    Duracao?: SortOrderInput | SortOrder
    Valor?: SortOrderInput | SortOrder
    Id_Produto?: SortOrderInput | SortOrder
    agendamentos?: agendamentosOrderByRelationAggregateInput
    disponibilidadeprod?: disponibilidadeprodOrderByRelationAggregateInput
    produtos?: produtosOrderByWithRelationInput
    _relevance?: servicosOrderByRelevanceInput
  }

  export type servicosWhereUniqueInput = Prisma.AtLeast<{
    Id_Servico?: number
    AND?: servicosWhereInput | servicosWhereInput[]
    OR?: servicosWhereInput[]
    NOT?: servicosWhereInput | servicosWhereInput[]
    Nome?: StringNullableFilter<"servicos"> | string | null
    Titulo?: StringNullableFilter<"servicos"> | string | null
    Descricao?: StringNullableFilter<"servicos"> | string | null
    Duracao?: IntNullableFilter<"servicos"> | number | null
    Valor?: IntNullableFilter<"servicos"> | number | null
    Id_Produto?: IntNullableFilter<"servicos"> | number | null
    agendamentos?: AgendamentosListRelationFilter
    disponibilidadeprod?: DisponibilidadeprodListRelationFilter
    produtos?: XOR<ProdutosNullableScalarRelationFilter, produtosWhereInput> | null
  }, "Id_Servico">

  export type servicosOrderByWithAggregationInput = {
    Id_Servico?: SortOrder
    Nome?: SortOrderInput | SortOrder
    Titulo?: SortOrderInput | SortOrder
    Descricao?: SortOrderInput | SortOrder
    Duracao?: SortOrderInput | SortOrder
    Valor?: SortOrderInput | SortOrder
    Id_Produto?: SortOrderInput | SortOrder
    _count?: servicosCountOrderByAggregateInput
    _avg?: servicosAvgOrderByAggregateInput
    _max?: servicosMaxOrderByAggregateInput
    _min?: servicosMinOrderByAggregateInput
    _sum?: servicosSumOrderByAggregateInput
  }

  export type servicosScalarWhereWithAggregatesInput = {
    AND?: servicosScalarWhereWithAggregatesInput | servicosScalarWhereWithAggregatesInput[]
    OR?: servicosScalarWhereWithAggregatesInput[]
    NOT?: servicosScalarWhereWithAggregatesInput | servicosScalarWhereWithAggregatesInput[]
    Id_Servico?: IntWithAggregatesFilter<"servicos"> | number
    Nome?: StringNullableWithAggregatesFilter<"servicos"> | string | null
    Titulo?: StringNullableWithAggregatesFilter<"servicos"> | string | null
    Descricao?: StringNullableWithAggregatesFilter<"servicos"> | string | null
    Duracao?: IntNullableWithAggregatesFilter<"servicos"> | number | null
    Valor?: IntNullableWithAggregatesFilter<"servicos"> | number | null
    Id_Produto?: IntNullableWithAggregatesFilter<"servicos"> | number | null
  }

  export type agendamentosCreateInput = {
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    servicos: servicosCreateNestedOneWithoutAgendamentosInput
    clientes: clientesCreateNestedOneWithoutAgendamentosInput
    funcionarios?: funcionariosCreateNestedOneWithoutAgendamentosInput
    pagamentos?: pagamentosCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosUncheckedCreateInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Cliente: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    pagamentos?: pagamentosUncheckedCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosUpdateInput = {
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    servicos?: servicosUpdateOneRequiredWithoutAgendamentosNestedInput
    clientes?: clientesUpdateOneRequiredWithoutAgendamentosNestedInput
    funcionarios?: funcionariosUpdateOneWithoutAgendamentosNestedInput
    pagamentos?: pagamentosUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    pagamentos?: pagamentosUncheckedUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosCreateManyInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Cliente: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
  }

  export type agendamentosUpdateManyMutationInput = {
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type agendamentosUncheckedUpdateManyInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type clientesCreateInput = {
    Nome?: string | null
    Email?: string | null
    Telemovel?: string | null
    Senha?: string | null
    DataNascimento?: Date | string | null
    Morada?: string | null
    Nif?: number | null
    agendamentos?: agendamentosCreateNestedManyWithoutClientesInput
  }

  export type clientesUncheckedCreateInput = {
    Id_Cliente?: number
    Nome?: string | null
    Email?: string | null
    Telemovel?: string | null
    Senha?: string | null
    DataNascimento?: Date | string | null
    Morada?: string | null
    Nif?: number | null
    agendamentos?: agendamentosUncheckedCreateNestedManyWithoutClientesInput
  }

  export type clientesUpdateInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Telemovel?: NullableStringFieldUpdateOperationsInput | string | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    DataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Morada?: NullableStringFieldUpdateOperationsInput | string | null
    Nif?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUpdateManyWithoutClientesNestedInput
  }

  export type clientesUncheckedUpdateInput = {
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Telemovel?: NullableStringFieldUpdateOperationsInput | string | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    DataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Morada?: NullableStringFieldUpdateOperationsInput | string | null
    Nif?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUncheckedUpdateManyWithoutClientesNestedInput
  }

  export type clientesCreateManyInput = {
    Id_Cliente?: number
    Nome?: string | null
    Email?: string | null
    Telemovel?: string | null
    Senha?: string | null
    DataNascimento?: Date | string | null
    Morada?: string | null
    Nif?: number | null
  }

  export type clientesUpdateManyMutationInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Telemovel?: NullableStringFieldUpdateOperationsInput | string | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    DataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Morada?: NullableStringFieldUpdateOperationsInput | string | null
    Nif?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type clientesUncheckedUpdateManyInput = {
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Telemovel?: NullableStringFieldUpdateOperationsInput | string | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    DataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Morada?: NullableStringFieldUpdateOperationsInput | string | null
    Nif?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type disponibilidadeprodCreateInput = {
    produtos: produtosCreateNestedOneWithoutDisponibilidadeprodInput
    servicos: servicosCreateNestedOneWithoutDisponibilidadeprodInput
  }

  export type disponibilidadeprodUncheckedCreateInput = {
    Id_Disponibilidade?: number
    Id_Produto: number
    Id_Servico: number
  }

  export type disponibilidadeprodUpdateInput = {
    produtos?: produtosUpdateOneRequiredWithoutDisponibilidadeprodNestedInput
    servicos?: servicosUpdateOneRequiredWithoutDisponibilidadeprodNestedInput
  }

  export type disponibilidadeprodUncheckedUpdateInput = {
    Id_Disponibilidade?: IntFieldUpdateOperationsInput | number
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
  }

  export type disponibilidadeprodCreateManyInput = {
    Id_Disponibilidade?: number
    Id_Produto: number
    Id_Servico: number
  }

  export type disponibilidadeprodUpdateManyMutationInput = {

  }

  export type disponibilidadeprodUncheckedUpdateManyInput = {
    Id_Disponibilidade?: IntFieldUpdateOperationsInput | number
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
  }

  export type funcionariosCreateInput = {
    Nome?: string | null
    Email?: string | null
    Administrador?: boolean | null
    Senha?: string | null
    Status?: $Enums.funcionarios_Status | null
    agendamentos?: agendamentosCreateNestedManyWithoutFuncionariosInput
  }

  export type funcionariosUncheckedCreateInput = {
    Id_Funcionario?: number
    Nome?: string | null
    Email?: string | null
    Administrador?: boolean | null
    Senha?: string | null
    Status?: $Enums.funcionarios_Status | null
    agendamentos?: agendamentosUncheckedCreateNestedManyWithoutFuncionariosInput
  }

  export type funcionariosUpdateInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Administrador?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableEnumfuncionarios_StatusFieldUpdateOperationsInput | $Enums.funcionarios_Status | null
    agendamentos?: agendamentosUpdateManyWithoutFuncionariosNestedInput
  }

  export type funcionariosUncheckedUpdateInput = {
    Id_Funcionario?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Administrador?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableEnumfuncionarios_StatusFieldUpdateOperationsInput | $Enums.funcionarios_Status | null
    agendamentos?: agendamentosUncheckedUpdateManyWithoutFuncionariosNestedInput
  }

  export type funcionariosCreateManyInput = {
    Id_Funcionario?: number
    Nome?: string | null
    Email?: string | null
    Administrador?: boolean | null
    Senha?: string | null
    Status?: $Enums.funcionarios_Status | null
  }

  export type funcionariosUpdateManyMutationInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Administrador?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableEnumfuncionarios_StatusFieldUpdateOperationsInput | $Enums.funcionarios_Status | null
  }

  export type funcionariosUncheckedUpdateManyInput = {
    Id_Funcionario?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Administrador?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableEnumfuncionarios_StatusFieldUpdateOperationsInput | $Enums.funcionarios_Status | null
  }

  export type imagensCreateInput = {
    CaminhoImagem?: string | null
    AltText?: string | null
    produtos?: produtosCreateNestedOneWithoutImagensInput
  }

  export type imagensUncheckedCreateInput = {
    Id_Imagem?: number
    Id_Produto?: number | null
    CaminhoImagem?: string | null
    AltText?: string | null
  }

  export type imagensUpdateInput = {
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
    produtos?: produtosUpdateOneWithoutImagensNestedInput
  }

  export type imagensUncheckedUpdateInput = {
    Id_Imagem?: IntFieldUpdateOperationsInput | number
    Id_Produto?: NullableIntFieldUpdateOperationsInput | number | null
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type imagensCreateManyInput = {
    Id_Imagem?: number
    Id_Produto?: number | null
    CaminhoImagem?: string | null
    AltText?: string | null
  }

  export type imagensUpdateManyMutationInput = {
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type imagensUncheckedUpdateManyInput = {
    Id_Imagem?: IntFieldUpdateOperationsInput | number
    Id_Produto?: NullableIntFieldUpdateOperationsInput | number | null
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pagamentosCreateInput = {
    Valor?: number | null
    Status?: $Enums.pagamentos_Status | null
    Modalidade?: $Enums.pagamentos_Modalidade | null
    Fatura?: number | null
    agendamentos?: agendamentosCreateNestedOneWithoutPagamentosInput
  }

  export type pagamentosUncheckedCreateInput = {
    Id_Pagamentos?: number
    Valor?: number | null
    Status?: $Enums.pagamentos_Status | null
    Modalidade?: $Enums.pagamentos_Modalidade | null
    Fatura?: number | null
    Id_Agendamento?: number | null
  }

  export type pagamentosUpdateInput = {
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUpdateOneWithoutPagamentosNestedInput
  }

  export type pagamentosUncheckedUpdateInput = {
    Id_Pagamentos?: IntFieldUpdateOperationsInput | number
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
    Id_Agendamento?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type pagamentosCreateManyInput = {
    Id_Pagamentos?: number
    Valor?: number | null
    Status?: $Enums.pagamentos_Status | null
    Modalidade?: $Enums.pagamentos_Modalidade | null
    Fatura?: number | null
    Id_Agendamento?: number | null
  }

  export type pagamentosUpdateManyMutationInput = {
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type pagamentosUncheckedUpdateManyInput = {
    Id_Pagamentos?: IntFieldUpdateOperationsInput | number
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
    Id_Agendamento?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type produtosCreateInput = {
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    disponibilidadeprod?: disponibilidadeprodCreateNestedManyWithoutProdutosInput
    imagens?: imagensCreateNestedManyWithoutProdutosInput
    servicos?: servicosCreateNestedManyWithoutProdutosInput
  }

  export type produtosUncheckedCreateInput = {
    Id_Produto?: number
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedCreateNestedManyWithoutProdutosInput
    imagens?: imagensUncheckedCreateNestedManyWithoutProdutosInput
    servicos?: servicosUncheckedCreateNestedManyWithoutProdutosInput
  }

  export type produtosUpdateInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUpdateManyWithoutProdutosNestedInput
    imagens?: imagensUpdateManyWithoutProdutosNestedInput
    servicos?: servicosUpdateManyWithoutProdutosNestedInput
  }

  export type produtosUncheckedUpdateInput = {
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedUpdateManyWithoutProdutosNestedInput
    imagens?: imagensUncheckedUpdateManyWithoutProdutosNestedInput
    servicos?: servicosUncheckedUpdateManyWithoutProdutosNestedInput
  }

  export type produtosCreateManyInput = {
    Id_Produto?: number
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
  }

  export type produtosUpdateManyMutationInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type produtosUncheckedUpdateManyInput = {
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type servicosCreateInput = {
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    agendamentos?: agendamentosCreateNestedManyWithoutServicosInput
    disponibilidadeprod?: disponibilidadeprodCreateNestedManyWithoutServicosInput
    produtos?: produtosCreateNestedOneWithoutServicosInput
  }

  export type servicosUncheckedCreateInput = {
    Id_Servico?: number
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    Id_Produto?: number | null
    agendamentos?: agendamentosUncheckedCreateNestedManyWithoutServicosInput
    disponibilidadeprod?: disponibilidadeprodUncheckedCreateNestedManyWithoutServicosInput
  }

  export type servicosUpdateInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUpdateManyWithoutServicosNestedInput
    disponibilidadeprod?: disponibilidadeprodUpdateManyWithoutServicosNestedInput
    produtos?: produtosUpdateOneWithoutServicosNestedInput
  }

  export type servicosUncheckedUpdateInput = {
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Id_Produto?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUncheckedUpdateManyWithoutServicosNestedInput
    disponibilidadeprod?: disponibilidadeprodUncheckedUpdateManyWithoutServicosNestedInput
  }

  export type servicosCreateManyInput = {
    Id_Servico?: number
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    Id_Produto?: number | null
  }

  export type servicosUpdateManyMutationInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type servicosUncheckedUpdateManyInput = {
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Id_Produto?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Enumagendamentos_StatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.agendamentos_Status | Enumagendamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.agendamentos_Status[] | null
    notIn?: $Enums.agendamentos_Status[] | null
    not?: NestedEnumagendamentos_StatusNullableFilter<$PrismaModel> | $Enums.agendamentos_Status | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ServicosScalarRelationFilter = {
    is?: servicosWhereInput
    isNot?: servicosWhereInput
  }

  export type ClientesScalarRelationFilter = {
    is?: clientesWhereInput
    isNot?: clientesWhereInput
  }

  export type FuncionariosNullableScalarRelationFilter = {
    is?: funcionariosWhereInput | null
    isNot?: funcionariosWhereInput | null
  }

  export type PagamentosListRelationFilter = {
    every?: pagamentosWhereInput
    some?: pagamentosWhereInput
    none?: pagamentosWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type pagamentosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agendamentosOrderByRelevanceInput = {
    fields: agendamentosOrderByRelevanceFieldEnum | agendamentosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type agendamentosCountOrderByAggregateInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrder
    Data?: SortOrder
    HoraInicio?: SortOrder
    HoraFinal?: SortOrder
    Status?: SortOrder
    Observacoes?: SortOrder
    LembreteEnviado?: SortOrder
  }

  export type agendamentosAvgOrderByAggregateInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrder
  }

  export type agendamentosMaxOrderByAggregateInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrder
    Data?: SortOrder
    HoraInicio?: SortOrder
    HoraFinal?: SortOrder
    Status?: SortOrder
    Observacoes?: SortOrder
    LembreteEnviado?: SortOrder
  }

  export type agendamentosMinOrderByAggregateInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrder
    Data?: SortOrder
    HoraInicio?: SortOrder
    HoraFinal?: SortOrder
    Status?: SortOrder
    Observacoes?: SortOrder
    LembreteEnviado?: SortOrder
  }

  export type agendamentosSumOrderByAggregateInput = {
    Id_Agendamento?: SortOrder
    Id_Servico?: SortOrder
    Id_Cliente?: SortOrder
    Id_Funcionario?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type Enumagendamentos_StatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.agendamentos_Status | Enumagendamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.agendamentos_Status[] | null
    notIn?: $Enums.agendamentos_Status[] | null
    not?: NestedEnumagendamentos_StatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.agendamentos_Status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumagendamentos_StatusNullableFilter<$PrismaModel>
    _max?: NestedEnumagendamentos_StatusNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgendamentosListRelationFilter = {
    every?: agendamentosWhereInput
    some?: agendamentosWhereInput
    none?: agendamentosWhereInput
  }

  export type agendamentosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type clientesOrderByRelevanceInput = {
    fields: clientesOrderByRelevanceFieldEnum | clientesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type clientesCountOrderByAggregateInput = {
    Id_Cliente?: SortOrder
    Nome?: SortOrder
    Email?: SortOrder
    Telemovel?: SortOrder
    Senha?: SortOrder
    DataNascimento?: SortOrder
    Morada?: SortOrder
    Nif?: SortOrder
  }

  export type clientesAvgOrderByAggregateInput = {
    Id_Cliente?: SortOrder
    Nif?: SortOrder
  }

  export type clientesMaxOrderByAggregateInput = {
    Id_Cliente?: SortOrder
    Nome?: SortOrder
    Email?: SortOrder
    Telemovel?: SortOrder
    Senha?: SortOrder
    DataNascimento?: SortOrder
    Morada?: SortOrder
    Nif?: SortOrder
  }

  export type clientesMinOrderByAggregateInput = {
    Id_Cliente?: SortOrder
    Nome?: SortOrder
    Email?: SortOrder
    Telemovel?: SortOrder
    Senha?: SortOrder
    DataNascimento?: SortOrder
    Morada?: SortOrder
    Nif?: SortOrder
  }

  export type clientesSumOrderByAggregateInput = {
    Id_Cliente?: SortOrder
    Nif?: SortOrder
  }

  export type ProdutosScalarRelationFilter = {
    is?: produtosWhereInput
    isNot?: produtosWhereInput
  }

  export type disponibilidadeprodCountOrderByAggregateInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
  }

  export type disponibilidadeprodAvgOrderByAggregateInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
  }

  export type disponibilidadeprodMaxOrderByAggregateInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
  }

  export type disponibilidadeprodMinOrderByAggregateInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
  }

  export type disponibilidadeprodSumOrderByAggregateInput = {
    Id_Disponibilidade?: SortOrder
    Id_Produto?: SortOrder
    Id_Servico?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type Enumfuncionarios_StatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.funcionarios_Status | Enumfuncionarios_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.funcionarios_Status[] | null
    notIn?: $Enums.funcionarios_Status[] | null
    not?: NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel> | $Enums.funcionarios_Status | null
  }

  export type funcionariosOrderByRelevanceInput = {
    fields: funcionariosOrderByRelevanceFieldEnum | funcionariosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type funcionariosCountOrderByAggregateInput = {
    Id_Funcionario?: SortOrder
    Nome?: SortOrder
    Email?: SortOrder
    Administrador?: SortOrder
    Senha?: SortOrder
    Status?: SortOrder
  }

  export type funcionariosAvgOrderByAggregateInput = {
    Id_Funcionario?: SortOrder
  }

  export type funcionariosMaxOrderByAggregateInput = {
    Id_Funcionario?: SortOrder
    Nome?: SortOrder
    Email?: SortOrder
    Administrador?: SortOrder
    Senha?: SortOrder
    Status?: SortOrder
  }

  export type funcionariosMinOrderByAggregateInput = {
    Id_Funcionario?: SortOrder
    Nome?: SortOrder
    Email?: SortOrder
    Administrador?: SortOrder
    Senha?: SortOrder
    Status?: SortOrder
  }

  export type funcionariosSumOrderByAggregateInput = {
    Id_Funcionario?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type Enumfuncionarios_StatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.funcionarios_Status | Enumfuncionarios_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.funcionarios_Status[] | null
    notIn?: $Enums.funcionarios_Status[] | null
    not?: NestedEnumfuncionarios_StatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.funcionarios_Status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel>
    _max?: NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel>
  }

  export type ProdutosNullableScalarRelationFilter = {
    is?: produtosWhereInput | null
    isNot?: produtosWhereInput | null
  }

  export type imagensOrderByRelevanceInput = {
    fields: imagensOrderByRelevanceFieldEnum | imagensOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type imagensCountOrderByAggregateInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrder
    CaminhoImagem?: SortOrder
    AltText?: SortOrder
  }

  export type imagensAvgOrderByAggregateInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrder
  }

  export type imagensMaxOrderByAggregateInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrder
    CaminhoImagem?: SortOrder
    AltText?: SortOrder
  }

  export type imagensMinOrderByAggregateInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrder
    CaminhoImagem?: SortOrder
    AltText?: SortOrder
  }

  export type imagensSumOrderByAggregateInput = {
    Id_Imagem?: SortOrder
    Id_Produto?: SortOrder
  }

  export type Enumpagamentos_StatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Status | Enumpagamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Status[] | null
    notIn?: $Enums.pagamentos_Status[] | null
    not?: NestedEnumpagamentos_StatusNullableFilter<$PrismaModel> | $Enums.pagamentos_Status | null
  }

  export type Enumpagamentos_ModalidadeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Modalidade | Enumpagamentos_ModalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Modalidade[] | null
    notIn?: $Enums.pagamentos_Modalidade[] | null
    not?: NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel> | $Enums.pagamentos_Modalidade | null
  }

  export type AgendamentosNullableScalarRelationFilter = {
    is?: agendamentosWhereInput | null
    isNot?: agendamentosWhereInput | null
  }

  export type pagamentosCountOrderByAggregateInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrder
    Status?: SortOrder
    Modalidade?: SortOrder
    Fatura?: SortOrder
    Id_Agendamento?: SortOrder
  }

  export type pagamentosAvgOrderByAggregateInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrder
    Fatura?: SortOrder
    Id_Agendamento?: SortOrder
  }

  export type pagamentosMaxOrderByAggregateInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrder
    Status?: SortOrder
    Modalidade?: SortOrder
    Fatura?: SortOrder
    Id_Agendamento?: SortOrder
  }

  export type pagamentosMinOrderByAggregateInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrder
    Status?: SortOrder
    Modalidade?: SortOrder
    Fatura?: SortOrder
    Id_Agendamento?: SortOrder
  }

  export type pagamentosSumOrderByAggregateInput = {
    Id_Pagamentos?: SortOrder
    Valor?: SortOrder
    Fatura?: SortOrder
    Id_Agendamento?: SortOrder
  }

  export type Enumpagamentos_StatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Status | Enumpagamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Status[] | null
    notIn?: $Enums.pagamentos_Status[] | null
    not?: NestedEnumpagamentos_StatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.pagamentos_Status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumpagamentos_StatusNullableFilter<$PrismaModel>
    _max?: NestedEnumpagamentos_StatusNullableFilter<$PrismaModel>
  }

  export type Enumpagamentos_ModalidadeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Modalidade | Enumpagamentos_ModalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Modalidade[] | null
    notIn?: $Enums.pagamentos_Modalidade[] | null
    not?: NestedEnumpagamentos_ModalidadeNullableWithAggregatesFilter<$PrismaModel> | $Enums.pagamentos_Modalidade | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel>
    _max?: NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel>
  }

  export type DisponibilidadeprodListRelationFilter = {
    every?: disponibilidadeprodWhereInput
    some?: disponibilidadeprodWhereInput
    none?: disponibilidadeprodWhereInput
  }

  export type ImagensListRelationFilter = {
    every?: imagensWhereInput
    some?: imagensWhereInput
    none?: imagensWhereInput
  }

  export type ServicosListRelationFilter = {
    every?: servicosWhereInput
    some?: servicosWhereInput
    none?: servicosWhereInput
  }

  export type disponibilidadeprodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type imagensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type servicosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type produtosOrderByRelevanceInput = {
    fields: produtosOrderByRelevanceFieldEnum | produtosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type produtosCountOrderByAggregateInput = {
    Id_Produto?: SortOrder
    Nome?: SortOrder
    Estoque?: SortOrder
    EstoqueCritico?: SortOrder
  }

  export type produtosAvgOrderByAggregateInput = {
    Id_Produto?: SortOrder
    Estoque?: SortOrder
    EstoqueCritico?: SortOrder
  }

  export type produtosMaxOrderByAggregateInput = {
    Id_Produto?: SortOrder
    Nome?: SortOrder
    Estoque?: SortOrder
    EstoqueCritico?: SortOrder
  }

  export type produtosMinOrderByAggregateInput = {
    Id_Produto?: SortOrder
    Nome?: SortOrder
    Estoque?: SortOrder
    EstoqueCritico?: SortOrder
  }

  export type produtosSumOrderByAggregateInput = {
    Id_Produto?: SortOrder
    Estoque?: SortOrder
    EstoqueCritico?: SortOrder
  }

  export type servicosOrderByRelevanceInput = {
    fields: servicosOrderByRelevanceFieldEnum | servicosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type servicosCountOrderByAggregateInput = {
    Id_Servico?: SortOrder
    Nome?: SortOrder
    Titulo?: SortOrder
    Descricao?: SortOrder
    Duracao?: SortOrder
    Valor?: SortOrder
    Id_Produto?: SortOrder
  }

  export type servicosAvgOrderByAggregateInput = {
    Id_Servico?: SortOrder
    Duracao?: SortOrder
    Valor?: SortOrder
    Id_Produto?: SortOrder
  }

  export type servicosMaxOrderByAggregateInput = {
    Id_Servico?: SortOrder
    Nome?: SortOrder
    Titulo?: SortOrder
    Descricao?: SortOrder
    Duracao?: SortOrder
    Valor?: SortOrder
    Id_Produto?: SortOrder
  }

  export type servicosMinOrderByAggregateInput = {
    Id_Servico?: SortOrder
    Nome?: SortOrder
    Titulo?: SortOrder
    Descricao?: SortOrder
    Duracao?: SortOrder
    Valor?: SortOrder
    Id_Produto?: SortOrder
  }

  export type servicosSumOrderByAggregateInput = {
    Id_Servico?: SortOrder
    Duracao?: SortOrder
    Valor?: SortOrder
    Id_Produto?: SortOrder
  }

  export type servicosCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<servicosCreateWithoutAgendamentosInput, servicosUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: servicosCreateOrConnectWithoutAgendamentosInput
    connect?: servicosWhereUniqueInput
  }

  export type clientesCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<clientesCreateWithoutAgendamentosInput, clientesUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: clientesCreateOrConnectWithoutAgendamentosInput
    connect?: clientesWhereUniqueInput
  }

  export type funcionariosCreateNestedOneWithoutAgendamentosInput = {
    create?: XOR<funcionariosCreateWithoutAgendamentosInput, funcionariosUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: funcionariosCreateOrConnectWithoutAgendamentosInput
    connect?: funcionariosWhereUniqueInput
  }

  export type pagamentosCreateNestedManyWithoutAgendamentosInput = {
    create?: XOR<pagamentosCreateWithoutAgendamentosInput, pagamentosUncheckedCreateWithoutAgendamentosInput> | pagamentosCreateWithoutAgendamentosInput[] | pagamentosUncheckedCreateWithoutAgendamentosInput[]
    connectOrCreate?: pagamentosCreateOrConnectWithoutAgendamentosInput | pagamentosCreateOrConnectWithoutAgendamentosInput[]
    createMany?: pagamentosCreateManyAgendamentosInputEnvelope
    connect?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
  }

  export type pagamentosUncheckedCreateNestedManyWithoutAgendamentosInput = {
    create?: XOR<pagamentosCreateWithoutAgendamentosInput, pagamentosUncheckedCreateWithoutAgendamentosInput> | pagamentosCreateWithoutAgendamentosInput[] | pagamentosUncheckedCreateWithoutAgendamentosInput[]
    connectOrCreate?: pagamentosCreateOrConnectWithoutAgendamentosInput | pagamentosCreateOrConnectWithoutAgendamentosInput[]
    createMany?: pagamentosCreateManyAgendamentosInputEnvelope
    connect?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumagendamentos_StatusFieldUpdateOperationsInput = {
    set?: $Enums.agendamentos_Status | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type servicosUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: XOR<servicosCreateWithoutAgendamentosInput, servicosUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: servicosCreateOrConnectWithoutAgendamentosInput
    upsert?: servicosUpsertWithoutAgendamentosInput
    connect?: servicosWhereUniqueInput
    update?: XOR<XOR<servicosUpdateToOneWithWhereWithoutAgendamentosInput, servicosUpdateWithoutAgendamentosInput>, servicosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type clientesUpdateOneRequiredWithoutAgendamentosNestedInput = {
    create?: XOR<clientesCreateWithoutAgendamentosInput, clientesUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: clientesCreateOrConnectWithoutAgendamentosInput
    upsert?: clientesUpsertWithoutAgendamentosInput
    connect?: clientesWhereUniqueInput
    update?: XOR<XOR<clientesUpdateToOneWithWhereWithoutAgendamentosInput, clientesUpdateWithoutAgendamentosInput>, clientesUncheckedUpdateWithoutAgendamentosInput>
  }

  export type funcionariosUpdateOneWithoutAgendamentosNestedInput = {
    create?: XOR<funcionariosCreateWithoutAgendamentosInput, funcionariosUncheckedCreateWithoutAgendamentosInput>
    connectOrCreate?: funcionariosCreateOrConnectWithoutAgendamentosInput
    upsert?: funcionariosUpsertWithoutAgendamentosInput
    disconnect?: funcionariosWhereInput | boolean
    delete?: funcionariosWhereInput | boolean
    connect?: funcionariosWhereUniqueInput
    update?: XOR<XOR<funcionariosUpdateToOneWithWhereWithoutAgendamentosInput, funcionariosUpdateWithoutAgendamentosInput>, funcionariosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type pagamentosUpdateManyWithoutAgendamentosNestedInput = {
    create?: XOR<pagamentosCreateWithoutAgendamentosInput, pagamentosUncheckedCreateWithoutAgendamentosInput> | pagamentosCreateWithoutAgendamentosInput[] | pagamentosUncheckedCreateWithoutAgendamentosInput[]
    connectOrCreate?: pagamentosCreateOrConnectWithoutAgendamentosInput | pagamentosCreateOrConnectWithoutAgendamentosInput[]
    upsert?: pagamentosUpsertWithWhereUniqueWithoutAgendamentosInput | pagamentosUpsertWithWhereUniqueWithoutAgendamentosInput[]
    createMany?: pagamentosCreateManyAgendamentosInputEnvelope
    set?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    disconnect?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    delete?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    connect?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    update?: pagamentosUpdateWithWhereUniqueWithoutAgendamentosInput | pagamentosUpdateWithWhereUniqueWithoutAgendamentosInput[]
    updateMany?: pagamentosUpdateManyWithWhereWithoutAgendamentosInput | pagamentosUpdateManyWithWhereWithoutAgendamentosInput[]
    deleteMany?: pagamentosScalarWhereInput | pagamentosScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type pagamentosUncheckedUpdateManyWithoutAgendamentosNestedInput = {
    create?: XOR<pagamentosCreateWithoutAgendamentosInput, pagamentosUncheckedCreateWithoutAgendamentosInput> | pagamentosCreateWithoutAgendamentosInput[] | pagamentosUncheckedCreateWithoutAgendamentosInput[]
    connectOrCreate?: pagamentosCreateOrConnectWithoutAgendamentosInput | pagamentosCreateOrConnectWithoutAgendamentosInput[]
    upsert?: pagamentosUpsertWithWhereUniqueWithoutAgendamentosInput | pagamentosUpsertWithWhereUniqueWithoutAgendamentosInput[]
    createMany?: pagamentosCreateManyAgendamentosInputEnvelope
    set?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    disconnect?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    delete?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    connect?: pagamentosWhereUniqueInput | pagamentosWhereUniqueInput[]
    update?: pagamentosUpdateWithWhereUniqueWithoutAgendamentosInput | pagamentosUpdateWithWhereUniqueWithoutAgendamentosInput[]
    updateMany?: pagamentosUpdateManyWithWhereWithoutAgendamentosInput | pagamentosUpdateManyWithWhereWithoutAgendamentosInput[]
    deleteMany?: pagamentosScalarWhereInput | pagamentosScalarWhereInput[]
  }

  export type agendamentosCreateNestedManyWithoutClientesInput = {
    create?: XOR<agendamentosCreateWithoutClientesInput, agendamentosUncheckedCreateWithoutClientesInput> | agendamentosCreateWithoutClientesInput[] | agendamentosUncheckedCreateWithoutClientesInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutClientesInput | agendamentosCreateOrConnectWithoutClientesInput[]
    createMany?: agendamentosCreateManyClientesInputEnvelope
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
  }

  export type agendamentosUncheckedCreateNestedManyWithoutClientesInput = {
    create?: XOR<agendamentosCreateWithoutClientesInput, agendamentosUncheckedCreateWithoutClientesInput> | agendamentosCreateWithoutClientesInput[] | agendamentosUncheckedCreateWithoutClientesInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutClientesInput | agendamentosCreateOrConnectWithoutClientesInput[]
    createMany?: agendamentosCreateManyClientesInputEnvelope
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
  }

  export type agendamentosUpdateManyWithoutClientesNestedInput = {
    create?: XOR<agendamentosCreateWithoutClientesInput, agendamentosUncheckedCreateWithoutClientesInput> | agendamentosCreateWithoutClientesInput[] | agendamentosUncheckedCreateWithoutClientesInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutClientesInput | agendamentosCreateOrConnectWithoutClientesInput[]
    upsert?: agendamentosUpsertWithWhereUniqueWithoutClientesInput | agendamentosUpsertWithWhereUniqueWithoutClientesInput[]
    createMany?: agendamentosCreateManyClientesInputEnvelope
    set?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    disconnect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    delete?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    update?: agendamentosUpdateWithWhereUniqueWithoutClientesInput | agendamentosUpdateWithWhereUniqueWithoutClientesInput[]
    updateMany?: agendamentosUpdateManyWithWhereWithoutClientesInput | agendamentosUpdateManyWithWhereWithoutClientesInput[]
    deleteMany?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
  }

  export type agendamentosUncheckedUpdateManyWithoutClientesNestedInput = {
    create?: XOR<agendamentosCreateWithoutClientesInput, agendamentosUncheckedCreateWithoutClientesInput> | agendamentosCreateWithoutClientesInput[] | agendamentosUncheckedCreateWithoutClientesInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutClientesInput | agendamentosCreateOrConnectWithoutClientesInput[]
    upsert?: agendamentosUpsertWithWhereUniqueWithoutClientesInput | agendamentosUpsertWithWhereUniqueWithoutClientesInput[]
    createMany?: agendamentosCreateManyClientesInputEnvelope
    set?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    disconnect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    delete?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    update?: agendamentosUpdateWithWhereUniqueWithoutClientesInput | agendamentosUpdateWithWhereUniqueWithoutClientesInput[]
    updateMany?: agendamentosUpdateManyWithWhereWithoutClientesInput | agendamentosUpdateManyWithWhereWithoutClientesInput[]
    deleteMany?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
  }

  export type produtosCreateNestedOneWithoutDisponibilidadeprodInput = {
    create?: XOR<produtosCreateWithoutDisponibilidadeprodInput, produtosUncheckedCreateWithoutDisponibilidadeprodInput>
    connectOrCreate?: produtosCreateOrConnectWithoutDisponibilidadeprodInput
    connect?: produtosWhereUniqueInput
  }

  export type servicosCreateNestedOneWithoutDisponibilidadeprodInput = {
    create?: XOR<servicosCreateWithoutDisponibilidadeprodInput, servicosUncheckedCreateWithoutDisponibilidadeprodInput>
    connectOrCreate?: servicosCreateOrConnectWithoutDisponibilidadeprodInput
    connect?: servicosWhereUniqueInput
  }

  export type produtosUpdateOneRequiredWithoutDisponibilidadeprodNestedInput = {
    create?: XOR<produtosCreateWithoutDisponibilidadeprodInput, produtosUncheckedCreateWithoutDisponibilidadeprodInput>
    connectOrCreate?: produtosCreateOrConnectWithoutDisponibilidadeprodInput
    upsert?: produtosUpsertWithoutDisponibilidadeprodInput
    connect?: produtosWhereUniqueInput
    update?: XOR<XOR<produtosUpdateToOneWithWhereWithoutDisponibilidadeprodInput, produtosUpdateWithoutDisponibilidadeprodInput>, produtosUncheckedUpdateWithoutDisponibilidadeprodInput>
  }

  export type servicosUpdateOneRequiredWithoutDisponibilidadeprodNestedInput = {
    create?: XOR<servicosCreateWithoutDisponibilidadeprodInput, servicosUncheckedCreateWithoutDisponibilidadeprodInput>
    connectOrCreate?: servicosCreateOrConnectWithoutDisponibilidadeprodInput
    upsert?: servicosUpsertWithoutDisponibilidadeprodInput
    connect?: servicosWhereUniqueInput
    update?: XOR<XOR<servicosUpdateToOneWithWhereWithoutDisponibilidadeprodInput, servicosUpdateWithoutDisponibilidadeprodInput>, servicosUncheckedUpdateWithoutDisponibilidadeprodInput>
  }

  export type agendamentosCreateNestedManyWithoutFuncionariosInput = {
    create?: XOR<agendamentosCreateWithoutFuncionariosInput, agendamentosUncheckedCreateWithoutFuncionariosInput> | agendamentosCreateWithoutFuncionariosInput[] | agendamentosUncheckedCreateWithoutFuncionariosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutFuncionariosInput | agendamentosCreateOrConnectWithoutFuncionariosInput[]
    createMany?: agendamentosCreateManyFuncionariosInputEnvelope
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
  }

  export type agendamentosUncheckedCreateNestedManyWithoutFuncionariosInput = {
    create?: XOR<agendamentosCreateWithoutFuncionariosInput, agendamentosUncheckedCreateWithoutFuncionariosInput> | agendamentosCreateWithoutFuncionariosInput[] | agendamentosUncheckedCreateWithoutFuncionariosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutFuncionariosInput | agendamentosCreateOrConnectWithoutFuncionariosInput[]
    createMany?: agendamentosCreateManyFuncionariosInputEnvelope
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableEnumfuncionarios_StatusFieldUpdateOperationsInput = {
    set?: $Enums.funcionarios_Status | null
  }

  export type agendamentosUpdateManyWithoutFuncionariosNestedInput = {
    create?: XOR<agendamentosCreateWithoutFuncionariosInput, agendamentosUncheckedCreateWithoutFuncionariosInput> | agendamentosCreateWithoutFuncionariosInput[] | agendamentosUncheckedCreateWithoutFuncionariosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutFuncionariosInput | agendamentosCreateOrConnectWithoutFuncionariosInput[]
    upsert?: agendamentosUpsertWithWhereUniqueWithoutFuncionariosInput | agendamentosUpsertWithWhereUniqueWithoutFuncionariosInput[]
    createMany?: agendamentosCreateManyFuncionariosInputEnvelope
    set?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    disconnect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    delete?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    update?: agendamentosUpdateWithWhereUniqueWithoutFuncionariosInput | agendamentosUpdateWithWhereUniqueWithoutFuncionariosInput[]
    updateMany?: agendamentosUpdateManyWithWhereWithoutFuncionariosInput | agendamentosUpdateManyWithWhereWithoutFuncionariosInput[]
    deleteMany?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
  }

  export type agendamentosUncheckedUpdateManyWithoutFuncionariosNestedInput = {
    create?: XOR<agendamentosCreateWithoutFuncionariosInput, agendamentosUncheckedCreateWithoutFuncionariosInput> | agendamentosCreateWithoutFuncionariosInput[] | agendamentosUncheckedCreateWithoutFuncionariosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutFuncionariosInput | agendamentosCreateOrConnectWithoutFuncionariosInput[]
    upsert?: agendamentosUpsertWithWhereUniqueWithoutFuncionariosInput | agendamentosUpsertWithWhereUniqueWithoutFuncionariosInput[]
    createMany?: agendamentosCreateManyFuncionariosInputEnvelope
    set?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    disconnect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    delete?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    update?: agendamentosUpdateWithWhereUniqueWithoutFuncionariosInput | agendamentosUpdateWithWhereUniqueWithoutFuncionariosInput[]
    updateMany?: agendamentosUpdateManyWithWhereWithoutFuncionariosInput | agendamentosUpdateManyWithWhereWithoutFuncionariosInput[]
    deleteMany?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
  }

  export type produtosCreateNestedOneWithoutImagensInput = {
    create?: XOR<produtosCreateWithoutImagensInput, produtosUncheckedCreateWithoutImagensInput>
    connectOrCreate?: produtosCreateOrConnectWithoutImagensInput
    connect?: produtosWhereUniqueInput
  }

  export type produtosUpdateOneWithoutImagensNestedInput = {
    create?: XOR<produtosCreateWithoutImagensInput, produtosUncheckedCreateWithoutImagensInput>
    connectOrCreate?: produtosCreateOrConnectWithoutImagensInput
    upsert?: produtosUpsertWithoutImagensInput
    disconnect?: produtosWhereInput | boolean
    delete?: produtosWhereInput | boolean
    connect?: produtosWhereUniqueInput
    update?: XOR<XOR<produtosUpdateToOneWithWhereWithoutImagensInput, produtosUpdateWithoutImagensInput>, produtosUncheckedUpdateWithoutImagensInput>
  }

  export type agendamentosCreateNestedOneWithoutPagamentosInput = {
    create?: XOR<agendamentosCreateWithoutPagamentosInput, agendamentosUncheckedCreateWithoutPagamentosInput>
    connectOrCreate?: agendamentosCreateOrConnectWithoutPagamentosInput
    connect?: agendamentosWhereUniqueInput
  }

  export type NullableEnumpagamentos_StatusFieldUpdateOperationsInput = {
    set?: $Enums.pagamentos_Status | null
  }

  export type NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput = {
    set?: $Enums.pagamentos_Modalidade | null
  }

  export type agendamentosUpdateOneWithoutPagamentosNestedInput = {
    create?: XOR<agendamentosCreateWithoutPagamentosInput, agendamentosUncheckedCreateWithoutPagamentosInput>
    connectOrCreate?: agendamentosCreateOrConnectWithoutPagamentosInput
    upsert?: agendamentosUpsertWithoutPagamentosInput
    disconnect?: agendamentosWhereInput | boolean
    delete?: agendamentosWhereInput | boolean
    connect?: agendamentosWhereUniqueInput
    update?: XOR<XOR<agendamentosUpdateToOneWithWhereWithoutPagamentosInput, agendamentosUpdateWithoutPagamentosInput>, agendamentosUncheckedUpdateWithoutPagamentosInput>
  }

  export type disponibilidadeprodCreateNestedManyWithoutProdutosInput = {
    create?: XOR<disponibilidadeprodCreateWithoutProdutosInput, disponibilidadeprodUncheckedCreateWithoutProdutosInput> | disponibilidadeprodCreateWithoutProdutosInput[] | disponibilidadeprodUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutProdutosInput | disponibilidadeprodCreateOrConnectWithoutProdutosInput[]
    createMany?: disponibilidadeprodCreateManyProdutosInputEnvelope
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
  }

  export type imagensCreateNestedManyWithoutProdutosInput = {
    create?: XOR<imagensCreateWithoutProdutosInput, imagensUncheckedCreateWithoutProdutosInput> | imagensCreateWithoutProdutosInput[] | imagensUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: imagensCreateOrConnectWithoutProdutosInput | imagensCreateOrConnectWithoutProdutosInput[]
    createMany?: imagensCreateManyProdutosInputEnvelope
    connect?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
  }

  export type servicosCreateNestedManyWithoutProdutosInput = {
    create?: XOR<servicosCreateWithoutProdutosInput, servicosUncheckedCreateWithoutProdutosInput> | servicosCreateWithoutProdutosInput[] | servicosUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: servicosCreateOrConnectWithoutProdutosInput | servicosCreateOrConnectWithoutProdutosInput[]
    createMany?: servicosCreateManyProdutosInputEnvelope
    connect?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
  }

  export type disponibilidadeprodUncheckedCreateNestedManyWithoutProdutosInput = {
    create?: XOR<disponibilidadeprodCreateWithoutProdutosInput, disponibilidadeprodUncheckedCreateWithoutProdutosInput> | disponibilidadeprodCreateWithoutProdutosInput[] | disponibilidadeprodUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutProdutosInput | disponibilidadeprodCreateOrConnectWithoutProdutosInput[]
    createMany?: disponibilidadeprodCreateManyProdutosInputEnvelope
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
  }

  export type imagensUncheckedCreateNestedManyWithoutProdutosInput = {
    create?: XOR<imagensCreateWithoutProdutosInput, imagensUncheckedCreateWithoutProdutosInput> | imagensCreateWithoutProdutosInput[] | imagensUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: imagensCreateOrConnectWithoutProdutosInput | imagensCreateOrConnectWithoutProdutosInput[]
    createMany?: imagensCreateManyProdutosInputEnvelope
    connect?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
  }

  export type servicosUncheckedCreateNestedManyWithoutProdutosInput = {
    create?: XOR<servicosCreateWithoutProdutosInput, servicosUncheckedCreateWithoutProdutosInput> | servicosCreateWithoutProdutosInput[] | servicosUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: servicosCreateOrConnectWithoutProdutosInput | servicosCreateOrConnectWithoutProdutosInput[]
    createMany?: servicosCreateManyProdutosInputEnvelope
    connect?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
  }

  export type disponibilidadeprodUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<disponibilidadeprodCreateWithoutProdutosInput, disponibilidadeprodUncheckedCreateWithoutProdutosInput> | disponibilidadeprodCreateWithoutProdutosInput[] | disponibilidadeprodUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutProdutosInput | disponibilidadeprodCreateOrConnectWithoutProdutosInput[]
    upsert?: disponibilidadeprodUpsertWithWhereUniqueWithoutProdutosInput | disponibilidadeprodUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: disponibilidadeprodCreateManyProdutosInputEnvelope
    set?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    disconnect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    delete?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    update?: disponibilidadeprodUpdateWithWhereUniqueWithoutProdutosInput | disponibilidadeprodUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: disponibilidadeprodUpdateManyWithWhereWithoutProdutosInput | disponibilidadeprodUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: disponibilidadeprodScalarWhereInput | disponibilidadeprodScalarWhereInput[]
  }

  export type imagensUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<imagensCreateWithoutProdutosInput, imagensUncheckedCreateWithoutProdutosInput> | imagensCreateWithoutProdutosInput[] | imagensUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: imagensCreateOrConnectWithoutProdutosInput | imagensCreateOrConnectWithoutProdutosInput[]
    upsert?: imagensUpsertWithWhereUniqueWithoutProdutosInput | imagensUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: imagensCreateManyProdutosInputEnvelope
    set?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    disconnect?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    delete?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    connect?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    update?: imagensUpdateWithWhereUniqueWithoutProdutosInput | imagensUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: imagensUpdateManyWithWhereWithoutProdutosInput | imagensUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: imagensScalarWhereInput | imagensScalarWhereInput[]
  }

  export type servicosUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<servicosCreateWithoutProdutosInput, servicosUncheckedCreateWithoutProdutosInput> | servicosCreateWithoutProdutosInput[] | servicosUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: servicosCreateOrConnectWithoutProdutosInput | servicosCreateOrConnectWithoutProdutosInput[]
    upsert?: servicosUpsertWithWhereUniqueWithoutProdutosInput | servicosUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: servicosCreateManyProdutosInputEnvelope
    set?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    disconnect?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    delete?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    connect?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    update?: servicosUpdateWithWhereUniqueWithoutProdutosInput | servicosUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: servicosUpdateManyWithWhereWithoutProdutosInput | servicosUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: servicosScalarWhereInput | servicosScalarWhereInput[]
  }

  export type disponibilidadeprodUncheckedUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<disponibilidadeprodCreateWithoutProdutosInput, disponibilidadeprodUncheckedCreateWithoutProdutosInput> | disponibilidadeprodCreateWithoutProdutosInput[] | disponibilidadeprodUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutProdutosInput | disponibilidadeprodCreateOrConnectWithoutProdutosInput[]
    upsert?: disponibilidadeprodUpsertWithWhereUniqueWithoutProdutosInput | disponibilidadeprodUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: disponibilidadeprodCreateManyProdutosInputEnvelope
    set?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    disconnect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    delete?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    update?: disponibilidadeprodUpdateWithWhereUniqueWithoutProdutosInput | disponibilidadeprodUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: disponibilidadeprodUpdateManyWithWhereWithoutProdutosInput | disponibilidadeprodUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: disponibilidadeprodScalarWhereInput | disponibilidadeprodScalarWhereInput[]
  }

  export type imagensUncheckedUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<imagensCreateWithoutProdutosInput, imagensUncheckedCreateWithoutProdutosInput> | imagensCreateWithoutProdutosInput[] | imagensUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: imagensCreateOrConnectWithoutProdutosInput | imagensCreateOrConnectWithoutProdutosInput[]
    upsert?: imagensUpsertWithWhereUniqueWithoutProdutosInput | imagensUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: imagensCreateManyProdutosInputEnvelope
    set?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    disconnect?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    delete?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    connect?: imagensWhereUniqueInput | imagensWhereUniqueInput[]
    update?: imagensUpdateWithWhereUniqueWithoutProdutosInput | imagensUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: imagensUpdateManyWithWhereWithoutProdutosInput | imagensUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: imagensScalarWhereInput | imagensScalarWhereInput[]
  }

  export type servicosUncheckedUpdateManyWithoutProdutosNestedInput = {
    create?: XOR<servicosCreateWithoutProdutosInput, servicosUncheckedCreateWithoutProdutosInput> | servicosCreateWithoutProdutosInput[] | servicosUncheckedCreateWithoutProdutosInput[]
    connectOrCreate?: servicosCreateOrConnectWithoutProdutosInput | servicosCreateOrConnectWithoutProdutosInput[]
    upsert?: servicosUpsertWithWhereUniqueWithoutProdutosInput | servicosUpsertWithWhereUniqueWithoutProdutosInput[]
    createMany?: servicosCreateManyProdutosInputEnvelope
    set?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    disconnect?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    delete?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    connect?: servicosWhereUniqueInput | servicosWhereUniqueInput[]
    update?: servicosUpdateWithWhereUniqueWithoutProdutosInput | servicosUpdateWithWhereUniqueWithoutProdutosInput[]
    updateMany?: servicosUpdateManyWithWhereWithoutProdutosInput | servicosUpdateManyWithWhereWithoutProdutosInput[]
    deleteMany?: servicosScalarWhereInput | servicosScalarWhereInput[]
  }

  export type agendamentosCreateNestedManyWithoutServicosInput = {
    create?: XOR<agendamentosCreateWithoutServicosInput, agendamentosUncheckedCreateWithoutServicosInput> | agendamentosCreateWithoutServicosInput[] | agendamentosUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutServicosInput | agendamentosCreateOrConnectWithoutServicosInput[]
    createMany?: agendamentosCreateManyServicosInputEnvelope
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
  }

  export type disponibilidadeprodCreateNestedManyWithoutServicosInput = {
    create?: XOR<disponibilidadeprodCreateWithoutServicosInput, disponibilidadeprodUncheckedCreateWithoutServicosInput> | disponibilidadeprodCreateWithoutServicosInput[] | disponibilidadeprodUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutServicosInput | disponibilidadeprodCreateOrConnectWithoutServicosInput[]
    createMany?: disponibilidadeprodCreateManyServicosInputEnvelope
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
  }

  export type produtosCreateNestedOneWithoutServicosInput = {
    create?: XOR<produtosCreateWithoutServicosInput, produtosUncheckedCreateWithoutServicosInput>
    connectOrCreate?: produtosCreateOrConnectWithoutServicosInput
    connect?: produtosWhereUniqueInput
  }

  export type agendamentosUncheckedCreateNestedManyWithoutServicosInput = {
    create?: XOR<agendamentosCreateWithoutServicosInput, agendamentosUncheckedCreateWithoutServicosInput> | agendamentosCreateWithoutServicosInput[] | agendamentosUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutServicosInput | agendamentosCreateOrConnectWithoutServicosInput[]
    createMany?: agendamentosCreateManyServicosInputEnvelope
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
  }

  export type disponibilidadeprodUncheckedCreateNestedManyWithoutServicosInput = {
    create?: XOR<disponibilidadeprodCreateWithoutServicosInput, disponibilidadeprodUncheckedCreateWithoutServicosInput> | disponibilidadeprodCreateWithoutServicosInput[] | disponibilidadeprodUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutServicosInput | disponibilidadeprodCreateOrConnectWithoutServicosInput[]
    createMany?: disponibilidadeprodCreateManyServicosInputEnvelope
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
  }

  export type agendamentosUpdateManyWithoutServicosNestedInput = {
    create?: XOR<agendamentosCreateWithoutServicosInput, agendamentosUncheckedCreateWithoutServicosInput> | agendamentosCreateWithoutServicosInput[] | agendamentosUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutServicosInput | agendamentosCreateOrConnectWithoutServicosInput[]
    upsert?: agendamentosUpsertWithWhereUniqueWithoutServicosInput | agendamentosUpsertWithWhereUniqueWithoutServicosInput[]
    createMany?: agendamentosCreateManyServicosInputEnvelope
    set?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    disconnect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    delete?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    update?: agendamentosUpdateWithWhereUniqueWithoutServicosInput | agendamentosUpdateWithWhereUniqueWithoutServicosInput[]
    updateMany?: agendamentosUpdateManyWithWhereWithoutServicosInput | agendamentosUpdateManyWithWhereWithoutServicosInput[]
    deleteMany?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
  }

  export type disponibilidadeprodUpdateManyWithoutServicosNestedInput = {
    create?: XOR<disponibilidadeprodCreateWithoutServicosInput, disponibilidadeprodUncheckedCreateWithoutServicosInput> | disponibilidadeprodCreateWithoutServicosInput[] | disponibilidadeprodUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutServicosInput | disponibilidadeprodCreateOrConnectWithoutServicosInput[]
    upsert?: disponibilidadeprodUpsertWithWhereUniqueWithoutServicosInput | disponibilidadeprodUpsertWithWhereUniqueWithoutServicosInput[]
    createMany?: disponibilidadeprodCreateManyServicosInputEnvelope
    set?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    disconnect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    delete?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    update?: disponibilidadeprodUpdateWithWhereUniqueWithoutServicosInput | disponibilidadeprodUpdateWithWhereUniqueWithoutServicosInput[]
    updateMany?: disponibilidadeprodUpdateManyWithWhereWithoutServicosInput | disponibilidadeprodUpdateManyWithWhereWithoutServicosInput[]
    deleteMany?: disponibilidadeprodScalarWhereInput | disponibilidadeprodScalarWhereInput[]
  }

  export type produtosUpdateOneWithoutServicosNestedInput = {
    create?: XOR<produtosCreateWithoutServicosInput, produtosUncheckedCreateWithoutServicosInput>
    connectOrCreate?: produtosCreateOrConnectWithoutServicosInput
    upsert?: produtosUpsertWithoutServicosInput
    disconnect?: produtosWhereInput | boolean
    delete?: produtosWhereInput | boolean
    connect?: produtosWhereUniqueInput
    update?: XOR<XOR<produtosUpdateToOneWithWhereWithoutServicosInput, produtosUpdateWithoutServicosInput>, produtosUncheckedUpdateWithoutServicosInput>
  }

  export type agendamentosUncheckedUpdateManyWithoutServicosNestedInput = {
    create?: XOR<agendamentosCreateWithoutServicosInput, agendamentosUncheckedCreateWithoutServicosInput> | agendamentosCreateWithoutServicosInput[] | agendamentosUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: agendamentosCreateOrConnectWithoutServicosInput | agendamentosCreateOrConnectWithoutServicosInput[]
    upsert?: agendamentosUpsertWithWhereUniqueWithoutServicosInput | agendamentosUpsertWithWhereUniqueWithoutServicosInput[]
    createMany?: agendamentosCreateManyServicosInputEnvelope
    set?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    disconnect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    delete?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    connect?: agendamentosWhereUniqueInput | agendamentosWhereUniqueInput[]
    update?: agendamentosUpdateWithWhereUniqueWithoutServicosInput | agendamentosUpdateWithWhereUniqueWithoutServicosInput[]
    updateMany?: agendamentosUpdateManyWithWhereWithoutServicosInput | agendamentosUpdateManyWithWhereWithoutServicosInput[]
    deleteMany?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
  }

  export type disponibilidadeprodUncheckedUpdateManyWithoutServicosNestedInput = {
    create?: XOR<disponibilidadeprodCreateWithoutServicosInput, disponibilidadeprodUncheckedCreateWithoutServicosInput> | disponibilidadeprodCreateWithoutServicosInput[] | disponibilidadeprodUncheckedCreateWithoutServicosInput[]
    connectOrCreate?: disponibilidadeprodCreateOrConnectWithoutServicosInput | disponibilidadeprodCreateOrConnectWithoutServicosInput[]
    upsert?: disponibilidadeprodUpsertWithWhereUniqueWithoutServicosInput | disponibilidadeprodUpsertWithWhereUniqueWithoutServicosInput[]
    createMany?: disponibilidadeprodCreateManyServicosInputEnvelope
    set?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    disconnect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    delete?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    connect?: disponibilidadeprodWhereUniqueInput | disponibilidadeprodWhereUniqueInput[]
    update?: disponibilidadeprodUpdateWithWhereUniqueWithoutServicosInput | disponibilidadeprodUpdateWithWhereUniqueWithoutServicosInput[]
    updateMany?: disponibilidadeprodUpdateManyWithWhereWithoutServicosInput | disponibilidadeprodUpdateManyWithWhereWithoutServicosInput[]
    deleteMany?: disponibilidadeprodScalarWhereInput | disponibilidadeprodScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumagendamentos_StatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.agendamentos_Status | Enumagendamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.agendamentos_Status[] | null
    notIn?: $Enums.agendamentos_Status[] | null
    not?: NestedEnumagendamentos_StatusNullableFilter<$PrismaModel> | $Enums.agendamentos_Status | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumagendamentos_StatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.agendamentos_Status | Enumagendamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.agendamentos_Status[] | null
    notIn?: $Enums.agendamentos_Status[] | null
    not?: NestedEnumagendamentos_StatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.agendamentos_Status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumagendamentos_StatusNullableFilter<$PrismaModel>
    _max?: NestedEnumagendamentos_StatusNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.funcionarios_Status | Enumfuncionarios_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.funcionarios_Status[] | null
    notIn?: $Enums.funcionarios_Status[] | null
    not?: NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel> | $Enums.funcionarios_Status | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumfuncionarios_StatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.funcionarios_Status | Enumfuncionarios_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.funcionarios_Status[] | null
    notIn?: $Enums.funcionarios_Status[] | null
    not?: NestedEnumfuncionarios_StatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.funcionarios_Status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel>
    _max?: NestedEnumfuncionarios_StatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumpagamentos_StatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Status | Enumpagamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Status[] | null
    notIn?: $Enums.pagamentos_Status[] | null
    not?: NestedEnumpagamentos_StatusNullableFilter<$PrismaModel> | $Enums.pagamentos_Status | null
  }

  export type NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Modalidade | Enumpagamentos_ModalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Modalidade[] | null
    notIn?: $Enums.pagamentos_Modalidade[] | null
    not?: NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel> | $Enums.pagamentos_Modalidade | null
  }

  export type NestedEnumpagamentos_StatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Status | Enumpagamentos_StatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Status[] | null
    notIn?: $Enums.pagamentos_Status[] | null
    not?: NestedEnumpagamentos_StatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.pagamentos_Status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumpagamentos_StatusNullableFilter<$PrismaModel>
    _max?: NestedEnumpagamentos_StatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumpagamentos_ModalidadeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.pagamentos_Modalidade | Enumpagamentos_ModalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.pagamentos_Modalidade[] | null
    notIn?: $Enums.pagamentos_Modalidade[] | null
    not?: NestedEnumpagamentos_ModalidadeNullableWithAggregatesFilter<$PrismaModel> | $Enums.pagamentos_Modalidade | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel>
    _max?: NestedEnumpagamentos_ModalidadeNullableFilter<$PrismaModel>
  }

  export type servicosCreateWithoutAgendamentosInput = {
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    disponibilidadeprod?: disponibilidadeprodCreateNestedManyWithoutServicosInput
    produtos?: produtosCreateNestedOneWithoutServicosInput
  }

  export type servicosUncheckedCreateWithoutAgendamentosInput = {
    Id_Servico?: number
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    Id_Produto?: number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedCreateNestedManyWithoutServicosInput
  }

  export type servicosCreateOrConnectWithoutAgendamentosInput = {
    where: servicosWhereUniqueInput
    create: XOR<servicosCreateWithoutAgendamentosInput, servicosUncheckedCreateWithoutAgendamentosInput>
  }

  export type clientesCreateWithoutAgendamentosInput = {
    Nome?: string | null
    Email?: string | null
    Telemovel?: string | null
    Senha?: string | null
    DataNascimento?: Date | string | null
    Morada?: string | null
    Nif?: number | null
  }

  export type clientesUncheckedCreateWithoutAgendamentosInput = {
    Id_Cliente?: number
    Nome?: string | null
    Email?: string | null
    Telemovel?: string | null
    Senha?: string | null
    DataNascimento?: Date | string | null
    Morada?: string | null
    Nif?: number | null
  }

  export type clientesCreateOrConnectWithoutAgendamentosInput = {
    where: clientesWhereUniqueInput
    create: XOR<clientesCreateWithoutAgendamentosInput, clientesUncheckedCreateWithoutAgendamentosInput>
  }

  export type funcionariosCreateWithoutAgendamentosInput = {
    Nome?: string | null
    Email?: string | null
    Administrador?: boolean | null
    Senha?: string | null
    Status?: $Enums.funcionarios_Status | null
  }

  export type funcionariosUncheckedCreateWithoutAgendamentosInput = {
    Id_Funcionario?: number
    Nome?: string | null
    Email?: string | null
    Administrador?: boolean | null
    Senha?: string | null
    Status?: $Enums.funcionarios_Status | null
  }

  export type funcionariosCreateOrConnectWithoutAgendamentosInput = {
    where: funcionariosWhereUniqueInput
    create: XOR<funcionariosCreateWithoutAgendamentosInput, funcionariosUncheckedCreateWithoutAgendamentosInput>
  }

  export type pagamentosCreateWithoutAgendamentosInput = {
    Valor?: number | null
    Status?: $Enums.pagamentos_Status | null
    Modalidade?: $Enums.pagamentos_Modalidade | null
    Fatura?: number | null
  }

  export type pagamentosUncheckedCreateWithoutAgendamentosInput = {
    Id_Pagamentos?: number
    Valor?: number | null
    Status?: $Enums.pagamentos_Status | null
    Modalidade?: $Enums.pagamentos_Modalidade | null
    Fatura?: number | null
  }

  export type pagamentosCreateOrConnectWithoutAgendamentosInput = {
    where: pagamentosWhereUniqueInput
    create: XOR<pagamentosCreateWithoutAgendamentosInput, pagamentosUncheckedCreateWithoutAgendamentosInput>
  }

  export type pagamentosCreateManyAgendamentosInputEnvelope = {
    data: pagamentosCreateManyAgendamentosInput | pagamentosCreateManyAgendamentosInput[]
    skipDuplicates?: boolean
  }

  export type servicosUpsertWithoutAgendamentosInput = {
    update: XOR<servicosUpdateWithoutAgendamentosInput, servicosUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<servicosCreateWithoutAgendamentosInput, servicosUncheckedCreateWithoutAgendamentosInput>
    where?: servicosWhereInput
  }

  export type servicosUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: servicosWhereInput
    data: XOR<servicosUpdateWithoutAgendamentosInput, servicosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type servicosUpdateWithoutAgendamentosInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUpdateManyWithoutServicosNestedInput
    produtos?: produtosUpdateOneWithoutServicosNestedInput
  }

  export type servicosUncheckedUpdateWithoutAgendamentosInput = {
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Id_Produto?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedUpdateManyWithoutServicosNestedInput
  }

  export type clientesUpsertWithoutAgendamentosInput = {
    update: XOR<clientesUpdateWithoutAgendamentosInput, clientesUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<clientesCreateWithoutAgendamentosInput, clientesUncheckedCreateWithoutAgendamentosInput>
    where?: clientesWhereInput
  }

  export type clientesUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: clientesWhereInput
    data: XOR<clientesUpdateWithoutAgendamentosInput, clientesUncheckedUpdateWithoutAgendamentosInput>
  }

  export type clientesUpdateWithoutAgendamentosInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Telemovel?: NullableStringFieldUpdateOperationsInput | string | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    DataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Morada?: NullableStringFieldUpdateOperationsInput | string | null
    Nif?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type clientesUncheckedUpdateWithoutAgendamentosInput = {
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Telemovel?: NullableStringFieldUpdateOperationsInput | string | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    DataNascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Morada?: NullableStringFieldUpdateOperationsInput | string | null
    Nif?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type funcionariosUpsertWithoutAgendamentosInput = {
    update: XOR<funcionariosUpdateWithoutAgendamentosInput, funcionariosUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<funcionariosCreateWithoutAgendamentosInput, funcionariosUncheckedCreateWithoutAgendamentosInput>
    where?: funcionariosWhereInput
  }

  export type funcionariosUpdateToOneWithWhereWithoutAgendamentosInput = {
    where?: funcionariosWhereInput
    data: XOR<funcionariosUpdateWithoutAgendamentosInput, funcionariosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type funcionariosUpdateWithoutAgendamentosInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Administrador?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableEnumfuncionarios_StatusFieldUpdateOperationsInput | $Enums.funcionarios_Status | null
  }

  export type funcionariosUncheckedUpdateWithoutAgendamentosInput = {
    Id_Funcionario?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    Administrador?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Senha?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableEnumfuncionarios_StatusFieldUpdateOperationsInput | $Enums.funcionarios_Status | null
  }

  export type pagamentosUpsertWithWhereUniqueWithoutAgendamentosInput = {
    where: pagamentosWhereUniqueInput
    update: XOR<pagamentosUpdateWithoutAgendamentosInput, pagamentosUncheckedUpdateWithoutAgendamentosInput>
    create: XOR<pagamentosCreateWithoutAgendamentosInput, pagamentosUncheckedCreateWithoutAgendamentosInput>
  }

  export type pagamentosUpdateWithWhereUniqueWithoutAgendamentosInput = {
    where: pagamentosWhereUniqueInput
    data: XOR<pagamentosUpdateWithoutAgendamentosInput, pagamentosUncheckedUpdateWithoutAgendamentosInput>
  }

  export type pagamentosUpdateManyWithWhereWithoutAgendamentosInput = {
    where: pagamentosScalarWhereInput
    data: XOR<pagamentosUpdateManyMutationInput, pagamentosUncheckedUpdateManyWithoutAgendamentosInput>
  }

  export type pagamentosScalarWhereInput = {
    AND?: pagamentosScalarWhereInput | pagamentosScalarWhereInput[]
    OR?: pagamentosScalarWhereInput[]
    NOT?: pagamentosScalarWhereInput | pagamentosScalarWhereInput[]
    Id_Pagamentos?: IntFilter<"pagamentos"> | number
    Valor?: IntNullableFilter<"pagamentos"> | number | null
    Status?: Enumpagamentos_StatusNullableFilter<"pagamentos"> | $Enums.pagamentos_Status | null
    Modalidade?: Enumpagamentos_ModalidadeNullableFilter<"pagamentos"> | $Enums.pagamentos_Modalidade | null
    Fatura?: IntNullableFilter<"pagamentos"> | number | null
    Id_Agendamento?: IntNullableFilter<"pagamentos"> | number | null
  }

  export type agendamentosCreateWithoutClientesInput = {
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    servicos: servicosCreateNestedOneWithoutAgendamentosInput
    funcionarios?: funcionariosCreateNestedOneWithoutAgendamentosInput
    pagamentos?: pagamentosCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosUncheckedCreateWithoutClientesInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    pagamentos?: pagamentosUncheckedCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosCreateOrConnectWithoutClientesInput = {
    where: agendamentosWhereUniqueInput
    create: XOR<agendamentosCreateWithoutClientesInput, agendamentosUncheckedCreateWithoutClientesInput>
  }

  export type agendamentosCreateManyClientesInputEnvelope = {
    data: agendamentosCreateManyClientesInput | agendamentosCreateManyClientesInput[]
    skipDuplicates?: boolean
  }

  export type agendamentosUpsertWithWhereUniqueWithoutClientesInput = {
    where: agendamentosWhereUniqueInput
    update: XOR<agendamentosUpdateWithoutClientesInput, agendamentosUncheckedUpdateWithoutClientesInput>
    create: XOR<agendamentosCreateWithoutClientesInput, agendamentosUncheckedCreateWithoutClientesInput>
  }

  export type agendamentosUpdateWithWhereUniqueWithoutClientesInput = {
    where: agendamentosWhereUniqueInput
    data: XOR<agendamentosUpdateWithoutClientesInput, agendamentosUncheckedUpdateWithoutClientesInput>
  }

  export type agendamentosUpdateManyWithWhereWithoutClientesInput = {
    where: agendamentosScalarWhereInput
    data: XOR<agendamentosUpdateManyMutationInput, agendamentosUncheckedUpdateManyWithoutClientesInput>
  }

  export type agendamentosScalarWhereInput = {
    AND?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
    OR?: agendamentosScalarWhereInput[]
    NOT?: agendamentosScalarWhereInput | agendamentosScalarWhereInput[]
    Id_Agendamento?: IntFilter<"agendamentos"> | number
    Id_Servico?: IntFilter<"agendamentos"> | number
    Id_Cliente?: IntFilter<"agendamentos"> | number
    Id_Funcionario?: IntNullableFilter<"agendamentos"> | number | null
    Data?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    HoraInicio?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    HoraFinal?: DateTimeNullableFilter<"agendamentos"> | Date | string | null
    Status?: Enumagendamentos_StatusNullableFilter<"agendamentos"> | $Enums.agendamentos_Status | null
    Observacoes?: StringNullableFilter<"agendamentos"> | string | null
    LembreteEnviado?: BoolFilter<"agendamentos"> | boolean
  }

  export type produtosCreateWithoutDisponibilidadeprodInput = {
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    imagens?: imagensCreateNestedManyWithoutProdutosInput
    servicos?: servicosCreateNestedManyWithoutProdutosInput
  }

  export type produtosUncheckedCreateWithoutDisponibilidadeprodInput = {
    Id_Produto?: number
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    imagens?: imagensUncheckedCreateNestedManyWithoutProdutosInput
    servicos?: servicosUncheckedCreateNestedManyWithoutProdutosInput
  }

  export type produtosCreateOrConnectWithoutDisponibilidadeprodInput = {
    where: produtosWhereUniqueInput
    create: XOR<produtosCreateWithoutDisponibilidadeprodInput, produtosUncheckedCreateWithoutDisponibilidadeprodInput>
  }

  export type servicosCreateWithoutDisponibilidadeprodInput = {
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    agendamentos?: agendamentosCreateNestedManyWithoutServicosInput
    produtos?: produtosCreateNestedOneWithoutServicosInput
  }

  export type servicosUncheckedCreateWithoutDisponibilidadeprodInput = {
    Id_Servico?: number
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    Id_Produto?: number | null
    agendamentos?: agendamentosUncheckedCreateNestedManyWithoutServicosInput
  }

  export type servicosCreateOrConnectWithoutDisponibilidadeprodInput = {
    where: servicosWhereUniqueInput
    create: XOR<servicosCreateWithoutDisponibilidadeprodInput, servicosUncheckedCreateWithoutDisponibilidadeprodInput>
  }

  export type produtosUpsertWithoutDisponibilidadeprodInput = {
    update: XOR<produtosUpdateWithoutDisponibilidadeprodInput, produtosUncheckedUpdateWithoutDisponibilidadeprodInput>
    create: XOR<produtosCreateWithoutDisponibilidadeprodInput, produtosUncheckedCreateWithoutDisponibilidadeprodInput>
    where?: produtosWhereInput
  }

  export type produtosUpdateToOneWithWhereWithoutDisponibilidadeprodInput = {
    where?: produtosWhereInput
    data: XOR<produtosUpdateWithoutDisponibilidadeprodInput, produtosUncheckedUpdateWithoutDisponibilidadeprodInput>
  }

  export type produtosUpdateWithoutDisponibilidadeprodInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    imagens?: imagensUpdateManyWithoutProdutosNestedInput
    servicos?: servicosUpdateManyWithoutProdutosNestedInput
  }

  export type produtosUncheckedUpdateWithoutDisponibilidadeprodInput = {
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    imagens?: imagensUncheckedUpdateManyWithoutProdutosNestedInput
    servicos?: servicosUncheckedUpdateManyWithoutProdutosNestedInput
  }

  export type servicosUpsertWithoutDisponibilidadeprodInput = {
    update: XOR<servicosUpdateWithoutDisponibilidadeprodInput, servicosUncheckedUpdateWithoutDisponibilidadeprodInput>
    create: XOR<servicosCreateWithoutDisponibilidadeprodInput, servicosUncheckedCreateWithoutDisponibilidadeprodInput>
    where?: servicosWhereInput
  }

  export type servicosUpdateToOneWithWhereWithoutDisponibilidadeprodInput = {
    where?: servicosWhereInput
    data: XOR<servicosUpdateWithoutDisponibilidadeprodInput, servicosUncheckedUpdateWithoutDisponibilidadeprodInput>
  }

  export type servicosUpdateWithoutDisponibilidadeprodInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUpdateManyWithoutServicosNestedInput
    produtos?: produtosUpdateOneWithoutServicosNestedInput
  }

  export type servicosUncheckedUpdateWithoutDisponibilidadeprodInput = {
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Id_Produto?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUncheckedUpdateManyWithoutServicosNestedInput
  }

  export type agendamentosCreateWithoutFuncionariosInput = {
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    servicos: servicosCreateNestedOneWithoutAgendamentosInput
    clientes: clientesCreateNestedOneWithoutAgendamentosInput
    pagamentos?: pagamentosCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosUncheckedCreateWithoutFuncionariosInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Cliente: number
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    pagamentos?: pagamentosUncheckedCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosCreateOrConnectWithoutFuncionariosInput = {
    where: agendamentosWhereUniqueInput
    create: XOR<agendamentosCreateWithoutFuncionariosInput, agendamentosUncheckedCreateWithoutFuncionariosInput>
  }

  export type agendamentosCreateManyFuncionariosInputEnvelope = {
    data: agendamentosCreateManyFuncionariosInput | agendamentosCreateManyFuncionariosInput[]
    skipDuplicates?: boolean
  }

  export type agendamentosUpsertWithWhereUniqueWithoutFuncionariosInput = {
    where: agendamentosWhereUniqueInput
    update: XOR<agendamentosUpdateWithoutFuncionariosInput, agendamentosUncheckedUpdateWithoutFuncionariosInput>
    create: XOR<agendamentosCreateWithoutFuncionariosInput, agendamentosUncheckedCreateWithoutFuncionariosInput>
  }

  export type agendamentosUpdateWithWhereUniqueWithoutFuncionariosInput = {
    where: agendamentosWhereUniqueInput
    data: XOR<agendamentosUpdateWithoutFuncionariosInput, agendamentosUncheckedUpdateWithoutFuncionariosInput>
  }

  export type agendamentosUpdateManyWithWhereWithoutFuncionariosInput = {
    where: agendamentosScalarWhereInput
    data: XOR<agendamentosUpdateManyMutationInput, agendamentosUncheckedUpdateManyWithoutFuncionariosInput>
  }

  export type produtosCreateWithoutImagensInput = {
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    disponibilidadeprod?: disponibilidadeprodCreateNestedManyWithoutProdutosInput
    servicos?: servicosCreateNestedManyWithoutProdutosInput
  }

  export type produtosUncheckedCreateWithoutImagensInput = {
    Id_Produto?: number
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedCreateNestedManyWithoutProdutosInput
    servicos?: servicosUncheckedCreateNestedManyWithoutProdutosInput
  }

  export type produtosCreateOrConnectWithoutImagensInput = {
    where: produtosWhereUniqueInput
    create: XOR<produtosCreateWithoutImagensInput, produtosUncheckedCreateWithoutImagensInput>
  }

  export type produtosUpsertWithoutImagensInput = {
    update: XOR<produtosUpdateWithoutImagensInput, produtosUncheckedUpdateWithoutImagensInput>
    create: XOR<produtosCreateWithoutImagensInput, produtosUncheckedCreateWithoutImagensInput>
    where?: produtosWhereInput
  }

  export type produtosUpdateToOneWithWhereWithoutImagensInput = {
    where?: produtosWhereInput
    data: XOR<produtosUpdateWithoutImagensInput, produtosUncheckedUpdateWithoutImagensInput>
  }

  export type produtosUpdateWithoutImagensInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUpdateManyWithoutProdutosNestedInput
    servicos?: servicosUpdateManyWithoutProdutosNestedInput
  }

  export type produtosUncheckedUpdateWithoutImagensInput = {
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedUpdateManyWithoutProdutosNestedInput
    servicos?: servicosUncheckedUpdateManyWithoutProdutosNestedInput
  }

  export type agendamentosCreateWithoutPagamentosInput = {
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    servicos: servicosCreateNestedOneWithoutAgendamentosInput
    clientes: clientesCreateNestedOneWithoutAgendamentosInput
    funcionarios?: funcionariosCreateNestedOneWithoutAgendamentosInput
  }

  export type agendamentosUncheckedCreateWithoutPagamentosInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Cliente: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
  }

  export type agendamentosCreateOrConnectWithoutPagamentosInput = {
    where: agendamentosWhereUniqueInput
    create: XOR<agendamentosCreateWithoutPagamentosInput, agendamentosUncheckedCreateWithoutPagamentosInput>
  }

  export type agendamentosUpsertWithoutPagamentosInput = {
    update: XOR<agendamentosUpdateWithoutPagamentosInput, agendamentosUncheckedUpdateWithoutPagamentosInput>
    create: XOR<agendamentosCreateWithoutPagamentosInput, agendamentosUncheckedCreateWithoutPagamentosInput>
    where?: agendamentosWhereInput
  }

  export type agendamentosUpdateToOneWithWhereWithoutPagamentosInput = {
    where?: agendamentosWhereInput
    data: XOR<agendamentosUpdateWithoutPagamentosInput, agendamentosUncheckedUpdateWithoutPagamentosInput>
  }

  export type agendamentosUpdateWithoutPagamentosInput = {
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    servicos?: servicosUpdateOneRequiredWithoutAgendamentosNestedInput
    clientes?: clientesUpdateOneRequiredWithoutAgendamentosNestedInput
    funcionarios?: funcionariosUpdateOneWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateWithoutPagamentosInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type disponibilidadeprodCreateWithoutProdutosInput = {
    servicos: servicosCreateNestedOneWithoutDisponibilidadeprodInput
  }

  export type disponibilidadeprodUncheckedCreateWithoutProdutosInput = {
    Id_Disponibilidade?: number
    Id_Servico: number
  }

  export type disponibilidadeprodCreateOrConnectWithoutProdutosInput = {
    where: disponibilidadeprodWhereUniqueInput
    create: XOR<disponibilidadeprodCreateWithoutProdutosInput, disponibilidadeprodUncheckedCreateWithoutProdutosInput>
  }

  export type disponibilidadeprodCreateManyProdutosInputEnvelope = {
    data: disponibilidadeprodCreateManyProdutosInput | disponibilidadeprodCreateManyProdutosInput[]
    skipDuplicates?: boolean
  }

  export type imagensCreateWithoutProdutosInput = {
    CaminhoImagem?: string | null
    AltText?: string | null
  }

  export type imagensUncheckedCreateWithoutProdutosInput = {
    Id_Imagem?: number
    CaminhoImagem?: string | null
    AltText?: string | null
  }

  export type imagensCreateOrConnectWithoutProdutosInput = {
    where: imagensWhereUniqueInput
    create: XOR<imagensCreateWithoutProdutosInput, imagensUncheckedCreateWithoutProdutosInput>
  }

  export type imagensCreateManyProdutosInputEnvelope = {
    data: imagensCreateManyProdutosInput | imagensCreateManyProdutosInput[]
    skipDuplicates?: boolean
  }

  export type servicosCreateWithoutProdutosInput = {
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    agendamentos?: agendamentosCreateNestedManyWithoutServicosInput
    disponibilidadeprod?: disponibilidadeprodCreateNestedManyWithoutServicosInput
  }

  export type servicosUncheckedCreateWithoutProdutosInput = {
    Id_Servico?: number
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
    agendamentos?: agendamentosUncheckedCreateNestedManyWithoutServicosInput
    disponibilidadeprod?: disponibilidadeprodUncheckedCreateNestedManyWithoutServicosInput
  }

  export type servicosCreateOrConnectWithoutProdutosInput = {
    where: servicosWhereUniqueInput
    create: XOR<servicosCreateWithoutProdutosInput, servicosUncheckedCreateWithoutProdutosInput>
  }

  export type servicosCreateManyProdutosInputEnvelope = {
    data: servicosCreateManyProdutosInput | servicosCreateManyProdutosInput[]
    skipDuplicates?: boolean
  }

  export type disponibilidadeprodUpsertWithWhereUniqueWithoutProdutosInput = {
    where: disponibilidadeprodWhereUniqueInput
    update: XOR<disponibilidadeprodUpdateWithoutProdutosInput, disponibilidadeprodUncheckedUpdateWithoutProdutosInput>
    create: XOR<disponibilidadeprodCreateWithoutProdutosInput, disponibilidadeprodUncheckedCreateWithoutProdutosInput>
  }

  export type disponibilidadeprodUpdateWithWhereUniqueWithoutProdutosInput = {
    where: disponibilidadeprodWhereUniqueInput
    data: XOR<disponibilidadeprodUpdateWithoutProdutosInput, disponibilidadeprodUncheckedUpdateWithoutProdutosInput>
  }

  export type disponibilidadeprodUpdateManyWithWhereWithoutProdutosInput = {
    where: disponibilidadeprodScalarWhereInput
    data: XOR<disponibilidadeprodUpdateManyMutationInput, disponibilidadeprodUncheckedUpdateManyWithoutProdutosInput>
  }

  export type disponibilidadeprodScalarWhereInput = {
    AND?: disponibilidadeprodScalarWhereInput | disponibilidadeprodScalarWhereInput[]
    OR?: disponibilidadeprodScalarWhereInput[]
    NOT?: disponibilidadeprodScalarWhereInput | disponibilidadeprodScalarWhereInput[]
    Id_Disponibilidade?: IntFilter<"disponibilidadeprod"> | number
    Id_Produto?: IntFilter<"disponibilidadeprod"> | number
    Id_Servico?: IntFilter<"disponibilidadeprod"> | number
  }

  export type imagensUpsertWithWhereUniqueWithoutProdutosInput = {
    where: imagensWhereUniqueInput
    update: XOR<imagensUpdateWithoutProdutosInput, imagensUncheckedUpdateWithoutProdutosInput>
    create: XOR<imagensCreateWithoutProdutosInput, imagensUncheckedCreateWithoutProdutosInput>
  }

  export type imagensUpdateWithWhereUniqueWithoutProdutosInput = {
    where: imagensWhereUniqueInput
    data: XOR<imagensUpdateWithoutProdutosInput, imagensUncheckedUpdateWithoutProdutosInput>
  }

  export type imagensUpdateManyWithWhereWithoutProdutosInput = {
    where: imagensScalarWhereInput
    data: XOR<imagensUpdateManyMutationInput, imagensUncheckedUpdateManyWithoutProdutosInput>
  }

  export type imagensScalarWhereInput = {
    AND?: imagensScalarWhereInput | imagensScalarWhereInput[]
    OR?: imagensScalarWhereInput[]
    NOT?: imagensScalarWhereInput | imagensScalarWhereInput[]
    Id_Imagem?: IntFilter<"imagens"> | number
    Id_Produto?: IntNullableFilter<"imagens"> | number | null
    CaminhoImagem?: StringNullableFilter<"imagens"> | string | null
    AltText?: StringNullableFilter<"imagens"> | string | null
  }

  export type servicosUpsertWithWhereUniqueWithoutProdutosInput = {
    where: servicosWhereUniqueInput
    update: XOR<servicosUpdateWithoutProdutosInput, servicosUncheckedUpdateWithoutProdutosInput>
    create: XOR<servicosCreateWithoutProdutosInput, servicosUncheckedCreateWithoutProdutosInput>
  }

  export type servicosUpdateWithWhereUniqueWithoutProdutosInput = {
    where: servicosWhereUniqueInput
    data: XOR<servicosUpdateWithoutProdutosInput, servicosUncheckedUpdateWithoutProdutosInput>
  }

  export type servicosUpdateManyWithWhereWithoutProdutosInput = {
    where: servicosScalarWhereInput
    data: XOR<servicosUpdateManyMutationInput, servicosUncheckedUpdateManyWithoutProdutosInput>
  }

  export type servicosScalarWhereInput = {
    AND?: servicosScalarWhereInput | servicosScalarWhereInput[]
    OR?: servicosScalarWhereInput[]
    NOT?: servicosScalarWhereInput | servicosScalarWhereInput[]
    Id_Servico?: IntFilter<"servicos"> | number
    Nome?: StringNullableFilter<"servicos"> | string | null
    Titulo?: StringNullableFilter<"servicos"> | string | null
    Descricao?: StringNullableFilter<"servicos"> | string | null
    Duracao?: IntNullableFilter<"servicos"> | number | null
    Valor?: IntNullableFilter<"servicos"> | number | null
    Id_Produto?: IntNullableFilter<"servicos"> | number | null
  }

  export type agendamentosCreateWithoutServicosInput = {
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    clientes: clientesCreateNestedOneWithoutAgendamentosInput
    funcionarios?: funcionariosCreateNestedOneWithoutAgendamentosInput
    pagamentos?: pagamentosCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosUncheckedCreateWithoutServicosInput = {
    Id_Agendamento?: number
    Id_Cliente: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
    pagamentos?: pagamentosUncheckedCreateNestedManyWithoutAgendamentosInput
  }

  export type agendamentosCreateOrConnectWithoutServicosInput = {
    where: agendamentosWhereUniqueInput
    create: XOR<agendamentosCreateWithoutServicosInput, agendamentosUncheckedCreateWithoutServicosInput>
  }

  export type agendamentosCreateManyServicosInputEnvelope = {
    data: agendamentosCreateManyServicosInput | agendamentosCreateManyServicosInput[]
    skipDuplicates?: boolean
  }

  export type disponibilidadeprodCreateWithoutServicosInput = {
    produtos: produtosCreateNestedOneWithoutDisponibilidadeprodInput
  }

  export type disponibilidadeprodUncheckedCreateWithoutServicosInput = {
    Id_Disponibilidade?: number
    Id_Produto: number
  }

  export type disponibilidadeprodCreateOrConnectWithoutServicosInput = {
    where: disponibilidadeprodWhereUniqueInput
    create: XOR<disponibilidadeprodCreateWithoutServicosInput, disponibilidadeprodUncheckedCreateWithoutServicosInput>
  }

  export type disponibilidadeprodCreateManyServicosInputEnvelope = {
    data: disponibilidadeprodCreateManyServicosInput | disponibilidadeprodCreateManyServicosInput[]
    skipDuplicates?: boolean
  }

  export type produtosCreateWithoutServicosInput = {
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    disponibilidadeprod?: disponibilidadeprodCreateNestedManyWithoutProdutosInput
    imagens?: imagensCreateNestedManyWithoutProdutosInput
  }

  export type produtosUncheckedCreateWithoutServicosInput = {
    Id_Produto?: number
    Nome?: string | null
    Estoque?: number | null
    EstoqueCritico?: number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedCreateNestedManyWithoutProdutosInput
    imagens?: imagensUncheckedCreateNestedManyWithoutProdutosInput
  }

  export type produtosCreateOrConnectWithoutServicosInput = {
    where: produtosWhereUniqueInput
    create: XOR<produtosCreateWithoutServicosInput, produtosUncheckedCreateWithoutServicosInput>
  }

  export type agendamentosUpsertWithWhereUniqueWithoutServicosInput = {
    where: agendamentosWhereUniqueInput
    update: XOR<agendamentosUpdateWithoutServicosInput, agendamentosUncheckedUpdateWithoutServicosInput>
    create: XOR<agendamentosCreateWithoutServicosInput, agendamentosUncheckedCreateWithoutServicosInput>
  }

  export type agendamentosUpdateWithWhereUniqueWithoutServicosInput = {
    where: agendamentosWhereUniqueInput
    data: XOR<agendamentosUpdateWithoutServicosInput, agendamentosUncheckedUpdateWithoutServicosInput>
  }

  export type agendamentosUpdateManyWithWhereWithoutServicosInput = {
    where: agendamentosScalarWhereInput
    data: XOR<agendamentosUpdateManyMutationInput, agendamentosUncheckedUpdateManyWithoutServicosInput>
  }

  export type disponibilidadeprodUpsertWithWhereUniqueWithoutServicosInput = {
    where: disponibilidadeprodWhereUniqueInput
    update: XOR<disponibilidadeprodUpdateWithoutServicosInput, disponibilidadeprodUncheckedUpdateWithoutServicosInput>
    create: XOR<disponibilidadeprodCreateWithoutServicosInput, disponibilidadeprodUncheckedCreateWithoutServicosInput>
  }

  export type disponibilidadeprodUpdateWithWhereUniqueWithoutServicosInput = {
    where: disponibilidadeprodWhereUniqueInput
    data: XOR<disponibilidadeprodUpdateWithoutServicosInput, disponibilidadeprodUncheckedUpdateWithoutServicosInput>
  }

  export type disponibilidadeprodUpdateManyWithWhereWithoutServicosInput = {
    where: disponibilidadeprodScalarWhereInput
    data: XOR<disponibilidadeprodUpdateManyMutationInput, disponibilidadeprodUncheckedUpdateManyWithoutServicosInput>
  }

  export type produtosUpsertWithoutServicosInput = {
    update: XOR<produtosUpdateWithoutServicosInput, produtosUncheckedUpdateWithoutServicosInput>
    create: XOR<produtosCreateWithoutServicosInput, produtosUncheckedCreateWithoutServicosInput>
    where?: produtosWhereInput
  }

  export type produtosUpdateToOneWithWhereWithoutServicosInput = {
    where?: produtosWhereInput
    data: XOR<produtosUpdateWithoutServicosInput, produtosUncheckedUpdateWithoutServicosInput>
  }

  export type produtosUpdateWithoutServicosInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUpdateManyWithoutProdutosNestedInput
    imagens?: imagensUpdateManyWithoutProdutosNestedInput
  }

  export type produtosUncheckedUpdateWithoutServicosInput = {
    Id_Produto?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Estoque?: NullableIntFieldUpdateOperationsInput | number | null
    EstoqueCritico?: NullableIntFieldUpdateOperationsInput | number | null
    disponibilidadeprod?: disponibilidadeprodUncheckedUpdateManyWithoutProdutosNestedInput
    imagens?: imagensUncheckedUpdateManyWithoutProdutosNestedInput
  }

  export type pagamentosCreateManyAgendamentosInput = {
    Id_Pagamentos?: number
    Valor?: number | null
    Status?: $Enums.pagamentos_Status | null
    Modalidade?: $Enums.pagamentos_Modalidade | null
    Fatura?: number | null
  }

  export type pagamentosUpdateWithoutAgendamentosInput = {
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type pagamentosUncheckedUpdateWithoutAgendamentosInput = {
    Id_Pagamentos?: IntFieldUpdateOperationsInput | number
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type pagamentosUncheckedUpdateManyWithoutAgendamentosInput = {
    Id_Pagamentos?: IntFieldUpdateOperationsInput | number
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    Status?: NullableEnumpagamentos_StatusFieldUpdateOperationsInput | $Enums.pagamentos_Status | null
    Modalidade?: NullableEnumpagamentos_ModalidadeFieldUpdateOperationsInput | $Enums.pagamentos_Modalidade | null
    Fatura?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type agendamentosCreateManyClientesInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
  }

  export type agendamentosUpdateWithoutClientesInput = {
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    servicos?: servicosUpdateOneRequiredWithoutAgendamentosNestedInput
    funcionarios?: funcionariosUpdateOneWithoutAgendamentosNestedInput
    pagamentos?: pagamentosUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateWithoutClientesInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    pagamentos?: pagamentosUncheckedUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateManyWithoutClientesInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type agendamentosCreateManyFuncionariosInput = {
    Id_Agendamento?: number
    Id_Servico: number
    Id_Cliente: number
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
  }

  export type agendamentosUpdateWithoutFuncionariosInput = {
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    servicos?: servicosUpdateOneRequiredWithoutAgendamentosNestedInput
    clientes?: clientesUpdateOneRequiredWithoutAgendamentosNestedInput
    pagamentos?: pagamentosUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateWithoutFuncionariosInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    pagamentos?: pagamentosUncheckedUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateManyWithoutFuncionariosInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type disponibilidadeprodCreateManyProdutosInput = {
    Id_Disponibilidade?: number
    Id_Servico: number
  }

  export type imagensCreateManyProdutosInput = {
    Id_Imagem?: number
    CaminhoImagem?: string | null
    AltText?: string | null
  }

  export type servicosCreateManyProdutosInput = {
    Id_Servico?: number
    Nome?: string | null
    Titulo?: string | null
    Descricao?: string | null
    Duracao?: number | null
    Valor?: number | null
  }

  export type disponibilidadeprodUpdateWithoutProdutosInput = {
    servicos?: servicosUpdateOneRequiredWithoutDisponibilidadeprodNestedInput
  }

  export type disponibilidadeprodUncheckedUpdateWithoutProdutosInput = {
    Id_Disponibilidade?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
  }

  export type disponibilidadeprodUncheckedUpdateManyWithoutProdutosInput = {
    Id_Disponibilidade?: IntFieldUpdateOperationsInput | number
    Id_Servico?: IntFieldUpdateOperationsInput | number
  }

  export type imagensUpdateWithoutProdutosInput = {
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type imagensUncheckedUpdateWithoutProdutosInput = {
    Id_Imagem?: IntFieldUpdateOperationsInput | number
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type imagensUncheckedUpdateManyWithoutProdutosInput = {
    Id_Imagem?: IntFieldUpdateOperationsInput | number
    CaminhoImagem?: NullableStringFieldUpdateOperationsInput | string | null
    AltText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type servicosUpdateWithoutProdutosInput = {
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUpdateManyWithoutServicosNestedInput
    disponibilidadeprod?: disponibilidadeprodUpdateManyWithoutServicosNestedInput
  }

  export type servicosUncheckedUpdateWithoutProdutosInput = {
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
    agendamentos?: agendamentosUncheckedUpdateManyWithoutServicosNestedInput
    disponibilidadeprod?: disponibilidadeprodUncheckedUpdateManyWithoutServicosNestedInput
  }

  export type servicosUncheckedUpdateManyWithoutProdutosInput = {
    Id_Servico?: IntFieldUpdateOperationsInput | number
    Nome?: NullableStringFieldUpdateOperationsInput | string | null
    Titulo?: NullableStringFieldUpdateOperationsInput | string | null
    Descricao?: NullableStringFieldUpdateOperationsInput | string | null
    Duracao?: NullableIntFieldUpdateOperationsInput | number | null
    Valor?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type agendamentosCreateManyServicosInput = {
    Id_Agendamento?: number
    Id_Cliente: number
    Id_Funcionario?: number | null
    Data?: Date | string | null
    HoraInicio?: Date | string | null
    HoraFinal?: Date | string | null
    Status?: $Enums.agendamentos_Status | null
    Observacoes?: string | null
    LembreteEnviado?: boolean
  }

  export type disponibilidadeprodCreateManyServicosInput = {
    Id_Disponibilidade?: number
    Id_Produto: number
  }

  export type agendamentosUpdateWithoutServicosInput = {
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    clientes?: clientesUpdateOneRequiredWithoutAgendamentosNestedInput
    funcionarios?: funcionariosUpdateOneWithoutAgendamentosNestedInput
    pagamentos?: pagamentosUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateWithoutServicosInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
    pagamentos?: pagamentosUncheckedUpdateManyWithoutAgendamentosNestedInput
  }

  export type agendamentosUncheckedUpdateManyWithoutServicosInput = {
    Id_Agendamento?: IntFieldUpdateOperationsInput | number
    Id_Cliente?: IntFieldUpdateOperationsInput | number
    Id_Funcionario?: NullableIntFieldUpdateOperationsInput | number | null
    Data?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    HoraFinal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableEnumagendamentos_StatusFieldUpdateOperationsInput | $Enums.agendamentos_Status | null
    Observacoes?: NullableStringFieldUpdateOperationsInput | string | null
    LembreteEnviado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type disponibilidadeprodUpdateWithoutServicosInput = {
    produtos?: produtosUpdateOneRequiredWithoutDisponibilidadeprodNestedInput
  }

  export type disponibilidadeprodUncheckedUpdateWithoutServicosInput = {
    Id_Disponibilidade?: IntFieldUpdateOperationsInput | number
    Id_Produto?: IntFieldUpdateOperationsInput | number
  }

  export type disponibilidadeprodUncheckedUpdateManyWithoutServicosInput = {
    Id_Disponibilidade?: IntFieldUpdateOperationsInput | number
    Id_Produto?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}