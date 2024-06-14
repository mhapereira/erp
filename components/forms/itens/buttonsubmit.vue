<script setup>
const props = defineProps({
	name : {
		type: String,
		required: true
	},
	disabled : {
		type: String,
		default: true,
		required: true
	},
})

</script>

<template>
	<div>

		<fieldset>
			<button type="submit" disabled="true"
			 class="mt-2 w-full rounded-md py-1 px-2 font-medium text-white shadow-sm ring-1 bg-indigo-600  focus-visible:outline-none  sm:text-sm sm:leading-6"
			 :class="disabled ? 'cursor-pointer active:bg-indigo-900' : 'cursor-not-allowed bg-indigo-500'"
			> {{ props.name }}</button>
		</fieldset>
		
	</div>
</template>