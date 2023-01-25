<template>
    <div>
            <button @click="Info()">Кликни на меня </button>
    </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
export default{
    setup(){
        const priv = useThePrivateStore()
        return{priv}
    },
    methods:{
        async Info(){
            const url = new URL(
    "https://api.wiki.itl.systems/team/employees/get"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": 70,
    "employee_id": 148,
};

useFetch(url, {
    method: "GET",
    headers,
    body: JSON.stringify(body),
})
        }
    }
}
</script>


