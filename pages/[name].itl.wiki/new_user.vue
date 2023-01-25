<template>
    <div>
        <AddUsers/>
    </div>
</template>
<script>
definePageMeta ({
  layout: "company", 
  middleware: ['auth', 'team'],
})
</script>
<style lang="scss" scored>

</style>