<script setup>
import { ref } from 'vue';

let count = ref( 0 )

</script>

<template>
    <header class="w-full px-5 py-3 bg-slate-800 text-slate-50 flex flex-row justify-between">
        <img class="h-8 w-auto" src="../../assets/img/logo.svg" alt="">
        <ul class="flex flex-row gap-6">
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li class="cursor-pointer" v-on:click="count++">{{ count.toString().length < 2 ? count = '0' + count : count }}</li>
        </ul>
    </header>
</template>