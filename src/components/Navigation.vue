<script setup>

</script>

<template>
    <header class="content-navbar">
        <div class="navbar-div">
            <span class="navbar-item">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </span>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .content-navbar {
        z-index: 99;
        display: flex;
        flex-direction: column;
        background-color: #1e2139;
        border-radius: 0 .7rem .7rem 0;
        min-height: 100vh;
        width: 90px;

        @media(max-width: 780px) {
            width: 60px;
        }

        .navbar-div {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            background-color: rgb(39, 43, 67);
            border-radius: 0 5px 5px 0;
            cursor: pointer;

            transition: .4s ease-out;

            &:hover {
                background-color: rgb(49, 53, 77);
                color: rgb(121, 92, 247);
            }

            .navbar-item {
                font-size: 22px;
            }
        }
    }
</style>