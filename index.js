Vue.component('fdiv',{
    props:['fdata','changeuser'],
    template:`
        <div class="fdiv">
            <div class="fimgdiv">
                <img :src="fdata.avatar_url" class="favatar"></img>
            </div>
            <div class="fdetails">
                <span>@{{fdata.login}}</span>
                <button @click="changeuser(fdata)" class="fbutton">View Profile</button>
            </div>
        </div>`
});

let search = new Vue({
    el:"#root",
    data:{
        searchValue:'',
        foundu:undefined,
        foundf:0
    },
    methods:{
        fetchData: async function(){
            console.log('fetching ' + this.searchValue);
            try{
                this.foundu=0;
                this.foundf=0;
                const res = await fetch(`https://api.github.com/users/${this.searchValue}`);
                this['userData'] = await res.json();
                console.log(this.userData)
                if(this.userData.login)
                    this.foundu=1;
                else
                    this.foundu=-1;
            }
            catch(err){
                throw err;
            }
        },
        getfollowersoring: async function(option){
            try{
                const res = await fetch(`https://api.github.com/users/${this.searchValue}/${option}`);
                this['followersoring']=await res.json();
                console.log(this.followersoring)
                this.foundf=0;
                this.foundf=1;
            }
            catch(err){
                throw err;
            }
        },
        reset: function(){
            if(this.foundu===-1)
                this.foundu=undefined;
        },
        changeUser: async function(newUser){
            try{
            const res = await fetch(`https://api.github.com/users/${newUser.login}`);
            this.userData = await res.json();
            this.foundu=undefined;
            this.searchValue=newUser.login;
            this.foundu=1;
            this.foundf=0;
            }
            catch(err)
            {
                this.foundu=undefined;
                throw err;
            }
        }
    }
})
