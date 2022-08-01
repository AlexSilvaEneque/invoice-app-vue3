<script setup>
    import { ref } from 'vue';
    import { mapState, useStore } from 'vuex';

    const filterMenu = ref(false)

    const toggleFilterMenu = () => {
        filterMenu.value = !filterMenu.value
        console.log(filterMenu.value)
    }

    const store = useStore()

    const newInvoice = () => store.dispatch('change') // actions
</script>

<template>
    <div class="home-container">
        <div class="home-header">
            <div class="left">
                <h1>Invoices</h1>
                <span>There are 3 total invoices</span>
            </div>
            <div class="right">
                <div @click="toggleFilterMenu" class="filter">
                    <span>Filter by status</span>
                    <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
                    <ul v-show="filterMenu" class="filter-menu">
                        <li>Draft</li>
                        <li>Pending</li>
                        <li>Paid</li>
                        <li>Clear Filter</li>
                    </ul>
                </div>
                <div @click="newInvoice" class="button">
                    <div class="inner-button">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .home-container {
        // border: white solid;
        padding: 1.5rem;

        .home-header {
            display: flex;
            flex-direction: row;

            .left {
                flex: 1 1 auto;

                h1, span {
                    color: #eee;
                }
            }

            .right {
                flex: 1 1 auto;
                display: flex;
                justify-content: flex-end;
                color: #eee;

                .filter {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                    cursor: pointer;
                    position: relative;

                    span {
                        margin-right: .5rem;
                    }

                    .icon {
                        color: rgb(121, 92, 247);
                    }

                    .filter-menu {
                        position: absolute;
                        top: 40px;
                        list-style: none;                        
                        background-color: rgb(39, 43, 67);
                        width: 100%;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        border-radius: 0 0 8px 8px;
                        overflow: hidden;

                        li {
                            padding: .7rem .5rem;
                            transition: .5s ease-out;

                            &:hover {
                                background-color: rgb(49, 53, 77);
                            }
                        }
                    }
                }

                .button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 50px;
                    border-radius: 2rem;
                    padding: 0 .6rem;
                    cursor: pointer;

                    background-color: rgb(121, 92, 247);

                    transition: .4s ease-out;

                    .inner-button {                        
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        margin-right: .2rem;

                        background-color: #eee;
                        color: rgb(121, 92, 247);

                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    &:hover {
                        transform: scale(1.01);
                    }

                }
            }
        }
    }
</style>