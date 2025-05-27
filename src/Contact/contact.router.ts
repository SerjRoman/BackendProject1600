import express from 'express';
import { ContactController } from './contact.controller';
import { validateMiddleware } from '../middlewares/validate';

const router = express.Router()
// TODO: Добавить валидацию для создания контакта
router.get('/',ContactController.getAllContacts)
router.get('/:id', ContactController.getContactById)
router.post("/create", ContactController.createContact)

export default router