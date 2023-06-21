import * as Yup from 'yup';

export const addUserSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: Yup.string().required('Senha é obrigatória').min(8, 'a senha precisa ter no mínimo 8 caracteres')
});

export const signInUserSchema = Yup.object().shape({
    email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: Yup.string().required('Senha é obrigatória').min(8, 'a senha precisa ter no mínimo 8 caracteres')
});