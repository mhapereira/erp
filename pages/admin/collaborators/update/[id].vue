<script setup>
const route = useRoute()
const supabase = useSupabaseClient()

//variaveis
const collaborator = ref([])
const error = ref(null)
const id = ref(null)

onMounted(async () => {

  id.value = route.params.id;

  try{
    let { data, erro: err } = await supabase
      .from('collaborators')
      .select('*')
      .eq('id', id.value)
    if (err) throw err
    collaborator.value = data
  } catch (err) {
    error.value = err.message
    console.error(err)
  }
    
})
</script>

<template>
    <div>
        update {{ id }} 
        <br>
        <form>
          <FormsItensInputsimple name="Nascimento" id="nascimento" type="text" placeholder="" value="" />
          <FormsItensButtonsubmit name="Enviar" />
        </form>
        
    </div>
</template>