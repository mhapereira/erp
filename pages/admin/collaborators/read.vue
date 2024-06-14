<script setup>
const supabase = useSupabaseClient()

//variaveis
const collaborators = ref([])
const error = ref(null)
const columns = ref(['Id', 'Nome', 'E-mail', 'Telefone', 'Ações'])


onMounted(async () => {
  try {
    let { data, error: err } = await supabase
      .from('collaborators')
      .select('*')
    if (err) throw err
    collaborators.value = data
  } catch (err) {
    error.value = err.message
    console.error(err)
  }
})

</script>

<template>
    <div>
        <h1 class="mb-5">Lista de colaboradores</h1>
        <div v-if="error">
            <p>Error: {{ error }}</p>
        </div>
        <div v-else>
          <!-- <UiTable :columns="columns" :items="collaborators" path="/" /> -->
          <table class="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden text-xs shadow-sm">
            <thead>
              <tr>
                <th class="px-6 py-2 bg-gray-100 text-left text-xs font-medium text-gray-900">Id</th>
                <th class="px-6 py-2 bg-gray-100 text-left text-xs font-medium text-gray-900">Nome</th>
                <th class="px-6 py-2 bg-gray-100 text-left text-xs font-medium text-gray-900">E-mail</th>
                <th class="px-6 py-2 bg-gray-100 text-left text-xs font-medium text-gray-900">Telefone</th>
                <th class="px-6 py-2 bg-gray-100 text-center text-xs font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="collaborator in collaborators" :key="collaborator.id">
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.id }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.name }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.email }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.phone }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700 text-center">

                  <NuxtLink :to="{name: 'admin-collaborators-update-id', params: { id: collaborator.id }}" class="font-medium text-indigo-800 mr-2">
                    Editar
                  </NuxtLink>
                  <NuxtLink :to="{name: 'admin-collaborators-delete', params: { id: collaborator.id }}" class="font-medium text-red-800">
                    Deletar
                  </NuxtLink>

                </td>
              </tr>
            </tbody>
          </table>

        </div>
    </div>
</template>