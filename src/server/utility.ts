import { config } from 'dotenv';
import {
  createConnection,
  DeepPartial,
  EntityTarget,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';

config();

const ENVIRONMENT = process.env.ENVIRONMENT as string;

type Callback<Entity, Res> = (respository: Repository<Entity>) => Promise<Res>;

async function connect<Entity, Res>(
  entity: EntityTarget<Entity>,
  callback: Callback<Entity, Res>,
) {
  const connection = await createConnection(ENVIRONMENT);
  const repository = getRepository(entity, ENVIRONMENT);
  const responce = await callback(repository);
  connection.close();
  return responce;
}

function find<Entity>(entity: EntityTarget<Entity>): Promise<Entity[]>;

function find<Entity>(
  entity: EntityTarget<Entity>,
  option: FindOneOptions<Entity>,
): Promise<Entity[]>;

function find<Entity>(
  entity: EntityTarget<Entity>,
  option: FindManyOptions<Entity>,
): Promise<Entity[]>;

function find<Entity>(
  entity: EntityTarget<Entity>,
  conditions: FindConditions<Entity>,
): Promise<Entity[]>;

async function find<Entity>(
  entity: EntityTarget<Entity>,
  option:
    | FindOneOptions<Entity>
    | FindManyOptions<Entity>
    | FindConditions<Entity> = {},
) {
  return connect(entity, (repository) => repository.find(option));
}

function findOne<Entity>(
  entity: EntityTarget<Entity>,
  conditions?: FindConditions<Entity>,
): Promise<Entity | undefined>;

function findOne<Entity>(
  entity: EntityTarget<Entity>,
  conditions?: FindConditions<Entity>,
  option?: FindOneOptions<Entity>,
): Promise<Entity | undefined>;

async function findOne<Entity>(
  entity: EntityTarget<Entity>,
  conditions?: FindConditions<Entity>,
  option?: FindOneOptions<Entity>,
) {
  return connect(entity, (repository) =>
    repository.findOne(conditions, option),
  );
}

async function save<Entity>(
  entity: EntityTarget<Entity>,
  data: DeepPartial<Entity>,
) {
  await connect(entity, (repository) => repository.save(data));
}

export { connect, find, findOne, save };
