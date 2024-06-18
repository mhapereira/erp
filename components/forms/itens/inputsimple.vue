<script setup>
const props = defineProps({
	name : {
		type: String,
		required: true
	},
	id : {
		type: String,
		required: true
	},
	type : {
		type: String,
		default: 'text',
		required: true
	},
	placeholder : {
		type: String,
		default: null,
	},
	value : null
})

</script>

<template>
	<div>

		<fieldset>
			<label :for="props.id"
			class="block text-sm font-medium leading-6 text-gray-900"
			>
				{{ props.name }}

			</label>
			<input :type="props.type" :id="props.id" :value="props.value" :placeholder="props.placeholder"
			class="mt-2 block w-full rounded-md py-1 px-2 font-regular text-gray-900 shadow-sm ring-1 ring-gray-500 placeholder:text-gray-400 focus:ring-indigo-600 focus-visible:outline-none  sm:text-sm sm:leading-6"
			>
			value: {{ value }}
		</fieldset>
		
	</div>
</template>