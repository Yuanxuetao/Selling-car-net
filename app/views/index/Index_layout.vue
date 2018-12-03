<template>
    <div>
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="$store.state.routerStore.columnname" @on-select="selectHandler">
                    <div class="layout-logo">
                        <img src="/images/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="md-home" />
                            首页
                        </MenuItem>
                        <MenuItem name="buy">
                            <Icon type="md-nutrition" />
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                           <Icon type="md-pizza" />
                            卖车
                        </MenuItem>
                        <MenuItem name="user">
                            <Icon type="logo-tux" />
                            用户
                        </MenuItem>
                        <MenuItem name="park">
                            <Icon type="ios-paper"></Icon>
                            停车场
                        </MenuItem>
                        <div class="meinfo">
                            <Poptip placement="bottom">
                                <div slot="content" class="content_slot">
                                    <ul>
                                        <li><a href="javascript:void(0)" @click="showModal">更改头像</a></li>
                                        <li><a href="javascript:void(0)">退出登录</a></li>
                                    </ul>
                                </div>

                                <Avatar style="cursor:pointer" v-if="!meinfo.avatar" icon="ios-person"  size="large"/>
                                <Avatar style="cursor:pointer" v-if="meinfo.avatar" :src="`http://127.0.0.1:3000/images/avatars/${meinfo.username}.jpg`"  size="large"/>
                            </Poptip>
                            欢迎你，{{meinfo.name}}！
                        </div>
                    </div>
                </Menu>
            </Header>
            
        </Layout>
        <!-- 小电视 -->
        <router-view></router-view>

        <!-- 改头像的模态框 -->
        <ChangeAvatar v-if="isShowModal" @close="closeModal"></ChangeAvatar>
    </div>
</template>

<script>
     
    export default {
        //组件创建之后
        created() {
           
        },
        data(){
            return {
                isShowModal : false
            }
        },
        // 事件
        methods : {
            //点击菜单栏了
            selectHandler(n){
                if(n == "buy"){
                    n = "carlist";
                }
                this.$router.push({"name" : n});
            },
            //显示模态框
            showModal(){
                this.isShowModal = true;
            },
            //下树
            closeModal(){
                this.isShowModal = false;
            }
        },
        computed : {
            meinfo(){
                return this.$store.state.meStore; 
            }
        }
    }
</script>

<style scoped lang="less">
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 350px;
        height: 40px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 12px;
        left: 20px;
    }
    .layout-nav{
        width: 780px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .ivu-menu-horizontal .ivu-menu-item{
        font-size:16px;
    }
    .meinfo{
        color:white;
    }
    .content_slot{
        a{
            line-height: 30px;
            font-size:16px;
        }
    }
    
</style>