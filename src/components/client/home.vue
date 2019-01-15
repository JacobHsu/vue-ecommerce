<template>
    <div>
        <Navbar></Navbar>
        <Carousel></Carousel>
    </div>
</template>

<script>
import Navbar from './navbar_client'
import Carousel from './carousel'

export default {
    components: {
        Navbar,
        Carousel,
    },
}
</script>
