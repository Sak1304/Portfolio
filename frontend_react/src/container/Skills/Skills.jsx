import { useState,useEffect } from 'react';
import {motion} from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper';
// import ReactTooltip from 'react-tooltip';
import { urlFor,client } from '../../../client';
import './Skills.scss';


const Skills = () => {

  
  const [skills, setSkills] = useState([])
  useEffect(()=>{
      
      const skillsQuery = '*[_type == "skills"]';

      // client.fetch(query)
      // .then((data)=>{
      //   setExperience(data);
      // })
      client.fetch(skillsQuery)
      .then((data)=>{
        setSkills(data);
      })
    },[])

  return (
    <>
      <h2 className="head-text">Skills <span>Section</span></h2>

      <div className="app__skills-container">
        <motion.div
        className="app__skills-list"
        >
            {
              skills.map((skill) =>(
                <motion.div
                whileInView={{opacity:[0,1]}}                       
                transition={{duration:0.5}}
                className="app__skills-item app__flex"
                key={skill.name}
                >
                  <div className="app__flex" style={{backgroundColor:skill.bgColor}}>
                    <img src={urlFor(skill.icon)} alt={skill.name} />
                  </div>
                  <p className="p-text">{skill.name}</p>
                </motion.div>
              ))
            }
        </motion.div>
      </div>
    </>
  )
}

const WrappedSkills = AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  "app__whitebg"
);

export default WrappedSkills;