<template>
  <div class="login-wrapper">
    <lang-select class="set-language" />
    <div class="login">
      <img src="../assets/lufei.jpg" alt="logo" class="login-logo">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="login-tab">
        <el-tab-pane :label="$t('login.account')" name="first">
          <el-form
            class="login-form"
            v-model="loginForm"
            :rules="loginRules"
          >
            <el-form-item prop="loginid" >
              <el-input
                ref="loginid"
                v-model="loginForm.loginid"
                type="text"
                autocomplete="off"
                :placeholder="$t('login.accountPlaceholder')"
                @input="inputChange"
              >
                <template slot="prepend"><i class="el-icon-user-solid"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input 
                v-model="loginForm.password" 
                autocomplete="off"
                :type="passwordType"
                :placeholder="$t('login.passwordPlaceholder')"
                show-password
              >
                <template slot="prepend"><i class="el-icon-s-release"></i></template>
              </el-input>
            </el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="joinHome"
            >
              {{ $t('login.submit') }}
            </el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('login.note')" name="second">
          <el-form 
            class="login-form"
            v-model="loginForm"
            :rules="loginRules"
          >
            <el-form-item  prop="phone">
              <el-input
                v-model="loginForm.phone"
                type="text"
                autocomplete="off"
                :placeholder="$t('login.notePlaceholder')"
              >
                <template slot="prepend"><i class="el-icon-phone"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input 
                v-model="loginForm.verification" 
                autocomplete="off"
                :placeholder="$t('login.verificationPlaceholder')"
              >
                <template slot="prepend"><i class="el-icon-info"></i></template>
              </el-input>
            </el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              @click="joinHome"
            >
              {{ $t('login.submit') }}
            </el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span style="margin-top: 15px">{{ $t('login.description') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Dictionary } from 'vuex'
import { Route } from 'vue-router'
import { Form as ElForm, Input } from 'element-ui';
import LangSelect from '@/components/LangSelect/index.vue'
import Api from '../api/commonApi'
import Cookies from 'js-cookie';

@Component({
  name: 'Login',
  components: {
    LangSelect
  }
})
export default class extends Vue{
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('Please enter the correct user name'));
    } else {
      callback();
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      callback(new Error('The password can not be less than 6 digits'));
    } else {
      callback();
    }
  }
  private activeName:string = 'first';
  private loginForm = {
    loginid: '',
    password: ''
  };
  private handleClick = () => {
    // console.log('I well');
  }
  private passwordType:string = 'password';

  private loginRules:object = {
    loginid: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }

  private showPassword = () => {
    console.log('显示密码', this.passwordType)
    if(this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }
  private joinHome(){
    const _this = this;
    Api.post('signin', this.loginForm).then(res => {
      if(res.data.message === 'login success') {
        Cookies.set('token', '123456');
        Cookies.set('userId', res.data.data.id)
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
      } else {
        _this.$message.error('账号密码错误！')
      }
    })
  }
  private inputChange = (value: any) => {
    console.log('value: ', value)
    console.log('value2: ', this)
  };
  mounted() {
    console.log(this)
    if (this.loginForm.loginid === '') {
      (this.$refs.loginid as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
  }
}
</script>

<style lang="scss">
  .login-wrapper{
    position: relative;
    background-color: skyblue;
    // min-height: 100vh;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .set-language {
        position:absolute;
        right: 10px;
        top: 10px;
        width: 30px;
      }
    .login{
      width: 400px;
      height: 400px;
      background-color: #fff;
      text-align: center;
      border-radius: 10px;
      box-shadow: 0 0 2px 2px rgba(0,0,0,0.06);
      padding: 20px;
      
      .login-logo {
        width: 100px;
        height: 100px;
      }
      .login-tab{
        margin-bottom: 10px;
      }
    }
  }
</style>