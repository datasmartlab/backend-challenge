import * as Yup from 'yup';

export const addProductSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    price: Yup.number().required('preço é obrigatória').min(1, 'o preço precisa ter no minimo 1 digito').positive('Digite um valor positivo')
});

export const alterProductSchema = Yup.object().shape({
    id: Yup.number().required('ID é obrigatório'),
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    price: Yup.number().required('preço é obrigatória').positive('Digite um valor positivo')
});
