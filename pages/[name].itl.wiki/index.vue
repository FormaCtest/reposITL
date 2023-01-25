<template>
    <div>
        
    </div>
</template>
<script>
definePageMeta ({
  layout: "company",
  middleware: ['auth', 'team'],
})
import { useSectionStore } from '~~/stores/SectionStore';
export default{
  setup(){
    const sect = useSectionStore()
    return{sect}
  },
  mounted(){
    this.sect.close_sect()
  }
}
</script>
<style lang="scss" scored>

</style>