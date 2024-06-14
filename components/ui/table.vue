<script setup>
import { string } from 'yup';

const props = ref({
	columns : {
		type: Array
	},
	items : {
		type: Array
	},
	path : {
		type: string
	}
})
</script>

<template>
    <div>
			<table class="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden text-xs shadow-sm">
            <thead>
              <tr class="px-6 py-2 bg-gray-100 text-left text-xs font-medium text-gray-900">
                <th>Id</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th class="px-6 py-2 bg-gray-100 text-center text-xs font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in items" :key="collaborator.id">
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.id }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.name }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.email }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700">{{ collaborator.phone }}</td>
                <td class="px-6 py-2 whitespace-nowrap text-gray-700 text-center">

                  <a :href="collaborator.id" class="font-medium text-indigo-800 mr-2">
                    Editar
                  </a>

                  <a :href="collaborator.id" class="font-medium text-red-800">
                    Deletar
                  </a>

                </td>
              </tr>
            </tbody>
      </table>
    </div>
</template>