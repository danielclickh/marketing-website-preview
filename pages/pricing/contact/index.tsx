import { SuiText, SuiTitle } from '../../../components/sui'

import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import ContactForm from '../../../components/ContactForm'
import GetStarted from '../../../components/GetStarted'
import Markdown from '../../../components/Markdown'
import { GetStaticProps } from 'next'
import { ContactProps } from '../../../types/contact'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import HRSeparator from '../../../components/HRSeparator'
import Script from 'next/script'
import styles from './Contact.module.scss'

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    return {
      props: {
        ...data.hero,
        seo: {
          title: 'Dedicated Servies - ClickHouse',
          description:
            'Thank you for your interested in our Dedicated Service; please submit the below information to the best of your ability so we can help.'
        },
        ...commonProps
      }
    }
  }

export default function ContactPage({
  contactForm,
  footerData,
  headerData,
  seo
}: ContactProps) {
  return (
    <>
      <Script id='load-form' type='text/javascript'>
        {`
        /*
        * @author Sanford Whiteman
        * @version v1.104
        * @license MIT License: This license must appear with all reproductions of this software.
        *
        * Create a completely barebones, user-styles-only Marketo form
        * by removing inline STYLE attributes and disabling STYLE and LINK elements
        */
       function destyleMktoForm(mktoForm, moreStyles){
         var formEl = mktoForm.getFormElem()[0],
           arrayify = getSelection.call.bind([].slice);

         // remove element styles from <form> and children
         var styledEls = arrayify(formEl.querySelectorAll("[style]")).concat(formEl);
         styledEls.forEach(function(el) {
           el.removeAttribute("style");
         });

         // disable remote stylesheets and local <style>s
         var styleSheets = arrayify(document.styleSheets);
         styleSheets.forEach(function(ss) {
           if ( [mktoForms2BaseStyle,mktoForms2ThemeStyle].indexOf(ss.ownerNode) != -1 || formEl.contains(ss.ownerNode) ) {
             ss.disabled = true;
           }
         });

          if(!moreStyles) {
             formEl.setAttribute("data-styles-ready", "true");
          }
       };
    function loadForm() {
      if (typeof MktoForms2 === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://discover.clickhouse.com/js/forms2/js/forms2.min.js';
        script.addEventListener('load', function () {
          MktoForms2.loadForm("https://discover.clickhouse.com", "238-FPC-317", 1043);
          MktoForms2.whenRendered(function(form) {
            destyleMktoForm(form);
          });
          const formsplus = document.createElement('script');
          formsplus.src = 'https://discover.clickhouse.com/rs/238-FPC-317/images/teknkl-formsplus-tag-0.2.4.js';
          formsplus.addEventListener('load', function () {

          });
          document.head.appendChild(formsplus);

        });
        document.head.appendChild(script);
      } else {
        MktoForms2.loadForm("https://discover.clickhouse.com", "238-FPC-317", 1043);
      }
    }
    loadForm();
  `}
      </Script>

      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
            <div className='mx-auto flex flex-col pt-6 text-center'>
              <SuiTitle type='h1' className='mb-4'>
                Dedicated Service Form
              </SuiTitle>
              <div className='max-w-3xl text-neutral-200'>
                Thank you for your interested in our Dedicated Service; please
                submit the below information to the best of your ability so we
                can help.
              </div>
            </div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pt-14 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
              <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
                <div className={styles.mktoFormContainer}>
                  <form id='mktoForm_1043'></form>
                </div>

                <ContactForm {...contactForm} />
                <div className='flex text-center'>
                  <div className='text-sm font-medium text-neutral-200'>
                    <Markdown>{contactForm.disclaimer}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HRSeparator className='my-24' />
        <GrowingCommunity />
      </Layout>
    </>
  )
}
