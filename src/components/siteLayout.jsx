import React, { useEffect, useState } from 'react';
import Seo from "./seo"
import { Link } from 'gatsby-plugin-modal-routing-4'
import "../styles/reset.css"
import "../styles/global.css"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import { Helmet } from "react-helmet"
import Theme from "./theme"
import SearchIcon from "../../src/img/search"
import useSiteMetadata from "../hooks/SiteMetadata"
import { RiArrowUpFill } from "react-icons/ri"
import GoBack from "../components/goBack"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-4'
import Menu from "../components/menu"
// import { BiLeftArrow } from "react-icons/bi"
import defaultColors from "../../static/data/default-colors.json";
import userStyles from "../../static/data/userStyles.json"
// import MenuSocial from "../components/menu-social"
import Switch from "../components/Switch"

// import SignUp from "../components/newssign"
// import useNetlifyIdentity from '../components/useNetlifyIdentity';
import BlueCheck from './bluecheck';
import Footer from "../components/footer"

  const Layout = ({ children }) => {
    // const [loggedIn, setLoggedIn] = useState(false);
    // useNetlifyIdentity(setLoggedIn);
  
    const [showBackToTop, setShowBackToTop] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
  
        // Check if user scrolled to the top
        if (currentScrollPos === 0) {
          setShowBackToTop(false);
        } else {
          setShowBackToTop(true);
        }
      };
  
      // Attach scroll event listener
      window.addEventListener("scroll", handleScroll);
  
      // Remove event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    const { language, navOptions, featureOptions, proOptions } = useSiteMetadata();
    const { dicSearch, dicClose } = language;
    const { showNav, showNav2 } = navOptions
    const { showfooter, showSwipe, showSearch } = featureOptions
    const { showModals } = proOptions

    

const { companyname } = useSiteMetadata()
const { iconimage } = useSiteMetadata()

const { image } = useSiteMetadata()





useEffect(() => {
  sessionStorage.setItem("currentScrollPos", window.pageYOffset)
  let prevScrollpos = window.pageYOffset;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos && prevScrollpos - currentScrollPos > 65) {
      // document.querySelector('.header').style.transform = 'translateY(0)';
      if (showNav2) {
        document.querySelector('#menuicon').style.transform = 'translateX(0)';
      }
      document.querySelector('.upbar').style.transform = 'translateY(140px)';
      // document.body.classList.remove('scroll');
      // document.body.classList.add('scroll');
    } else if (prevScrollpos < currentScrollPos && currentScrollPos - prevScrollpos > 65) {
      // document.querySelector('.header').style.transform = 'translateY(-100px)';
      if (showNav2) {
        document.querySelector('#menuicon').style.transform = 'translateX(200px)';
      }
      document.querySelector('.upbar').style.transform = 'translateY(-100%)';
      // document.body.classList.add('scroll');
    }
    prevScrollpos = currentScrollPos;
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  }
}, [showNav2]);

// const FontPull = siteFont;

// const fontUrl = "https://fonts.googleapis.com/css?family=" + {siteFont} + "&display=swap";

