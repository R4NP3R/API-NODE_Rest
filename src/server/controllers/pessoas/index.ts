import * as Create from './Create'
import * as DeleteById from './DeleteById'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as updateById from './UpdateById'

export const PessoaController = {
  ...Create,
  ...DeleteById,
  ...getAll,
  ...getById,
  ...updateById,
}