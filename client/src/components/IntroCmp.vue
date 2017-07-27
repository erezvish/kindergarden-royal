<template>
    <section>
        <div class="titles">
            <h1>kinderYA!</h1>
            <h2>A Safety App for Parents That Kids Like!</h2>
            <el-button @click="goHome">Go to Login</el-button>
        </div>
        <div class="bg-img"> </div>
    </section>
</template>

<<script>
export default {
    name: 'intro-cmp',

    created() {
        this.$emit('toggle-header', false)
    },
    destroyed() {
        this.$emit('toggle-header', true)
    },
    methods: {
        goHome() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.bg-img {
    height: 100vh;
    width: 100vw;
    background-image: url("/static/img/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.titles {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    font-family: Boogaloo, "Varela Round", cursive;
    color: white;
    text-shadow: 0 0 11px rgba(0, 0, 0, 0.8);
    h1 {
        font-size: 6em;
        font-weight: 300;
        opacity: 0;
        animation: fade-in 2s linear forwards;
        @media screen and (max-width: $sm) {
            font-size: 3.5em;
            margin-bottom: 0;
        }
    }
    h2 {
        font-size: 4em;
        font-weight: 300;
        opacity: 0;
        animation: fade-in2 4s linear forwards;
        @media screen and (max-width: $sm) {
            font-size: 1.4em;
        }
    }
    @keyframes fade-in {
        100% {
            opacity: 1;
        }
    }
    @keyframes fade-in2 {
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>



