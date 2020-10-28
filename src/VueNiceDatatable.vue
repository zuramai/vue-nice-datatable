<template>
    <div class="vue-nice-datatable">
		<div class="datatable-headings">
			<div class="filter">

			</div>
			<div class="search" v-if="searchable">
				<input type="text" name="search" id="datatable-search" v-model="search" placeholder="Search" class='datatable-search'>
			</div>
		</div>
        <table :class="{'nice-datatable':true, 
						[`datatable-${style}`]: true,
						[`datatable-${size}`]:true}">
            <thead>
				<slot name="thead"/>
            </thead>
            <tbody  >
                <template v-for="(row,index) in filteredData" :key="index">
					<slot :data="row" name="tbody"/>
				</template>
            </tbody>
        </table>
        <nice-pagination :total="totalPage" v-model="currentPage" float="right"></nice-pagination>
    </div>
</template>
<script>
import NiceTd from "./NiceTd"
import NiceTr from "./NiceTr"
import NiceTh from "./NiceTh"
import NicePagination from "./NicePagination"
import data from './data.json'

export default {
	components: {
		NiceTd, NiceTr, NiceTh, NicePagination
	},
    mounted() {
		console.log(this.perPage)
    },
    data() {
        return {
			search: ''
        }
    },
    computed: {
        paginated() {
            return this.data.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        },
        totalPage() {
            return Math.floor(this.data.length/this.perPage);
		},
		filteredData() {
			let data = this.data;
			console.log(this.search)
			if(this.search.length>0) {
				data = data.filter((d) => Object.values(d).some(o => typeof o == 'string' ? o.search(this.search) !== -1 : false))
			}
			if(this.paginate) {
				data = data.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
			}
			return data;
		}
    },
    props: {
        style: {
			type: String,
			default: 'striped'
		},
		size: {
			type: String,
			default: 'md'
		},
        data: {
            type: Array,
            default: [],
        },
        responsive: {
            type: Boolean,
            default: true
        },
        paginate:{
            type: Boolean,
            default: false,
        },
        currentPage: {
            type: Number,
            default: 1,
        },
        serverSide: {
            type: Boolean,
            default: false
        },
        offset: {
            type: Number,
            required: false,
		},
		searchable: {
			type: Boolean,
			default: false,
		},
        perPage: {
            type: Number,
            required:false,
        }
        
    }
}
</script>
<style lang="scss">
    .vue-nice-datatable {
    .datatable-headings {
        display: flex;
        padding: 1rem 0;
        justify-content: space-between;
        .datatable-search {
            padding: .7rem .6rem;
            border-radius: .3rem;
            border: 1px solid #dedede;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
    }
    .nice-datatable {
        --padding: .3rem 1rem;
        --border-radius: 1rem;

        border-collapse: collapse;
        width: 100%;
        overflow-y: auto;
        border: 1px solid #eee;
        border-radius: var(--border-radius);

        &.datatable-sm { --padding: 1rem; }
        &.datatable-md { --padding: 1rem .7rem; }
        &.datatable-lg { --padding: 3rem; }
        .nice-th {
        border-radius: var(--border-radius);
        text-align: left;
        }
        .nice-td, .nice-th {
            padding: var(--padding);
        }
        &.datatable-striped {
            tbody .nice-tr:nth-child(odd) {
                background-color: #eee;
            }
        }
    
        .table-headings {
            display: flex;
        }
    }
}
</style>