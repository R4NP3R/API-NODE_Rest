import { Router } from "express";
import { CidadeController, PessoaController, UsuariosController } from "../controllers";
import { ensureAuthenticated } from "../shared/middlewares";


const router = Router();

router.get('/', (req, res) => {

  res.send("Olá, Dev")
})

router.post('/cidades', ensureAuthenticated, CidadeController.createValidation, CidadeController.create)
router.get('/cidades', ensureAuthenticated, CidadeController.getAllValidation, CidadeController.getAll)
router.get('/cidades/:id', ensureAuthenticated, CidadeController.getByIdValidation, CidadeController.getById)
router.put('/cidades/:id', ensureAuthenticated, CidadeController.updateByIdValidation, CidadeController.updateById)
router.delete('/cidades/:id', ensureAuthenticated, CidadeController.deleteByIdValidation, CidadeController.DeleteById)

router.post('/pessoas', ensureAuthenticated, PessoaController.createValidation, PessoaController.Create)
router.get('/pessoas', ensureAuthenticated, PessoaController.getAll)
router.get('/pessoas/:id', ensureAuthenticated, PessoaController.getByIdValidation, PessoaController.getById)
router.put('/pessoas/:id', ensureAuthenticated, PessoaController.updateByIdValidation, PessoaController.updateById)
router.delete('/pessoas/:id', ensureAuthenticated, PessoaController.deleteByIdValidation, PessoaController.DeleteById)

router.post('/entrar', UsuariosController.SignInValidation, UsuariosController.SignIn)
router.post('/cadastrar', UsuariosController.SignUpValidation, UsuariosController.SignUp)

export { router }
