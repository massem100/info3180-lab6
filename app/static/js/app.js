/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <router-link to= "/" class = "navbar-brand"> VueJS App </router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                     <router-link to= "/" class = "nav-link"> Home </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to= "/news" class = "nav-link"> News </router-link>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const NewsCategories = Vue.component('new-categories', {
  template: 
  `
  <div class =""> 
    <div class = "mt-4 pt-2 ">
      <h1 class ="text-center font-weight-bold heading"> Welcome to <span class =""> News Central </span> </h1>
      <p class ="text-center"> A simple approach to news telling.</p>
    </div>
    <div class = "d-flex justify-content-center align-items-center" > 
      <div class = "grid-container_c "> 
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
        <div class ="categories"> <h6> Text</h6></div>
            
      </div>
    </div>
    <div> 
      <p>Choose four (4) of your favourite categories</p>
      <button><span> NEXT </span> </button>
    </div>

  </div>
  `,data: function () {
    return {
      categories: '',
    }
  },
  created: function () {
    
      console.log(document.getElementsByClassName("grid-container"));
    
  }

});

const NewsList = Vue.component('news-list', {

  template:  `
  <div> 
    <h1>News </h1>
    <div class = "form-group mx-sm-3 mb-2 form-inline d-flex flex-column justify-content-center">
              
              <p class  = "m-2  ">You are searching for {{ searchTerm }}</p> 
              <div class = "d-flex flew-row">
                <label class = "sr-only" for= "search"> Search </label> 
                <input type="search" name="search" v-model ="searchTerm" id = "search" class = "form-control mb-2 mr-sm-2" 
                placeholder = "Enter search term here "/> 
                <button class="btn btn-primary mt-2 mb-2" @click=searchNews >Search</button>
              </div>
              
    </div>
    <div class = "news">
      
      <ul class = "news__list d-flex flex-row flex-wrap p-3 mb-3 justify-content-center">
        <li v-for='article in articles' class = "box-shadow news_item border btop p-3 mb-4 mr-3 ml-2 col-md-3 d-flex flex-column rounded"> 
         <h6 class = "font-weight-bold" >{{ article.title}} </h6> 
         <img class = "w-100 h-50 ml-0 mr-0 mt-2 mb-2 justify-content-center" :src=" article.urlToImage ? article.urlToImage : '/static/images/placeholder.png'" :key = article.urlToImage />
         <span class = " mb-5 font-sm">{{ article.description}}</span></li>
      </ul>
  
    </div> 

   
      
  </div>       
  `, 
  created: function () {

    let self = this;

    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=be69f4f4fc7a43778cf93649d6a6b22a')
    .then(function(response){
      return response.json(); 
    })
    .then(function(data){
      console.log(data);
      self.articles = data.articles;

    });
  }, 

  data: function () {
    return {
      searchTerm: '',
      articles: [],
     
  }
    
      
    
  },

  methods: {
      
      searchNews: function () {
          let self = this;
          fetch('https://newsapi.org/v2/everything?q=' +
            self.searchTerm + '&language=en&apiKey=be69f4f4fc7a43778cf93649d6a6b22a')
              .then(function (response) {
                  return response.json();
              })
              .then(function (data) {
                  console.log(data);
                  self.articles = data.articles;
                  
              });
      },
   

  }, 
  
  
});

const Home = Vue.component('home', {
  template: `

  <div class =" foundation  d-flex flex-column "> 
   <div class = "d-flex w-100 h-100 flex-column justify-content-center"> 
    <h1 class = "welcome-heading text-center"> Welcome to <span> News Central</span></h1>
    <p class ="text-center"> A simple approach to news telling.</p>
    
    </div>
    <div class = "scroll-wheel"> <div class ="" id ="scroll-circle"></div></div>
  </div>
  `, 
  data: function () {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: NewsList }, 
    { path: '/choosecategories', component: NewsCategories }
  ]
});

const app = new Vue({
    el: '#app',
    router
});

