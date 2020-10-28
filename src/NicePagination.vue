<template>
    <div class='nice-component flex'>
        <div :class="{'nice-pagination':true,'ml-auto': float=='right'}">
            <div :class="{'nice-pagination-buttons nice-pagination-prev ':true, 'mr-2': type=='simple', [`hover:bg-${color}`]: true}" @click="updateValue('min')">Prev</div>
            <div class="nice-pagination-numbers inline-flex mx-2" v-if="type!=='simple'">
                <template v-if="current > 1">
                    <div @click="updateValue('to', 1)" class="nice-pagination-buttons nice-pagination-number">1</div>
                    <div  :class="{'nice-pagination-buttons nice-pagination-number': true, [`hover:text-${color}`]: true}" >...</div>
                </template>
                <div  :class="{'nice-pagination-buttons nice-pagination-number': true, [`hover:text-${color}`]: true}" v-if="type=='long' && current-1 > 0" @click="updateValue('min')">{{current-1}}</div>
                <div  :class="{'nice-pagination-buttons nice-pagination-number text-white': true, [`bg-${color}`]: true}">{{ current }}</div>
                <div  :class="{'nice-pagination-buttons nice-pagination-number': true, [`hover:text-${color}`]: true}" v-if="type=='long' && current+1 <= total" @click="updateValue('plus')">{{current+1}}</div>
                <template v-if="current < total">
                    <div  :class="{'nice-pagination-buttons nice-pagination-number': true, [`hover:text-${color}`]: true}" >...</div>
                    <div @click="updateValue('to', total)" class='nice-pagination-buttons nice-pagination-number' >{{ total }}</div>
                </template>
            </div>
            <template v-if="current < total">
            <div :class="{'nice-pagination-buttons nice-pagination-next': true, [`hover:bg-${color}`]: true}" @click="updateValue('plus')">Next</div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.current=this.modelValue;
    },
    props: {
        total: {
            type: Number,
            default: 1
        },
        modelValue: {
            type: Number
        },
        type: {
            type: String,
            default: 'medium'
        },
        float: {
            type: String,
            default: 'left',
        },
        color: {
            type: String,
            default: 'primary',
        }
    },
    data() {
        return {
            current: 1,
        }
    },
    methods: {
        updateValue(ket, to) {
            if(this.current <= 1 && ket == 'min') {
                return;
            }
            else if(this.current == this.total && ket == 'plus') {
                return;
            }
            if(ket=='min') {
                this.current--;
                this.$emit('update:modelValue', this.current);
                this.$emit('onPrevPage');
            }
            else if (ket=='plus') {
                this.current++;
                this.$emit('update:modelValue', this.current);
                this.$emit('onNextPage');
            } else {
                this.current = to;
                this.$emit('update:modelValue', this.current);
                this.$emit('onToPage');
            }

        }
    },
    watch: {
        value: function() {
            if(this.value > this.total || this.value < 1) {
                this.$emit('update:modelValue', this.current);
                return;
            }
            this.current = this.value;
        }
    }
}
</script>
<style lang="scss">
.flex {
    display: flex;
}
.nice-pagination {
    display: flex;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin-top: 1rem;
    .nice-pagination-numbers {
        display: inline-flex;
    }
    &.ml-auto {
        margin-left: auto;
    }
    .nice-pagination-buttons {
        background-color: #f3f3f3;
        padding: .7rem 1rem;
        cursor: pointer;
        transition: all .3s;
        &:hover {
            background-color:#2d6187;
            color: #fff;
        }
    }
    .nice-pagination-prev {
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;
    }
    .nice-pagination-next {
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
    }
    .nice-pagination-buttons {
    }
}
</style>