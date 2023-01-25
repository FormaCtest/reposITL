<template>
    <div>
     <div :style="[{top: top+'px'},{left: left+'px'}]" class="window">
     <img src="@/assets/resourses/icons/tringle.png">
     <div class="alert">{{ alert }}</div>
     </div>
    </div>
</template>
<script>
export default{
    props:{
        left:{
            type: Number
        },
        top: {
            type: Number
        },
        alert:{
            type: String
        }
    }
}
</script>
<style scored lang="scss">
@import "@/assets/scss/font_family.scss";
.window{
    display: flex;
    transition: 0.5s;
    flex-direction: row;
    position: relative;
    background-color: rgb(253, 228, 228);
    width: 1400px;
    height: 60px;
    left: -9px;
    z-index: 1;

    img{
        position: relative;
        width: 22px;
        height: 20px;
        top: 20px;
        left: 20px;

    }
    .alert{
        position: relative;
        top: 22px;
        left: 40px;
        font-family: 'Roboto_regular';
        font-size: 15px;
        color: rgb(179, 0, 0);
    }
}
</style>