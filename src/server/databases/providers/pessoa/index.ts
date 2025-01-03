import * as create from './Create';
import * as deleteById from './DeleteById'
import * as getAll from './GetAll';
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as Count from './Count'


export const PessoaProviders = {
  ...create,
  ...deleteById,
  ...getAll,
  ...getById,
  ...updateById,
  ...Count,
}