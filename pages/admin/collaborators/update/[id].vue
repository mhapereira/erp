<script setup>
import * as yup from 'yup'
const route = useRoute()
const supabase = useSupabaseClient()

//variaveis
const collaborator = ref(null)
const collaborator_roles = ref([])
const collaborator_offices = ref([])
const collaborator_addresses = ref([])
const collaborator_accounts = ref(null)

const new_collaborator = ref(null)
const new_collaborator_roles = ref([])
const new_collaborator_offices = ref([])
const new_collaborator_addresses = ref([])
const new_collaborator_accounts = ref(null)


const error = ref(null)
const id = ref(null)

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

const state = reactive({
  name: null,
  email: null,
  birth: null,
  cpf: null,
  phone: null,
  active: true  
})

onMounted(async () => {

  id.value = route.params.id;

  try{
    
    let { data: collaborators_data, erro: collaborators_err } = await supabase
      .from('collaborators')
      .select('*')
      .eq('id', id.value)
      .single()
    if (collaborators_err) throw collaborators_err
    collaborator.value = collaborators_data
    if (collaborator.value.name) state.name = collaborator.value.name
    if (collaborator.value.email) state.email = collaborator.value.email
    if (collaborator.value.birth) state.birth = formatDate(collaborator.value.birth)
    if (collaborator.value.cpf) state.cpf = collaborator.value.cpf
    if (collaborator.value.phone) state.phone = collaborator.value.phone
    if (collaborator.value.phone) state.active = collaborator.value.active

    let { data: collaborator_roles_data, erro: collaborator_roles_err } = await supabase
      .from('collaborator_roles')
      .select('*')
    if (collaborator_roles_err) throw collaborator_roles_err
    collaborator_roles.value = collaborator_roles_data

    let { data: collaborator_offices_data, erro: collaborator_offices_err } = await supabase
      .from('collaborator_offices')
      .select('*')
    if (collaborator_offices_err) throw collaborator_offices_err
    collaborator_offices.value = collaborator_offices_data

    let { data: collaborator_addresses_data, erro: collaborator_addresses_err } = await supabase
      .from('collaborator_addresses')
      .select('*')
      .eq('collaborators_id', id.value)
    if (collaborator_addresses_err) throw collaborator_addresses_err
    collaborator_addresses.value = collaborator_addresses_data

    let { data: collaborator_accounts_data, erro: collaborator_accounts_err } = await supabase
      .from('collaborator_accounts')
      .select('*')
      //.eq('collaborators_id', id.value)
      //.single()
    if (collaborator_accounts_err) throw collaborator_accounts_err
    collaborator_accounts.value = collaborator_accounts_data

  } catch (err) {
    error.value = err.message
    console.error(err)
  }
    
})

const removeNonNumeric = (value) => {
  // Remove caracteres não numéricos usando uma expressão regular
  return value.replace(/[^\d]/g, '');
};

function formatDateForPostgres(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
}

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('E-mail inválido'),
  birth: yup.string(),
  cpf: yup.string().transform(removeNonNumeric) // Remove caracteres não numéricos
    .matches(/^\d+$/, 'cpf inválido')
    .min(11, 'cpf inválido')
    .max(11, 'cpf inválido'),
  phone: yup.string().transform(removeNonNumeric) // Remove caracteres não numéricos
    .matches(/^\d+$/, 'telefone inválido')
    .min(10, 'telefone inválido')
    .max(11, 'telefone inválido'),
  active: yup.boolean().required('Informe se o colaborador está ativo ou não')
});


const handleSubmit = async () => {
  try {
    const isValid = await schema.validate(state, { abortEarly: false });

    // Lógica para enviar os dados atualizados para o Supabase
    // Exemplo:
    const { data: new_collaborators_data, error: new_collaborators_err } = await supabase
    .from('collaborators').update({
      name: state.name,
      email: state.email,
      birth: formatDateForPostgres(state.birth),
      cpf: removeNonNumeric(state.cpf),
      phone: removeNonNumeric(state.phone),
      active: state.active,
    }).eq('id', id.value)
    .select('*')
    .eq('id', id.value)
    .single()
    if (new_collaborators_err) throw new_collaborators_err
    console.log(new_collaborators_data)
    // new_collaborator.value = collaborators_data
    // if (new_collaborator.value.name) state.name = new_collaborator.value.name
    // if (new_collaborator.value.email) state.email = new_collaborator.value.email
    // if (new_collaborator.value.birth) state.birth = formatDate(new_collaborator.value.birth)
    // if (new_collaborator.value.cpf) state.cpf = new_collaborator.value.cpf
    // if (new_collaborator.value.phone) state.phone = new_collaborator.value.phone
    // if (new_collaborator.value.phone) state.active = new_collaborator.value.active

    // console.log('Dados válidos, enviando para o Supabase:', state);
  } catch (validationError) {
    // Exibir mensagens de erro de validação
    const errors = {};
    validationError.inner.forEach(err => {
      errors[err.path] = err.message;
    });
    console.error('Erros de validação:', errors);
  }
};


/////////////////////////
</script>

<template>
    <div v-if="collaborator">
        collaborator {{ collaborator }}
        <br><br>
        state {{ state }}  
        <br><br>
        update {{ new_collaborator }}  

        <UForm @submit="handleSubmit">

          <UDivider
            label="Colaborador"
            :ui="{ label: 'text-primary-500 dark:text-primary-400 my-4' }"
          />

          <UCard>

            <UFormGroup label="Nome"  name="name" class="mb-3" required>
              <UInput placeholder="João Silva" v-model="state.name" icon="i-heroicons-user" />
            </UFormGroup>

            <UFormGroup label="E-mail"  name="email" class="mb-3">
              <UInput placeholder="joao.silva@mail.com" v-model="state.email" icon="i-heroicons-envelope"  />
            </UFormGroup>

            <UFormGroup label="Nascimento"  name="birth" class="mb-3">
              <UInput placeholder="25/03/1996" v-mask="['##/##/####']" v-model="state.birth" icon="i-heroicons-calendar" />
            </UFormGroup>

            <UFormGroup label="CPF"  name="cpf" class="mb-3">
              <UInput placeholder="xxx.xxx.xxx-xx" v-mask="['###.###.###-##']" v-model="state.cpf" icon="i-heroicons-ellipsis-horizontal" />
            </UFormGroup>

            <UFormGroup label="Telefone"  name="email" class="mb-3">
              <UInput placeholder="(16) 9 xxxx-xxxx ou (16) XXXX-XXXX" v-mask="['(##) ####-####', '(##) # ####-####']" v-model="state.phone" icon="i-heroicons-phone" />
            </UFormGroup>

            <UFormGroup label="Ativo" name="active">
              <UToggle v-model="state.active"/>
            </UFormGroup>
          
          </UCard>

          <UDivider
            label="Cargo"
            :ui="{ label: 'text-primary-500 dark:text-primary-400 my-4' }"
          />

          <UButton type="submit" icon="i-heroicons-document-arrow-up" block>
            Salvar
          </UButton>
          

        </UForm>
        
    </div>
</template>