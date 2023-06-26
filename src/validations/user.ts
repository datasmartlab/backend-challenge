import * as yup from 'yup';

export const addUserSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória').min(8, 'a senha precisa ter no mínimo 8 caracteres')
});

export const signInUserSchema = yup.object().shape({
    email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha é obrigatória').min(8, 'a senha precisa ter no mínimo 8 caracteres')
});