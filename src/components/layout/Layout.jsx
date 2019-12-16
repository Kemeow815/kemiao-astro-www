import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import SEO from '../seo';
import Aside from './Aside';
import Footer from './Footer';

toast.configure({ autoClose: 2000 });

const Layout = ({ seoTitle, seoDescription, meta, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          ICP
        }
      }
    }
  `);
  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  const pageTitle = seoTitle ? seoTitle : siteTitle;
  const pageDescription = seoDescription ? seoDescription : siteDescription;

  return (
    <>
      <SEO lang="zh-cmn-Hans" title={pageTitle} description={pageDescription} meta={meta || []} />
      <div className="layout">
        <Aside />

        <main>
          {children}
          <Footer icp={data.site.siteMetadata.ICP} />
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
};

export default Layout;
