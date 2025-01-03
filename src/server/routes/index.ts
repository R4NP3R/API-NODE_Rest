import { Router } from "express";
import { CidadeController, PessoaController, UsuariosController } from "../controllers";


const router = Router();

router.get('/', (req, res) => {

  res.send("Olá, Dev")
})

router.post('/cidades', CidadeController.createValidation, CidadeController.create)
router.get('/cidades', CidadeController.getAllValidation, CidadeController.getAll)
router.get('/cidades/:id', CidadeController.getByIdValidation, CidadeController.getById)
router.put('/cidades/:id', CidadeController.updateByIdValidation, CidadeController.updateById)
router.delete('/cidades/:id', CidadeController.deleteByIdValidation, CidadeController.DeleteById)

router.post('/pessoas', PessoaController.createValidation, PessoaController.Create)
router.get('/pessoas', PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getByIdValidation, PessoaController.getById)
router.put('/pessoas/:id', PessoaController.updateByIdValidation, PessoaController.updateById)
router.delete('/pessoas/:id', PessoaController.deleteByIdValidation, PessoaController.DeleteById)

router.post('/entrar', UsuariosController.SignInValidation, UsuariosController.SignIn)
router.post('/cadastrar', UsuariosController.SignUpValidation, UsuariosController.SignUp)

export { router }
