const yup = require("yup");

yup.setLocale({
  mixed: {
    default: "inválido!",
    required: ({ label }) => label + " é uma informação necessária!",
  },
});

function validateCPF(cpf) {
  var sum;
  var rest;
  sum = 0;

  if (cpf == "00000000000") return false;

  for (i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return false;

  return true;
}

const schema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  cpf: yup
    .string()
    .required()
    .label("Cpf")
    .test("cpf-validator", "Cpf inválido!", value => {
      return validateCPF(value);
    }),
  email: yup
    .string()
    .lowercase()
    .required()
    .email("Email deve ser válido!")
    .label("Email"),
  phone_number: yup
    .string()
    .required()
    .label("Celular")
    .test("is-only-numbers", "Numero inválido", value => /^[0-9]*$/.test(value))
    .max(11, "Número inválido")
    .min(10, "Número inválido"),
  adress: yup.string().required().label("Endereço"),
  date_of_birth: yup.string().required().label("Data de nascimento"),
});

module.exports = schema;
