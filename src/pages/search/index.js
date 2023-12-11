import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { ImPlay } from "react-icons/im";
import { FaImage } from "react-icons/fa";
import { AiOutlinePicLeft } from "react-icons/ai";
import Layout from "../../components/siteLayout";
import { Helmet } from "react-helmet";
import { StaticImage } from "gatsby-plugin-image";
import useSiteMetadata from "../../hooks/SiteMetadata";
import TimeAgo from 'react-timeago';



const SearchPage = ({ data }) => {
  const { showModals } = useSiteMetadata();
  const { showDates } = useSiteMetadata();
  const { postcount } = useSiteMetadata();
  const { magicOptions } = useSiteMetadata();
  const { showMagic, showMagicCat, showMagicTag, showMagicSearch } = magicOptions;


  const allPosts = data.allMarkdownRemark.edges;
  const [query, setQuery] = React.useState("");
  const [filteredPosts, setFilteredPosts] = React.useState(allPosts);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("");

  const allCategoriesSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.category));
  const allCategories = Array.from(allCategoriesSet);

  const allTagsSet = new Set(allPosts.flatMap(({ node }) => node.frontmatter.tags));
  const allTags = Array.from(allTagsSet);

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    const filteredPosts = filterPosts(query, selectedCategory, selectedTag);
    setFilteredPosts(filteredPosts);
  };

  const handleCategoryChange = event => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedTag("");
    const filteredPosts = filterPosts(query, category, "");
    setFilteredPosts(filteredPosts);
  };

  const handleTagChange = event => {
    const tag = event.target.value;
    setSelectedTag(tag);
    setSelectedCategory("");
    const filteredPosts = filterPosts(query, "", tag);
    setFilteredPosts(filteredPosts);
  };

  const filterPosts = (query, category, tag) => {
    const filtered = allPosts.filter(({ node }) => {
      const { title, tags, category: categories } = node.frontmatter;
      const titleMatch = query === "" || title.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = category === "" || (Array.isArray(categories) ? categories.includes(category) : categories === category);
      const tagMatch = tag === "" || (tags && tags.includes(tag));
  
      // console.log("Title:", title);
      // console.log("Tags:", tags);
      // console.log("Category:", categories);
      // console.log("Is Title Match:", titleMatch);
      // console.log("Is Category Match:", categoryMatch);
      // console.log("Is Tag Match:", tagMatch);
  
      return titleMatch && categoryMatch && tagMatch;
    }).slice(0, postcount);
  
    console.log("Filtered Posts:", filtered);
    return filtered;
  };



  const [visibleItems, setVisibleItems] = React.useState(postcount);

  const showMoreItems = () => {
    setVisibleItems(visibleItems + postcount);
  };

  function clearfield(setFilteredPosts, setVisibleItems, allPosts, postcount, setSelectedCategory, setSelectedTag) {
    document.querySelector('#clearme').value = '';
    setFilteredPosts(allPosts.slice(0, postcount));
    setVisibleItems(postcount);
    setSelectedCategory(""); // Reset selected category
    setSelectedTag("");
  }

  return (
    <Layout>
      <Helmet>
        <body id="body" className="search" />
      </Helmet>

      {showMagic ? (
<>
<div className="magicisland" style={{ display: 'grid', placeSelf: 'center', margin: '0 auto', border: '0px solid red', position: 'fixed', zIndex: '3', top: '', left: '1%', right: '1%', maxWidth: '550px', padding: '0', fontFamily: 'var(--theme-ui-colors-fontFamily)' }}>

        <div className="cattags" style={{ maxWidth: '', margin: '0px auto 0 auto', display: 'flex', placeSelf: 'center', gap: '8px', outline: '1px solid #333', borderRadius: '3px', padding: '8px', color: '' }}>



{showMagicCat ? (
<>
    {allCategories.length > 1 && (
      <select value={selectedCategory} onChange={handleCategoryChange} style={{ background: '#222', border: '1px solid #000', borderRadius: '3px', padding: '2px', minWidth:'120px', maxWidth:'130px', overflow:'hidden' }}>
            <option value="">Category</option>
            {allCategories.filter(category => category).map((category, index) => (
              <option key={`${category}_${index}`} value={category.trim()}>
                {category.trim()}
              </option>
            ))}
        </select>
      )}
</>
  ) : (
    ""
)}

{showMagicTag ? (
<>
  {allTags.length > 1 && (
    <select value={selectedTag} onChange={handleTagChange} style={{ background: '#222', border: '1px solid #000', borderRadius: '3px', padding: '2px', minWidth:'120px', maxWidth:'130px', overflow:'hidden' }}>
    <option value="">Keyword</option>
    {allTags.filter(tag => tag).map((tag, index) => (
      <option key={`${tag}_${index}`} value={tag.trim()}>
        {tag.trim()}
      </option>
    ))}
  </select>
)}
</>
  ) : (
    ""
)}


{showMagicSearch ? (
<>
          <label style={{}}>
            <input id="clearme" type="text" placeholder="Search:" onChange={handleSearch} style={{ width: '', background: '#222', marginRight: '10px', border: '1px solid #000', borderRadius: '3px', height: '24px', padding: '14px', minWidth:'150px', }} />

            
            
          </label>
          </>
  ) : (
    ""
)}

<div style={{ position: 'absolute', right: '50px', top: '8px', textAlign: 'center', fontSize: '10px', color: '#fff' }}>{filteredPosts.length} <br />result{filteredPosts.length !== 1 && 's'}</div>

<button type="reset" value="reset" onClick={() => clearfield(setFilteredPosts, setVisibleItems, allPosts, postcount, setSelectedCategory, setSelectedTag)} style={{ position: 'absolute', right: '5px', top: '', background: '#222', color: '#fff', textAlign: 'center', fontSize: '10px', height: '', maxWidth: '60px', border: '1px solid #000', padding: '5px', borderRadius: '3px' }}>
  clear
</button>

        </div>
      </div>
      </>
      ) : (
        ""
      )}



      <div className="contentpanel grid-container" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
        <div className="sliderSpacer" style={{ height: '', paddingTop: '', display: '' }}></div>


        {filteredPosts.slice(0, visibleItems).map(({ node }, index) => (
          <div key={index} className="post-card1" style={{ alignItems: 'center' }}>
            <Link className="postlink" state={showModals ? { modal: true } : {}} key={node.frontmatter.slug} to={node.frontmatter.slug}>
              <div>
                {node.frontmatter.featuredImage ? (
                  <GatsbyImage
                    image={node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                    alt={node.frontmatter.title + " - Featured image"}
                    className="featured-image1"
                    placeholder="blurred"
                    loading="eager"
                    style={{ position: 'relative', zIndex: '1', maxHeight: '', margin: '0 auto' }}
                  />
                ) : (
                  <StaticImage
                    className="featured-image1"
                    src="../../../static/assets/default-og-image.webp"
                    alt="Default Image"
                    style={{ position: 'relative', zIndex: '' }}
                  />
                )}
              </div>
              <div className="post-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '', position: 'relative', background: '', padding: '0', margin: '0 auto 0 auto', textAlign: 'center', overFlow: 'hidden' }}>
                {node.frontmatter.youtube.youtuber ? (
                  <div className="spotlight" style={{ marginLeft: '10%', marginTop: '-28%', margin: '-24% 10% 0 10%' }}>
                    <div className="posticons" style={{ flexDirection: 'column', margin: '0 auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '2vw', color: 'fff', }}>
                        <FaImage className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                        <ImPlay className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                        <AiOutlinePicLeft className="posticon" style={{ margin: '0 auto', width: '60%', height: '30px', fontSize: '' }} />
                      </div>
                      Play Multimedia
                    </div>
                  </div>
                ) : ("")}
                <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px auto', maxWidth: '80vw', gap: '.4vw', height: '', textAlign: 'center', padding: '1vh 2vw', fontSize: 'clamp(1rem, 1vw, 1rem)', background: 'rgba(0, 0, 0, 0.7)', borderRadius: '', color: '#aaa' }}>
                  <h2 className="title1">{node.frontmatter.title}</h2>
                </div>
              </div>
            </Link>
            {showDates ? (
              <p style={{ position: '', textAlign: 'center', border: '0px solid red', fontSize: '70%', minWidth: '100px' }}>
                <TimeAgo date={node.frontmatter.date} />
              </p>
            ) : ("")}
          </div>
        ))}



        
        {visibleItems < data.allMarkdownRemark.edges.length && (
          <div className="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '', height: '50vh' }}>
            <button className="button load-more" onClick={showMoreItems}>
              Load more
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query pageUsersSitesssrcpagessearchindexJs3773404046 {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {template: {eq: "blog-post"}}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD-HH-MM-SS")
            youtube {
              youtuber
            }
            featuredImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
            category
            tags
            slug
          }
        }
      }
    }
  }
`;

export default SearchPage;
