import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3 notfound">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="ClickHouse Learn 404 Page">
                  Page Not Found
                </Translate>
              </h1>
              <p>
                  We could not find what you're looking for! Please start over at <a href="https://clickhouse.com/learn/">clickhouse.com/learn</a>
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
