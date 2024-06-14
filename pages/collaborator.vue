<script setup>
// import { useSupabaseClient } from '@supabase/supabase-js'
import * as yup from 'yup'
const supabase = useSupabaseClient()
const collaborators = ref([])
const error = ref(null)
const form = ref({
  name: '',
  email: '',
  birth: '',
  sexo: ''
})
const formOffice = ref({
  office: ''
})
const btn = ref('Enviar')
const errors = ref({})
const submitError = ref('')

const schema = yup.object().shape({
  name: yup.string().nullable(),
  email: yup.string().email('Email inválido').nullable(),
  birth: yup.date().transform((value, originalValue) => {
    return originalValue === "" ? null : value;
  }).nullable(),
  sexo: yup.number('numero').required().positive().integer()
})

onMounted(async () => {
  try {
    let { data, error: err } = await supabase
      .from('collaborators')
      .select('*,collaborator_offices(*),collaborator_roles(*)')
    if (err) throw err
    collaborators.value = data
  } catch (err) {
    error.value = err.message
    console.error(err)
  }
})
// console.log(collaborators)

const handleSubmit = async () => {
  errors.value = {}
    btn.value = 'Validando...'
  try {
    // Valida o formulário
    await schema.validate(form.value, { abortEarly: false })
    btn.value = 'Enviando...'
    console.log(form.value)
    btn.value = 'Enviar'
    // Envia os dados para o Supabase
    // const { data, error } = await supabase
    //   .from('clients')
    //   .insert([
    //     {
    //       name: form.value.name,
    //       email: form.value.email,
    //       birth: form.value.birth,
    //       cpf: form.value.cpf.replace(/[^\d]/g, ''),  // Remover a máscara
    //       phone: form.value.phone.replace(/[^\d]/g, ''),  // Remover a máscara
    //       created_at: new Date().toISOString()
    //     }
    //   ])

    // if (error) throw error

    // // Limpa o formulário após o envio
    // form.value = {
    //   name: '',
    //   email: '',
    //   birth: '',
    //   cpf: '',
    //   phone: ''
    // }

    // submitError.value = ''
    // console.log('Dados enviados com sucesso:', data)
  } catch (err) {
    btn.value = 'Enviar'
    if (err.inner) {
      // Define os erros de validação
      err.inner.forEach(e => {
        errors.value[e.path] = e.message
      })
    } 
    else {
      // Define erros de envio
      submitError.value = err.message
    }
  }
}
</script>

<template>
    <div>
        <h1 class="mb-5">Colaboradores</h1>
        <div v-if="error">
            <p>Error: {{ error }}</p>
        </div>
        <div v-else>
            <ul>
                <li v-for="collaborator in collaborators" :key="collaborator.id">
                    Nome: {{ collaborator.name  }} <br>
                    Cargo: {{ collaborator.collaborator_offices.office  }} <br>
                    Permissão: {{ collaborator.collaborator_roles.role }}
                </li>
            </ul>
        </div>
        <form class="mt-5" @submit.prevent="handleSubmit">
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="form.name" :class="{ 'is-invalid': errors.name }" id="name"/>
                <div v-if="errors.name" class="error">{{ errors.name }}</div>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" :class="{ 'is-invalid': errors.email }" id="email" />
                <div v-if="errors.email" class="error">{{ errors.email }}</div>
            </div>
            <div>
                <label for="birth">Birth Date:</label>
                <input type="date" v-model="form.birth" :class="{ 'is-invalid': errors.birth }" id="birth"/>
                <div v-if="errors.birth" class="error">{{ errors.birth }}</div>
            </div>
            <div>
                <label for="birth">Sexo:</label>
                <!-- <select v-model="form.sexo" :class="{ 'is-invalid': errors.gender }" id="gender">
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                </select> -->
                <div v-if="errors.gender" class="error">{{ errors.gender }}</div>
            </div>
            <button type="submit">{{ btn }}</button>
        </form>
    </div>
</template>