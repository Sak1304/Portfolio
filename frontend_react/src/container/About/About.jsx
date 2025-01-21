// import React from 'react'
import './About.scss';
import {motion} from 'framer-motion'
import { client, urlFor } from '../../../client';
import { useEffect, useState } from 'react';
import { AppWrap,MotionWrap } from '../../wrapper';

// const abouts = [
//   {title:'React Developer', description:'I am a React developer with a passion for building beautiful and functional web applications',imgUrl:images.about01},
//   {title:'Web Designer', description:'I am a Web designer with a passion for building beautiful and functional web applications',imgUrl:images.about02},
//   {title:'Frontend Developer', description:'I am a frontend developer with a passion for building beautiful and functional web applications',imgUrl:images.about03},
//   {title:'Backend Developer', description:'I am a Backend developer with a passion for building beautiful and functional web applications',imgUrl:images.about04},
// ]

const About = () => {
 const [abouts, setAbouts] = useState([])
 const [loading,setLoading] = useState(true);
 const [error,setError] = useState(null);

 useEffect(()=>{
  const query = '*[_type == "abouts"]';

  client.fetch(query)
    .then((data)=> {
      // console.log('Fetched data:', data);
      setAbouts(data);
      setLoading(false);
    })
    .catch((err)=>{
      console.error('Error fetching data:',err)
      setError(err);
      setLoading(false);
    });
 },[])

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error loading data</div>;

  return (
    <>
      <h2 className='head-text'>
        I know that <span>Good Development</span><br />means <span>Good Business</span>       
      </h2>
      
      <div className='app__profiles'>
        {abouts.map((about,index)=>(
          <motion.div
          whileInView={{opacity:1}}
          whileHover={{scale:1.1}}
          transition={{duration:0.5,type:'tween'}}
          className='app__profiles-items'
          key={about.title + index}
          >
             <img src={urlFor(about.imageUrl)} alt={about.title} /> 
             <h2 className='bold-text' style={{marginTop:20}}>{about.title}</h2>
             <p className='p-text' style={{marginTop:10}}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About,'app__about'),
  'about',
  "app__whitebg"
);