const fontUrl = `https://fonts.googleapis.com/css?family=${defaultColors?.siteFont}&display=swap`;




  return (
<>
<Helmet>


<link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />


    <link id="yyy" rel="stylesheet" href={fontUrl} crossOrigin="anonymous" referrerPolicy="no-referrer-when-downgrade" />

  <style>{`
    ${userStyles.userStyles}
  `}</style>

    {/* <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script> */}
</Helmet>



<Seo />

<div id="top" name="pagetop"></div>

<ModalRoutingContext.Consumer >
{({ modal, closeTo }) => (
<>
  {modal ? (
    <div id="modalCloser" style={{display:'', position:'fixed', top:'60px', right:'5px', padding:'0px', fontSize:'', opacity:'1 !important', zIndex:'22',}}>
    <Link state={{noScroll: true }} to={closeTo} style={{fontSize:'',  textDecoration:'none', lineHeight:'', display:'flex', flexDirection:'column', color:'#fff', cursor:'pointer'}}>
    <button className="button" style={{ display: 'flex', justifyContent: 'center', padding:'0 .5vw' }}>
      {/* <span className="icon -left" style={{ paddingRight: '' }}><BiLeftArrow /></span> {" "} */}
    {dicClose}
    </button>
    </Link>
    </div>
  ) : (
''
  )}
</>
)}
</ModalRoutingContext.Consumer>
  
<div
        className={`upbar button ${showBackToTop ? 'visible' : ''}`}
        style={{
          position:'fixed', bottom:'20px', zIndex:'4', left:'', right:'1vw', display:'flex', justifyContent:'center', width:'auto', maxWidth:'80vw', margin:'0 auto', gap:'5vw', padding:'0', border:'none', borderRadius:'', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', fontSize:'', verticalAlign:'center',
          transform: showBackToTop ? 'translateY(0)' : 'translateY(200%)',
        }}
      >
        <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Link to Top"
            style={{cursor: 'pointer', height: '', fontSize: '', border:'none', outline:'none'}}
          >
        <div className="uparrow" style={{display:'flex', flexDirection:'column', gap:'0', padding:'', alignItems:'center', textAlign:'center'}}>
          
            <RiArrowUpFill className="" style={{cursor: 'pointer', color: 'var(--theme-ui-colors-siteColorText)', fill:'var(--theme-ui-colors-siteColorText)', fontSize: '3rem'}} />
        </div>
        </a>
      </div>



<div id="gobacker" style={{position:'fixed', top:'60px', right:'5px', zIndex:'5'}}><GoBack /></div>



{showNav ? (

<header className="header" style={{display:'block', height:'51px',}}>

<div id="menu" className="menu print panel1 header" style={{position:'fixed', width:'100vw', top:'0', zIndex:'30', maxHeight:'', overFlow:'', boxShadow:'0 0 0 rgba(0,0,0,.7)', padding:'0 2%', alignItems:'start', borderRadius:'0', display:'flex', justifyContent:'space-around', gap:'10px', color:'var(--theme-ui-colors-headerColorText)',  borderBottom:'0px solid #222',}}>

{/* {loggedIn ? (
<div style={{position:'absolute', left:'10px', top:'22px', cursor:'pointer'}}><BlueCheck /></div>
) : (
  ""
  )} */}
  <div style={{position:'absolute', left:'10px', top:'22px', cursor:'pointer'}}><BlueCheck /></div>


<Link state={showModals ? { modal: true } : {}} to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'flex', marginLeft:'25px', alignItems:'center', justifyContent:'center', maxWidth:'', height:'60px', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
{iconimage ? (
<img className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', padding:'0', maxHeight:'60px'}} src={iconimage} alt={companyname} width="111" height="60" />
) : (
<div style={{fontWeight:'', display:'grid', justifyContent:'center', alignItems:'center', height:'', fontSize:'clamp(.9rem,2vw,1rem)', color:'var(--theme-ui-colors-headerColorText)', maxWidth:'50vw' }}>
  {/* {truncateText(companyname, 28)} */}
{companyname}
</div>
)}
</Link>


          





<ul className="topmenu" style={{ fontSize:'clamp(.6rem, 1.6vw, 1.8rem)',  textAlign:'center',maxHeight:'', display:'flex', justifyContent:'space-between', gap:'4vw',  alignItems:'center', margin:'0 auto 0 auto', padding:'1.5vh 2% 0 2%', border:'0px solid white',}}>
      
{/* {loggedIn ? (
      <MenuSocial />
                ) : (
                  <Menu />
                  
                )} */}
                <Menu />
</ul>

<div id="missioncontrol" className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'3vw', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>

{showSearch ? (
<div className="searchIcon">
   <Link state={showModals ? { modal: true } : {}} aria-label="Search" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">{dicSearch}</span>
   </Link>
        </div>
      ) : (
        ""
      )}


  <div>
      <Theme  style={{}} />
        </div>

  
        {showSwipe ? (
  <Switch />
      ) : (
        ""
      )}
 


</div>

            </div>
            </header>

) : (
  ""
)}




{showNav2 ? (

<header>

<input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
<>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
  <label htmlFor="openSidebarMenu" className="backdrop1" ></label>

<label id="menuicon" htmlFor="openSidebarMenu" className="sidebarIconToggle bug">
<div style={{textAlign:'center', opacity:'1', maxWidth:'500px', color:'var(--theme-ui-colors-headerColorText)', fontWeight:'bold', border:'0px solid blue'}}>
{iconimage ? (
      <img className="" src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', maxWidth:'120px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'', color:''}}>{companyname}</div>
                )}
</div>
  </label>

  

   <div id="sidebarMenu" style={{minWidth:'', width:'',}}>

<ul className="sidebarMenuInner post-card panel" style={{maxWidth:'260px', position:'absolute', right:'0', display:'', justifyContent:''}}>

    <li className="grad logo" style={{position:'relative', maxHeight:'100px', width:'auto', display:'flex', justifyContent:'center'}}>
            <AnchorLink className="sidelogo" to="/" name="homereturn" style={{position:'', display:'block', maxWidth:'150px', height:'60px', border:'0px solid'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img src={iconimage} alt={companyname} width="120" height="60" style={{maxHeight:'60px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold'}}>{companyname}</div>
                )}
            </AnchorLink>
    </li>

{/* {loggedIn ? (
      <Menu />
    ) : (
       <Menu />
                  
)} */}
<Menu />

<li>
<ul className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>




{showSearch ? (
<li className="searchIcon">
   <Link state={showModals ? { modal: true } : {}} aria-label="Search" to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">{dicSearch}</span>
   </Link>
        </li>
      ) : (
        ""
      )}


  <li>
      <Theme  style={{}} />
        </li>

  
        {showSwipe ? (
  <li>
  <Switch />
  </li>
      ) : (
        ""
      )}


</ul>
</li>

</ul>
</div>

</header>

) : (
  ""
)}














{/* {showPopup ? (
<div className="signup1 popper1"
  style={{
  position:'fixed',
  top:'15vh',
  left:'20vw',
  right:'20vw',
  zIndex:'2',
  margin:'70px auto 0 auto',
  padding:' 0',
  maxWidth:'500px',
  borderRadius:'12px',
  border:'1px solid red'
  }}>
<SignUp />
  </div>

      ) : (
        ""
      )} */}





{children}

      
{/* show footer */}
{showfooter ? (
<Footer />
) : (
  ""
)}
{/* end show footer */}

{/* <object className="backimage" id="svg12" data={image} type="image/svg+xml" style={{height:'100vh', width:'100vw', position:'fixed', zIndex:'-2', top:'0', objectFit:'cover', backgroundImage:'url({image})', backgroundSize:'cover', backgroundPosition:'center 60%', backgroundRepeat:'repeat'}}alt="animated content" title="animated content" ></object> */}

      
      {image ? (
<img type="image/svg+xml" className="backimage" src={image} alt="Default Background" style={{height:'100vh', width:'100vw', position:'fixed', zIndex:'-2', top:'0', objectFit:'cover',}} width="10" height="10" />
) : (
  ""
)}
      </>

    
    );
  };
  
  export default Layout;

  