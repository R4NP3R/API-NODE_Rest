import * as updateById from './UpdateById'
import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as count from './Count'


export const CidadesProviders = {
  ...create,
  ...getById,
  ...getAll,
  ...deleteById,
  ...updateById,
  ...count
}