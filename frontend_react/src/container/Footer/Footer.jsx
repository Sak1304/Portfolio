import { useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../../client";
import './Footer.scss';
import { images } from '../../constants';

const Footer = () => {

  const [formData, setFormData] = useState({name:'',email:'',message:''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {name,email,message} = formData;

  const handleChangeInput = (e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type:'contact',
      name:name,
      email:email,
      message:message,
    }

    client.create(contact)
    .then(()=>{
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }
  
  return (
    <>
      <h2 className='head-text'>Take a coffee & chat with me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:sakshamkumar885@gmail.com" className='p-text' >sakshamkumar885@gmail.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 9811322453" className='p-text' >+91 9811322453</a>
        </div>
      </div>

    {!isFormSubmitted ?  
      <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input 
            type="text"
            className='p-text'
            placeholder='Your Name'
            value={name}
            onChange={handleChangeInput}
            name='name'
            />
          </div>
          <div className='app__flex'>
            <input 
            type="email"
            className='p-text'
            placeholder='Your Email'
            value={email}
            onChange={handleChangeInput}
            name='email'
            />
          </div>

          <div>
            <textarea
            className='p-text'
            placeholder='Your Message'
            value={message}
            name="message"
            onChange={handleChangeInput}
            />
          </div>
          <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Sending': 'Send Message'}</button>
      </div>
      : <div>
        <h3 className='head-text'>Thank you for getting in touch</h3>
      </div>}
    </>
  )
}

const WrappedFooter = AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);

export default WrappedFooter;