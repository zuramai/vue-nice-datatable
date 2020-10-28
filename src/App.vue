<template>
    <div class='main'>
        <h1>Vue Nice Datatable</h1>
        <div class="container">
            <vue-nice-datatable :data="users" :searchable="true" :paginate="true" :per-page="10">
                <template #thead>
                    <nice-tr>
                        <nice-th>ID</nice-th>
                        <nice-th>Name</nice-th>
                        <nice-th>Country</nice-th>
                        <nice-th>Email</nice-th>
                        <nice-th>Phone</nice-th>
                        <nice-th>Status</nice-th>
                    </nice-tr>
                </template>
                <template #tbody="{key,data}">
                    <nice-tr>
                        <nice-td>{{++key}}</nice-td>
                        <nice-td>{{data.name}}</nice-td>
                        <nice-td>{{data.country}}</nice-td>
                        <nice-td>{{data.email}}</nice-td>
                        <nice-td>{{data.phone}}</nice-td>
                        <nice-td>{{data.status}}</nice-td>
                    </nice-tr>
                </template>
            </vue-nice-datatable>
        </div>
    </div>
</template>
<script>
import  data from './data.json'
export default {
    data: () => ({
        users: data
    })
}
</script>
<style lang="scss">
    .container {
        width: 1140px;
        margin: 0 auto;
    }
    .main {
        font-family: sans-serif;
        background-color: f4f4f2;
        h1 {
            font-weight: 400;
            font-size: 4rem;
            text-align: center;
        }
    }
</style>
