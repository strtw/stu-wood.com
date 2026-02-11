//import React from "react"

//export default () => <div>Hello world!</div>



import React, {Component} from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import '../styles/global.css';
import summaryData from '../summaryData'
import TextSummary from '../components/TextSummary.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import StyledBackgroundSection from '../components/BackGroundImage';
import SEO from "../components/SEO";

config.autoAddCss = false;
library.add(fab, faEnvelope, faWandMagicSparkles);

const CATEGORIES = ['all', 'public professional project', 'personal project', 'student project', 'student exercise', 'open source'];

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      summaryData: summaryData,
      categoryFilter: 'all',
    };
    this.appRef = React.createRef();
    this.pageMinHeight = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.categoryFilter === 'all' && this.appRef.current) {
      this.pageMinHeight = this.appRef.current.scrollHeight;
    }
  }

  setCategoryFilter = (e, category) => {
    e.preventDefault();
    const scrollY = window.scrollY;
    if (this.state.categoryFilter === 'all' && this.appRef.current) {
      this.pageMinHeight = this.appRef.current.scrollHeight;
    }
    this.setState({ categoryFilter: category }, () => {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    });
  }

  render(){
    const { categoryFilter } = this.state;
    const projects = this.state.summaryData.data.filter(project => {
      if (categoryFilter === 'all') return true;
      return (project.category || '').toLowerCase() === categoryFilter.toLowerCase();
    });
    const summaryComponents = projects.map(project => (
      <TextSummary
        display="block"
        key={project.id}
        title={project.title}
        summary={project.summary}
        repository={project.repository}
        presentation={project.presentation}
        demo={project.demo}
        tags={project.tags}
        icon={project.icon}
      />
    ))
    

    return (
      <div
        className="App"
        ref={this.appRef}
        style={this.state.categoryFilter !== 'all' && this.pageMinHeight
          ? { minHeight: this.pageMinHeight }
          : undefined}
      >
        <SEO></SEO>
         <div className="social-icons">
          <span className='icon'><a href="mailto:stu.wood02@gmail.com" aria-label="Email"><FontAwesomeIcon icon="envelope" size='2x' color="white" /></a></span>
          <span className='icon'><a href="https://github.com/strtw" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={['fab','github']} size="2x" color="white" /></a></span>
          <span className='icon'><a href="https://www.linkedin.com/in/stu-wood/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={['fab','linkedin']} size="2x" color="white" /></a></span>
          <span className='icon'><a href="https://twitter.com/Stuart_Wood" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FontAwesomeIcon icon={['fab','twitter']} size="2x" color="white" /></a></span>
        </div>
        <div className="cover">
        <StyledBackgroundSection/>
            <header>
              <h1 className='main-title'>Stuart Wood</h1>
              <h2>Human Centered Web Engineer</h2>
              <div className="profile-pic-container">
                 <img className="profile-pic" src="/stu-profile.png" alt="Stuart Wood" />
              </div>
             
            </header>
        </div>
        <div className="about">
          <h1>About</h1>
              <p>I'm a San Diego, CA based front-end engineer who has been designing & developing professionally since 2016. Additionally, I have a combined 10+ years experience in digital marketing, technical client services, sales and business development. I excel in cross-functional environments where communication, continuous learning, taking initiative, and transparency are valued. I’m passionate about using data to drive decisions and create better user experiences. </p>
                <p> I believe great software experiences are built through small, iterative design cycles that enable rapid customer feedback. Empathy is at the heart of my work—I strive to bring a human touch to engineering and collaborate with low-ego teams that value connection, agility, and meaningful impact.
                </p>
                <p>I’ve gravitated toward health and platform companies because they align with my belief in building scalable, user-centered solutions that empower people. But more than any specific industry, I’m driven by the spirit of thoughtful design, servant leadership, and human connection in software development. I bring that mindset to everything I do, regardless of the space. </p>
              <p> In my free time I enjoy international travel, surfing, gardening, cooking, and trying out new restaurants.</p>
              <p>Feel free to contact me regarding opportunities, career advice, or just to connect.</p>

        </div>
       

      {/*  <Button variant="contained" color="primary">
        Hello World
      </Button>*/}
     {/*} <CodePenCard height={data.height} width={data.width} title={data.titles} src={data.penUrl}/>*/}
        <div className='projects'>
          <h1>Code Samples & Projects</h1>
          <p>AI Assisted Projects are denoted with an AI icon</p>
          <div className="category-filter" role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${categoryFilter === cat ? 'filter-btn-active' : ''}`}
                onClick={(e) => this.setCategoryFilter(e, cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
          <div className="project_container">
              {summaryComponents} 
          </div>
        </div>
      </div>
    );
  }
 
  
}

export default App;