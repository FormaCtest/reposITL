<!--Начальная страница компании-->
<template>
    <div>
        <start_window />
    </div>
</template>
<script>
definePageMeta({
    middleware: ['auth'],
    layout: 'company'
})
</script>
<style scored>
h1{
    text-align: center;
}
</style>