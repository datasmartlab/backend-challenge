import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().required('Descrição é obrigatório'),
    price: yup.number().required('preço é obrigatória').min(1, 'o preço precisa ter no minimo 1 digito').positive('Digite um valor positivo')
});

export const alterProductSchema = yup.object().shape({
    id: yup.number().required('ID é obrigatório'),
    name: yup.string().required('Nome é obrigatório'),
    description: yup.string().required('Descrição é obrigatório'),
    price: yup.number().required('preço é obrigatória').positive('Digite um valor positivo')
});
