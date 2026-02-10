//import React from "react"

//export default () => <div>Hello world!</div>



import React, {Component} from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import '../styles/global.css';
import summaryData from '../summaryData'
import TextSummary from '../components/TextSummary.js';
import Searchbar from '../components/SearchBar.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import StyledBackgroundSection from '../components/BackGroundImage';
import SEO from "../components/SEO";
import elasticlunr from '../elasticlunr.js';

config.autoAddCss = false;
library.add(fab, faEnvelope);

class App extends Component{

  constructor(props){
    super(props)
    this.updateApp = this.updateApp.bind(this);
    this.state = {
      summaryData:summaryData,
      searchQuery:""
    };
  }

  getSearchQueryP = (childQueryData) => {
    this.setState({searchQuery:childQueryData})
  }

searchResultsObj = (index,query) => {
  let result = index.search(query);
  return result;
}


loadProjectToSearchIndex = (data) =>{
    var index = elasticlunr(function () {
      this.addField('title');
      this.addField('summary');
      this.addField('tags');
      this.setRef('id');
    });
    data.forEach(function(project){
      index.addDoc(project)
    })
    return index;
}

matchSearchToIndex = (results) =>{
  
  let arrayOfIDs = [];
  
 results.forEach(function(project){
   let id = project.ref;
   arrayOfIDs.push(id);
  })

  return arrayOfIDs;
}


  updateApp = ()=>{
    if (typeof window !== `undefined`) {
      let searchIndex = this.loadProjectToSearchIndex(summaryData.data);
      let searchResults = this.searchResultsObj(searchIndex, this.state.searchQuery);
      console.log(searchResults);
      let matchedProjectIDS = this.matchSearchToIndex(searchResults,this.state.summaryData.data);
     
       return matchedProjectIDS;
    }
  
    }


  render(){
    console.log(this.state.summaryData);
    let projectMatch = false;
    let matchedProjectIDS = this.updateApp();
    let summaryComponents = this.state.summaryData.data.map(project=> {
    if(this.state.searchQuery !== "" && matchedProjectIDS){
      for(let id of matchedProjectIDS){
        if(id === project.id){
          projectMatch = true;
          break;
         }else{
        projectMatch  = false;
        }
      } 
    }else{
      if(project.featured === true){
        projectMatch = true;
      }else{
        projectMatch = false;
      }
    }
      
      return (
        <TextSummary display={projectMatch ? 'block' : 'none'} key={project.id} title={project.title} summary={project.summary} repository={project.repository} presentation={project.presentation} demo={project.demo} tags={project.tags}/>
      )
    })
    

    return (
      <div className="App">
        <SEO></SEO>
         <div className="social-icons">
          <span className='icon'><a href="mailto:hello@stu-wood.com" aria-label="Email"><FontAwesomeIcon icon="envelope" size='2x' color="white"></FontAwesomeIcon></a></span>
          <span className='icon'><a href="https://github.com/strtw" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={['fab','github']} size="2x" color="white"></FontAwesomeIcon></a></span>
          <span className='icon'><a href="https://www.linkedin.com/in/stu-wood/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={['fab','linkedin']} size="2x" color="white"></FontAwesomeIcon></a></span>
          <span className='icon'><a href="https://twitter.com/Stuart_Wood" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FontAwesomeIcon icon={['fab','twitter']}size="2x" color="white"></FontAwesomeIcon></a></span>
        </div>
        <div className="cover">
        <StyledBackgroundSection/>
            <header>
              <h1 className='main-title'>Stuart Wood</h1>
              <h2>Front-end Engineer</h2>
              <div className="profile-pic-container">
                 <img className="profile-pic" src={require('../images/stu-profile.png')} alt="Stuart Wood" />
              </div>
             
            </header>
        </div>
        <div className="about">
          <h1>About</h1>
              <p>I'm a San Diego, CA based front-end engineer who has been designing & developing professionally since 2016. I have a further 10+ years experience in digital marketing, technical client services, sales and business development. I excel in cross-functional environments where communication, continuous learning, taking initiative, and transparency are valued. </p>
              <p>Feel free to contact me regarding opportunities, career advice, or just to connect.</p>
              <p><a href="https://photos.app.goo.gl/xYUR2Q1pQcVMKPYH8" target="_blank" rel="noopener noreferrer">To get a feel for me on personal level, here's a photo of me in a cow costume</a> I also enjoy international travel, surfing, gardening, cooking, and trying out new restaurants/breweries.</p>
        </div>
       

      {/*  <Button variant="contained" color="primary">
        Hello World
      </Button>*/}
     {/*} <CodePenCard height={data.height} width={data.width} title={data.titles} src={data.penUrl}/>*/}
        <div className='projects'>
          <h1>Work Samples</h1>
          <p>Below are some featured projects, with the option to search a larger catalog of samples</p>
          <Searchbar getSearchQuery={this.getSearchQueryP}></Searchbar>
          <div className="project_container">
              {summaryComponents} 
          </div>
        </div>
      </div>
    );
  }
 
  
}

export default App;