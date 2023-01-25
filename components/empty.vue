<template>
    <nav>
        <div class="nav" :style="[{position: p},{height: h+'px'}]">
            <div class="fix_fon" ></div> <!--триггер для закрытия функций навбара-->
        </div>
        
    </nav>
</template>

<script>
import { useVisFunStore } from '@/stores/NavbarStore'
export  default {
props: {
    p: {
        type: String
    },
    h: {
        type: Number
    }
},
setup() {
    const def = useVisFunStore()
    return {def}
}
}
</script>
<style scored>
.nav {
position: fixed;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;
height: 649px;
background: #0E65DD;
width: 80px;
border-radius: 0px;

}


</style>
